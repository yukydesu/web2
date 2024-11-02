import { Router } from "express";
import { Films, NewFilm } from "../types";
import path from "node:path"; // import the path module from Node.js
import { parse, serialize } from "../utils/json"; // import the parse function from utils/json.ts
const jsonDbPath = path.join(__dirname, "/../data/films.json"); // Define the path to the JSON database file

const router = Router();

let counter: number = 0; // Initialise le compteur à 0

// Tableau de films
const defaultFilms: Films[] = [
  {
    id: 1,
    title: "The Matrix",
    director: "Lana Wachowski, Lilly Wachowski",
    duration: 136,
    budget: 63000000,
    description:
      "A hacker learns about the true nature of his reality and his role in the war against its controllers.",
    imageUrl: "https://example.com/matrix.jpg",
    getDescription: function () {
      return `Film: ${this.title}, directed by ${this.director}, lasts ${this.duration} minutes.`;
    },
  },
  {
    id: 2,
    title: "Inception",
    director: "Christopher Nolan",
    duration: 148,
    budget: undefined,
    description:
      "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    imageUrl: "https://example.com/inception.jpg",
    getDescription: function () {
      return `Film: ${this.title}, directed by ${this.director}, lasts ${this.duration} minutes.`;
    },
  },
  {
    id: 3,
    title: "Interstellar",
    director: "Christopher Nolan",
    duration: 169,
    budget: 165000000,
    description: undefined,
    imageUrl: undefined,
    getDescription: function () {
      return `Film: ${this.title}, directed by ${this.director}, lasts ${this.duration} minutes.`;
    },
  },
];

// Ce router sert à récupérer tous les films
router.get("/", (req, res) => {
  counter++;
  console.log(`GET /films : ${counter}`);
  
  const films= parse(jsonDbPath, defaultFilms); // Parse the JSON database file

  // Si le paramètre "minimum-duration" est présent
  if (req.query["minimum-duration"]) {
    const minimumDuration: number = parseInt(req.query["minimum-duration"] as string, 10); // Récupérer la valeur du paramètre "minimum-duration" et la convertir en nombre
    // "as string" sert à dire à TypeScript que le paramètre est bien une chaîne de caractères

    // Vérifier que la valeur du paramètre "minimum-duration" est bien un nombre
    if (isNaN(minimumDuration)) {
      return res.status(400).json({ error: "Invalid data" }); // Retourner une erreur 400 si la valeur n'est pas un nombre
    }

    // Vérifier que la valeur du paramètre "minimum-duration" est bien supérieure à 0
    if (minimumDuration <= 0) {
      return res.status(400).json({ error: "Invalid data" }); // Retourner une erreur 400 si la valeur est inférieure ou égale à 0
    }

    const filteredFilms: Films[] = films.filter((film) => film.duration >= minimumDuration); // Filtrer les films dont la durée est supérieure ou égale à la durée minimale
    // le parametre "film" est un objet de type Films qui se trouve dans le tableau films

   
    return res.status(200).json(filteredFilms); // Retourner les films filtrés
  }

  // Si le paramètre "title-starts-with" est présent
  if (req.query["title-starts-with"]) {
    const titleStartsWith: string = req.query["title-starts-with"] as string; // Récupérer la valeur du paramètre "title-starts-with"

    // Filtrer les films dont le titre commence par la chaîne de caractères sans tenir compte de la casse
    const filteredFilms: Films[] = films.filter((film) =>
      film.title.toLowerCase().startsWith(titleStartsWith.toLowerCase()) 
    );

    return res.status(200).json(filteredFilms); // Retourner les films filtrés
  }

  if (req.query["sort-by"]) {
    const sortBy: string = req.query["sort-by"] as string; // Récupérer la valeur du paramètre "sort-by"

    // Vérifier que le paramètre "sort-by" est bien "duration" ou "budget"
    if (sortBy !== "duration" && sortBy !== "budget") {
      return res.status(400).json({ error: "Invalid data" }); // Retourner une erreur 400 si le paramètre n'est pas "duration" ou "budget"
    }

    // Trier les films selon le paramètre "sort-by"
    const sortedFilms: Films[] = films.sort((a, b) => {

      if (sortBy === "duration") { // Si le paramètre est "duration"
        return a.duration - b.duration; // Trier les films par durée
      }
      
      // Pas besoin d'un deuxieme if car on a déjà vérifié que le paramètre est soit "duration" soit "budget"
      // Si le paramètre est "budget"
      const budgetA = a.budget !== undefined ? a.budget : 0; // Utiliser une valeur par défaut si le budget n'est pas défini
      const budgetB = b.budget !== undefined ? b.budget : 0; // Utiliser une valeur par défaut si le budget n'est pas défini
      return budgetA - budgetB; // Trier les films par budget

    }); 

    return res.status(200).json(sortedFilms); // Retourner les films triés


  }

  // Pagination

  // Si le paramètre "page" et le paramètre "limit" sont présents
  if (req.query["page"] && req.query["limit"]) {
    const page: number = parseInt(req.query["page"] as string, 10); // Récupérer la valeur du paramètre "page" et la convertir en nombre
    const limit: number = parseInt(req.query["limit"] as string, 10); // Récupérer la valeur du paramètre "limit" et la convertir en nombre

    // Vérifier que les valeurs des paramètres "page" et "limit" sont bien des nombres
    if (isNaN(page) || isNaN(limit)) {
      return res.status(400).json({ error: "Invalid data" }); // Retourner une erreur 400 si les valeurs ne sont pas des nombres
    }

    // Vérifier que les valeurs des paramètres "page" et "limit" sont bien supérieures à 0
    if (page <= 0 || limit <= 0) {
      return res.status(400).json({ error: "Invalid data" }); // Retourner une erreur 400 si les valeurs sont inférieures ou égales à 0
    }

    // Calculer l'index de début
    const startIndex: number = (page - 1) * limit;
    // Calculer l'index de fin
    const endIndex: number = page * limit;

    // Récupérer les films de la page actuelle
    const paginatedFilms: Films[] = films.slice(startIndex, endIndex);

    return res.status(200).json(paginatedFilms); // Retourner les films de la page actuelle
  }

  // Si aucun paramètre n'est présent
  return res.status(200).json(films); // Retourner tous les films


});


// Ce router sert à récupérer un film en fonction de son ID
router.get("/:id", (req, res) => {
  const id: number = parseInt(req.params.id); // Récupérer l'ID du film à afficher

  const films= parse(jsonDbPath, defaultFilms); // Parse the JSON database file

  const foundedFilm = films.find((film) => film.id === id); // Récupérer le film correspondant à l'ID
  // Vérifie si l'id se trouve dans le tableau films
  if (!foundedFilm) {
    return res.status(404).json({ error: "Film not found" }); // Retourner une erreur 404 si le film n'est pas trouvé
  }
  return res.status(200).json(foundedFilm); // Retourner le film trouvé en json
});


// Ce router sert à ajouter un film
router.post("/", (req, res) => { // Ajouter un film
  // Récupérer les données du film à ajouter
  const body: unknown = req.body;

  const films= parse(jsonDbPath, defaultFilms); // Parse the JSON database file

  // Vérifier que les données sont bien envoyées
  if (!body) {
    return res.status(400).json({ error: "No data provided" }); // Retourner une erreur 400 si aucune donnée n'est fournie
  }

  // Vérifier que les données sont bien au format attendu
  if (typeof body !== "object") {
    return res.status(400).json({ error: "Invalid data" }); // Retourner une erreur 400 si les données ne sont pas au format attendu
  }

  // Vériier que les données sont bien celles d'un film
  if (
    !("title" in body) ||
    !("director" in body) ||
    !("duration" in body) ||
    !("budget" in body) ||
    !("description" in body) ||
    !("imageUrl" in body)
  ) {
    return res.status(400).json({ error: "Missing data" }); // Retourner une erreur 400 si
  }

  // Vérifier que les données sont bien au bon format
  if (
    typeof body.title !== "string" ||
    typeof body.director !== "string" ||
    typeof body.duration !== "number" ||
    typeof body.budget !== "number" ||
    typeof body.description !== "string" ||
    typeof body.imageUrl !== "string"
  ) {
    return res.status(400).json({ error: "Format error" }); // Retourner une erreur 400 si les données ne sont pas au bon format
  }

  // Vérifier si le film existe déjà
  if (films.find((film) => film.title === body.title)) {
    return res.status(400).json({ error: "Film already exists" }); // Retourner une erreur 400 si le film existe déjà
  }

  // Déstructurer les données du film
  const { title, director, duration, budget, description, imageUrl } = body as NewFilm;

  // Créer un nouvel ID pour le film
  const nextId: number = films.length + 1;

  // Créer un nouvel objet film
  const newFilm: Films = {
    id: nextId,
    title,
    director,
    duration,
    budget,
    description,
    imageUrl,
    getDescription: function () {
      return `Film: ${this.title}, directed by ${this.director}, lasts ${this.duration} minutes.`;
    },
  };

  // Ajouter le film au tableau
  films.push(newFilm);

  // Serialize the films array to JSON and write it to the database file
  serialize(jsonDbPath, films);

  // Retourner le film ajouté
  return res.status(200).json(newFilm); // Retourner le film ajouté

});


// Supprimer un film
router.delete("/:id", (req, res) => {
  const id: number = parseInt(req.params.id); // Récupérer l'ID du film à supprimer

  const films= parse(jsonDbPath, defaultFilms); // Parse the JSON database file

  // Vérifier si le film existe
  const index: number = films.findIndex((film) => film.id === id); // Récupérer l'index du film à supprimer
  if (index === -1) {
    return res.status(404).json({ error: "Film not found" }); // Retourner une erreur 404 si le film n'est pas trouvé
  }

  // Supprimer le film du tableau et récupérer le film supprimé
  const deletedFilm: Films = films.splice(index, 1)[0]; // splice retourne un tableau, on prend le premier élément du tableau, [0] car on veut récupérer le film supprimé et non un tableau contenant le film supprimé

  // Serialize the films array to JSON and write it to the database file
  serialize(jsonDbPath, films);

  // Retourner le film supprimé
  return res.status(200).json(deletedFilm); // Retourner le film supprimé

});

// Mettre à jour une ou plusieurs propriétés d'un film
router.patch("/:id", (req, res) => {

    // Récupérer l'ID du film à mettre à jour
    const id: number = parseInt(req.params.id);

    // Récupérer les films
    const films= parse(jsonDbPath, defaultFilms); // Parse the JSON database file
  
    // Récupérer les données du film à mettre à jour
    const film = films.find((film) => film.id === id);
  
    // Vérifier si le film existe
    if (!film) {
      return res.status(404).json({ error: "Film not found" }); 
    }
  
    // Récupérer les données à mettre à jour
    const body: unknown = req.body;
  
    // Vérifier le type de toute données  
    if (!body || typeof body !== "object" || 
      ("title" in body &&
        (typeof body.title !== "string" || !body.title.trim())) ||
      ("director" in body &&
        (typeof body.director !== "string" || !body.director.trim())) ||
      ("duration" in body &&
         typeof body.duration !== "number") ||
      ("budget" in body &&
         typeof body.budget !== "number") ||
      ("description" in body &&
        (typeof body.description !== "string" || !body.description.trim())) ||
      ("imageUrl" in body &&
        (typeof body.imageUrl !== "string" || !body.imageUrl.trim()))
    ) {
      return res.status(400).json({ error: "Invalid data" }); 
    }
  
    // Desctructurer les données du film
    const { title, director, duration, budget, description, imageUrl } = body as NewFilm;
  
    // Mettre à jour les informations du film si elles sont fournies
    if (title) {
      film.title = title;
    }
    if (director) {
      film.director = director;
    }
    if (duration) {
      film.duration = duration;
    }
    if (budget) {
      film.budget = budget;
    }
    if (description) {
      film.description = description;
    }
    if (imageUrl) {
      film.imageUrl = imageUrl;
    }
  
    // Serialize the films array to JSON and write it to the database file
    serialize(jsonDbPath, films);

    // Retourner le film mis à jour
    return res.status(200).json(film);
});

// Remplacer un film ou le créer si l'id n'existe pas
router.put("/:id", (req, res) => {

  // Récupérer l'ID du film à mettre à jour
  const id: number = parseInt(req.params.id);

  // Récupérer les films
  const films= parse(jsonDbPath, defaultFilms); // Parse the JSON database file

  // Récupérer les données du film à mettre à jour
  const film = films.find((film) => film.id === id);

  // Récupérer les données à mettre à jour
  const body: unknown = req.body;

  // Vérifier le type de toute données 
  if (!body || typeof body !== "object" || 
    ("title" in body &&
      (typeof body.title !== "string" || !body.title.trim())) ||
    ("director" in body &&
      (typeof body.director !== "string" || !body.director.trim())) ||
    ("duration" in body &&
       typeof body.duration !== "number") ||
    ("budget" in body &&
       typeof body.budget !== "number") ||
    ("description" in body &&
      (typeof body.description !== "string" || !body.description.trim())) ||
    ("imageUrl" in body &&
      (typeof body.imageUrl !== "string" || !body.imageUrl.trim()))
  ) {
    return res.status(400).json({ error: "Invalid data" }); 
  }

  // Desctructurer les données du film
  const { title, director, duration, budget, description, imageUrl } = body as NewFilm;

  // Si le film n'existe pas, créer un nouveau film
  if (!film) {

    // Vérifier que l'ID est un nombre
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid data" }); 
    }

    // Vérifier que l'ID est supérieur à 0
    if (id <= 0) {
      return res.status(400).json({ error: "Invalid data" }); 
    }

    // Créer un nouvel objet film
    const newFilm: Films = {
      id,
      title,
      director,
      duration,
      budget,
      description,
      imageUrl,
      getDescription: function () {
        return `Film: ${this.title}, directed by ${this.director}, lasts ${this.duration} minutes.`;
      },
    };

    // Ajouter le film au tableau
    films.push(newFilm);

    // Serialize the films array to JSON and write it to the database file
    serialize(jsonDbPath, films);

    // Retourner le film ajouté
    return res.status(200).json(newFilm);
  }

  // Si le film existe, remplacer les informations du film
  film.title = title;
  film.director = director;
  film.duration = duration;
  film.budget = budget;
  film.description = description;
  film.imageUrl = imageUrl;

  // Serialize the films array to JSON and write it to the database file
  serialize(jsonDbPath, films);

  // Retourner le film mis à jour
  return res.status(200).json(film);
});

export default router; // Exporter le routeur pour pouvoir l'utiliser dans app.ts ou un autre fichier de routes
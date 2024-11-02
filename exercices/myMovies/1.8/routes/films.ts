import { Router } from "express";
import { NewFilm } from "../types";
import {
  readAllFilms,
  readOneFilm,
  createOneFilm,
  deleteOneFilm,
  updateOneFilm,
  replaceOneFilm,
} from "../services/films";

const router = Router();

// Ce router sert à récupérer tous les films
router.get("/", (req, res) => {

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
   
    const filteredFilms = readAllFilms(minimumDuration, "", "", 0, 0); // Récupérer les films dont la durée est supérieure ou égale à la valeur du paramètre "minimum-duration"
    return res.status(200).json(filteredFilms); // Retourner les films filtrés
  }

  // Si le paramètre "title-starts-with" est présent
  if (req.query["title-starts-with"]) {

    const titleStartsWith: string = req.query["title-starts-with"] as string; // Récupérer la valeur du paramètre "title-starts-with"

    const filteredFilms = readAllFilms(0, titleStartsWith, "", 0, 0); // Récupérer les films dont le titre commence par la valeur du paramètre "title-starts-with"
  
    return res.status(200).json(filteredFilms); // Retourner les films filtrés
  }

  if (req.query["sort-by"]) {
    const sortBy: string = req.query["sort-by"] as string; // Récupérer la valeur du paramètre "sort-by"

    // Vérifier que le paramètre "sort-by" est bien "duration" ou "budget"
    if (sortBy !== "duration" && sortBy !== "budget") {
      return res.status(400).json({ error: "Invalid data" }); // Retourner une erreur 400 si le paramètre n'est pas "duration" ou "budget"
    }

    const sortedFilms = readAllFilms(0, "", sortBy, 0, 0); // Trier les films par durée ou par budget
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

    const paginatedFilms = readAllFilms(0, "", "", page, limit); // Récupérer les films de la page actuelle

    return res.status(200).json(paginatedFilms); // Retourner les films de la page actuelle
  }

  // Si aucun paramètre n'est présent
  const allFilms = readAllFilms(0, "", "", 0, 0); // Récupérer tous les films
  return res.status(200).json(allFilms); // Retourner tous les films

});


// Ce router sert à récupérer un film en fonction de son ID
router.get("/:id", (req, res) => {
  const id: number = parseInt(req.params.id); // Récupérer l'ID du film à afficher

  const foundedFilm = readOneFilm(id); // Récupérer le film en fonction de son ID 

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

  const films = readAllFilms(0, "", "", 0, 0); // Récupérer tous les films

  // Vérifier si le film existe déjà
  if (films.find((film) => film.title === body.title)) {
    return res.status(400).json({ error: "Film already exists" }); // Retourner une erreur 400 si le film existe déjà
  }

  // Déstructurer les données du film
  const { title, director, duration, budget, description, imageUrl } = body as NewFilm;


  // Créer un nouvel objet film
  const newFilm: NewFilm = {
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

  const film = createOneFilm(newFilm); // Créer le film

  return res.status(200).json(film); // Retourner le film créé
});


// Supprimer un film
router.delete("/:id", (req, res) => {
  const id: number = parseInt(req.params.id); // Récupérer l'ID du film à supprimer

  const films = readAllFilms(0, "", "", 0, 0); // Récupérer tous les films

  // Vérifier si le film existe
  const index: number = films.findIndex((film) => film.id === id); // Récupérer l'index du film à supprimer
  if (index === -1) {
    return res.status(404).json({ error: "Film not found" }); // Retourner une erreur 404 si le film n'est pas trouvé
  }

  const deletedFilm = deleteOneFilm(id); // Supprimer le film

  return res.status(200).json(deletedFilm); // Retourner le film supprimé

});

// Mettre à jour une ou plusieurs propriétés d'un film
router.patch("/:id", (req, res) => {

    // Récupérer l'ID du film à mettre à jour
    const id: number = parseInt(req.params.id);

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

    // Créer un nouvel objet film avec les données destructurées
    const newFilm: NewFilm = {
      title,
      director,
      duration,
      budget,
      description,
      imageUrl,
      getDescription: function () { return ''; }
    };
  
    const filmUpdated = updateOneFilm(id, newFilm); // Récupérer le film mis à jour

    if(!filmUpdated) {
      return res.status(404).json({ error: "Film not found" });
    }

    // Retourner le film mis à jour
    return res.status(200).json(filmUpdated);
});

// Remplacer un film ou le créer si l'id n'existe pas
router.put("/:id", (req, res) => {

  // Récupérer l'ID du film à mettre à jour
  const id: number = parseInt(req.params.id);

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

  // Vérifier que l'ID est un nombre
  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid data" }); 
  }

  // Vérifier que l'ID est supérieur à 0
  if (id <= 0) {
    return res.status(400).json({ error: "Invalid data" }); 
  }

  // Desctructurer les données du film
  const { title, director, duration, budget, description, imageUrl } = body as NewFilm;

  // Créer un nouvel objet film
  const newFilm: NewFilm = {
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

  const film = replaceOneFilm(id, newFilm); // Remplacer le film ou le créer s'il n'existe pas

  // Retourner le film ajouté
  return res.status(200).json(film);
});

export default router; // Exporter le routeur pour pouvoir l'utiliser dans app.ts ou un autre fichier de routes
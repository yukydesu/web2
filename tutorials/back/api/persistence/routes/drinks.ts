import { Router } from "express"; // import the Router object from express
import { Drink, NewDrink } from "../types"; // import the Drink type from types.ts
import path from "node:path"; // import the path module from Node.js
import { parse, serialize } from "../utils/json"; // import the parse function from utils/json.ts
const jsonDbPath = path.join(__dirname, "/../data/drinks.json"); // Define the path to the JSON database file

// Define an array of drinks
const defaultDrinks: Drink[] = [
  {
    id: 1,
    title: "Coca-Cola",
    image:
      "https://media.istockphoto.com/id/1289738725/fr/photo/bouteille-en-plastique-de-coke-avec-la-conception-et-le-chapeau-rouges-d%C3%A9tiquette.jpg?s=1024x1024&w=is&k=20&c=HBWfROrGDTIgD6fuvTlUq6SrwWqIC35-gceDSJ8TTP8=",
    volume: 0.33,
    price: 2.5,
  },
  {
    id: 2,
    title: "Pepsi",
    image:
      "https://media.istockphoto.com/id/185268840/fr/photo/bouteille-de-cola-sur-un-fond-blanc.jpg?s=1024x1024&w=is&k=20&c=xdsxwb4bLjzuQbkT_XvVLyBZyW36GD97T1PCW0MZ4vg=",
    volume: 0.33,
    price: 2.5,
  },
  {
    id: 3,
    title: "Eau Minérale",
    image:
      "https://media.istockphoto.com/id/1397515626/fr/photo/verre-deau-gazeuse-%C3%A0-boire-isol%C3%A9.jpg?s=1024x1024&w=is&k=20&c=iEjq6OL86Li4eDG5YGO59d1O3Ga1iMVc_Kj5oeIfAqk=",
    volume: 0.5,
    price: 1.5,
  },
  {
    id: 4,
    title: "Jus d'Orange",
    image:
      "https://images.unsplash.com/photo-1600271886742-f049cd451bba?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    volume: 0.25,
    price: 4.5,
  },
  {
    id: 5,
    title: "Limonade",
    image:
      "https://images.unsplash.com/photo-1583064313642-a7c149480c7e?q=80&w=1430&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    volume: 0.33,
    price: 5,
  },
];

const router = Router(); // create a new router

// GET /drinks => get all drinks
router.get("/", (req, res) => {  // GET /drinks
  const drinks = parse(jsonDbPath, defaultDrinks); // Récupère les boissons depuis la base de données JSON
  if (!req.query["budget-max"]) { // if there is no budget-max query parameter, exemple : req.query => { "budget-max": "5" }
    // Cannot call req.query.budget-max as "-" is an operator
    // req.query est un objet qui contient les paramètres de la requête
    // le parametre "budget-max" est accessible via req.query["budget-max"] et non pas req.query.budget-max !
    return res.json(drinks); // return all drinks
  }
  // si il y a un paramètre budget-max
  const budgetMax: number = Number(req.query["budget-max"]); // convert the budget-max to a number
  const filteredDrinks = drinks.filter((drink) => drink.price <= budgetMax); // filtrer les boissons dont le prix est inférieur ou égal au budget-max
      // drinks.filter() sert a filtrer le tableau drinks, 
    // renvoie un nouveau tableau avec les éléments qui passent le filtre
    // le filtre est une fonction qui prend un argument (drink) et retourne un booléen, 
    // si le booléen est true, l'élément est gardé, sinon il est supprimé, par exemple : si budgetMax = 5, drink.price = 2.5 => true
  return res.json(filteredDrinks); // return the filtered drinks
});

// GET /drinks/:id => get a drink by id 
router.get("/:id", (req, res) => { // req.params.id => "1"  
  const id = Number(req.params.id); // convert the id to a number ; "1" => 1
  const drinks = parse(jsonDbPath, defaultDrinks); // get all drinks from the JSON database
  const drink = drinks.find((drink) => drink.id === id);  // { id: 1, title: "Coca-Cola", ... }
  if (!drink) { // if drink is ndefined 
    return res.sendStatus(404); // 404 Not Found
  }
  return res.json(drink); // return the drink as a JSON response
});

// POST /drinks => create a new drink
router.post("/", (req, res) => { // Route pour créer une nouvelle boisson
  const body: unknown = req.body; // Récupère le corps de la requête
  // Validation des données du corps
  if (
    !body ||
    typeof body !== "object" || // Vérifie que le corps est un objet
    !("title" in body) || // Vérifie que le titre est présent
    !("image" in body) || // Vérifie que l'image est présente
    !("volume" in body) || // Vérifie que le volume est présent
    !("price" in body) || // Vérifie que le prix est présent
    typeof body.title !== "string" || // Vérifie que le titre est une chaîne
    typeof body.image !== "string" || // Vérifie que l'image est une chaîne
    typeof body.volume !== "number" || // Vérifie que le volume est un nombre
    typeof body.price !== "number" || // Vérifie que le prix est un nombre
    !body.title.trim() || // Vérifie que le titre n'est pas vide
    !body.image.trim() || // Vérifie que l'image n'est pas vide
    body.volume <= 0 || // Vérifie que le volume est positif
    body.price <= 0 // Vérifie que le prix est positif
  ) {
    return res.sendStatus(400); // Renvoie un statut 400 Bad Request si une des validations échoue
  }

  const { title, image, volume, price } = body as NewDrink; // Déstructure les données de la boisson du corps de la requête

  const drinks = parse(jsonDbPath, defaultDrinks); // Récupère les boissons depuis la base de données JSON

  // Génère le prochain ID pour la nouvelle boisson
  const nextId =
    drinks.reduce((maxId, drink) => (drink.id > maxId ? drink.id : maxId), 0) + 1; // Trouve le plus grand ID dans le tableau et ajoute 1

  const newDrink: Drink = { // Crée un objet pour la nouvelle boisson
    id: nextId, // Assigne le nouvel ID
    title, // Assigne le titre
    image, // Assigne l'image
    volume, // Assigne le volume
    price, // Assigne le prix
  };

  drinks.push(newDrink); // Ajoute la nouvelle boisson au tableau des boissons
  serialize(jsonDbPath, drinks); // Enregistre les boissons dans la base de données JSON
  return res.json(newDrink); // Renvoie la nouvelle boisson en réponse au client

});

router.delete("/:id", (req, res) => {
  const id = Number(req.params.id); // convert the id to a number
  const drinks = parse(jsonDbPath, defaultDrinks); // get all drinks from the JSON database
  const index = drinks.findIndex((drink) => drink.id === id); // find the index of the drink with the id
  if (index === -1) {  // if the drink is not found
    return res.sendStatus(404); // return 404 Not Found
  }
  const deletedElements = drinks.splice(index, 1); // splice() returns an array of the deleted elements
  serialize(jsonDbPath, drinks); // save the drinks to the JSON database
  return res.json(deletedElements[0]); // return the deleted drink
});

router.patch("/:id", (req, res) => { // PATCH /drinks/:id
  const id = Number(req.params.id); // convert the id to a number
  const drinks = parse(jsonDbPath, defaultDrinks); // get all drinks from the JSON database
  const drink = drinks.find((drink) => drink.id === id); // find the drink with the id
  if (!drink) { // if the drink is not found
    return res.sendStatus(404); // return 404 Not Found
  }

  const body: unknown = req.body; // get the body of the request

  if ( // validate the body
    !body ||
    typeof body !== "object" ||
    ("title" in body &&
      (typeof body.title !== "string" || !body.title.trim())) ||
    ("image" in body &&
      (typeof body.image !== "string" || !body.image.trim())) ||
    ("volume" in body &&
      (typeof body.volume !== "number" || body.volume <= 0)) ||
    ("price" in body && (typeof body.price !== "number" || body.price <= 0))
  ) {
    return res.sendStatus(400);
  }

  const { title, image, volume, price }: Partial<NewDrink> = body; // destructure the body, partial sera utilisé pour rendre les propriétés optionnelles

  if (title) {
    drink.title = title;
  }
  if (image) {
    drink.image = image;
  }
  if (volume) {
    drink.volume = volume;
  }
  if (price) {
    drink.price = price;
  }

  serialize(jsonDbPath, drinks); // save the drinks to the JSON database

  return res.json(drink); // return the updated drink
});



export default router; // export the router object
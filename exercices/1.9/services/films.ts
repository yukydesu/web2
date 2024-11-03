// Importation des modules
import { Films, NewFilm } from "../types";
import path from "node:path"; // import the path module from Node.js
import { parse, serialize } from "../utils/json"; // import the parse function from utils/json.ts
const jsonDbPath = path.join(__dirname, "/../data/films.json"); // Define the path to the JSON database file


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

// Fonction pour lire tous les films
function readAllFilms(minimumDuration: number, titleStartsWith: string, sortBy: string, page: number, limit: number): Films[] {
    const films = parse(jsonDbPath, defaultFilms);
  
    if (minimumDuration > 0) {
      return films.filter((film) => film.duration >= minimumDuration);
    }
  
    if (titleStartsWith) {
      return films.filter((film) =>
        film.title.toLowerCase().startsWith(titleStartsWith.toLowerCase())
      );
    }
  
    if (sortBy) {
      if (sortBy === "duration") {
        return films.sort((a, b) => a.duration - b.duration);
      }
      if (sortBy === "budget") {
        return films.sort((a, b) => {
          const budgetA = a.budget !== undefined ? a.budget : 0;
          const budgetB = b.budget !== undefined ? b.budget : 0;
          return budgetA - budgetB;
        });
      }
    }
  
    if (page > 0 && limit > 0) {
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
      return films.slice(startIndex, endIndex);
    }
  
    return films;
  } 

// Fonction pour lire un film en fonction de son ID
function readOneFilm(id: number): Films | undefined {
    const films = parse(jsonDbPath, defaultFilms);
    return films.find((film) => film.id === id);
  }

// Fonction pour ajouter un film
function createOneFilm(newFilm: NewFilm): Films {
    const films = parse(jsonDbPath, defaultFilms);
  
    const nextId = films.length + 1;
  
    const film: Films = {
      id: nextId,
      ...newFilm,
      getDescription: function () {
        return `Film: ${this.title}, directed by ${this.director}, lasts ${this.duration} minutes.`;
      },
    };
  
    films.push(film);
  
    serialize(jsonDbPath, films);
  
    return film;
  }

// Fonction pour supprimer un film
function deleteOneFilm(id: number): Films | undefined {
    const films = parse(jsonDbPath, defaultFilms);
  
    const index = films.findIndex((film) => film.id === id);
  
    if (index === -1) {
      return undefined;
    }
  
    const deletedFilm = films.splice(index, 1)[0];
  
    serialize(jsonDbPath, films);
  
    return deletedFilm;
  }

// Fonction pour mettre à jour un film
function updateOneFilm(id: number, updatedFilm: NewFilm): Films | undefined {
    const films = parse(jsonDbPath, defaultFilms);
  
    const film = films.find((film) => film.id === id);
  
    if (!film) {
      return undefined;
    }
  
    // Object.assign(film, updatedFilm); // Remplacer les propriétés existantes par celles fournies façon 1

    // Mettre à jour les informations du film si elles sont fournies façon 2
    if (updatedFilm.title) {
        film.title = updatedFilm.title;
    }
    if (updatedFilm.director) {
    film.director = updatedFilm.director;
    }
    if (updatedFilm.duration) {
    film.duration = updatedFilm.duration;
    }
    if (updatedFilm.budget) {
    film.budget =updatedFilm.budget;
    }
    if (updatedFilm.description) {
    film.description = updatedFilm.description;
    }
    if (updatedFilm.imageUrl) {
    film.imageUrl = updatedFilm.imageUrl;
    }

    film.getDescription = function () { return `Film: ${this.title}, directed by ${this.director}, lasts ${this.duration} minutes.`; };
  
    serialize(jsonDbPath, films);
  
    return film;
  }

// Fonction pour remplacer un film ou le créer s'il n'existe pas
function replaceOneFilm(id: number, newFilm: NewFilm): Films {
    const films = parse(jsonDbPath, defaultFilms);
  
    const index = films.findIndex((film) => film.id === id);
  
    if (index === -1) {
      const nextId = films.length + 1;
  
      const film: Films = {
        id: nextId,
        ...newFilm,
        getDescription: function () {
          return `Film: ${this.title}, directed by ${this.director}, lasts ${this.duration} minutes.`;
        },
      };
  
      films.push(film);
  
      serialize(jsonDbPath, films);
  
      return film;
    }
  
    const film: Films = {
      id,
      ...newFilm,
      getDescription: function () {
        return `Film: ${this.title}, directed by ${this.director}, lasts ${this.duration} minutes.`;
      },
    };
  
    films[index] = film;
  
    serialize(jsonDbPath, films);
  
    return film;
  }

  // Export des fonctions
export {
    readAllFilms,
    readOneFilm,
    createOneFilm,
    deleteOneFilm,
    updateOneFilm,
    replaceOneFilm,
  };
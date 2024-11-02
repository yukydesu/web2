// Importation des modules
import { Texts, NewText } from "../types";
import path from "node:path"; // import the path module from Node.js
import { parse, serialize } from "../utils/json"; // import the parse function from utils/json.ts
const jsonDbPath = path.join(__dirname, "/../data/texts.json"); // Define the path to the JSON database file
import { v4 as uuidv4 } from 'uuid';


// Tableau de textes avec comme id un uuid
const defaultTexts: Texts[] = [
  {
    id: uuidv4(),
    content: "Hello World",
    level: "easy",
  },
  {
    id: uuidv4(),
    content: "Bonjour le monde",
    level: "medium",
  },
  {
    id: uuidv4(),
    content: "Hola Mundo",
    level: "hard",
  },
];


// Fonction pour lire tous les textes avec filtre de level
function readAllTexts(level: "easy" | "medium" | "hard"): Texts[] {
  const texts = parse(jsonDbPath, defaultTexts);
  if (!level) {
    return texts;
  }
  return texts.filter((text) => text.level === level);
}

// Fonction pour lire un texte
function readText(id: string): Texts | undefined {
  const texts = parse(jsonDbPath, defaultTexts);
  return texts.find((text) => text.id === id);
}

// Fonction pour créer un texte
function createText(newText: NewText): Texts {
  const texts = parse(jsonDbPath, defaultTexts);
  const id = uuidv4();
  const text: Texts = { id, ...newText };
  texts.push(text);
  serialize(jsonDbPath, texts);
  return text;
}

// Fonction pour supprimer un texte
function deleteText(id: string): Texts | undefined {
  const texts = parse(jsonDbPath, defaultTexts);
  const index = texts.findIndex((text) => text.id === id);
  if (index === -1) {
    return undefined;
  }
  const text = texts.splice(index, 1)[0];
  serialize(jsonDbPath, texts);
  return text;
}

// Fonction pour mettre à jour un texte
function updateText(id: string, newText: NewText): Texts | undefined {
  const texts = parse(jsonDbPath, defaultTexts);
  const index = texts.findIndex((text) => text.id === id);
  if (index === -1) {
    return undefined;
  }
  const text = { id, ...newText };
  texts[index] = text;
  serialize(jsonDbPath, texts);
  return text;
}

// Exportation des fonctions
export { readAllTexts, readText, createText, deleteText, updateText };
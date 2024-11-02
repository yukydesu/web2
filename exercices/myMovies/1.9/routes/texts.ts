import { Router } from "express";
import { NewText } from "../types";
import { 
    readAllTexts, 
    readText, 
    createText, 
    deleteText,
    updateText,
} from "../services/texts";



const router = Router();

// Récupérer tous les textes avec filtre de level
router.get("/", (req, res) => {
  
    const level = req.query.level as "easy" | "medium" | "hard";
    const texts = readAllTexts(level);

    if (!texts) {
        res.status(404).json({ message: "Text not found" });
    }
    res.json(texts);
    
});

// Récupérer un texte
router.get("/:id", (req, res) => {
    const id = req.params.id;
        
    const text = readText(id);
    if (text) {
        res.json(text);
    } else {
        res.status(404).json({ message: "Text not found" });
    }
});

// Créer un texte
router.post("/", (req, res) => {

    // Vérifier si le texte est valide
    if (!req.body || !req.body.content || !req.body.level) {
        res.status(400).json({ message: "Invalid body" });
        return;
    }

    // Vérifier si le level correspond à "easy", "medium" ou "hard"
    if (!["easy", "medium", "hard"].includes(req.body.level)) {
        res.status(400).json({ message: "Invalid level" });
    }

    const newText = req.body as NewText;
    const text = createText(newText);
    res.status(201).json(text);
});

// Supprimer un texte
router.delete("/:id", (req, res) => {
    const id = req.params.id;

    const text = deleteText(id);
    if (text) {
        res.json(text);
    } else {
        res.status(404).json({ message: "Text not found" });
    }
});

// Mettre à jour un texte
router.put("/:id", (req, res) => {
    const id = req.params.id;

    const newText = req.body as NewText;
    const text = updateText(id, newText);
    if (text) {
        res.json(text);
    } else {
        res.status(404).json({ message: "Text not found" });
    }
});

export default router;

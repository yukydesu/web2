"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const films = [
    {
        id: 1,
        title: "The Matrix",
        director: "Lana Wachowski, Lilly Wachowski",
        duration: 136,
        budget: 63000000,
        description: "A hacker learns about the true nature of his reality and his role in the war against its controllers.",
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
        description: "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
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
    }
];
router.get("/", (_req, res) => {
    return res.json(films);
});
exports.default = router;

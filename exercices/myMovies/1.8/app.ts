import express from "express";
import filmRouter from "./routes/films";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/films", filmRouter);

let counter: number = 0; // Initialise le compteur à 0
// Définir la route pour l'index du site
app.get("/", (_, res) => {
  counter++;
  console.log(`GET / : ${counter}`);
  res.send("Hello World");
});

export default app;

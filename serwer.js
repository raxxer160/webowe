import express from "express";
import { gry } from "./dane.js";

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send(`
      <h1>Katalog gier planszowych</h1>
      <ul>
        <li><a href="/gry">/gry</a> -- wszystkie gry</li>
        <li><a href="/gry/1">/gry/:id</a> -- jedna gra</li>
        <li><a href="/szukaj?max=150">/szukaj?wydawca=&max=&gracze=</a> -- wyszukiwanie</li>
        <li><a href="/statystyki">/statystyki</a> -- podsumowanie katalogu</li>
      </ul>
    `);
})

app.get("/gry", (req, res) => {
  res.json(gry);
})

app.get("/gry/:id", (req, res) => {
  const szukana = Number(req.params.id);
  const gra = gry.find((k) => k.id === szukana);
  if (!gra) {
    res.status(404).json({ blad: "Nie ma gry o takim numerze" });
    return;
  }

  res.json(gra);
})

app.listen(PORT, () => {
  console.log(`Serwer dziala http://localhost:${PORT}`);
})

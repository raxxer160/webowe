import express from "express";
import { gry } from "./dane.js";
import path from "node:path";

const app = express();
const PORT = 3000;



/**
 *
 * loguje kazde wejscie na strone, i wypisuje je do terminala (metoda, trasa i godzina)
 */
const logger = (req, res, next) => {
  req.czasZadania = new Date().toLocaleTimeString("pl-PL");
  console.log(`[${req.czasZadania}] ${req.method} ${req.url}`);
  next();
};

app.use(logger);

app.use(express.static(path.join(import.meta.dirname, "public")));

/**
 * GET /gry - lista wszystkich gier z katalogu
 */
app.get("/gry", (req, res) => {
  res.json(gry);
})

/**
 * GET /gry/:id - wyszukiwanie jednej gry o podanym numerze, wyrzuci blad 404 w przypadku braku takiej gry
 */
app.get("/gry/:id", (req, res) => {
  const szukana = Number(req.params.id);
  const gra = gry.find((k) => k.id === szukana);
  if (!gra) {
    res.status(404).json({ blad: "Nie ma gry o takim numerze" });
    return;
  }

  res.json(gra);
})

/**
 * GET /szukaj?wydawca=&max=&gracze= - filtrowanie katalogu po podanych warunkach, brak parametrow skutkuje pelna lista gier
 */
app.get("/szukaj", (req, res) => {
  const { wydawca, max, gracze } = req.query;
  let wynik = gry;

  if (max) {
    wynik = wynik.filter((k) => k.cena <= Number(max));
  }
  if (wydawca) {
    wynik = wynik.filter((k) => k.wydawca.toLowerCase() === wydawca.toLowerCase());
  }
  if (gracze) {
    wynik = wynik.filter((k) => k.gracze >= Number(gracze));
  }
  res.json(wynik);
})

/**
 * GET /statystyki - liczba gier, ich srednia cena, oraz najdrozsza cena gra
 */
app.get("/statystyki", (req, res) => {
  const sumaCen = gry.reduce((suma, g) => suma += g.cena, 0);
  const srednia = sumaCen / gry.length;
  const najdrozsza = gry.reduce((a, b) => (b.cena > a.cena ? b : a));

  res.json({
    liczbaGier: gry.length,
    sredniaCena: Math.round(srednia * 100) / 100,
    najdrozsza: najdrozsza.cena
  })
})

app.listen(PORT, () => {
  console.log(`Serwer dziala http://localhost:${PORT}`);
})

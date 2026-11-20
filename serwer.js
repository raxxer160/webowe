import express from "express";
import { gry } from "./dane.js";
import path from "node:path";
import routerGier from "./trasy/gry.js"

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
app.use(express.json());
app.use(express.urlencoded( { extended: true } ));

app.use(express.static(path.join(import.meta.dirname, "public")));

app.post("/echo", (req, res) => {
  console.log(req.body);
  res.json({ odebrano: req.body });
})

app.use("/gry", routerGier);

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
    najdrozsza: najdrozsza.cena,
    wygenerowano: req.czasZadania
  })
})

app.get("/blad", () => {
  throw new Error("Testowy blad");
})

app.use((req, res) => {
  const czyDane = ["/gry", "/szukaj", "statystyki"].some((p) => req.url.startsWith(p));
  if (czyDane) {
    res.status(404).json({ blad: "nie ma takiej trasy" });
    return;
  }
  res.status(404).send("<h1>404 - nie ma takiej strony</h1>");
})

app.use((err, req, res, next) => {
  console.error(`Blad: ${err.message}`);
  res.status(404).json({ blad: "Blad serwera" });
})

app.listen(PORT, () => {
  console.log(`Serwer dziala http://localhost:${PORT}`);
})

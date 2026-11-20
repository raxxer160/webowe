import { Router } from "express"
import { gry } from "../dane.js"

const router = Router();

/** GET /gry - pelna lista gier w katalogu */
router.get("/", (req, res) => {
  res.json(gry);
})

/** GET /gry:id - jedna gra o podanym numerze; 404 jesli takiej gry nie ma */
router.get("/:id", (req, res) => {
  const szukana = Number(req.params.id);
  const gra = gry.find((k) => k.id === szukana);
  if (!gra) {
    res.status(404).json({ blad: "Nie ma gry o takim numerze" });
    return;
  }

  res.json(gra);
})

export default router;

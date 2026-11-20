import { Router } from "express"
import { gry } from "../dane.js"

const router = Router();

router.get("/", (req, res) => {
  res.json(gry);
})

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

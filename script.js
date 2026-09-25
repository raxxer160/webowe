import { umiejetnosci, adres_api } from "./dane.js"
import { budujListe, filtrujPoKategorii, podsumowanie } from "./umiejetnosci.js";

const formularz = document.querySelector("#formularz-kontakt");
const komunikat = document.querySelector("#komunikat");
const przycisk = document.querySelector("#przelacznik-motywu");
const listaEL = document.querySelector("#lista-umiejetnosci");
const podsumowanieEL = document.querySelector("#podsumowanie");
const filtryEL = document.querySelector("#filtry");

const pokazKomunikat = (tresc, rodzaj) => {
  komunikat.textContent = tresc;
  komunikat.classList.remove("blad", "sukces");
  komunikat.classList.add(rodzaj);
}

const pokazUmiejetnosci = (kategoria = "wszystkie") => {
  const wybrane = filtrujPoKategorii(umiejetnosci, kategoria);
  listaEL.innerHTML = budujListe(wybrane);
  console.log(podsumowanie(wybrane))
  podsumowanieEL.innerText = podsumowanie(wybrane);
}

filtryEL.addEventListener("click", (event) => {
  const przycisk = event.target.closest("button");
  if (!przycisk) { return; }

  filtryEL.querySelectorAll("button").forEach(b => b.classList.remove("aktywny"));
  przycisk.classList.add("aktywny");
  pokazUmiejetnosci(przycisk.dataset.kategoria);
})

pokazUmiejetnosci();

formularz.addEventListener("submit", (e) => {
  e.preventDefault();

  const dane = Object.fromEntries(new FormData(formularz));
  const { imie, email, temat, tresc } = dane;

  if (imie.trim() === "") {
    pokazKomunikat("Podaj imię.", "blad");
    return;
  }
  if (email.trim() === "") {
    pokazKomunikat("Podaj adres e-mail.", "blad");
    return;
  }
  if (temat.trim() === "") {
    pokazKomunikat("Wybierz temat wiadomości.", "blad");
    return;
  }
  pokazKomunikat(`Dziekuje, ${imie}. Wiadomosc na temat "${temat}" zostala
    przyjeta.`, "sukces");

  console.log("dane z formularza:", {
    imie: imie,
    email: email,
    temat: temat,
    tresc: tresc
  });
})

przycisk.addEventListener("click", () => {
  const jestCiemny = document.body.classList.toggle("ciemny");

  if (jestCiemny) { przycisk.textContent = "Jasny motyw"; }
  else { przycisk.textContent = "Ciemny motyw" }
})

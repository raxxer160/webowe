const umiejetnosci = [
  { nazwa: "HTML", poziom: 4, kategoria: "frontend" },
  { nazwa: "CSS", poziom: 3, kategoria: "frontend" },
  { nazwa: "JavaScript", poziom: 3, kategoria: "frontend" },
  { nazwa: "SQL", poziom: 2, kategoria: "backend" },
  { nazwa: "PHP", poziom: 1, kategoria: "backend" },
  { nazwa: "Python", poziom: 4, kategoria: "backend" },
  { nazwa: "C++", poziom: 2, kategoria: "backend" },
  { nazwa: "C#", poziom: 2, kategoria: "backend" }
];

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

const filtrujPoKategorii = (lista, kategoria) =>
  kategoria === "wszystkie" ? [...lista] : lista.filter(u => u.kategoria === kategoria);

const sredniPoziom = (lista) => {
  if (lista.length == 0) {
    return 0;
  }
  const suma = lista.reduce((razem, { poziom }) => razem + poziom, 0);
  return Math.round((suma / lista.length) * 10) / 10;
}

const podsumowanie = (lista) =>
  lista.length === 0
    ? "Brak umiejętności w tej kategorii."
    : `Umiejętności: ${lista.length} · średni poziom: ${sredniPoziom(lista)}`;

const budujListe = lista =>
  lista.map(({ nazwa, poziom }) => `
    <li>
      <span class="nazwa">${nazwa}</span>
      <span class="poziom" title="Poziom ${poziom} z 5">
      ${"●".repeat(poziom)}${"○".repeat(5 - poziom)}</span>
    </li>
    `).join("");

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

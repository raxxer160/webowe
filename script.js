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

const pokazKomunikat = (tresc, rodzaj) => {
  komunikat.textContent = tresc;
  komunikat.classList.remove("blad", "sukces");
  komunikat.classList.add(rodzaj);
}

const budujListe = lista =>
  lista.map(({ nazwa, poziom }) => `
    <li>
      <span class="nazwa">${nazwa}</span>
      <span class="poziom" title="Poziom ${poziom} z 5">
      ${"●".repeat(poziom)}${"○".repeat(5 - poziom)}</span>
    </li>
    `).join("");

listaEL.innerHTML = budujListe(umiejetnosci);

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

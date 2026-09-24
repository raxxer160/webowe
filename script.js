const umiejetnosci = [
  "HTML",
  "CSS",
  "JavaScript",
  "SQL",
  "PHP",
  "Python",
  "C++",
  "C#"
];

const formularz = document.querySelector("#formularz-kontakt");
const komunikat = document.querySelector("#komunikat");
const przycisk = document.querySelector("#przelacznik-motywu");

function pokazKomunikat(tresc, rodzaj) {
  komunikat.textContent = tresc;
  komunikat.classList.remove("blad", "sukces");
  komunikat.classList.add(rodzaj);
}

function pokazUmiejetnosci(lista) {
  const kontener = document.querySelector("#lista-umiejetnosci");
  for (const nazwa of lista) {
    const element = document.createElement("li");
    element.textContent = nazwa;
    kontener.appendChild(element);
  }
}

pokazUmiejetnosci(umiejetnosci);

formularz.addEventListener("submit", function (e) {
  e.preventDefault();

  const imie = document.querySelector("#imie").value.trim();
  const email = document.querySelector("#email").value.trim();
  const temat = document.querySelector("#temat").value;
  const tresc = document.querySelector("#tresc").value.trim();

  if (imie === "") {
    pokazKomunikat("Podaj imię.", "blad");
    return;
  }
  if (email === "") {
    pokazKomunikat("Podaj adres e-mail.", "blad");
    return;
  }
  if (temat === "") {
    pokazKomunikat("Wybierz temat wiadomości.", "blad");
    return;
  }
  pokazKomunikat(`Dziekuje, ${imie}. Wiadomosc na temat ${temat} zostala
    przyjeta.`, "sukces");

  console.log("dane z formularza:", {
    imie: imie,
    email: email,
    temat: temat,
    tresc: tresc
  });
})

przycisk.addEventListener("click", function () {
  const jestCiemny = document.body.classList.toggle("ciemny");

  if (jestCiemny) { przycisk.textContent = "Jasny motyw"; }
  else { przycisk.textContent = "Ciemny motyw" }
})

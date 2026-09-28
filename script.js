const listaEl = document.querySelector('#lista');
const podsumowanie = document.querySelector("#podsumowanie");

const budujListe = lista =>
  lista.map(({ nazwa, ocena, otwarta }) => `
    <li ${otwarta ? "class='wyrozniony'" : ""}>
      <span>${nazwa} ---</span>
      <span> ${ocena}</span>
    </li>`).join("");

const Filtruj = lista =>
  lista.filter(({ ocena }) => ocena >= 4);

const Podsumowanie = lista =>
  `srednia ocena: ${lista.reduce((s, {ocena}) => s+=ocena, 0)/lista.length}`

const res = Filtruj(restauracje);
listaEl.innerHTML = budujListe(res);
podsumowanie.textContent = Podsumowanie(res);

export const filtrujPoKategorii = (lista, kategoria) =>
  kategoria === "wszystkie" ? [...lista] : lista.filter(u => u.kategoria === kategoria);

export const sredniPoziom = (lista) => {
  if (lista.length == 0) {
    return 0;
  }
  const suma = lista.reduce((razem, { poziom }) => razem + poziom, 0);
  return Math.round((suma / lista.length) * 10) / 10;
}

export const podsumowanie = (lista) =>
  lista.length === 0
    ? "Brak umiejętności w tej kategorii."
    : `Umiejętności: ${lista.length} · średni poziom: ${sredniPoziom(lista)}`;

export const budujListe = lista =>
  lista.map(({ nazwa, poziom }) => `
    <li>
      <span class="nazwa">${nazwa}</span>
      <span class="poziom" title="Poziom ${poziom} z 5">
      ${"●".repeat(poziom)}${"○".repeat(5 - poziom)}</span>
    </li>
    `).join("");

/**
 * Zwraca umiejetnosci nalezace do wskazanej kategorii
 *
 * @param {Array<Object>} lista - lista umiejetnosci
 * @param {string} kategoria - nazwa kategorii lub wszystkie
 * @returns {Array<Object>} - przefiltrowana nowa tablica (moze byc pusta)
 */
export const filtrujPoKategorii = (lista, kategoria) =>
  kategoria === "wszystkie" ? [...lista] : lista.filter(u => u.kategoria === kategoria);

/**
 * zwraca sredni poziom wszystkich umiejetnosci w liscie
 *
 * @param {Array<Object>} lista - lista umiejetnosci
 * @returns {float} - srednia arytmetyczna
 */
export const sredniPoziom = (lista) => {
  if (lista.length == 0) {
    return 0;
  }
  const suma = lista.reduce((razem, { poziom }) => razem + poziom, 0);
  return Math.round((suma / lista.length) * 10) / 10;
}

/**
 * zwraca informacje o ilosci umiejetnosci w podanej liscie oraz srednia arytmetyczna ich poziomow
 *
 * @param {Array<Object>} lista - list umiejetnosci
 * @returns {string} - informacja
 */
export const podsumowanie = (lista) =>
  lista.length === 0
    ? "Brak umiejętności w tej kategorii."
    : `Umiejętności: ${lista.length} · średni poziom: ${sredniPoziom(lista)}`;

/**
 * funkcja zwraca string elementow listy ktore posiadaja informacje o podanych umiejetnosciach
 *
 * @param {Array<Object>} lista - lista umiejetnosci
 * @returns {string} - elementy listy
 */
export const budujListe = lista =>
  lista.map(({ nazwa, poziom }) => `
    <li>
      <span class="nazwa">${nazwa}</span>
      <span class="poziom" title="Poziom ${poziom} z 5">
      ${"●".repeat(poziom)}${"○".repeat(5 - poziom)}</span>
    </li>
    `).join("");

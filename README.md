# Lista zadań w konsoli

Program do zarządzania listą zadań z poziomu terminala. Dodaje zadania,
oznacza je jako wykonane i wyświetla listę. Dane zapisuje w pliku JSON,
więc przetrwają zamknięcie programu.

## Informacje o środowisku

- System operacyjny: CachyOS
- Środowisko programistyczne: Zed
- Języki i technologie: JavaScript, Node.js 20.11 lub nowszy

## Uruchomienie

Projekt nie ma zewnętrznych zależności — wystarczy Node.js.

1. Przejdź do katalogu projektu
2. Uruchom jedno z poleceń z tabeli **Skrypty**

## Struktura projektu

| Plik | Zawartość |
|---|---|
| `app.js` | obsługa komend z terminala |
| `magazyn.js` | odczyt i zapis pliku z danymi |
| `zadania.json` | dane — tworzy się sam przy pierwszym zapisie, nie trafia do repozytorium |

## Skrypty

| Polecenie | Działanie |
|---|---|
| `npm run lista` | wypisuje wszystkie zadania |
| `npm run dodaj -- "tekst"` | dodaje nowe zadanie |
| `npm run zrobione -- numer` | oznacza zadanie o podanym numerze jako wykonane |

Podwójny myślnik `--` przekazuje argument do programu. Bez niego npm połknąłby
argument zaczynający się od myślnika.

## Przykład

```
$ npm run dodaj -- "Kupić mleko"
Dodano zadanie nr 1: Kupić mleko

$ npm run dodaj -- "Oddać książkę"
Dodano zadanie nr 2: Oddać książkę

$ npm run zrobione -- 2
Zadanie nr 2 oznaczone jako zrobione: Oddać książkę

$ npm run lista
1. [ ] Kupić mleko
2. [x] Oddać książkę
```

## Autor

Konrad P, klasa 4p1t

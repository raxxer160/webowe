# Katalog gier planszowych

Serwer HTTP z katalogiem gier planszowych. Zwraca listę gier, pojedynczą grę,
wyniki wyszukiwania i statystyki. Loguje każde żądanie, serwuje stronę
startową z plików i odpowiada czytelnie na nieznane adresy oraz błędy.

## Informacje o środowisku

- System operacyjny: ArchLinux
- Środowisko programistyczne: Zed
- Języki i technologie: JavaScript, Node.js 20 lub nowszy, Express 5

## Uruchomienie

```
npm install
npm run dev
```

Serwer działa pod adresem http://localhost:3000

`npm install` jest konieczne po sklonowaniu repozytorium — katalog
`node_modules` nie jest przechowywany w repozytorium.

## Struktura projektu

| Plik | Zawartość |
|---|---|
| `serwer.js` | middleware, podłączenie tras, uruchomienie serwera |
| `dane.js` | katalog gier |
| `trasy/gry.js` | router z trasami `/gry` i `/gry/:id` |
| `public/index.html` | strona startowa |
| `public/styl.css` | arkusz stylów strony startowej |
| `zapytania.http` | zapytania do sprawdzania tras `POST` (rozszerzenie REST Client) |
| `package.json` | zależności i skrypty |
| `.gitignore` | wyklucza `node_modules` z repozytorium |

## Skrypty

| Polecenie | Działanie |
|---|---|
| `npm install` | instaluje zależności |
| `npm start` | uruchamia serwer |
| `npm run dev` | uruchamia serwer z automatycznym restartem po zmianie pliku |

## Trasy

| Metoda | Adres | Opis | Odpowiedź |
|---|---|---|---|
| GET | `/` | strona startowa z pliku `public/index.html` | HTML |
| GET | `/gry` | pełna lista gier | JSON |
| GET | `/gry/:id` | jedna gra; **404**, gdy nie ma takiego numeru | JSON |
| GET | `/szukaj?wydawca=&max=&gracze=` | filtrowanie katalogu | JSON |
| GET | `/statystyki` | liczba gier, średnia cena, najdroższa gra, godzina wygenerowania | JSON |
| POST | `/echo` | odsyła treść żądania (JSON lub formularz) | JSON |
| GET | `/blad` | celowo zgłasza błąd, służy do sprawdzania obsługi błędów | JSON, kod **500** |

## Middleware

| Middleware | Działanie |
|---|---|
| `logger` | loguje każde żądanie (godzina, metoda, adres), dodaje `req.czasZadania` |
| `express.json` | czyta treść żądania w formacie JSON do `req.body` |
| `express.urlencoded` | czyta treść żądania z formularza do `req.body` |
| `express.static` | wysyła pliki z katalogu `public` |

## Obsługa błędów

| Sytuacja | Kod | Odpowiedź |
|---|---|---|
| nie ma gry o podanym numerze | 404 | `{"blad":"Nie ma gry o takim numerze"}` |
| nieznany adres zaczynający się od `/gry`, `/szukaj` lub `/statystyki` | 404 | `{"blad":"Nie ma takiej trasy"}` |
| inny nieznany adres | 404 | strona HTML „404 — nie ma takiej strony" |
| błąd w kodzie trasy | 500 | `{"blad":"Błąd serwera"}`, szczegóły tylko w terminalu serwera |

## Model danych

Każda gra w `dane.js` to obiekt:

| Pole | Typ | Znaczenie |
|---|---|---|
| `id` | liczba | numer gry, kolejny od 1 |
| `nazwa` | napis | nazwa gry |
| `wydawca` | napis | nazwa wydawcy |
| `cena` | liczba | cena w złotych |
| `gracze` | liczba | maksymalna liczba graczy |

Dane są wpisane w kodzie i giną przy restarcie serwera.

## Autor

Konrad P, 4p1t

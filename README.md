# Katalog gier planszowych

Serwer HTTP udostępniający katalog gier planszowych. Zwraca pełną listę,
pojedynczą grę po numerze, wynik wyszukiwania z filtrami oraz statystyki
katalogu.

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
| `serwer.js` | trasy i uruchomienie serwera |
| `dane.js` | katalog gier |
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
| GET | `/` | strona powitalna z listą adresów | HTML |
| GET | `/gry` | pełna lista gier | JSON |
| GET | `/gry/:id` | jedna gra; **404**, gdy nie ma takiego numeru | JSON |
| GET | `/szukaj?wydawca=&max=&gracze=` | filtrowanie katalogu | JSON |
| GET | `/statystyki` | liczba gier, średnia cena, najdroższa gra | JSON |

### Parametry trasy `/szukaj`

| Parametr | Działanie |
|---|---|
| `wydawca` | tylko gry tego wydawcy, bez rozróżniania wielkości liter |
| `max` | tylko gry o cenie nie wyższej niż podana |
| `gracze` | tylko gry dla co najmniej tylu graczy |

Parametry można łączyć, a każdy z nich jest opcjonalny — samo `/szukaj`
zwraca cały katalog.

## Przykład

```
GET /gry/6
{"id":6,"nazwa":"Patchwork","wydawca":"Lacerta","cena":99,"gracze":2}

GET /gry/999
404
{"blad":"Nie ma gry o takim numerze"}

GET /szukaj?wydawca=rebel&max=150
Splendor, Jungle Speed

GET /statystyki
{"liczbaGier":7,"sredniaCena":148.43,"najdrozsza":"Terraformacja Marsa"}
```

## Model danych

Każda gra w `dane.js` to obiekt o polach:

| Pole | Typ | Znaczenie |
|---|---|---|
| `id` | liczba | numer gry, kolejny od 1 |
| `nazwa` | napis | nazwa gry |
| `wydawca` | napis | nazwa wydawcy |
| `cena` | liczba | cena w złotych |
| `gracze` | liczba | maksymalna liczba graczy |

Dane są wpisane w kodzie i giną przy restarcie serwera — trwałe
przechowywanie danych przyjdzie w kolejnych mini-blokach.

## Autor

Konrad P, 4p1t

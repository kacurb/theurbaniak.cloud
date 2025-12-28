# Tutorial #2: Automatyczny Deploy z GitHub Actions
## CI/CD dla Twojej strony - kompletny przewodnik

**Autor:** Senior Developer
**Poziom:** Junior -> Mid
**Czas nauki:** 1-2 godziny
**Wymagania wstepne:** Ukonczony Tutorial #1, konto GitHub

---

# Spis tresci

1. [Wprowadzenie - Co to jest CI/CD?](#1-wprowadzenie)
2. [Podstawowe pojecia](#2-podstawowe-pojecia)
3. [Przygotowanie projektu](#3-przygotowanie-projektu)
4. [Git - kontrola wersji](#4-git-kontrola-wersji)
5. [GitHub - repozytorium online](#5-github-repozytorium)
6. [GitHub Actions - automatyzacja](#6-github-actions)
7. [Konfiguracja SSH na serwerze](#7-konfiguracja-ssh)
8. [GitHub Secrets - bezpieczenstwo](#8-github-secrets)
9. [Testowanie workflow](#9-testowanie)
10. [Rozwiazywanie problemow](#10-rozwiazywanie-problemow)
11. [Checklist](#11-checklist)

---

# 1. Wprowadzenie

## Co bedziemy robic?

W tym tutorialu nauczysz sie jak **automatycznie** wdrazac zmiany na serwerze po kazdym pushu do GitHub.

### Przed (workflow reczny):
```
1. Edytujesz plik na komputerze
2. Zapisujesz
3. Otwierasz terminal
4. Laczysz sie z serwerem przez SSH
5. Pobierasz zmiany lub kopiujesz pliki
6. Sprawdzasz czy dziala
```

### Po (workflow automatyczny):
```
1. Edytujesz plik na komputerze
2. Git commit + push
3. KONIEC! Zmiany automatycznie na serwerze!
```

## Dlaczego to wazne?

1. **Oszczedzasz czas** - nie musisz robic tego recznie
2. **Mniej bledow** - maszyna nie zapomni kroku
3. **Historia zmian** - wszystko zapisane w Git
4. **Profesjonalizm** - tak pracuja prawdziwe firmy

---

# 2. Podstawowe pojecia

## Co to jest Git?

**Git** to system kontroli wersji. Zapisuje **historie wszystkich zmian** w Twoim projekcie.

### Analogia:
Git to jak **"Ctrl+Z na sterydach"**:
- Mozesz cofnac sie do dowolnej wersji z przeszlosci
- Widzisz kto, kiedy i co zmienil
- Mozesz pracowac na roznych "wersjach" rownoczesnie

### Kluczowe pojecia Git:

| Pojecie | Opis |
|---------|------|
| **Repository (repo)** | Projekt z cala historia zmian |
| **Commit** | "Zdjecie" stanu projektu w danym momencie |
| **Branch** | Oddzielna linia rozwoju (np. do testowania) |
| **Push** | Wyslanie commitow na serwer (GitHub) |
| **Pull** | Pobranie commitow z serwera |
| **Clone** | Skopiowanie repozytorium na komputer |

---

## Co to jest GitHub?

**GitHub** to platforma do przechowywania repozytoriow Git online.

### Analogia:
Jezeli Git to aparat fotograficzny, to GitHub to album zdjec w chmurze:
- Twoje "zdjecia" (commity) sa bezpieczne online
- Mozesz je udostepniac innym
- Masz dostep z kazdego komputera

### Git vs GitHub:

| Git | GitHub |
|-----|--------|
| Program na Twoim komputerze | Strona internetowa |
| Lokalnie zapisuje historie | Przechowuje historie w chmurze |
| Darmowy, open source | Darmowy dla publicznych projektow |
| Dziala offline | Wymaga internetu |

---

## Co to jest CI/CD?

### CI - Continuous Integration (Ciagla Integracja)
- Automatyczne testowanie kodu po kazdej zmianie
- Sprawdzanie czy nowy kod "nie zepsul" starego

### CD - Continuous Deployment (Ciagly Deployment)
- Automatyczne wdrazanie kodu na serwer
- Po kazdym pushu zmiany od razu sa na produkcji

### Nasz cel w tym tutorialu: **CD**
Po kazdym pushu do `main` -> strona automatycznie sie aktualizuje.

---

## Co to jest GitHub Actions?

**GitHub Actions** to wbudowany system CI/CD w GitHub.

### Jak dziala?

```
1. Robisz push do repozytorium
2. GitHub sprawdza czy masz plik workflow (.github/workflows/*.yml)
3. Jesli tak - uruchamia maszyne wirtualna
4. Wykonuje komendy z pliku workflow
5. Wynik: sukces lub porazka
```

### Kluczowe pojecia:

| Pojecie | Opis |
|---------|------|
| **Workflow** | Caly proces automatyzacji (plik .yml) |
| **Job** | Grupa krokow wykonywanych razem |
| **Step** | Pojedyncza akcja (komenda lub gotowa akcja) |
| **Runner** | Maszyna wirtualna wykonujaca workflow |
| **Action** | Gotowy "klocek" do wielokrotnego uzycia |

---

# 3. Przygotowanie projektu

## Struktura plikow projektu:

```
theurbaniak.cloud/
├── index.html                    # Strona glowna
├── polityka-prywatnosci.html    # Polityka prywatnosci
├── .gitignore                    # Pliki ignorowane przez Git
├── .github/
│   └── workflows/
│       └── deploy.yml            # Konfiguracja GitHub Actions
└── docs/
    ├── tutorial-01-wdrozenie-vps-nginx.md
    └── tutorial-02-github-cicd.md
```

## Plik .gitignore

### Co to jest?
Lista plikow i katalogow, ktore Git ma **ignorowac** (nie sledzic).

### Dlaczego to wazne?
- Nie wrzucasz na GitHub plikow z haslami (.env)
- Nie wrzucasz plikow tymczasowych systemu
- Nie zasmiecasz repozytorium

### Zawartosc .gitignore:

```gitignore
# OS files - pliki systemowe
.DS_Store        # Mac tworzy w kazdym katalogu
Thumbs.db        # Windows tworzy dla miniaturek

# IDE - pliki edytora kodu
.vscode/         # Ustawienia Visual Studio Code
.idea/           # Ustawienia JetBrains (WebStorm, PHPStorm)

# Logs - logi
*.log            # Wszystkie pliki .log

# Local environment - zmienne srodowiskowe
.env             # NIGDY nie commituj plikow z haslami!
.env.local       # Lokalne ustawienia
```

### Wyjasnienie skladni:

| Wzorzec | Znaczenie |
|---------|-----------|
| `plik.txt` | Ignoruj plik o tej nazwie |
| `katalog/` | Ignoruj caly katalog |
| `*.log` | Ignoruj wszystkie pliki z rozszerzeniem .log |
| `!wazny.log` | ALE nie ignoruj tego pliku |
| `**/temp` | Ignoruj "temp" w kazdym podkatalogu |

---

# 4. Git - kontrola wersji

## Instalacja Git

### Windows:
1. Pobierz: https://git-scm.com/download/windows
2. Zainstaluj (domyslne ustawienia OK)
3. Sprawdz: `git --version` w PowerShell

### Konfiguracja (jednorazowo):

```bash
git config --global user.name "Twoje Imie"
git config --global user.email "twoj@email.com"
```

**Wazne:** Email musi byc taki sam jak na GitHub!

---

## Inicjalizacja repozytorium

### Komenda:

```bash
git init
```

### Co robi:
- Tworzy ukryty katalog `.git/` w projekcie
- W tym katalogu Git przechowuje cala historie

### Rozklad:

```
git init
│   └── "initialize" - zainicjalizuj
└── program Git
```

### Po wykonaniu:
```
Initialized empty Git repository in C:\projekt\.git\
```

---

## Dodawanie plikow do sledzenia

### Komenda:

```bash
git add .
```

### Rozklad:

```
git add .
│   │   └── "." = wszystkie pliki w katalogu
│   └── dodaj do "staging area"
└── Git
```

### Co to jest Staging Area?

To "poczekalnia" przed commitem. Wybierasz ktore zmiany maja byc w nastepnym ukladziku.

```
Pliki zmienione    Staging Area       Historia (commits)
     │                  │                    │
     │   git add ->     │   git commit ->    │
     │                  │                    │
[index.html]  ->  [index.html]  ->  [Commit: "Update"]
[style.css]
```

### Warianty:

```bash
git add .                  # Wszystkie pliki
git add index.html         # Tylko jeden plik
git add *.html             # Wszystkie pliki .html
git add src/               # Caly katalog src/
```

---

## Tworzenie commita

### Komenda:

```bash
git commit -m "Initial commit - strona theurbaniak.cloud"
```

### Rozklad:

```
git commit -m "Initial commit - strona theurbaniak.cloud"
│   │      │  └── tresc wiadomosci opisujacej zmiany
│   │      └── "message" - podaj wiadomosc
│   └── utworz commit (zapisz zmiany)
└── Git
```

### Dobre praktyki dla commit messages:

| Dobrze | Zle |
|--------|-----|
| "Add contact form validation" | "update" |
| "Fix navigation on mobile" | "changes" |
| "Update footer links" | "asdf" |

**Zasada:** Commit message odpowiada na pytanie "Co robi ta zmiana?"

### Po wykonaniu:

```
[main (root-commit) a1b2c3d] Initial commit - strona theurbaniak.cloud
 3 files changed, 250 insertions(+)
 create mode 100644 index.html
 create mode 100644 polityka-prywatnosci.html
 create mode 100644 .gitignore
```

---

## Sprawdzanie statusu

### Komenda:

```bash
git status
```

### Co pokazuje:

```
On branch main                           <- Na jakim branchu jestes
Your branch is ahead of 'origin/main'    <- Czy masz niepushniete zmiany

Changes not staged for commit:           <- Zmienione, ale nie dodane
  modified:   index.html

Untracked files:                         <- Nowe pliki, niesledzone
  nowy-plik.html
```

### Stany plikow w Git:

```
Untracked -> Staged -> Committed -> Pushed
    │          │           │          │
    │ git add  │ git commit│ git push │
    └──────────┴───────────┴──────────┘
```

---

# 5. GitHub - repozytorium

## Tworzenie konta GitHub

1. Wejdz na https://github.com
2. Kliknij "Sign up"
3. Podaj email, haslo, username
4. Zweryfikuj email

---

## Tworzenie repozytorium na GitHub

### Krok po kroku:

1. Zaloguj sie na GitHub
2. Kliknij "+" w prawym gornym rogu
3. Wybierz "New repository"
4. Wypelnij:
   - **Repository name:** `theurbaniak.cloud`
   - **Description:** "Moja strona internetowa" (opcjonalne)
   - **Public/Private:** Wybierz (Private = tylko Ty widzisz)
   - **NIE** zaznaczaj "Add a README file"
   - **NIE** zaznaczaj "Add .gitignore"

5. Kliknij "Create repository"

### Po utworzeniu GitHub pokaze instrukcje:

```bash
# ...or push an existing repository from the command line
git remote add origin https://github.com/TWOJ-USERNAME/theurbaniak.cloud.git
git branch -M main
git push -u origin main
```

---

## Laczenie lokalnego repo z GitHub

### Komenda 1: Dodaj "remote"

```bash
git remote add origin https://github.com/TWOJ-USERNAME/theurbaniak.cloud.git
```

### Rozklad:

```
git remote add origin https://github.com/.../theurbaniak.cloud.git
│   │      │   │      └── URL repozytorium na GitHub
│   │      │   └── nazwa (origin = standardowa nazwa dla glownego remote)
│   │      └── dodaj nowy remote
│   └── zarzadzanie zdalnymi repozytoriami
└── Git
```

### Co to jest "remote"?
Adres zdalnego repozytorium. Mozesz miec wiele remote'ow (np. origin, backup, production).

---

### Komenda 2: Zmien nazwe brancha

```bash
git branch -M main
```

### Rozklad:

```
git branch -M main
│   │      │  └── nowa nazwa brancha
│   │      └── "move/rename" - przemianuj
│   └── zarzadzanie branchami
└── Git
```

### Dlaczego to robimy?
Git domyslnie tworzyl branch "master", ale standard sie zmienil na "main".

---

### Komenda 3: Wyslij na GitHub

```bash
git push -u origin main
```

### Rozklad:

```
git push -u origin main
│   │    │  │      └── nazwa brancha do wyslania
│   │    │  └── nazwa remote'a
│   │    └── "upstream" - ustaw domyslny remote dla brancha
│   └── wyslij commity
└── Git
```

### Co robi `-u`?
Ustawia "origin main" jako domyslny cel dla tego brancha. Potem wystarczy `git push` bez dodatkowych argumentow.

### Po wykonaniu:

```
Enumerating objects: 10, done.
Counting objects: 100% (10/10), done.
Delta compression using up to 8 threads
Compressing objects: 100% (8/8), done.
Writing objects: 100% (10/10), 15.00 KiB | 5.00 MiB/s, done.
Total 10 (delta 0), reused 0 (delta 0)
To https://github.com/username/theurbaniak.cloud.git
 * [new branch]      main -> main
Branch 'main' set up to track remote branch 'main' from 'origin'.
```

---

# 6. GitHub Actions

## Lokalizacja pliku workflow

```
.github/
└── workflows/
    └── deploy.yml
```

**Wazne:** Sciezka musi byc dokladnie taka! GitHub szuka plikow tylko w `.github/workflows/`.

---

## Pelny plik deploy.yml z wyjasnieniem

```yaml
# =============================================================================
# GitHub Actions Workflow - Automatyczny Deploy na VPS
# =============================================================================
# Ten plik definiuje co ma sie dziac po pushu do repozytorium.
# Kazdy push do brancha 'main' uruchomi automatyczny deploy na serwer.
# =============================================================================

name: Deploy to VPS
```

### `name: Deploy to VPS`
- Nazwa workflow, widoczna w zakladce Actions na GitHub
- Czysto informacyjna, mozesz nazwac jak chcesz

---

```yaml
# KIEDY uruchomic workflow?
on:
  push:
    branches:
      - main  # Tylko przy pushu do brancha 'main'

  # Pozwala tez uruchomic recznie z zakladki Actions na GitHub
  workflow_dispatch:
```

### `on:` - Triggery (wyzwalacze)

| Trigger | Kiedy uruchamia |
|---------|-----------------|
| `push` | Gdy ktos pushuje kod |
| `pull_request` | Gdy ktos otwiera PR |
| `schedule` | O okreslonej godzinie (cron) |
| `workflow_dispatch` | Reczne uruchomienie z GitHub |

### `branches: [main]`
Ogranicza trigger tylko do brancha "main". Push do innego brancha nie uruchomi workflow.

### `workflow_dispatch`
Dodaje przycisk "Run workflow" w zakladce Actions. Przydatne do testowania.

---

```yaml
# CO ma sie wykonac?
jobs:
  deploy:
    name: Deploy to Production Server
    runs-on: ubuntu-latest  # Maszyna wirtualna GitHub do wykonania zadan
```

### `jobs:` - Zadania
Workflow moze miec wiele jobow. Domyslnie uruchamiaja sie **rownolegle**.

### `deploy:` - Nazwa joba
Identyfikator (dowolny tekst bez spacji). Uzywany do referencji miedzy jobami.

### `name: Deploy to Production Server`
Czytelna nazwa widoczna w UI GitHub.

### `runs-on: ubuntu-latest`
Na jakim systemie uruchomic job. Opcje:
- `ubuntu-latest` - Ubuntu Linux (najczesciej uzywany)
- `windows-latest` - Windows Server
- `macos-latest` - macOS

---

```yaml
    steps:
      # Krok 1: Pobierz kod z repozytorium
      - name: Checkout code
        uses: actions/checkout@v4
        # To pobiera Twoj kod na maszyne GitHub Actions
```

### `steps:` - Kroki
Lista akcji do wykonania. Wykonuja sie **sekwencyjnie** (po kolei).

### `uses: actions/checkout@v4`
Uzywa gotowej "Action" z GitHub Marketplace.

**Co to jest Action?**
Gotowy "klocek" - ktos napisal kod, Ty go uzywasz. Nie musisz pisac wszystkiego od zera.

**`actions/checkout@v4`:**
- `actions` - organizacja na GitHub (oficjalne akcje)
- `checkout` - nazwa akcji (pobiera kod z repo)
- `@v4` - wersja akcji

### Dlaczego potrzebujemy checkout?
Runner GitHub Actions zaczyna jako pusta maszyna. Musimy pobrac nasz kod zeby moc go uzyc.

---

```yaml
      # Krok 2: Wdrozenie na serwer przez SSH
      - name: Deploy to VPS via SSH
        uses: appleboy/ssh-action@v1.0.3
        with:
          # Dane serwera (pobierane z GitHub Secrets - bezpieczne!)
          host: ${{ secrets.VPS_HOST }}
          username: ${{ secrets.VPS_USERNAME }}
          key: ${{ secrets.VPS_SSH_KEY }}
          port: 22
```

### `uses: appleboy/ssh-action@v1.0.3`
Akcja do wykonywania komend przez SSH na zdalnym serwerze.

### `with:` - Parametry akcji
Kazda akcja ma swoje parametry. Sprawdzasz dokumentacje akcji na GitHub.

### `${{ secrets.VPS_HOST }}`
Skladnia do pobierania **sekretow** (tajnych zmiennych).

**Dlaczego secrets?**
- Nigdy nie wrzucaj hasel do kodu!
- Sekrety sa zaszyfrowane
- Widoczne tylko dla workflowow

### Parametry tej akcji:

| Parametr | Opis | Wartosc |
|----------|------|---------|
| `host` | Adres serwera | 72.62.146.103 |
| `username` | Uzytkownik SSH | root |
| `key` | Klucz prywatny SSH | (dlugi tekst) |
| `port` | Port SSH | 22 |

---

```yaml
          # Komendy do wykonania na serwerze
          script: |
            # Przejdz do katalogu strony
            cd /var/www/theurbaniak.cloud

            # Pobierz najnowsze zmiany z GitHub
            git fetch origin main
            git reset --hard origin/main

            # Opcjonalnie: ustaw wlasciciela plikow
            chown -R www-data:www-data /var/www/theurbaniak.cloud

            # Opcjonalnie: przeladuj Nginx (jesli zmieniles konfiguracje)
            # systemctl reload nginx

            echo "Deploy completed successfully!"
```

### `script: |`
Znak `|` w YAML oznacza **wieloliniowy tekst**. Wszystko ponizej (z wciecia) to jeden string.

### Komendy:

#### `cd /var/www/theurbaniak.cloud`
Przejdz do katalogu strony na serwerze.

#### `git fetch origin main`
```
git fetch origin main
│   │     │      └── branch
│   │     └── remote (skad pobrac)
│   └── pobierz dane z remote'a (ale nie aplikuj!)
└── Git
```

**Fetch vs Pull:**
- `fetch` - tylko pobiera informacje o zmianach
- `pull` - pobiera I aplikuje zmiany

#### `git reset --hard origin/main`
```
git reset --hard origin/main
│   │     │      └── do jakiego stanu zresetowac
│   │     └── "twardy reset" - usun lokalne zmiany
│   └── zresetuj stan repozytorium
└── Git
```

**Dlaczego reset --hard zamiast pull?**
- Gwarantuje ze serwer ma DOKLADNIE to co jest na GitHub
- Ignoruje jakiekolwiek lokalne zmiany na serwerze
- Bardziej przewidywalny

**UWAGA:** `reset --hard` usuwa wszystkie lokalne zmiany! Na serwerze produkcyjnym to dobrze (chcemy czysta kopie z GitHub).

#### `chown -R www-data:www-data /var/www/theurbaniak.cloud`
Ustaw wlasciciela plikow na `www-data` (uzytkownik Nginx). Dzieki temu Nginx moze czytac pliki.

---

# 7. Konfiguracja SSH

## Dlaczego klucze SSH?

Klucze SSH sa **bezpieczniejsze** niz hasla:
- Haslo mozna zgadnac
- Klucz to 4096 losowych bitow - nie da sie zgadnac
- Klucz mozna odwolac nie zmieniajac hasla

## Jak dzialaja klucze SSH?

```
Twoj komputer                              Serwer
     │                                        │
     │  [Klucz prywatny]                     │  [Klucz publiczny]
     │  (tajny!)                             │  (moze byc publiczny)
     │                                        │
     │  ──[Prove you have private key]──>    │
     │                                        │
     │  <──[Challenge encrypted with pub]──  │
     │                                        │
     │  ──[Decrypted with private key]──>    │
     │                                        │
     │  <──────[Access granted!]──────────   │
```

## Generowanie klucza SSH

### Na serwerze VPS:

```bash
ssh-keygen -t ed25519 -C "github-actions-deploy"
```

### Rozklad:

```
ssh-keygen -t ed25519 -C "github-actions-deploy"
│          │  │        │  └── komentarz (do identyfikacji)
│          │  │        └── "Comment"
│          │  └── typ algorytmu (ed25519 = nowoczesny, bezpieczny)
│          └── "type"
└── program do generowania kluczy
```

### Proces:

```
Generating public/private ed25519 key pair.
Enter file in which to save the key (/root/.ssh/id_ed25519): [Enter]
Enter passphrase (empty for no passphrase): [Enter - bez hasla dla automatyzacji]
Enter same passphrase again: [Enter]
Your identification has been saved in /root/.ssh/id_ed25519
Your public key has been saved in /root/.ssh/id_ed25519.pub
```

**Uwaga:** Dla GitHub Actions NIE ustawiaj passphrase (hasla na kluczu) - maszyna nie moze wpisac hasla.

### Wynik:
- `/root/.ssh/id_ed25519` - **KLUCZ PRYWATNY** (tajny!)
- `/root/.ssh/id_ed25519.pub` - klucz publiczny (mozna udostepniac)

---

## Dodanie klucza do authorized_keys

### Komenda:

```bash
cat ~/.ssh/id_ed25519.pub >> ~/.ssh/authorized_keys
```

### Rozklad:

```
cat ~/.ssh/id_ed25519.pub >> ~/.ssh/authorized_keys
│   │                     │  └── plik z dozwolonymi kluczami
│   │                     └── "append" - dopisz na koniec (nie nadpisuj!)
│   └── sciezka do klucza publicznego
└── wyswietl zawartosc pliku
```

### Co to jest authorized_keys?
Lista kluczy publicznych, ktore maja prawo logowac sie na serwer. Kazdy klucz w osobnej linii.

---

## Pobranie klucza prywatnego

### Komenda:

```bash
cat ~/.ssh/id_ed25519
```

### Wynik (przykladowy):

```
-----BEGIN OPENSSH PRIVATE KEY-----
b3BlbnNzaC1rZXktdjEAAAAABG5vbmUAAAAEbm9uZQAAAAAAAAABAAAAMwAAAAtzc2gtZW
... (wiele linii)
QyIxQxMAAAAWZ2l0aHViLWFjdGlvbnMtZGVwbG95AQIDBAUGBw==
-----END OPENSSH PRIVATE KEY-----
```

**SKOPIUJ CALY TEKST** - lacznie z liniami BEGIN i END!

---

## Konfiguracja Git na serwerze

### Po co?
Serwer musi moc pobierac z GitHub. Potrzebujemy skonfigurowac dostep.

### Opcja 1: HTTPS z tokenem (prostsza)

```bash
cd /var/www/theurbaniak.cloud
git remote set-url origin https://github.com/USERNAME/theurbaniak.cloud.git
```

### Opcja 2: SSH z deploy key (bezpieczniejsza)

1. Na serwerze wygeneruj kolejny klucz:
```bash
ssh-keygen -t ed25519 -C "vps-deploy-key"
```

2. Wyswietl klucz publiczny:
```bash
cat ~/.ssh/id_ed25519.pub
```

3. Na GitHub: Settings > Deploy keys > Add deploy key
4. Wklej klucz publiczny, zaznacz "Allow write access"

5. Na serwerze zmien remote na SSH:
```bash
git remote set-url origin git@github.com:USERNAME/theurbaniak.cloud.git
```

---

# 8. GitHub Secrets

## Gdzie dodac sekrety?

1. Wejdz na GitHub do swojego repozytorium
2. Settings (zakladka)
3. Secrets and variables > Actions
4. "New repository secret"

---

## Wymagane sekrety:

### VPS_HOST
- **Nazwa:** `VPS_HOST`
- **Wartosc:** `72.62.146.103` (IP Twojego serwera)

### VPS_USERNAME
- **Nazwa:** `VPS_USERNAME`
- **Wartosc:** `root` (lub inny uzytkownik)

### VPS_SSH_KEY
- **Nazwa:** `VPS_SSH_KEY`
- **Wartosc:** Caly klucz prywatny (od `-----BEGIN` do `-----END`)

---

## Wazne informacje o sekretach:

1. **Nie da sie ich odczytac** po zapisaniu (tylko nadpisac)
2. **Sa maskowane** w logach (pokazuja `***`)
3. **Dostepne tylko w workflowach** tego repozytorium
4. **Wielkosc liter ma znaczenie** (`VPS_HOST` != `vps_host`)

---

# 9. Testowanie

## Pierwszy test - push

### Na komputerze:

```bash
# Zrob jakas zmiane
echo "<!-- test -->" >> index.html

# Commit i push
git add .
git commit -m "Test CI/CD deployment"
git push
```

---

## Sprawdzenie w GitHub

1. Wejdz na GitHub do repozytorium
2. Kliknij zakladke "Actions"
3. Powinienes zobaczyc workflow "Deploy to VPS"
4. Kliknij w niego zeby zobaczyc szczegoly

### Statusy:

| Ikona | Status |
|-------|--------|
| Zolta kolko | W trakcie |
| Zielony check | Sukces! |
| Czerwony X | Blad |

---

## Logi workflow

Kliknij w job "Deploy to Production Server" zeby zobaczyc logi kazdego kroku:

```
✓ Set up job (2s)
✓ Checkout code (3s)
✓ Deploy to VPS via SSH (5s)
  Run appleboy/ssh-action@v1.0.3
  ======CMD======
  cd /var/www/theurbaniak.cloud
  git fetch origin main
  git reset --hard origin/main
  chown -R www-data:www-data /var/www/theurbaniak.cloud
  echo "Deploy completed successfully!"
  ======END======
  Deploy completed successfully!
✓ Complete job (0s)
```

---

## Weryfikacja na serwerze

### SSH na serwer:

```bash
ssh root@72.62.146.103
```

### Sprawdz czy zmiany sa:

```bash
cat /var/www/theurbaniak.cloud/index.html | grep "test"
```

Powinienes zobaczyc `<!-- test -->`.

### Sprawdz logi Git:

```bash
cd /var/www/theurbaniak.cloud
git log -1
```

Powinienes zobaczyc Twoj ostatni commit.

---

# 10. Rozwiazywanie problemow

## Problem: "Permission denied (publickey)"

### Przyczyna:
Klucz SSH nie jest poprawnie skonfigurowany.

### Rozwiazanie:

1. Sprawdz czy klucz prywatny w GitHub Secrets zawiera pelny tekst (lacznie z `-----BEGIN` i `-----END`)

2. Sprawdz czy klucz publiczny jest w authorized_keys na serwerze:
```bash
cat ~/.ssh/authorized_keys
```

3. Sprawdz uprawnienia:
```bash
chmod 700 ~/.ssh
chmod 600 ~/.ssh/authorized_keys
```

---

## Problem: "Repository not found"

### Przyczyna:
Git na serwerze nie ma dostepu do repozytorium GitHub.

### Rozwiazanie:

1. Sprawdz URL remote:
```bash
cd /var/www/theurbaniak.cloud
git remote -v
```

2. Ustaw poprawny URL:
```bash
git remote set-url origin https://github.com/USERNAME/REPO.git
```

3. Dla prywatnego repo - uzyj deploy key lub tokenu.

---

## Problem: Workflow nie uruchamia sie

### Przyczyny:
- Push do zlego brancha
- Blad skladni w pliku YAML
- Brak pliku w `.github/workflows/`

### Rozwiazanie:

1. Sprawdz czy pushowales do `main`:
```bash
git branch
```

2. Sprawdz skladnie YAML:
   - Online: https://yamlchecker.com
   - Uwazaj na wciecia (spacje, nie taby!)

3. Sprawdz sciezke pliku:
```bash
ls -la .github/workflows/
```

---

## Problem: "Host key verification failed"

### Przyczyna:
Serwer VPS nie zna hosta GitHub (pierwszy raz sie laczy).

### Rozwiazanie na serwerze:

```bash
ssh-keyscan github.com >> ~/.ssh/known_hosts
```

---

## Problem: Zmiany nie widac na stronie

### Przyczyny:
- Cache przegladarki
- Deploy sie nie wykonal
- Nginx nie przeladowal

### Rozwiazanie:

1. Wyczysc cache (Ctrl+Shift+R)

2. Sprawdz logi workflow na GitHub Actions

3. Na serwerze sprawdz czy pliki sa aktualne:
```bash
ls -la /var/www/theurbaniak.cloud/
```

4. Sprawdz logi Nginx:
```bash
tail -20 /var/log/nginx/error.log
```

---

# 11. Checklist

## Przed rozpoczeciem:

- [ ] Mam konto GitHub
- [ ] Mam zainstalowany Git
- [ ] Mam dostep SSH do serwera
- [ ] Mam zainstalowany Git na serwerze

## Konfiguracja lokalna:

- [ ] `git init` - zainicjalizowano repo
- [ ] `.gitignore` utworzony
- [ ] `.github/workflows/deploy.yml` utworzony
- [ ] `git add .` - pliki dodane
- [ ] `git commit` - commit utworzony

## GitHub:

- [ ] Repozytorium utworzone na GitHub
- [ ] `git remote add origin` - polaczono z GitHub
- [ ] `git push` - kod wyslany

## Serwer VPS:

- [ ] Git zainstalowany (`apt install git`)
- [ ] Klucz SSH wygenerowany
- [ ] Klucz publiczny dodany do authorized_keys
- [ ] Repozytorium sklonowane do `/var/www/`
- [ ] Uprawnienia ustawione (`chown www-data:www-data`)

## GitHub Secrets:

- [ ] VPS_HOST dodany
- [ ] VPS_USERNAME dodany
- [ ] VPS_SSH_KEY dodany (pelny klucz prywatny)

## Test:

- [ ] Push do main
- [ ] Workflow wykonany pomyslnie (zielony check)
- [ ] Zmiany widoczne na stronie

---

# Podsumowanie

## Co osiagnales?

1. **Git** - kontrola wersji Twojego projektu
2. **GitHub** - backup kodu w chmurze
3. **GitHub Actions** - automatyczny deploy
4. **CI/CD** - profesjonalny workflow

## Jak teraz wyglada Twoj workflow?

```
1. Edytuj pliki lokalnie
2. git add .
3. git commit -m "Opis zmian"
4. git push
5. Zmiany automatycznie na serwerze!
```

## Nastepne kroki:

1. Dodaj automatyczne testy
2. Skonfiguruj powiadomienia (email, Slack)
3. Dodaj wiele srodowisk (staging, production)
4. Poznaj Docker

---

# Slowniczek

| Termin | Definicja |
|--------|-----------|
| **CI** | Continuous Integration - automatyczne testowanie |
| **CD** | Continuous Deployment - automatyczne wdrazanie |
| **Git** | System kontroli wersji |
| **GitHub** | Platforma hostingowa dla repozytoriow Git |
| **GitHub Actions** | System CI/CD wbudowany w GitHub |
| **Workflow** | Definicja procesu automatyzacji |
| **Job** | Grupa krokow w workflow |
| **Step** | Pojedyncza akcja w job |
| **Runner** | Maszyna wykonujaca workflow |
| **Secret** | Zaszyfrowana zmienna srodowiskowa |
| **SSH** | Secure Shell - bezpieczne polaczenie zdalne |
| **Klucz prywatny** | Tajny klucz do autoryzacji |
| **Klucz publiczny** | Klucz do weryfikacji (mozna udostepniac) |
| **Remote** | Zdalne repozytorium (np. na GitHub) |
| **Commit** | Zapisany stan projektu |
| **Push** | Wyslanie commitow na remote |
| **Pull** | Pobranie commitow z remote |

---

*Koniec tutorialu #2*

# Tutorial #1: Wdrozenie strony na VPS z Nginx i SSL
## Kompletny przewodnik dla poczatkujacych

**Autor:** Senior Developer
**Poziom:** Junior → Mid
**Czas nauki:** 2-3 godziny
**Wymagania wstepne:** Podstawowa znajomosc HTML, dostep do VPS

---

# Spis tresci

1. [Wprowadzenie - Co bedziemy robic?](#1-wprowadzenie)
2. [Podstawowe pojecia](#2-podstawowe-pojecia)
3. [Polaczenie z serwerem (SSH)](#3-polaczenie-ssh)
4. [Aktualizacja systemu](#4-aktualizacja-systemu)
5. [Instalacja Nginx](#5-instalacja-nginx)
6. [Struktura katalogow](#6-struktura-katalogow)
7. [Przesylanie plikow](#7-przesylanie-plikow)
8. [Konfiguracja Nginx - szczegolowo](#8-konfiguracja-nginx)
9. [Firewall (UFW)](#9-firewall-ufw)
10. [Certyfikat SSL (HTTPS)](#10-certyfikat-ssl)
11. [Przydatne komendy](#11-przydatne-komendy)
12. [Rozwiazywanie problemow](#12-rozwiazywanie-problemow)
13. [Checklist](#13-checklist)

---

# 1. Wprowadzenie

## Co bedziemy robic?

W tym tutorialu nauczysz sie jak od zera wdrozyc strone internetowa na wlasnym serwerze VPS. Po ukonczeniu bedziesz potrafil:

- Polaczyc sie z serwerem przez SSH
- Zainstalowac i skonfigurowac serwer WWW Nginx
- Przeslac pliki strony na serwer
- Skonfigurowac domene
- Zainstalowac certyfikat SSL (HTTPS)
- Zabezpieczyc serwer firewallem

## Dlaczego VPS zamiast hostingu wspoldzielonego?

| Hosting wspoldzielony | VPS |
|----------------------|-----|
| Ograniczone mozliwosci | Pelna kontrola |
| Wspoldzielone zasoby | Dedykowane zasoby |
| Panel administracyjny | Linia komend (wiecej mozliwosci) |
| Ograniczone technologie | Dowolne technologie |
| Dla prostych stron | Dla aplikacji, API, baz danych |

---

# 2. Podstawowe pojecia

## Co to jest VPS?

**VPS (Virtual Private Server)** to wirtualny serwer, ktory dziala jak dedykowany komputer w chmurze.

Wyobraz sobie, ze wynajmujesz pokoj w hotelu:
- **Hosting wspoldzielony** = pokoj wieloosobowy (dzielisz z innymi)
- **VPS** = wlasny pokoj (masz klucz, robisz co chcesz)
- **Serwer dedykowany** = caly hotel dla siebie

### Twoj VPS (przyklad z tutorialu):
```
IP: 72.62.146.103
Hostname: srv1212776.hstgr.cloud
System: Ubuntu 25.10
Provider: Hostinger
```

## Co to jest Nginx?

**Nginx** (wymawiane "engine-x") to **serwer WWW** - program ktory:

1. **Nasluchuje** na portach 80 (HTTP) i 443 (HTTPS)
2. **Odbiera** zadania od przegladarek uzytkownikow
3. **Zwraca** im pliki HTML, CSS, JS, obrazki

### Analogia:
Nginx to jak **recepcjonista w hotelu**:
- Goscie (przegladarki) przychodzą i pytaja o pokoj (strone)
- Recepcjonista (Nginx) sprawdza czy pokoj istnieje
- Jesli tak - daje klucz (zwraca strone)
- Jesli nie - mowi "nie ma takiego pokoju" (blad 404)

### Alternatywy dla Nginx:
- **Apache** - starszy, bardziej konfigurowalny, wolniejszy
- **Caddy** - prostszy, automatyczny SSL
- **LiteSpeed** - szybki, platny

### Dlaczego Nginx?
- Bardzo wydajny (obsluguje tysiace polaczen jednoczesnie)
- Niskie zuzycie pamieci
- Prosta konfiguracja
- Popularny = duzo dokumentacji i pomocy online

---

# 3. Polaczenie SSH

## Co to jest SSH?

**SSH (Secure Shell)** to protokol do bezpiecznego, szyfrowanego polaczenia z serwerem. Pozwala Ci "wejsc" do serwera i wydawac mu komendy.

### Analogia:
SSH to jak **telefon do recepcji hotelu** - mozesz zadzwonic i powiedziec co maja zrobic, ale polaczenie jest zaszyfrowane, wiec nikt nie podsluchuje.

## Komenda:

```bash
ssh root@72.62.146.103
```

## Rozklad komendy:

```
ssh root@72.62.146.103
│   │    └── adres IP serwera (lub hostname)
│   └── nazwa uzytkownika (root = administrator)
└── program SSH
```

### Wyjasnienie:
- `ssh` - program do polaczen SSH
- `root` - uzytkownik z pelnym dostepem (administrator)
- `@` - separator (jak w emailu)
- `72.62.146.103` - adres IP serwera

## Co sie dzieje po wpisaniu komendy?

```
1. Twoj komputer ──[szyfrowane polaczenie]──> Serwer
2. Serwer: "Podaj haslo"
3. Ty: [wpisujesz haslo - nie wyswietla sie, to normalne!]
4. Serwer: "OK, jestes zalogowany"
5. Widzisz: root@srv1212776:~#
```

## Pierwsze polaczenie:

Przy pierwszym polaczeniu zobaczysz:
```
The authenticity of host '72.62.146.103' can't be established.
ED25519 key fingerprint is SHA256:xxx...
Are you sure you want to continue connecting (yes/no)?
```

**Co to znaczy?**
SSH pyta czy ufasz temu serwerowi. Wpisz `yes` - to jednorazowe pytanie.

## Wazne informacje:

| Sytuacja | Rozwiazanie |
|----------|-------------|
| Haslo sie nie wyswietla | To normalne! Wpisuj i nacisnij Enter |
| "Connection refused" | Serwer nie dziala lub port 22 zablokowany |
| "Permission denied" | Ble haslo |
| Chce wyjsc | Wpisz `exit` lub nacisnij Ctrl+D |

---

# 4. Aktualizacja systemu

## Komenda:

```bash
apt update && apt upgrade -y
```

## Rozklad komendy:

```
apt update && apt upgrade -y
│   │       │  │   │       └── automatyczna zgoda na instalacje
│   │       │  │   └── aktualizuj wszystkie pakiety
│   │       │  └── program APT
│   │       └── operator "AND" - wykonaj druga komende TYLKO jesli pierwsza sie powiodla
│   └── pobierz liste dostepnych pakietow
└── Advanced Package Tool (menedzer pakietow)
```

## Co robi kazda czesc?

### `apt update`
- **NIE** instaluje niczego
- Pobiera **liste** dostepnych pakietow z repozytoriow (serwery z oprogramowaniem)
- Sprawdza jakie wersje sa dostepne

### `&&`
- Operator logiczny "AND"
- Znaczy: "Wykonaj nastepna komende TYLKO jesli poprzednia sie powiodla"
- Dzieki temu nie probujemy aktualizowac jesli nie udalo sie pobrac listy

### `apt upgrade -y`
- Aktualizuje **wszystkie** zainstalowane pakiety do najnowszych wersji
- `-y` = automatycznie odpowiada "yes" na pytania

## Dlaczego to wazne?

1. **Bezpieczenstwo** - latki bezpieczenstwa
2. **Stabilnosc** - poprawki bledow
3. **Kompatybilnosc** - nowe funkcje

**ZASADA:** Zawsze aktualizuj serwer przed instalacja nowego oprogramowania!

## Co zobaczysz?

```
Get:1 http://archive.ubuntu.com/ubuntu questing/main amd64 Packages [1234 kB]
Get:2 http://archive.ubuntu.com/ubuntu questing/universe amd64 Packages [5678 kB]
...
Reading package lists... Done
Building dependency tree... Done
The following packages will be upgraded:
  nginx openssl ...
Do you want to continue? [Y/n] (automatycznie Y przez -y)
```

---

# 5. Instalacja Nginx

## Komenda:

```bash
apt install nginx -y
```

## Rozklad komendy:

```
apt install nginx -y
│   │       │     └── automatyczna zgoda
│   │       └── nazwa pakietu do zainstalowania
│   └── polecenie instalacji
└── menedzer pakietow
```

## Co sie dzieje podczas instalacji?

```
1. APT pobiera pakiet nginx z internetu
2. Pobiera tez zaleznosci (inne pakiety potrzebne do dzialania)
3. Rozpakowuje pliki do odpowiednich katalogow
4. Tworzy uzytkownika systemowego "www-data"
5. Rejestruje usluge systemowa (nginx.service)
6. AUTOMATYCZNIE uruchamia Nginx!
```

## Sprawdzenie czy dziala:

```bash
systemctl status nginx
```

### Co zobaczysz:
```
● nginx.service - A high performance web server
     Loaded: loaded (/lib/systemd/system/nginx.service; enabled)
     Active: active (running) since Sun 2024-12-28 16:30:00 UTC
```

Klucz: **active (running)** = dziala!

## Test w przegladarce:

Wejdz na `http://72.62.146.103` (Twoje IP) - zobaczysz domyslna strone Nginx:

```
Welcome to nginx!
If you see this page, the nginx web server is successfully installed...
```

---

# 6. Struktura katalogow

## Komenda tworzenia katalogu:

```bash
mkdir -p /var/www/theurbaniak.cloud
```

## Rozklad:

```
mkdir -p /var/www/theurbaniak.cloud
│     │  └── sciezka do katalogu
│     └── "parents" - tworz katalogi nadrzedne jesli nie istnieja
└── "make directory" - tworz katalog
```

## Struktura katalogow Nginx:

```
/etc/nginx/                          # Glowny katalog konfiguracji
├── nginx.conf                       # Glowny plik konfiguracyjny
├── sites-available/                 # WSZYSTKIE konfiguracje stron
│   ├── default                      # Domyslna strona Nginx
│   └── theurbaniak.cloud           # Twoja strona (tworzymy)
├── sites-enabled/                   # AKTYWNE strony (linki symboliczne)
│   └── theurbaniak.cloud -> ../sites-available/theurbaniak.cloud
└── snippets/                        # Fragmenty konfiguracji do wielokrotnego uzycia

/var/www/                            # Katalog na PLIKI stron
├── html/                            # Domyslna strona Nginx
│   └── index.html
└── theurbaniak.cloud/              # TWOJA strona
    ├── index.html                   # Strona glowna
    └── polityka-prywatnosci.html   # Podstrona

/var/log/nginx/                      # LOGI (dzienniki)
├── access.log                       # Kto odwiedzal strone
└── error.log                        # Bledy
```

## Wazna koncepcja: sites-available vs sites-enabled

### Analogia:
Wyobraz sobie szafe z ubraniami:
- **sites-available** = wszystkie ubrania w szafie (dostepne)
- **sites-enabled** = ubrania ktore zalozyles (aktywne)

### Jak to dziala:
1. Tworzysz konfiguracje w `sites-available`
2. Tworzysz **link symboliczny** w `sites-enabled` do tej konfiguracji
3. Nginx czyta tylko `sites-enabled`

### Dlaczego tak?
- Mozesz szybko wlaczac/wylaczac strony
- Nie musisz usuwac konfiguracji zeby ja wylaczyc
- Latwe testowanie (wylacz, sprawdz, wlacz)

---

# 7. Przesylanie plikow

## Metoda 1: SCP (Secure Copy)

### Z Windows PowerShell:

```powershell
scp "C:\sciezka\do\pliku\index.html" root@72.62.146.103:/var/www/theurbaniak.cloud/
```

### Rozklad:

```
scp "C:\...\index.html" root@72.62.146.103:/var/www/theurbaniak.cloud/
│   └── plik zrodlowy    │    │             └── katalog docelowy na serwerze
│       (lokalny)        │    └── adres serwera
│                        └── uzytkownik
└── Secure Copy (kopiowanie przez SSH)
```

### Kopiowanie calego katalogu:
```powershell
scp -r "C:\projekt\*" root@72.62.146.103:/var/www/strona/
```
- `-r` = recursive (rekursywnie, caly katalog z podkatalogami)

## Metoda 2: FileZilla (graficzny interfejs)

1. Pobierz FileZilla: https://filezilla-project.org/
2. Polacz:
   - Host: `72.62.146.103`
   - Username: `root`
   - Password: [twoje haslo]
   - Port: `22`
3. Po lewej: Twoj komputer
4. Po prawej: Serwer
5. Przeciagnij pliki myszka

### Zalety FileZilla:
- Wizualne przeciaganie plikow
- Podglad struktury katalogow
- Wznowienie przerwanego transferu

## Metoda 3: rsync (zaawansowane)

```bash
rsync -avz --delete local/ root@server:/var/www/site/
```

### Rozklad:

```
rsync -avz --delete local/ root@server:/var/www/site/
│     │││  │        │      └── cel
│     │││  │        └── zrodlo
│     │││  └── usun pliki na serwerze ktorych nie ma lokalnie
│     ││└── kompresja podczas transferu
│     │└── verbose (pokazuj co robi)
│     └── archive (zachowaj uprawnienia, daty itp.)
└── program do synchronizacji
```

### Zalety rsync:
- Przesyla tylko **zmienione** pliki (szybsze!)
- Idealny do aktualizacji strony
- Moze synchronizowac w obie strony

---

# 8. Konfiguracja Nginx

## Tworzenie pliku konfiguracyjnego:

```bash
nano /etc/nginx/sites-available/theurbaniak.cloud
```

### Co to jest nano?
Prosty edytor tekstu w terminalu. Alternatywy:
- `vim` - potezniejszy, trudniejszy
- `vi` - klasyczny, jeszcze trudniejszy

### Skroty klawiszowe nano:

| Skrot | Akcja |
|-------|-------|
| Ctrl+O | Zapisz (Output) |
| Enter | Potwierdz nazwe pliku |
| Ctrl+X | Wyjdz (eXit) |
| Ctrl+W | Szukaj (Where) |
| Ctrl+K | Wytnij linie |
| Ctrl+U | Wklej linie |

## Zawartosc pliku konfiguracyjnego:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name theurbaniak.cloud www.theurbaniak.cloud;

    root /var/www/theurbaniak.cloud;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }

    location ~* \.(jpg|jpeg|png|gif|ico|css|js)$ {
        expires 30d;
        add_header Cache-Control "public, immutable";
    }
}
```

## Wyjasnienie KAZDEJ linii:

### `server { }`
```nginx
server {
    # Cala konfiguracja jednej strony jest w tym bloku
}
```
Blok definiujacy jeden "virtual host" (jedna strone). Mozesz miec wiele blokow `server` dla roznych domen na jednym serwerze.

---

### `listen 80;`
```nginx
listen 80;
```
- Nasluchuj na **porcie 80**
- Port 80 = domyslny port dla **HTTP** (nieszyfrowane)
- Dotyczy polaczen **IPv4**

---

### `listen [::]:80;`
```nginx
listen [::]:80;
```
- To samo, ale dla **IPv6**
- `[::]` = "wszystkie adresy IPv6"

---

### `server_name`
```nginx
server_name theurbaniak.cloud www.theurbaniak.cloud;
```
- Dla jakich **domen** ta konfiguracja ma dzialac
- Nginx sprawdza naglowek `Host` w zadaniu HTTP
- Mozna dodac wiele domen oddzielonych spacjami

**Jak to dziala?**
```
1. Przegladarka wysyla: GET / HTTP/1.1
                        Host: theurbaniak.cloud
2. Nginx: "O, szukam server_name: theurbaniak.cloud"
3. Nginx: "Znalazlem! Uzywam tej konfiguracji"
```

---

### `root`
```nginx
root /var/www/theurbaniak.cloud;
```
- **Katalog glowny** strony
- Wszystkie sciezki URL beda wzgledne do tego katalogu

**Przyklady:**
| URL | Sciezka na serwerze |
|-----|---------------------|
| `/` | `/var/www/theurbaniak.cloud/index.html` |
| `/about.html` | `/var/www/theurbaniak.cloud/about.html` |
| `/img/logo.png` | `/var/www/theurbaniak.cloud/img/logo.png` |

---

### `index`
```nginx
index index.html;
```
- Jaki plik serwowac gdy ktos wejdzie na **katalog** (np. `/`)
- Mozna podac wiele: `index index.html index.htm index.php;`
- Nginx probuje po kolei

---

### `location / { }`
```nginx
location / {
    try_files $uri $uri/ =404;
}
```

**`location /`**
- Blok definiujacy jak obslugiwac zadania dla danej sciezki
- `/` = **wszystkie** sciezki

**`try_files $uri $uri/ =404;`**
- `$uri` - sprobuj znalezc **plik** o tej nazwie
- `$uri/` - sprobuj znalezc **katalog** o tej nazwie (i jego index)
- `=404` - jesli nic nie znaleziono, zwroc blad 404

**Przyklad dzialania:**
```
Zadanie: GET /about.html

1. Czy istnieje /var/www/.../about.html? TAK -> zwroc
2. Czy istnieje /var/www/.../about.html/ (katalog)? NIE
3. Zwroc 404

Zadanie: GET /portfolio/

1. Czy istnieje /var/www/.../portfolio? NIE (to nie plik)
2. Czy istnieje /var/www/.../portfolio/? TAK (katalog)
   -> Szukaj index.html w tym katalogu
3. Zwroc /var/www/.../portfolio/index.html
```

---

### `location ~* \.(jpg|...|js)$`
```nginx
location ~* \.(jpg|jpeg|png|gif|ico|css|js)$ {
    expires 30d;
    add_header Cache-Control "public, immutable";
}
```

**`~*`**
- Dopasowanie **wyrazeniem regularnym** (regex)
- `*` = case-insensitive (wielkosc liter nie ma znaczenia)

**`\.(jpg|jpeg|png|gif|ico|css|js)$`**
- `\.` - dosłowna kropka
- `(jpg|jpeg|...)` - jedno z tych rozszerzen
- `$` - koniec nazwy pliku

**`expires 30d;`**
- Naglowek cache
- Przegladarka bedzie **cache'owac** te pliki przez 30 dni
- Uzytkownik nie pobiera tych samych plikow wielokrotnie

**`add_header Cache-Control "public, immutable";`**
- `public` - moze byc cache'owane przez CDN/proxy
- `immutable` - plik sie NIE zmieni (przegladarka nie sprawdza)

---

## Aktywacja strony:

### Tworzenie linku symbolicznego:
```bash
ln -s /etc/nginx/sites-available/theurbaniak.cloud /etc/nginx/sites-enabled/
```

### Rozklad:
```
ln -s /etc/.../sites-available/theurbaniak.cloud /etc/.../sites-enabled/
│  │  └── CEL linku (oryginalny plik)            └── GDZIE utworzyc link
│  └── symbolic (link symboliczny)
└── link (tworz link)
```

### Co to jest link symboliczny?
To jak **skrot** w Windows. Plik w `sites-enabled` to tylko "wskaznik" do pliku w `sites-available`.

### Dlaczego nie kopiujemy?
- Jeden plik zrodlowy (latwiejsze edycje)
- Wlaczenie strony: utworz link
- Wylaczenie strony: usun link (`rm /etc/nginx/sites-enabled/theurbaniak.cloud`)

---

## Testowanie konfiguracji:

```bash
nginx -t
```

### Co robi:
- Sprawdza skladnie **wszystkich** plikow konfiguracyjnych
- NIE restartuje Nginx
- **ZAWSZE** uruchamiaj przed restartem!

### Wynik pozytywny:
```
nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful
```

### Wynik negatywny:
```
nginx: [emerg] unknown directive "servre" in /etc/nginx/sites-enabled/...:3
nginx: configuration file /etc/nginx/nginx.conf test failed
```
(Pokazuje **linie** z bledem!)

---

## Zastosowanie zmian:

```bash
systemctl restart nginx
```

### Alternatywy:

| Komenda | Co robi | Kiedy uzywac |
|---------|---------|--------------|
| `systemctl restart nginx` | Zatrzymuje i uruchamia | Po wiekszych zmianach |
| `systemctl reload nginx` | Przeladowuje konfiguracje | Po malych zmianach (bez przerwy!) |
| `systemctl stop nginx` | Zatrzymuje | Gdy chcesz wylaczyc |
| `systemctl start nginx` | Uruchamia | Po zatrzymaniu |

**Pro tip:** Na produkcji uzywaj `reload` - nie ma przerwy w dzialaniu!

---

# 9. Firewall (UFW)

## Co to jest firewall?

**Firewall** (zapora ogniowa) kontroluje jaki ruch sieciowy moze wchodzic i wychodzic z serwera.

### Analogia:
Firewall to jak **ochroniarz w klubie**:
- Sprawdza kazdego kto chce wejsc
- Ma liste dozwolonych gosci (porty)
- Reszta nie wchodzi

## UFW - Uncomplicated Firewall

Prosty interfejs do zarzadzania iptables (skomplikowanym systemem firewall w Linux).

## Komendy:

### Otwarcie portow dla Nginx:
```bash
ufw allow 'Nginx Full'
```
- Otwiera porty **80** (HTTP) i **443** (HTTPS)
- `'Nginx Full'` to predefiniowany profil

### Inne profile Nginx:
```bash
ufw allow 'Nginx HTTP'   # Tylko port 80
ufw allow 'Nginx HTTPS'  # Tylko port 443
```

### Otwarcie portu SSH:
```bash
ufw allow OpenSSH
```
- Otwiera port **22** (SSH)
- **KRYTYCZNE!** Bez tego stracisz dostep po wlaczeniu firewall!

### Wlaczenie firewall:
```bash
ufw enable
```
- Wlacza firewall
- Pojawi sie ostrzezenie o SSH - dlatego wczesniej otwieramy port 22

## Domyslna polityka UFW:

```
Incoming:  DENY  (blokuj wszystko przychodzace)
Outgoing: ALLOW  (pozwol na wszystko wychodzace)
```

**Co to znaczy praktycznie?**
- Serwer MOZE laczyc sie z internetem (pobierac aktualizacje, itp.)
- Internet NIE MOZE sie polaczyc z serwerem (chyba ze na dozwolonych portach)

## Przydatne komendy UFW:

```bash
# Status i reguly
ufw status                    # Pokaz status
ufw status verbose           # Wiecej szczegolow
ufw status numbered          # Z numerami (do usuwania)

# Dodawanie regul
ufw allow 3000               # Otworz port 3000 (np. Node.js)
ufw allow 3000/tcp           # Tylko TCP (nie UDP)
ufw allow from 192.168.1.0/24  # Tylko z tej sieci

# Usuwanie regul
ufw delete 3                 # Usun regule nr 3
ufw delete allow 3000        # Usun regule dla portu 3000

# Zarzadzanie
ufw disable                  # Wylacz firewall
ufw reset                    # Zresetuj wszystkie reguly
```

---

# 10. Certyfikat SSL

## Co to jest SSL/TLS?

**SSL** (Secure Sockets Layer) / **TLS** (Transport Layer Security) to protokoly **szyfrowania** komunikacji.

### Bez SSL (HTTP):
```
Przegladarka ──[haslo: "mojehaslo123"]──> Serwer
                     ↑
              Kazdy moze podejrzec!
```

### Z SSL (HTTPS):
```
Przegladarka ──[zaszyfrowane dane]──> Serwer
                     ↑
              Nie da sie odczytac!
```

### Jak rozpoznac HTTPS:
- Klodka w przegladarce
- Adres zaczyna sie od `https://`

## Co to jest Let's Encrypt?

**Let's Encrypt** to darmowy, automatyczny urzad certyfikacji (CA):
- **Darmowy** - nie placisz za certyfikat
- **Automatyczny** - latwa instalacja i odnawianie
- **Zaufany** - wszystkie przegladarki go akceptuja

### Certyfikaty sa wazne 90 dni
Ale Certbot automatycznie je odnawia!

## Co to jest Certbot?

**Certbot** to narzedzie do automatycznego uzyskiwania certyfikatow Let's Encrypt.

## Instalacja:

```bash
apt install certbot python3-certbot-nginx -y
```

### Rozklad:
- `certbot` - glowne narzedzie
- `python3-certbot-nginx` - plugin do automatycznej konfiguracji Nginx

## Uzyskanie certyfikatu:

```bash
certbot --nginx -d theurbaniak.cloud -d www.theurbaniak.cloud
```

### Rozklad:
```
certbot --nginx -d theurbaniak.cloud -d www.theurbaniak.cloud
│       │       │                    └── dodatkowa domena (SAN)
│       │       └── glowna domena
│       └── uzyj pluginu Nginx (automatyczna konfiguracja)
└── program Certbot
```

## Co robi Certbot?

```
1. Weryfikuje ze kontrolujesz domene (HTTP challenge)
   - Tworzy tymczasowy plik na serwerze
   - Let's Encrypt sprawdza czy plik istnieje

2. Generuje klucz prywatny

3. Wysyla zadanie do Let's Encrypt

4. Otrzymuje certyfikat

5. AUTOMATYCZNIE modyfikuje konfiguracje Nginx:
   - Dodaje nasluchiwanie na porcie 443
   - Dodaje sciezki do certyfikatu
   - Dodaje przekierowanie HTTP -> HTTPS
```

## Gdzie sa pliki certyfikatu?

```
/etc/letsencrypt/live/theurbaniak.cloud/
├── fullchain.pem    # Certyfikat + chain
├── privkey.pem      # Klucz prywatny (NIGDY nie udostepniaj!)
├── cert.pem         # Sam certyfikat
└── chain.pem        # Certyfikaty posrednie
```

## Automatyczne odnawianie:

Certbot tworzy timer systemowy:
```bash
systemctl list-timers | grep certbot
```

Certyfikaty sa automatycznie odnawiane **przed wygasnieciem**.

### Test odnawiania:
```bash
certbot renew --dry-run
```
- `--dry-run` = symulacja, nie robi prawdziwego odnawiania

---

# 11. Przydatne komendy

## Zarzadzanie Nginx:

```bash
systemctl status nginx        # Status
systemctl start nginx         # Uruchom
systemctl stop nginx          # Zatrzymaj
systemctl restart nginx       # Restart (krotka przerwa)
systemctl reload nginx        # Przeladuj (bez przerwy)
nginx -t                      # Testuj konfiguracje
nginx -T                      # Pokaz cala konfiguracje
```

## Logi:

```bash
# Podglad na zywo (Ctrl+C aby zakonczyc)
tail -f /var/log/nginx/access.log    # Kto wchodzi
tail -f /var/log/nginx/error.log     # Bledy

# Ostatnie N linii
tail -100 /var/log/nginx/error.log   # Ostatnie 100 linii

# Szukanie
grep "404" /var/log/nginx/access.log # Szukaj bledow 404
grep "POST" /var/log/nginx/access.log # Szukaj zadan POST
```

## System:

```bash
df -h                    # Miejsce na dysku
free -h                  # Pamiec RAM
htop                     # Monitor procesow (interaktywny)
top                      # Monitor procesow (podstawowy)
uptime                   # Jak dlugo dziala serwer
whoami                   # Jako kto jestes zalogowany
pwd                      # Gdzie jestes (sciezka)
```

## Pliki:

```bash
ls -la                   # Lista plikow (wszystkie, szczegoly)
cd /var/www              # Zmien katalog
cat plik.txt             # Wyswietl zawartosc
nano plik.txt            # Edytuj plik
rm plik.txt              # Usun plik
rm -rf katalog/          # Usun katalog (OSTROZNIE!)
cp plik.txt kopia.txt    # Kopiuj
mv stary.txt nowy.txt    # Przenies/zmien nazwe
chmod 644 plik.txt       # Zmien uprawnienia
chown www-data:www-data plik.txt  # Zmien wlasciciela
```

## Siec:

```bash
curl -I https://theurbaniak.cloud  # Sprawdz naglowki HTTP
ping google.com                     # Test polaczenia
netstat -tlnp                       # Otwarte porty
ss -tlnp                            # Nowsza wersja netstat
```

---

# 12. Rozwiazywanie problemow

## Problem: "Connection refused" przy SSH

**Przyczyny:**
- Serwer nie dziala
- SSH nie dziala na serwerze
- Port 22 zablokowany

**Rozwiazanie:**
1. Sprawdz czy serwer dziala w panelu Hostinger
2. Restart serwera z panelu
3. Uzyj konsoli VNC w panelu Hostinger

---

## Problem: Strona nie wyswietla sie (timeout)

**Przyczyny:**
- Nginx nie dziala
- Firewall blokuje port 80/443
- Zla konfiguracja DNS

**Rozwiazanie:**
```bash
# Sprawdz czy Nginx dziala
systemctl status nginx

# Sprawdz firewall
ufw status

# Sprawdz czy port jest otwarty
ss -tlnp | grep :80
```

---

## Problem: Blad 403 Forbidden

**Przyczyna:** Nginx nie ma uprawnien do plikow

**Rozwiazanie:**
```bash
# Ustaw wlasciciela
chown -R www-data:www-data /var/www/theurbaniak.cloud

# Ustaw uprawnienia
chmod -R 755 /var/www/theurbaniak.cloud
```

---

## Problem: Blad 404 Not Found

**Przyczyny:**
- Plik nie istnieje
- Zla sciezka w konfiguracji

**Rozwiazanie:**
```bash
# Sprawdz czy plik istnieje
ls -la /var/www/theurbaniak.cloud/

# Sprawdz konfiguracje
cat /etc/nginx/sites-available/theurbaniak.cloud
```

---

## Problem: Certyfikat SSL nie dziala

**Przyczyny:**
- Domena nie wskazuje na serwer
- Port 80 zablokowany podczas weryfikacji

**Rozwiazanie:**
```bash
# Sprawdz czy domena wskazuje na serwer
dig theurbaniak.cloud

# Sprawdz czy port 80 jest otwarty
ufw allow 'Nginx Full'

# Sprobuj ponownie
certbot --nginx -d theurbaniak.cloud
```

---

# 13. Checklist

## Przed wdrozeniem:

- [ ] Mam dostep do VPS (IP, haslo)
- [ ] Mam domene skonfigurowana (A record -> IP serwera)
- [ ] Mam pliki strony gotowe

## Wdrozenie:

- [ ] `ssh root@IP` - polacz sie z serwerem
- [ ] `apt update && apt upgrade -y` - zaktualizuj system
- [ ] `apt install nginx -y` - zainstaluj Nginx
- [ ] `mkdir -p /var/www/mojadomena.pl` - stworz katalog
- [ ] Przeslij pliki (SCP/FileZilla)
- [ ] `nano /etc/nginx/sites-available/mojadomena.pl` - stworz konfiguracje
- [ ] `ln -s ...` - aktywuj strone
- [ ] `nginx -t` - testuj konfiguracje
- [ ] `systemctl restart nginx` - restart Nginx
- [ ] `ufw allow 'Nginx Full'` - otworz porty
- [ ] `ufw allow OpenSSH` - otworz SSH
- [ ] `ufw enable` - wlacz firewall
- [ ] `apt install certbot python3-certbot-nginx -y` - zainstaluj Certbot
- [ ] `certbot --nginx -d domena.pl -d www.domena.pl` - certyfikat SSL
- [ ] Sprawdz strone w przegladarce!

## Po wdrozeniu:

- [ ] Strona dziala na HTTP
- [ ] Strona dziala na HTTPS
- [ ] HTTP przekierowuje na HTTPS
- [ ] Certyfikat jest wazny (klodka w przegladarce)

---

# Podsumowanie

Gratulacje! Teraz potrafisz samodzielnie wdrozyc strone na VPS.

## Kluczowe umiejetnosci:

1. **SSH** - bezpieczne polaczenie z serwerem
2. **APT** - zarzadzanie pakietami
3. **Nginx** - serwer WWW
4. **UFW** - firewall
5. **Certbot** - certyfikaty SSL

## Nastepne kroki:

1. Naucz sie automatycznego deploymentu (GitHub Actions)
2. Poznaj Docker
3. Skonfiguruj monitoring (np. Uptime Robot)
4. Zrob backup!

---

*Koniec tutorialu #1*

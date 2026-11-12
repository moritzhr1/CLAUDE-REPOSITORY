# Website GOLDSCHILD PRIVATE LLC

Statische, englischsprachige Unternehmenswebsite (HTML + CSS, kein JavaScript, kein Build-Schritt).
Fertig für Cloudflare Pages per Direct Upload: **`goldschild-private.zip`**.

## Inhalt

```
goldschild-private.zip      ← diese Datei bei Cloudflare hochladen
site/                       ← Inhalt der ZIP (index.html liegt im Stammverzeichnis)
  index.html                Home
  company.html              Company
  contact.html              Contact
  404.html                  Fehlerseite (verhindert, dass Cloudflare unbekannte URLs auf die Startseite umleitet)
  _headers                  Sicherheits-Header für Cloudflare Pages (u. a. Content-Security-Policy)
  robots.txt
  favicon.ico
  assets/css/styles.css
  assets/img/               Logo, Titelfoto (JPEG + WebP), IMAGE-CREDITS.txt
  assets/icons/             Favicon-PNG, Apple-Touch-Icon
source/                     Originaldateien (Logo, Foto) – nicht Teil der ZIP
tools/build_assets.py       erzeugt Logo-, Favicon- und Bildgrößen aus source/
tools/check_site.mjs        automatischer Test (Links, Bilder, Favicon, E-Mail, Layout, Fokus)
```

## Gestaltung

- Farben: warmes Weiß `#faf8f3`, Tannengrün `#1f3b2f`, mattes Gold `#a6874e` (nur Linien und Akzente).
  Alle Textfarben erfüllen WCAG AA.
- Schriften: Überschriften `Didot, "Bodoni MT", Georgia, serif`; Fließtext und Navigation
  `"Helvetica Neue", Helvetica, "Segoe UI", …, Arial, sans-serif`. Keine Web-Fonts, keine externen Dienste.
  Didot ist auf macOS/iOS vorinstalliert, Bodoni MT auf vielen Windows-Rechnern mit Office, sonst greift Georgia.
- Logo: das vom Auftraggeber gelieferte Wappenschild (`source/goldschild-shield-original.png`), auch als Favicon.
- Keine Verläufe, Glanzeffekte oder Scroll-Animationen.

## Bildquelle und Lizenz

| | |
|---|---|
| Datei | `site/assets/img/office-interior-{800,1280,1920,2400}.{jpg,webp}` |
| Motiv | Leerer Besprechungsraum mit Fensterfront, Betondecke, Tageslicht, keine Personen |
| Fotograf | Nastuh Abootalebi ([@sunday_digital](https://unsplash.com/@sunday_digital)) |
| Quelle | https://unsplash.com/photos/eHD8Y1Znfpk |
| Lizenz | [Unsplash License](https://unsplash.com/license): kommerzielle Nutzung erlaubt, keine Genehmigung oder Namensnennung erforderlich |
| Geprüft | 12.11.2026, Status „Free to use under the Unsplash License“ (kein Unsplash+) |
| Verwendung | Redaktionelle Illustration. Bildunterschrift auf der Seite: „Illustrative photograph“, mit Fotografen-Nennung; nicht als eigenes Büro bezeichnet |

Die gleichen Angaben stehen in `site/assets/img/IMAGE-CREDITS.txt` und werden mit hochgeladen.

## Tests (durchgeführt)

`node tools/check_site.mjs` startet einen lokalen Server, der sich wie Cloudflare Pages verhält
(`_headers`/CSP aktiv, `/company` → `company.html`, 404-Seite), und prüft mit Chromium:

- alle internen Links, Stylesheet, Favicons (`favicon.ico`, PNG, Apple-Touch-Icon), alle Bilder geladen
- E-Mail-Link: `mailto:contact@goldschildprivate.com`, ausgeschrieben sichtbar
- keine Konsolen-, CSP- oder Netzwerkfehler; kein JavaScript
- je Seite genau ein `h1`, eindeutiger Titel und Meta-Description, `lang="en"`, Alt-Attribute
- Breiten 320, 375, 414, 768, 1024, 1440, 1920 px: kein horizontales Scrollen, Wortmarke
  „GOLDSCHILD [Schild] PRIVATE“ einzeilig und vollständig sichtbar, Schild exakt in der Seitenmitte
- Tastaturbedienung: sichtbarer Fokus auf allen Links, „Skip to content“-Link
- Footer-Name exakt `GOLDSCHILD PRIVATE LLC`
- zusätzlich HTML-Validierung mit `html-validate`: keine Fehler

## Upload: neues Cloudflare-Pages-Projekt „goldschild-private“

Wichtig: nicht in ein bestehendes Projekt hochladen. Ein vorhandenes Eisenbach-Projekt bleibt unberührt,
solange Sie es in der Liste nicht anklicken.

1. Im Cloudflare-Dashboard links **Workers & Pages** öffnen.
2. **Create application** wählen, dann bei Pages **Get started** → **Drag and drop your files**
   (je nach Dashboard-Version heißt der Punkt auch „Upload assets“).
3. Als Projektname **`goldschild-private`** eingeben → **Create project**.
4. Die Datei **`goldschild-private.zip`** in das Upload-Feld ziehen (nicht entpacken) → **Deploy site**.
5. Nach dem Deployment ist die Seite unter **https://goldschild-private.pages.dev** erreichbar.
   Ist der Name schon vergeben, hängt Cloudflare Zeichen an; die tatsächliche Adresse steht auf der Projektseite.
6. Optional: unter **Custom domains** z. B. `goldschildprivate.com` verbinden.

Spätere Änderungen: im Projekt **goldschild-private** → **Create a new deployment** → neue ZIP hochladen
→ Umgebung **Production** wählen.

Hinweise:
- Cloudflare zeigt Seiten ohne `.html` an (`/company`, `/contact`); Links auf `company.html` werden automatisch weitergeleitet.
- Ein Direct-Upload-Projekt lässt sich später nicht auf Git-Anbindung umstellen (dafür wäre ein neues Projekt nötig).
- Die E-Mail-Adressen sind mit `<!--email_off-->` markiert, damit Cloudflares E-Mail-Verschleierung
  den mailto-Link auch auf einer eigenen Domain nicht durch ein Skript ersetzt.

## ZIP neu erzeugen

```bash
cd site && rm -f ../goldschild-private.zip && zip -r -X ../goldschild-private.zip . -x '.*' -x '*/.*'
```

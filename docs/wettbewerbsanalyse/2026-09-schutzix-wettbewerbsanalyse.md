# Wettbewerbsanalyse SCHUTZIX (schutzix.com) – Reverse Engineering & SICHERLUFT Attack Plan

**Stand:** 23.09.2026 · **Erstellt für:** SICHERLUFT Marketing · **Datenbasis:** öffentliche Quellen + von euch gelieferte Screenshots (17.–23.09.2026)

## Inhalt

Executive Summary · 1 Funnel Map · 2 Meta Ads Inventory · 3 Creative-Familien · 4 Winner-Proxy · 5 Avatare · 6 Landingpages · 7 Belief-Shift-Map · 8 Offer · 9 Claim & Trust Audit · 10 DOs · 11 DON'Ts · 12 Warum Menschen kaufen · 13 SICHERLUFT Attack Plan · 14 Test-Hypothesen · 15 30-Tage-Plan · Abschluss-Listen · Anhang

---

## Lesehinweis: Evidenz-Kennzeichnung

Jede Aussage mit Gewicht ist markiert:

- **[B] BEOBACHTET** – direkt belegbar (Ad Library, Seitentext, Quellcode, Screenshot, Registerdaten). Quelle/ID steht dabei.
- **[I] STARKE INFERENZ** – Schlussfolgerung aus Laufzeit, Wiederholung, Varianten, Funnel-Struktur. Plausibel, aber nicht bewiesen.
- **[S] SPEKULATION** – nicht ausreichend belegt. Nur als Hypothese verwenden.

**Nicht vorhanden und nicht erfunden:** CTR, CPC, CPA, ROAS, Conversion Rate, Umsatz, tatsächlicher Spend, Käuferdemografie. Die Meta Ad Library zeigt für diese Anzeigen **keinen Spend**. Sie zeigt aber für aktive EU-Anzeigen die **Reichweite nach Alter/Geschlecht** (DSA-Transparenz). Das ist Reichweite, keine Käuferdemografie, und wird nur so verwendet.

## Methodik & Quellen (Kurzfassung)

| Quelle | Umfang | Abruf |
|---|---|---|
| Eure Screenshots (4 ZIPs, 77 Dateien) | 13 relevante Schutzix-Belege, 2 Wettbewerber-Funde, 7 irrelevante Dateien aussortiert | 17.–23.09.2026 |
| Meta Ad Library (öffentlich, ausgeloggt) | Suche „schutzix“: **≈1.124 Anzeigen gesamt, 113 aktiv**; **244 Schutzix-Anzeigen im Detail ausgewertet** (Text, Laufzeit, Format, Ziel-URL, Duplikate); EU-Reichweitendaten aktiver Anzeigen | 23.09.2026 |
| Standard-Sortierung der Ad Library | laut Seitendaten `sort = total_impressions desc` → die ersten Treffer jeder Abfrage sind die **reichweitenstärksten** Anzeigen dieser Abfrage | 23.09.2026 |
| schutzix.com | 22 Seiten, 3 Produkte, Quellcode (Apps, A/B-Tests, Bundle-Konfiguration), gerenderte Mobil-Screenshots | 23.09.2026 |
| Top-Videos der Ad Library | 6 Videos geladen, Frames extrahiert, Voiceover transkribiert | 23.09.2026 |
| Register/Technik | RDAP (Domain), DNS, Zertifikats-Log (crt.sh) | 23.09.2026 |
| Trustpilot | Profil schutzix.com | 23.09.2026 |
| Faktenbasis | BfR-Befragung „Gesundheitsrisiken durch Kohlenmonoxid“, Destatis/GBE, KBA, Normtexte EN 50291-1 | 23.09.2026 |
| Markt | Securias (securias.de), Mavoni/PureAlert (mavonishop.de), „Logic Tech“ (SE) | 23.09.2026 |

**Grenzen:** Die Ad Library liefert ausgeloggt pro Abfrage nur die ersten 30 Treffer. Die 244 ausgewerteten Anzeigen sind deshalb eine **reichweitengewichtete Stichprobe** der ≈1.124, keine Vollerhebung. Aussagen zu „Anzahl Varianten“ sind Mindestwerte.

---

# EXECUTIVE SUMMARY

**Schutzix ist kein Produktunternehmen. Es ist eine Maschine für Angst-Geschichten mit Wegwerf-Konten.** Das Produkt ist ein austauschbares OEM-Steckergerät. Mavoni („PureAlert“) verkauft sichtbar dasselbe Gerät **[B]**, Securias sehr wahrscheinlich ebenfalls **[I]**. Auch SICHERLUFT verkauft nach den Displayangaben im Repo (CO ppm, Gas %LEL, °C, %RH, Schuko-Stecker) sehr wahrscheinlich dieses Gerät **[I – intern bestätigen]**. Schutzix, Securias und Mavoni verlangen denselben Preis: 59,95 € statt „99,95 €“ **[B]**. Was Schutzix funktionieren lässt, ist ein sehr gut gebautes **Belief-Shift-System**. Was Schutzix angreifbar macht, ist fast alles andere.

### Was Schutzix wirklich macht (Kern in 6 Punkten)

1. **[B] Hohe Werbeintensität, kurze Unternehmensgeschichte.** Domain registriert am 06.05.2026, erste Anzeige am 19.05.2026, bis 23.09. ≈1.124 Anzeigen (Ad Library). Betreiber: *Black Dragon Goals Limited, Hongkong* (Impressum).
2. **[B] Absender sind keine Marke, sondern Personas.** Die Anzeigen laufen über „Peter Schulz“ (Seitenkategorie *Künstler/in*, 417 Anzeigen), „Andreas Schneider“ (Community, 163), „Claudia Schneider“ (Personal blog, 82), „Tagesbericht“ (49), „Kohlenmonoxid Schutz“, „Stefan Weber“ und „Helga Schmidt“. Als Zahler weist die Ad Library bei aktiven Anzeigen aber **„Schutzix“** aus.
3. **[B] Meta hat die Werbekonten gesperrt.** Alle 30 reichweitenstärksten Anzeigen tragen den Vermerk *„…Konto oder Seite, das bzw. die wir später wegen eines Verstoßes gegen unsere Werbestandards deaktiviert haben“*. In der Stichprobe gilt das für 161 von 244 Anzeigen, mit einem Enddaten-Peak am 01.–02.09.2026 (42 Anzeigen). Alle 56 aktiven Anzeigen der Stichprobe starten ab 06.09. mit Status „eligible“. Das ist ein Neustart über neue Werbekonten, teils mit denselben, teils mit neuen Persona-Seiten.
4. **[B/I] Validierter Kern-Mechanismus: „Das grüne Licht lügt.“** Der Primärtext *„Das grüne Licht bedeutet nur, dass dein Melder eingeschaltet ist. Es bedeutet nicht, dass er alle Gefahren erkennt …“* ist das mit Abstand am häufigsten vervielfältigte Konzept: 79 von 244 Anzeigen, 3 Seiten, bis zu 8 Duplikate je Creative, seit 18.06. durchgehend aktiv. **[I]** Das ist das Skalierungs-Creative. Die rationale Botschaft steht im Text. Die Emotion liefern KI-Videos („Um 3 Uhr nachts wollte ich meine Tochter wecken – sie konnte den Kopf nicht heben“) und illustrierte „Tatort“-Erklärvideos.
5. **[B/I] Zweiter validierter Kern: der Feuerwehrmann-Ich-Erzähler.** Er ist die älteste Anzeige mit der längsten Laufzeit (106 Tage, 19.05.–01.09.): eine 12.300 Zeichen lange, übersetzte US-Advertorial-Vorlage. Sie wurde erst für den Haushalt, dann fürs Wohnmobil (Müritz-Stellplatz) und wieder für den Haushalt (Wohnung) neu verfilmt. Parallel läuft der Wohnmobil-Todesfall in dritter Person („Warum spricht keiner darüber?“).
6. **[B] Monetarisierung über Menge.** Das 2er-Set ist vorausgewählt (99,95 €), das 3er als „Bestseller“ markiert, das 4er als „Schützen Sie jedes Schlafzimmer“. Geschenke gibt es ab 2 Stück (Versand, E-Book, im Wohnmobil-Funnel zusätzlich 12V-Adapter). Kostenloser Versand erst ab 80 €. Zwei A/B-Tests laufen auf der Produktseite: Reihenfolge der Staffel und Geschenkformulierung. Die Stories bereiten den Mehrfachkauf vor („Ich kaufte noch in derselben Nacht acht Schutzix Detektoren“).

### Wo Schutzix verwundbar ist

- **[B] Trust-Kollaps bei jeder Prüfung:** Trustpilot **2,2 von 5 bei 14 Bewertungen, 86 % 1-Stern**. Die Themen: Fake-Stories, Fehlalarme, keine Rücknahme, keine Antwort, Firma in Hongkong. Die Advertorials behaupten dagegen „Trustpilot 4.7 | 3.824 Bewertungen“. Die eigene Startseite zeigt im Produktblock „★★★½ 6 Reviews“ und nennt einen Absatz höher „4,9 / 12.800+ Kunden“.
- **[B] Technische Widersprüche im eigenen Funnel:** Die Wohnmobil-Landingpage verspricht „Akku-Backup, USB-C“. Die Produktseite sagt „keine Batterien“. Separat wird ein 12V-Adapter für 24,95 € verkauft. „4-in-1“ ist an vier Stellen **vier verschiedene Dinge**. Die Alarmschwelle liegt je nach Stelle bei „ab 1 ppm“, „15 ppm“, „30 ppm“ oder „deutlich vor 70 ppm“.
- **[B] Faktisch falsche Norm-Aussage als Kernargument:** „Die europäische Norm sagt: bei 70 ppm … bis zu vier Stunden“. Das sind die Werte der **US-Norm UL 2034**. EN 50291-1 verlangt: 50 ppm → Alarm nach 60–90 min, 100 ppm → 10–40 min, 300 ppm → unter 3 min.
- **[B] Erfundene Autorität und Presse:** ein selbstgebauter „Sicherheits-Insider Test 2026“ mit fiktiven Konkurrenzprodukten und dem „Testsieger 9,8/10“. Alle Konkurrenz-Buttons führen auf eine Seite „Produkt nicht verfügbar“. Das Hauptbild der Produktseite trägt das Banner „empfohlen von der FEUERWEHR“.
- **[I] Instabile Akquise:** Kontosperren, Persona-Wechsel und eskalierende Angst-Hooks bis hin zur Totgeburt und zu toten Kindern. Das ist **Performance auf Pump**. Jede Sperre setzt Lernphase, Social Proof und Pixel-Historie zurück.

### Die strategische Konsequenz für SICHERLUFT

1. **Nicht das Produkt, sondern die Überprüfbarkeit ist der Hebel.** Das Gerät ist austauschbar **[I]**, jeder Klon kann es morgen ebenfalls anbieten. Gewinnen wird, wer als Einziger **nachprüfbar ehrlich** ist: echte Messwerte am Gerät, belegte Fakten in der Werbung, eine erreichbare Firma mit Rücksendeadresse in der EU.
2. **SICHERLUFT kopiert Schutzix derzeit, und das muss sofort aufhören. [B]** Die Startseite im Repo übernimmt Schutzix' Hero fast wörtlich: „Erkennt CO, Erdgas & Propan“, „Alarmiert Stunden früher bei 30+ PPM“, „Schützen Sie ihre Familie heute“, „Vertraut von mehr als 10.000 Familien“. Dazu kommen der Sticky-Bar-Text „Excellent 4.8 | 1319 reviews“ und dieselbe Sale-Zeile „HERBST-SALE – Jetzt sichern und bis zu 50% sparen“. Damit erbt SICHERLUFT exakt die Glaubwürdigkeits- und Rechtsrisiken, die Schutzix gerade einholen.
3. **Den validierten Mechanismus übernehmen, die Beweise austauschen.** Die Schutzix-Kette „Rauchmelder ≠ CO“ → „grünes Licht ≠ Sicherheit“ → „Zahl = Sicherheit“ funktioniert und ist im Kern wahr. SICHERLUFT beweist sie mit echter Messung, echten Personen und offiziellen Daten. Schutzix beweist sie mit erfundenen Toten.
4. **Priorität der ersten 30 Tage:** (1) Gerät verifizieren: Normen, Fehlalarmverhalten, Anzeige-Schwelle. (2) Eigene unbelegte Claims entfernen. (3) Zwei Landingpages bauen: Wohnmobil-Nacht-Check und Heizsaison-Haushalt. (4) Drei Creative-Familien testen: grünes Licht **live gemessen**, BfR-Irrtum-Kampagne, Wohnmobil-Nacht-Check. (5) Trust-Assets aufbauen, die Schutzix strukturell nicht kopieren kann.

### Die 3 wahrscheinlich stärksten Schutzix-Angles (Kurzfassung, Details in Kap. 4)
1. „Das grüne Licht bedeutet nur, dass dein Melder eingeschaltet ist“ plus emotionales KI-Video. **[I] Scale-Creative**
2. Feuerwehrmann-Ich-Erzähler („Ich bin seit X Jahren Feuerwehrmann … habe jeden Melder von meinen Wänden gerissen“). **[I] validierter Core Angle**
3. Wohnmobil-Todesfall: „Ein Vater/Ehepaar ist letzten Monat in seinem Wohnmobil gestorben. Warum spricht keiner darüber?“. **[I] validierter Segment-Angle**

---

# 1. SCHUTZIX FUNNEL MAP

```
TRAFFIC (Meta: FB, IG, Audience Network, Messenger, Threads; ab 09/2026 teils + WhatsApp)
│  Absender: Persona-Seiten („Peter Schulz“, „Andreas Schneider“, „Claudia Schneider“,
│  „Tagesbericht“, „Kohlenmonoxid Schutz“, „Stefan Weber“, „Helga Schmidt“); Zahler: „Schutzix“
│  Titel fast immer „Beschütz deine Familie“ | CTA „Mehr dazu“ | Primärtext ≈500–27.000 Zeichen (Median ≈5.200)
│
├─► PRE-LANDER / ADVERTORIAL (Mehrheit der Links)
│     /pages/sicherheit ......................... „7 Gründe … Ratschlag von einem Feuerwehrmann“ (ab 18.05.)
│     /pages/sicherheitv2 ....................... dieselbe Seite mit „Sicherheits-Journal“-Masthead (ab 06.07.)
│     /pages/wohnmobil .......................... „Brandinspektor warnt: Der stille Killer in deutschen Wohnmobilen“ (ab 01.07.)
│     /pages/brandinspektor-warnt-co-melder-haushalt .. Haushalts-Version, „6 Gründe“ (ab 13.07.)
│     /pages/sicherheitsreport .................. Ich-Erzählerin schwanger, „Die 70-ppm-Lüge“ (ab 13.06.)
│     /pages/co-melder-ratgeber, /6-grunde-… .... „Sicherheits-Insider“-Listicle mit Countdown-CTA (ab 11.07.)
│     /pages/sicherheits-insider-co-melder-2026 . fiktiver Vergleichstest „Testsieger 9,8/10“ (ab 04.08.)
│     /pages/listicle-blog-style-wohnwagen-and-caravan-v2 .. Wohnmobil+Caravan (ab 27.08.)
│
├─► DIREKT PRODUKTSEITE (kleinerer Anteil; v. a. „grünes Licht“-Ads und „Amazon“-Ad)
│     /products/schutzix-4-in-1-co-detektor (unlisted, nicht im Katalog, seit 19.04. angelegt)
│     /products/schutzix-4-in-1-co-detektor-fur-wohnmobile (eigenes Template „wohnwagen-pdp“)
│
▼
PRODUKTSEITE (Shopify, Horizon-ähnliches Theme)
│  Countdown-Leiste „HERBST SALE – bis zu 50 %“ (läuft täglich um 23:59 Ortszeit ab)
│  E-Book-Banner „GRATIS EXKLUSIVES E-BOOK ZU JEDER BESTELLUNG HEUTE!“ (in der Staffel erst ab 2 Stück als Geschenk ausgewiesen)
│  Hauptbild „empfohlen von der FEUERWEHR“ | „Bewertet bei 4.9 von 12.800+ zufriedenen Kunden!“
│  Kaching-Mengenstaffel 1/2/3/4 (2er vorausgewählt) | „Fast ausverkauft“ | „Kostenloser Versand ab 80 €“
│  Experten-Testimonial „Markus Brandt | Feuerwehrmann, NRW | Verifizierter Kunde“
│  Aufklärungsblöcke, ppm-Skala, Vergleichstabelle, FAQ
│  Popup (Klaviyo): „50% Rabatt sofort sichern … Nein danke, ich riskiere es!“
▼
CHECKOUT (Shopify; Klarna, PayPal, Karten, Apple/Google Pay, Shop Pay)
│  Upsell-Infrastruktur installiert (Zipify / Kaching-Upsells) – konkrete Angebote nicht einsehbar
▼
FULFILLMENT & NACHKAUF
   Lieferzeit laut Bedingungen 5–10 Werktage, „Zoll“ erwähnt | Rücksendung auf Kundenkosten,
   HK-Adresse im Widerrufsformular | E-Mail-Support (24–48 h), kein Telefon
   → Trustpilot 2,2/5 (14): Rückgabe erfolglos, Fehlalarme, „Fake-Story“, „KI-Videos“
```

**Funnel-Kohärenz-Befund [B/I]:** Anzeige und Advertorial passen im **Wohnmobil-Strang** gut zusammen: Wespennest, „Karin“, Bodensee, Brandinspektor-Motiv. Im **Haushalt-Strang** reißt die Verbindung ab. Die Schwangerschafts-Ad („32. SSW“) führt auf eine Seite, deren Geschichte von einem 38-jährigen Vater handelt, der durch den Grill des Nachbarn stirbt. Schwangerschaft kommt dort nicht vor. **[I]** Das kostet Conversion bei genau der Zielgruppe, die mit dem stärksten Versprechen gelockt wurde.

**Zeitachse [B]:** Produkt in Shopify 19.04. → erste Higgsfield-KI-Bilder 23.04. → Domain 06.05. → Shop live 18.05. → erste Ads 19.05. → Sicherheitsreport 13.06. → Wohnmobil-LP 01.07., Wohnmobil-Produkt 02.07. → Haushalt-Brandinspektor 13.07. → Fake-Test 04.08. → Konkurrent Securias kopiert Produktname und Angle (15.08.) → 12V-Adapter 21.08. → Kontosperre ~01./02.09. → Neustart ab 06.09. mit neuen Hooks (Amazon, Enkel, Untreue-Hook).


---

# 2. META ADS INVENTORY

**Abruf:** Meta Ad Library, ausgeloggt, 23.09.2026. Standard-Sortierung laut Seitendaten: Gesamt-Impressionen absteigend. **Stichprobe:** 244 Schutzix-Anzeigen aus mehreren gefilterten Abfragen (Suchbegriff, Seite, Status, Medientyp), zusätzlich 37 Anzeigen fremder Werbetreibender (Logic Tech, eine Claudia-Schneider-Anzeige ohne Schutzix-Link). Die Stichprobe ist reichweitengewichtet und keine Vollerhebung von ≈1.124 Anzeigen. Alle Zählwerte sind Mindestwerte **[B]**.

## 2.1 Absender (Facebook-Seiten)

| Seite | Page-ID | Kategorie | Likes | Anzeigen gesamt (Ad Library) | in Stichprobe | davon aktiv | Rolle in den Anzeigen |
|---|---|---|---|---|---|---|---|
| Peter Schulz | 598649190003799 | Künstler/in | 140 | 417 (16 aktiv, 69 Video) | 107 | 7 | Feuerwehrmann-Ich-Erzähler (F2), F1 |
| Kohlenmonoxid Schutz | 1238673782654607 | Community | 67 | n. v. (Rate-Limit); 42 aktiv | 45 | 31 | F1 „grünes Licht“, Hauptträger der Reichweite |
| Andreas Schneider | 1245109945346392 | Community | 16 | 163 | 32 | 4 | Wohnmobil-Todesfall (F3), Enkel (F4), Notfallsanitäter |
| Claudia Schneider | 1057626940774811 | Personal blog | 1 | 82 | 25 | 1 | Schwangerschaft (F5), Pattern-Interrupts (F7) |
| Tagesbericht | 1283776534816019 | Personal blog | 1 | 49 | 30 | 8 | F1, „Meine Mutter …“ (F4) |
| Stefan Weber | 1101722279688439 | Personal blog | 1 | 35 | 4 | 4 | Amazon-Enemy (F8), Enkel (F4) |
| Helga Schmidt | 1300866896449004 | Community | 0 | 10 | 1 | 1 | „Um 3:15 morgens …“ (F7) |

*Zahler/Begünstigter aller 56 aktiven Anzeigen laut EU-Transparenz: „Schutzix“. Suchbegriff „schutzix“ gesamt: ≈1.124 Anzeigen, davon 113 aktiv, 1.012 inaktiv, 261 Video. Fremd-Seite mit identischer Copy: „Logic Tech“ (SE), ≈1.327 Anzeigen gesamt **[B]**.*

## 2.2 Querschnitt der 244 Schutzix-Anzeigen [B]

| Merkmal | Befund |
|---|---|
| Format | Bild 159, Video 85 (keine Karussells) |
| Headline | „Beschütz deine Familie“ 224 · „Dein Melder lügt dich an“ 18 · „Beschütz deine Familie bevor es zu spät ist“ 1 · Domain 1 |
| CTA-Button | „Mehr dazu“ 239 · „Details ansehen“ 5 |
| Link-Beschreibung | „Von der Feuerwehr entwickelt“ **172** · „Schutzix verwendet dieselbe elektrochemische Sensortechnologie, der … Einsatzkräfte vertrauen – die gleiche Technologie, die in kommerziellen Geräten über 200 € kostet …“ 46 · keine 25 |
| Ziel-URL | Womo-LP 95 · /sicherheit 59 · Haushalt-LP 54 · PDP 21 · PDP Womo 10 · /sicherheitv2 2 · Ratgeber 2 · Sicherheitsreport 1 |
| Plattformen | bis 09/2026 meist FB+IG+Audience Network+Messenger+Threads (144); aktive Anzeigen überwiegend nur FB+IG (49 von 56), vereinzelt + WhatsApp |
| Primärtext-Länge | min. 521 · Median 5.237 · max. 27.019 Zeichen |
| Starts pro Monat | Mai 28 · Juni 32 · Juli 66 · Aug. 35 · Sept. 83 (Neustart nach Sperre) |
| Status | 161 „Konto/Seite später wegen Verstoß deaktiviert“ · 83 regulär (davon 56 aktiv am 23.09.) |
| Targeting (aktive, EU-Transparenz) | DE + AT, 18–65+, alle Geschlechter, bei allen 56 identisch |

## 2.3 Hook-Inventar (32 Einstiegssätze) [B]

*Laufzeit = längste Einzelanzeige inkl. Start- und Endtag. „Dupl.“ = max. Anzahl Anzeigen mit identischer Gestaltung. Sortiert nach erstem Start.*

| # | Fam. | Hook (erster Satz) | Seite(n) | Start | Letzte Akt. | Max. Laufzeit | Anz. | Aktiv | Dupl. | Format | Ziel | Headline-Varianten | Beispiel-ID |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | F2 | „Ich bin seit sieben Jahren Feuerwehrmann.“ | Peter Schulz (16) | 19.05. | 01.09. | 106 T. | 16 | 0 | 1 | Bild 16 | /sicherheit 10, PDP 3, Womo-LP 3 | „Beschütz deine Familie“ | 1288671210099131 |
| 2 | F6 | „Unser Gutachter hat alles geprüft.“ | Peter Schulz (6) | 19.05. | 31.08. | 105 T. | 6 | 0 | 1 | Bild 6 | /sicherheit 5, /sicherheitv2 1 | „Beschütz deine Familie“, „schutzix.com“ | 694204973787421 |
| 3 | F2 | „Ich bin seit 14 Jahren Feuerwehrmann.“ | Peter Schulz (14) | 19.05. | 01.09. | 89 T. | 14 | 0 | 2 | Bild 14 | /sicherheit 10, PDP 4 | „Beschütz deine Familie“, „Beschütz deine Familie bevor es zu spät ist“ | 2363128324213603 |
| 4 | F9 | „Meine Frau und ich sind in unseren 60ern.“ | Peter Schulz (8) | 19.05. | 28.05. | 9 T. | 8 | 0 | 1 | Bild 8 | /sicherheit 8 | „Beschütz deine Familie“ | 988996070379937 |
| 5 | F6 | „Unser Vermieter hat gesagt, dieses Haus sei sicher.“ | Peter Schulz (10) | 28.05. | 16.06. | 20 T. | 10 | 0 | 1 | Bild 10 | /sicherheit 10 | „Beschütz deine Familie“ | 2283477875726309 |
| 6 | F3 | „Ein Ehepaar ist letzten Monat in ihrem Wohnmobil gestorben.“ | Peter Schulz (4) | 11.06. | 01.09. | 83 T. | 4 | 0 | 1 | Bild 4 | Womo-LP 2, /sicherheit 1, /sicherheitv2 1 | „Beschütz deine Familie“ | 1967822411273034 |
| 7 | F2 | „Ich arbeite seit 14 Jahren an der Notrufzentrale.“ | Claudia Schneider (1) | 17.06. | 19.06. | 3 T. | 1 | 0 | 1 | Bild 1 | Sicherheitsreport 1 | „Beschütz deine Familie“ | 1705494257246859 |
| 8 | F5 | „Meine Tochter wurde an einem Dienstag krank.“ | Claudia Schneider (3) | 17.06. | 30.06. | 13 T. | 3 | 0 | 1 | Bild 3 | /sicherheit 3 | „Beschütz deine Familie“ | 1316450036748210 |
| 9 | F1 | „Das grüne Licht bedeutet nur, dass dein Rauchmelder eingeschaltet ist.“ | Kohlenmonoxid Schutz (8) | 18.06. | 23.09. | 76 T. | 8 | 5 | 1 | Bild 8 | /sicherheit 3, PDP Womo 2, Ratgeber 2, PDP 1 | „Dein Melder lügt dich an“, „Beschütz deine Familie“ | 2068803054070551 |
| 10 | F1 | „Das grüne Licht bedeutet nur, dass der Melder Strom hat.“ | Kohlenmonoxid Schutz (2) | 18.06. | 22.09. | 32 T. | 2 | 1 | 1 | Bild 2 | /sicherheit 2 | „Dein Melder lügt dich an“ | 1207898291393696 |
| 11 | F1 | „Das grüne Licht bedeutet nur, dass dein Melder eingeschaltet ist.“ | Kohlenmonoxid Schutz (32), Peter Schulz (21), Tagesbericht (26) | 18.06. | 23.09. | 56 T. | 79 | 31 | 8 | Bild 17, Video 62 | Womo-LP 41, Haushalt-LP 17, PDP 10, PDP Womo 8, /sicherheit 3 | „Dein Melder lügt dich an“, „Beschütz deine Familie“ | 2258410601657351 |
| 12 | F5 | „Ich war in der 32. Schwangerschaftswoche, als mein Sohn an einem Dienstag aufhörte zu strampeln.“ | Claudia Schneider (2) | 20.06. | 23.06. | 4 T. | 2 | 0 | 1 | Bild 2 | /sicherheit 2 | „Beschütz deine Familie“ | 1573081541098323 |
| 13 | F3 | „Eine Mutter ist letzten August in ihrem Wohnmobil gestorben.“ | Claudia Schneider (2) | 06.07. | 01.09. | 58 T. | 2 | 0 | 1 | Bild 2 | Womo-LP 2 | „Beschütz deine Familie“ | 913717315082082 |
| 14 | F6 | „Unser Heizungsfachbetrieb hat eine Sache in unserem Haus übersehen, die meinen Mann das Leben gekostet und mir“ | Claudia Schneider (1) | 06.07. | 12.07. | 7 T. | 1 | 0 | 1 | Bild 1 | /sicherheit 1 | „Beschütz deine Familie“ | 1035617315735644 |
| 15 | F2 | „Ich bin seit 27 Jahren Feuerwehrmann.“ | Peter Schulz (27) | 08.07. | 23.09. | 52 T. | 27 | 3 | 5 | Bild 17, Video 10 | Womo-LP 21, Haushalt-LP 5, /sicherheit 1 | „Beschütz deine Familie“ | 1439033001306038 |
| 16 | F3 | „Ein Vater von zwei Kindern ist letzten Monat in seinem Wohnmobil gestorben.“ | Andreas Schneider (15) | 12.07. | 23.09. | 53 T. | 15 | 3 | 3 | Bild 11, Video 4 | Womo-LP 15 | „Beschütz deine Familie“ | 27697016116615123 |
| 17 | F3 | „Eine Mutter von zwei Kindern ist vor zwei Wochen in ihrem Wohnmobil gestorben.“ | Andreas Schneider (2) | 16.07. | 31.08. | 47 T. | 2 | 0 | 1 | Bild 2 | Womo-LP 2 | „Beschütz deine Familie“ | 27669184006025680 |
| 18 | F3 | „Eine ganze Familie ist letzten Monat in ihrem eigenen Haus fast gestorben.“ | Andreas Schneider (1) | 17.07. | 21.07. | 5 T. | 1 | 0 | 2 | Bild 1 | Haushalt-LP 1 | „Beschütz deine Familie“ | 1329055479392247 |
| 19 | F2 | „Ich bin seit 21 Jahren Notfallsanitäter.“ | Andreas Schneider (3) | 19.07. | 01.09. | 42 T. | 3 | 0 | 2 | Bild 3 | Haushalt-LP 3 | „Beschütz deine Familie“ | 1388542876482583 |
| 20 | F7 | „Sie hat überlebt und uns das Leben gerettet.“ | Claudia Schneider (2) | 23.07. | 01.09. | 41 T. | 2 | 0 | 1 | Bild 2 | Haushalt-LP 2 | „Beschütz deine Familie“ | 1572660224216833 |
| 21 | F3 | „Eine Mutter von zwei Kindern ist letzte Woche in ihrem Wohnmobil gestorben.“ | Andreas Schneider (2) | 23.07. | 01.09. | 41 T. | 2 | 0 | 1 | Bild 2 | Womo-LP 2 | „Beschütz deine Familie“ | 1683116906276340 |
| 22 | F5 | „Ich war in der 32. Schwangerschaftswoche, als mein Sohn an einem Dienstag aufgehört hat zu treten.“ | Claudia Schneider (9) | 27.07. | 23.09. | 37 T. | 9 | 0 | 1 | Bild 9 | Haushalt-LP 9 | „Beschütz deine Familie“ | 27684808751176586 |
| 23 | F4 | „Mein Mann ist vor einer Woche gestorben, weil wir diesen Sommer heiße Duschen genommen haben.“ | Claudia Schneider (2) | 31.07. | 13.08. | 14 T. | 2 | 0 | 2 | Bild 2 | Haushalt-LP 2 | „Beschütz deine Familie“ | 2292056584887770 |
| 24 | F4 | „Meine Frau ist vor zwei Wochen in unserem Wohnmobil gestorben.“ | Andreas Schneider (1) | 31.07. | 22.08. | 23 T. | 1 | 0 | 1 | Bild 1 | Womo-LP 1 | „Beschütz deine Familie“ | 1015338011415432 |
| 25 | F6 | „Unser Schornsteinfeger hat in unserer Wohnung etwas übersehen, das meinen Mann getötet und mir permanente H…“ | Claudia Schneider (1) | 03.08. | 30.08. | 28 T. | 1 | 0 | 2 | Bild 1 | Haushalt-LP 1 | „Beschütz deine Familie“ | 1839844270123693 |
| 26 | F4 | „Mein Enkel ist gestern in unserem Wohnmobil gestorben.“ | Andreas Schneider (2), Stefan Weber (1) | 14.08. | 23.09. | 10 T. | 3 | 2 | 1 | Bild 3 | Womo-LP 3 | „Beschütz deine Familie“ | 965334353264747 |
| 27 | F1 | „Das grüne Licht bedeutet nur, dass dein Standardmelder eingeschaltet ist.“ | Peter Schulz (1), Andreas Schneider (5), Kohlenmonoxid Schutz (3) | 21.08. | 22.09. | 11 T. | 9 | 3 | 3 | Video 9 | Haushalt-LP 6, Womo-LP 3 | „Dein Melder lügt dich an“ | 1391656426406385 |
| 28 | F7 | „Zum Glück ist unser Hund gestorben.“ | Claudia Schneider (1) | 23.08. | 01.09. | 10 T. | 1 | 0 | 1 | Bild 1 | Haushalt-LP 1 | „Dein Melder lügt dich an“ | 989857784112278 |
| 29 | F4 | „Meine Mutter ist gestern in ihrer Altbauwohnung gestorben.“ | Andreas Schneider (1), Tagesbericht (4) | 29.08. | 23.09. | 6 T. | 5 | 3 | 1 | Bild 5 | Haushalt-LP 5 | „Dein Melder lügt dich an“, „Beschütz deine Familie“ | 1032616399768836 |
| 30 | F7 | „Ich hab meinen Mann betrogen.“ | Claudia Schneider (1) | 19.09. | 23.09. | 5 T. | 1 | 1 | 1 | Bild 1 | Haushalt-LP 1 | „Beschütz deine Familie“ | 1088496076964370 |
| 31 | F7 | „Um 3:15 morgens hat mein siebenjähriger Enkel zu mir aufgeschaut und mir vier Wörter zugeflüstert, die ich für“ | Helga Schmidt (1) | 19.09. | 23.09. | 5 T. | 1 | 1 | 1 | Bild 1 | Haushalt-LP 1 | „Beschütz deine Familie“ | 2007214149984393 |
| 32 | F8 | „Ich flehe euch an, hört auf, diese Kohlenmonoxid-Melder auf Amazon oder im Baumarkt zu kaufen.“ | Stefan Weber (3) | 20.09. | 23.09. | 4 T. | 3 | 3 | 1 | Bild 3 | PDP 3 | „Beschütz deine Familie“ | 1108633251554464 |

## 2.4 Reichweitenstärkste aktive Anzeigen (EU-Reichweite bis 23.09.) [B]

| Ad-ID | Seite | Familie | Format | Ziel | EU-Reichweite | Start | Hook |
|---|---|---|---|---|---|---|---|
| [879090481802544](https://www.facebook.com/ads/library/?id=879090481802544) | Peter Schulz | F1 | Video | Womo-LP | 37997 | 06.09. | „Das grüne Licht bedeutet nur, dass dein Melder eingeschaltet ist. Es b…“ |
| [1092560463728571](https://www.facebook.com/ads/library/?id=1092560463728571) | Kohlenmonoxid Schutz | F1 | Video | PDP | 33801 | 12.09. | „Das grüne Licht bedeutet nur, dass dein Melder eingeschaltet ist. Es b…“ |
| [828993190275745](https://www.facebook.com/ads/library/?id=828993190275745) | Kohlenmonoxid Schutz | F1 | Video | Womo-LP | 29568 | 16.09. | „Das grüne Licht bedeutet nur, dass dein Melder eingeschaltet ist. Es b…“ |
| [1638284251425679](https://www.facebook.com/ads/library/?id=1638284251425679) | Kohlenmonoxid Schutz | F1 | Video | PDP | 17871 | 12.09. | „Das grüne Licht bedeutet nur, dass dein Melder eingeschaltet ist. Es b…“ |
| [1745472693387631](https://www.facebook.com/ads/library/?id=1745472693387631) | Kohlenmonoxid Schutz | F1 | Bild | Womo-LP | 13058 | 15.09. | „Das grüne Licht bedeutet nur, dass dein Melder eingeschaltet ist. Es b…“ |
| [1082289964197024](https://www.facebook.com/ads/library/?id=1082289964197024) | Peter Schulz | F1 | Video | Womo-LP | 8244 | 06.09. | „Das grüne Licht bedeutet nur, dass dein Melder eingeschaltet ist. Es b…“ |
| [2112633746128884](https://www.facebook.com/ads/library/?id=2112633746128884) | Kohlenmonoxid Schutz | F1 | Bild | Womo-LP | 7586 | 14.09. | „Das grüne Licht bedeutet nur, dass dein Melder eingeschaltet ist. Es b…“ |
| [1374952511373943](https://www.facebook.com/ads/library/?id=1374952511373943) | Andreas Schneider | F4 | Bild | Womo-LP | 6654 | 14.09. | „Mein Enkel ist gestern in unserem Wohnmobil gestorben. Das Schlimmste …“ |
| [2108584679866240](https://www.facebook.com/ads/library/?id=2108584679866240) | Peter Schulz | F2 | Bild | Womo-LP | 4970 | 14.09. | „Ich bin seit 27 Jahren Feuerwehrmann. Vor zwei Wochen bin ich um sechs…“ |
| [973441165787653](https://www.facebook.com/ads/library/?id=973441165787653) | Andreas Schneider | F3 | Bild | Womo-LP | 4185 | 13.09. | „Ein Vater von zwei Kindern ist letzten Monat in seinem Wohnmobil gesto…“ |
| [1380239240892741](https://www.facebook.com/ads/library/?id=1380239240892741) | Peter Schulz | F1 | Video | Womo-LP | 3757 | 06.09. | „Das grüne Licht bedeutet nur, dass dein Melder eingeschaltet ist. Es b…“ |
| [1408278238073299](https://www.facebook.com/ads/library/?id=1408278238073299) | Peter Schulz | F2 | Bild | Womo-LP | 3616 | 13.09. | „Ich bin seit 27 Jahren Feuerwehrmann. Vor zwei Wochen bin ich um sechs…“ |
## 2.5 Steckbriefe der Schlüsselanzeigen [B, Wertung I]

| Anzeige | Absender · Laufzeit · Format · Plattformen | Headline · CTA · Link-Beschreibung · Ziel | Hook / Primärtext | Visual / Video | Wiederkehrende Claims | Avatar · Angle | Winner-Signal |
|---|---|---|---|---|---|---|---|
| **[1288671210099131](https://www.facebook.com/ads/library/?id=1288671210099131)** (F2-Ursprung) | Peter Schulz · 19.05.–01.09. (106 T.) · Bild · FB/IG/AN/MSG/TH | „Beschütz deine Familie“ · Mehr dazu · „Von der Feuerwehr entwickelt“ · /pages/sicherheit | „Ich bin seit sieben Jahren Feuerwehrmann. Vor neun Monaten … habe jeden Melder von meinen eigenen Wänden gerissen.“ 12.309 Zeichen | Einsatzkräfte mit Messgerät vor Wohnhaus | 70 ppm/4 h (US-Norm), „Profis vertrauen nur Zahl“ | Hausbesitzer-Familie · Insider-Geständnis | längste Laufzeit der Stichprobe, 3× neu produziert |
| **[879090481802544](https://www.facebook.com/ads/library/?id=879090481802544)** (F1) | Peter Schulz · ab 06.09., aktiv · Video · FB/IG | „Beschütz deine Familie“ · Mehr dazu · Wohnmobil-LP | „Das grüne Licht bedeutet nur, dass dein Melder eingeschaltet ist. Es bedeutet nicht, dass er alle Gefahren erkennt.“ | KI-Story-Reel mit Voiceover/Wort-Untertiteln | „ab 30+ PPM“, CO + Erdgas + Propan, Tote/Jahr | breit · Symbol-Umdeutung | höchste EU-Reichweite aller aktiven Anzeigen (37.997) |
| **[2258410601657351](https://www.facebook.com/ads/library/?id=2258410601657351)** (F1) | Peter Schulz · 14.08.–01.09. (Sperre) · Video | „Beschütz deine Familie“ · Mehr dazu · Haushalt-LP | wie oben | KI-Story-Reel bzw. illustriertes True-Crime (Familie F1) | Tote/Jahr, „ab 30+ PPM“ | breit · Symbol-Umdeutung | 8 Duplikate (Höchstwert der Stichprobe) |
| **[1439033001306038](https://www.facebook.com/ads/library/?id=1439033001306038)** (F2 Womo) | Peter Schulz · 22.07.–31.08. · Video (Text-Scroll 15:07) | „Beschütz deine Familie“ · Wohnmobil-LP | „Ich bin seit 27 Jahren Feuerwehrmann. Vor zwei Wochen … Stellplatz an der Müritz …“ | Feuerwehr vor Wohnmobil im Nebel | 48/67/>90 ppm vor Ort, 32-ppm-Piepen | Womo 55+ · Profi-Zeuge | 5 Duplikate, nach Sperre wieder aktiv |
| **[27697016116615123](https://www.facebook.com/ads/library/?id=27697016116615123)** (F3) | Andreas Schneider · 22.07.–01.09. · Video (Scroll-Text) | „Beschütz deine Familie“ · Wohnmobil-LP | „Ein Vater von zwei Kindern ist letzten Monat in seinem Wohnmobil gestorben. Warum spricht keiner darüber?“ | Sanitäter mit Trage am Campingplatz | „Ich bestellte acht“ (Mengen-Seeding) | Womo-Familie · Tabu + Tod | 15 Anzeigen, 53 T., Neuauflage |
| **[1374952511373943](https://www.facebook.com/ads/library/?id=1374952511373943)** (F4) | Andreas Schneider · ab 14.09., aktiv · Bild | Wohnmobil-LP | „Mein Enkel ist gestern in unserem Wohnmobil gestorben.“ | Campingplatz-Einsatz (euer Screenshot 18.09.) | Wespennest im Abgasweg | Womo-Großeltern · Schuld | zweitstärkste Nicht-F1-Reichweite (6.654) |
| **[27684808751176586](https://www.facebook.com/ads/library/?id=27684808751176586)** (F5) | Claudia Schneider · 27.07.–28.08. · Bild | Haushalt-LP | „Ich war in der 32. Schwangerschaftswoche, als mein Sohn … aufgehört hat zu treten.“ | Feuerwehr vor Reihenhaus mit Kinderwagen | „Grade-3-Sensor“, 70 ppm/4 h | Schwangere · max. Fallhöhe | 9 Anzeigen, Funnel-Bruch zur LP |
| **[1108633251554464](https://www.facebook.com/ads/library/?id=1108633251554464)** (F8) | Stefan Weber · ab 20.09., aktiv · Bild (Story + Feed) · FB/IG | PDP direkt | „Ich flehe euch an, hört auf, diese Kohlenmonoxid-Melder auf Amazon oder im Baumarkt zu kaufen.“ | Karton-/Unboxing-Foto | „ab 1 ppm“, „Warnung ab 15 ppm“, 60 € Bundle, lebenslange Garantie | Vergleicher · Enemy + Test | Test, einzige Anzeige mit Preis |
| **[694204973787421](https://www.facebook.com/ads/library/?id=694204973787421)** (F6) | Peter Schulz · 19.05.–22.08. (Hook-Familie bis 31.08., 105 T.) · Bild | /sicherheit | „Unser Gutachter hat alles geprüft. …“ | Einsatzbild Wohnhaus | „Die Familie vor uns …“ | Hauskäufer · Autoritätsversagen | zweitlängste Laufzeit |
| **[1088496076964370](https://www.facebook.com/ads/library/?id=1088496076964370)** / **[2007214149984393](https://www.facebook.com/ads/library/?id=2007214149984393)** (F7) | Claudia Schneider / Helga Schmidt · ab 19.09., aktiv · Bild · FB/IG | Haushalt-LP | „Ich hab meinen Mann betrogen.“ / „Um 3:15 morgens hat mein siebenjähriger Enkel …“ | Story-Fotos | „Einen für eure Tochter. Einen für eure Mutter.“ | breit · Pattern-Interrupt | neue Tests nach Sperre |

## 2.6 Zuordnung eurer Screenshots [B]

| Datei(en) | Datum | Inhalt | Zuordnung |
|---|---|---|---|
| IMG_3917–3918 | 17.09. | IG-Feed, Absender peter.schulz64 (0 Beiträge, 516 Follower), Leiche vor Wohnmobil → LP „Brandinspektor warnt“ | F10-Visual, Wohnmobil-LP |
| IMG_3952 | 18.09. | IG-Reels, Andreas Schneider, Campingplatz-Einsatz | Visual zu F4 „Mein Enkel …“ |
| IMG_3953–3971 | 18.09. | Primärtext „Mein Enkel ist gestern …“, Link /pages/wohnmobil | F4, Ad 1374952511373943 |
| IMG_3984–4016 | 19.09. | Claudia Schneider „32. Schwangerschaftswoche …“, Link Haushalt-LP | F5 |
| IMG_4017 | 19.09. | Feuerwehr vor Reihenhaus mit Kinderwagen | Visual zu F5 |
| IMG_4029 | 19.09. | Static „Beschütz deine Familie“, Rettungsdienst im Wohnzimmer | F10 |
| IMG_4074 | – | KI-Bild Senioren in Rettungsdecken vor Wohnmobil | F10 (KI-Artefakte) |
| IMG_4097–4102 | 21.09. | Story Stefan Weber „Ich flehe euch an …“ → PDP mit HERBST SALE/Countdown/E-Book | F8 |
| IMG_4200 | 22.09. | Story „RAUCHMELDER ERKENNEN RAUCH. NICHT KOHLENMONOXID.“ | F10 |
| IMG_4202 | 22.09. | FB-Seite Stefan Weber (Personal Blog, 1 Follower), Karton-Ad, Countdown 07:57:28 um 16:02 | F8/F11 |
| IMG_4201 · IMG_4206 · IMG_4207 | 22.09. | Mavoni PureAlert (gleiches Gerät) · Securias-Story (Bestatter vor Wohnmobil) · KI-Bild unklarer Herkunft | Wettbewerber |


---

# 3. CREATIVE FAMILY ANALYSIS

**Vorbemerkung zur Architektur [B/I]:** Schutzix trennt drei Ebenen, die man bewusst getrennt analysieren muss:

1. **Primärtext.** Er trägt den Belief Shift und ist meist extrem lang: rund 500 bis 27.000 Zeichen, im Median gut 5.200.
2. **Visual oder Video.** Es trägt den Thumbstop und die Emotion: Einsatz-Szenen, KI-Story-Reels, Tatort-Illustrationen.
3. **Absender.** Er trägt die Glaubwürdigkeit. Persona-Seiten wirken wie Privatpersonen, nicht wie eine Marke.

Dieselbe Text-Idee läuft mit bis zu drei verschiedenen Video-Stilen. Dieselbe Video-Idee läuft mit Tochter- oder Enkel-Variante und mit Haushalt- oder Wohnmobil-Variante.

**Awareness-Logik (nach Schwartz):** Die große Mehrheit der Creatives zielt auf **Problem-Unaware bis Problem-Aware**. Das sind Menschen, die glauben, geschützt zu sein, weil ein Rauchmelder hängt. Deshalb steigen die Ads mit Geschichten ein und nicht mit dem Produkt. Nur die „grünes Licht“-Familie (Problem→Solution-Aware) und die Amazon-Ad (Solution-/Product-Aware) steigen rational ein.

## F1 · „Das grüne Licht lügt“ – Mechanismus-Kurztext + emotionales Video  ⟶ *Scale-Engine*

| Feld | Befund |
|---|---|
| Belege | 79 Anzeigen der Hauptvariante in der Stichprobe (62 Video, 17 Bild) plus 19 Anzeigen in Textvarianten, Seiten „Kohlenmonoxid Schutz“, „Peter Schulz“, „Tagesbericht“, später auch „Andreas Schneider“; 18.06.→23.09., bis zu **8 Duplikate** je Creative (Ad-IDs z. B. 2258410601657351, 28904866525781931, 1000219713056185, 1000871642984415, 975544861956543) **[B]** |
| Hook (Text) | „Das grüne Licht bedeutet nur, dass dein Melder eingeschaltet ist. Es bedeutet nicht, dass er alle Gefahren erkennt.“ Varianten: „…dein Rauchmelder…“, „…dein Standardmelder…“, „…dass der Melder Strom hat. Es bedeutet nicht, dass du sicher bist.“ **[B]** |
| Headline-Test | „Beschütz deine Familie“ vs. „Dein Melder lügt dich an“ **[B]** |
| Thumbstopper / erste 1–3 s (Video) | Typ A, KI-Story-Reel: Mutter hält nachts ein schlaffes Kind, Wort-für-Wort-Untertitel, Voiceover „Um drei Uhr nachts wollte ich meine Tochter wecken und sie konnte ihren Kopf nicht heben.“ Wohnmobil-Version: Opa und Enkel im Alkoven, Split-Screen mit „Reaction“-Mann im Wohnmobil. Typ B, illustriertes True-Crime: Absperrband am Stellplatz, Einblendung „TATORT am Bodensee → Das war der Täter…“ bzw. „Todesfall im Wohnmobil → das war die Ursache…“, Datumsstempel „JUNI 2026“, Karten-Pin. **[B – Frames/Transkript]** |
| Hauptangle | Umdeutung eines vertrauten Objekts. Das grüne LED bedeutet nicht mehr „sicher“, sondern nur noch „hat Strom“. Die neue Sicherheitsnorm ist eine Zahl auf dem Display. |
| Zielgruppe | breit, Haushalt und Wohnmobil gleichermaßen (Links: 41× Wohnmobil-LP, 17× Haushalt-LP, 18× Produktseiten, 3× /sicherheit) **[B]** |
| Problem / Emotion | Kontrollverlust, weil man nicht weiß, was man einatmet. Im Video maximale Angst (Kind wacht nicht auf), im Text ruhige Sachlichkeit. |
| Belief Shift | „Mein Melder leuchtet grün, also ist alles gut“ → „Grün heißt nur Strom“ → „Ich brauche eine Zahl und mehr als nur CO“. |
| Story-Struktur (Video, Transkript) | Schock-Hook → „So sieht eine CO-Vergiftung um 3 Uhr morgens aus“ → Wirkmechanismus („Die Organe ersticken innerlich“) → Todeszahl → Quellenliste → Rauchmelder-Mythos → „Baumarkt/Amazon bleiben stumm bis 70 ppm“ → „Körper eines Kindes versagt ab 30“ → Produkt („den Feuerwehrleute selbst benutzen“, „zeigt dir den Wert ab null“) → Ich-Autorität („Ich bin seit 7 Jahren bei der Feuerwehr“) → Einfachheit („Einstecken, 30 Sekunden“) → CTA („Der Link unter dem Video erklärt alles … warum über 12.873 Familien gewechselt haben“) **[B]** |
| Autorität / Social Proof | anonyme Feuerwehr-Ich-Stimme im Video, „12.873 Familien“ bzw. „9.000 Wohnmobilbesitzer“ |
| Produktpräsentation | Im Kurztext direkt: „erkennt CO, Erdgas und Propan gleichzeitig. Er warnt bereits ab 30+ PPM und zeigt alle Werte in Echtzeit“. Im Video erst ab ca. 70 % Laufzeit. |
| CTA / Offer | „👉 Jetzt entdecken:“ + Link; im Video „Link unter dem Video“; **kein Preis** im Ad |
| Claims (Auswahl) | „Über 463 / 550 / 400 Menschen sterben jedes Jahr“ (je nach Video!), „Kinder zeigen Symptome ab 20“, „Hirnschäden beginnen bei 40“, „In einem Wohnmobil wird es in unter 2 Stunden tödlich“, „Juni 2026 am Bodensee, Stellplatz 17“ (nicht verifizierbar) **[B]** |
| Visual Style | KI-fotoreal (Menschen, Krankenhaus, 3D-CO-Wolke, Anatomie-Renderings), KI-Illustration im Vintage-Stil, Burned-in-Captions, 9:16 |
| Native-Ad-Mechanik | wirkt wie ein Aufklärungs-Reel von „Tagesbericht“ oder „Kohlenmonoxid Schutz“, nicht wie Werbung |
| Plattform | FB/IG Feed und Reels, zusätzlich Audience Network/Messenger/Threads (bis 09/2026), ab 09/2026 teils WhatsApp **[B]** |
| Funnel-Kohärenz | **gut** zur Wohnmobil-LP („Ein Brandinspektor erklärt, was 9.000 Wohnmobilbesitzer jetzt anders machen“ → LP „Brandinspektor warnt“), **mittel** zu den Produktseiten |

**Warum das die Scale-Engine ist [I]:** Der Text ist kurz, wahr klingend und fast policy-neutral, der Schock steckt im Video. Das erlaubt Skalierung über viele Seiten, Konten, Placements und beide Segmente. Außerdem hat ein fremder Dropshipper („Logic Tech“, Schweden, store.svelund.com) exakt diesen Text am 17.09. ins Schwedische übersetzt **[B]**. Klone kopieren, was sie für einen Gewinner halten.

## F2 · Einsatzkraft-Ich-Erzähler („Ich bin seit X Jahren Feuerwehrmann …“) ⟶ *Core Angle*

| Feld | Befund |
|---|---|
| Belege | Ursprungs-Ad 1288671210099131 („seit sieben Jahren … vor neun Monaten … jeden Melder von meinen eigenen Wänden gerissen“), 19.05.–01.09. = **106 Tage**, 12.309 Zeichen **[B]**. Varianten: 7 → 14 → 27 Dienstjahre; „vor neun/acht Monaten/zwei Wochen“; Haus → Stellplatz Müritz → Wohnung. Wohnmobil-Variant „27 Jahre / Müritz“ mit 19 Anzeigen, davon 10 Videos (Text-Scroll, 15:07 min), bis 5 Duplikate, auch nach der Sperre wieder aktiv (z. B. 1408278238073299 ab 13.09.) **[B]**. Ableger: „Ich bin seit 21 Jahren Notfallsanitäter“ (Andreas Schneider), „Ich arbeite seit 14 Jahren an der Notrufzentrale“ (Claudia Schneider, 3 Tage) **[B]** |
| Hook / erste Zeilen | „Ich bin seit 27 Jahren Feuerwehrmann. Vor zwei Wochen bin ich um sechs Uhr morgens von einem Stellplatz an der Müritz zurückgekommen und habe den Standardmelder aus meinem eigenen Wohnmobil gerissen.“ **[B]** |
| Thumbstopper | Bild: Feuerwehrleute mit Messgerät vor Wohnmobil im Nebel oder vor Reihenhaus. Video: derselbe Clip, darüber scrollt der gesamte Text. |
| Hauptangle | Insider-Geständnis. Der Profi, „der alles gesehen hat“, misstraut selbst dem Standardgerät. |
| Belief Shift | „Ein neuer, getesteter Melder schützt mich“ → „Er funktioniert einwandfrei, und genau das ist das Problem: Er ist so gebaut, dass er bis 70 ppm wartet“ → „Profis vertrauen nur Geräten mit Zahl“. |
| Story-Struktur | In-medias-res-Einsatz (Uhrzeit „1:47“, „4:17“) → sensorische Szene (Kinder in Decken, erbrechende Mutter) → Messwerte vor Ort (48/67/>90 ppm) → Entdeckung „Melder grün, stumm“ → „Er hat genau das getan, was er tun soll“ → Ich-Wendepunkt zu Hause → Recherche → Kollege/Schwager-Empfehlung → Beweis-Episode (Familie Hoffmann: Schutzix piept bei 32 ppm, alter Melder stumm) → Moral → „unten verlinkt“ → Kommentar-Aufforderung |
| Autorität | Berufsidentität, Dienst-Messgerät, konkrete ppm-Werte, Kollegen-Sprache („Einer der Veteranen, Müller“) |
| Social Proof | Kollegen- und Heizungsmonteur-Empfehlung in der Story, kein Zahlen-Proof |
| CTA | „Ich hab den, den ich benutze, unten verlinkt für alle, die interessiert sind. Bitte bleibt sicher. 🙏“ + „Was habt ihr … erlebt? Schreibt es bitte in die Kommentare 👇“ **[B]** |
| Claims | „Sie sind verpflichtet, bei 70 ppm innerhalb von 60 bis 240 Minuten Alarm zu schlagen … bei 30/40/50 ppm dürfen sie komplett stumm bleiben“ (US-Norm, in DE falsch); „Hergestellt 2024“, „Lindenstraße“, „Schulbus“ **[B]** |
| Visual Style | dokumentarisch, blau-grau, Handy-Look, Einsatzkleidung mit „FEUERWEHR“ |
| Native-Mechanik | liest sich wie ein viraler Facebook-Post eines Feuerwehrmanns. Die Seite „Peter Schulz“ ist als *Künstler/in* kategorisiert **[B]** |
| Ziel-LP | /pages/sicherheit, später /pages/wohnmobil bzw. /pages/brandinspektor-… **[B]** |
| Funnel-Kohärenz | Die LP-Autorität heißt „Markus Weber, Brandinspektor“, nicht „Peter Schulz“. Die Übergabe funktioniert emotional („ein Brandinspektor erklärt“), logisch ist sie inkonsistent. |

## F3 · Wohnmobil-Todesfall in dritter Person („… ist letzten Monat in seinem Wohnmobil gestorben. Warum spricht keiner darüber?“) ⟶ *Segment-Core*

| Feld | Befund |
|---|---|
| Belege | „Ein Ehepaar …“ (Peter Schulz, ab 11.06., 83 Tage), „Ein Vater von zwei Kindern …“ (Andreas Schneider, 15 Anzeigen, ab 12.07., Videos mit 3 Duplikaten, nach der Sperre wieder aktiv ab 13.09.), „Eine Mutter von zwei Kindern …“, „Eine Mutter ist letzten August …“ **[B]** |
| Hook | Tod + Tabu-Frage („Warum spricht keiner darüber?“) = Neugier plus Empörung |
| Erste Zeilen | Steckbrief der Opfer: „Andreas war 38. Sabine ist 36. Emma ist 10. Bastian ist 7.“ Dazu Alltag und Sympathie („Die Sorte Vater, der seinen Kindern jeden Morgen selbst das Frühstück gemacht hat“) |
| Thumbstopper | DRK-Sanitäter mit Trage am nebligen Campingplatz, RTW mit Blaulicht (Scroll-Text-Video 4:21 min) bzw. Leiche unter Plane vor offenem Wohnmobil (IG, peter.schulz64) **[B]** |
| Belief Shift | „Wir sind erfahrene Camper, wir wissen Bescheid“ → „Sogar der Physiklehrer, der wusste, was CO ist, ist gestorben“ → „Wissen schützt nicht, messen schon“. |
| Mechanik | Der Erzähler ist ein Dritter, der die Geschichte „gelesen hat“ („Ich habe das gelesen und in derselben Nacht acht bestellt. Zwei fürs Wohnmobil. Zwei fürs Haus. Vier für meinen Bruder“). **Die Kaufhandlung wird modelliert, inklusive Menge.** **[B]** |
| Zielgruppe | Wohnmobil-Familien 35–50 (Vater-Variante), Wohnmobil-Senioren (Ehepaar-Variante) |
| Ziel-LP | /pages/wohnmobil (hohe Kohärenz: Truma, Stellplatz, Wespennest) |

## F4 · Angehörigen-Verlust, Ich-Erzähler („Mein Enkel ist gestern … gestorben“) ⟶ *Neu-Tests & Refresh*

| Feld | Befund |
|---|---|
| Belege | „Mein Enkel ist gestern in unserem Wohnmobil gestorben“ (ab 14.08., Andreas Schneider und Stefan Weber, aktiv; euer Screenshot Native Ad 1); „Meine Mutter ist gestern in ihrer Altbauwohnung gestorben“ (19.283 Zeichen, ab 29.08., „Tagesbericht“/Andreas, aktiv); „Mein Mann ist vor einer Woche gestorben, weil wir diesen Sommer heiße Duschen genommen haben“; „Meine Frau ist vor zwei Wochen in unserem Wohnmobil gestorben“ **[B]** |
| Hook-Formel | *[Nahe Person] ist [gestern] in [unserem sicheren Ort] gestorben. Das Schlimmste daran ist: Ich dachte, ich hätte alles richtig gemacht / ich hätte es verhindern können.* |
| Emotion | antizipierte Schuld: „Ich sagte ihr: ‚Er ist bei uns. Er ist sicher.‘ … Ich wusste nicht, dass ich log.“ |
| Belief Shift | „Ich bin der Vorsichtige“ → „Ich prüfte alles, was ich sehen konnte. Ich prüfte nie die Luft.“ |
| Story-Struktur | Idylle mit Detail-Ankern (Decathlon-Angelbox, Stoffhund) → Kompetenz-Liste (Keile, Landstrom, Druckminderer, Gasflasche …) → nächtliche Symptome → Tod → Feuerwehr erklärt (Wespennest) → „Menschen glauben, wenn …“ (5-fache Anapher) → Produkt als „was er für seine eigenen Enkel nehmen würde“ → Selbst-Check-Fragen → „Ich habe das gestern gesagt. Heute ist mein Enkel tot.“ **[B]** |
| Schwächen | Zeitlogik („gestern gestorben“, aber schon entlassen, Ursache ermittelt, 2.000-Wörter-Post), Namensrecycling (Karin, Weber, Schneider) **[B]** |

## F5 · Schwangerschaft / kleine Kinder ⟶ *Test mit maximaler Fallhöhe*

| Feld | Befund |
|---|---|
| Belege | „Ich war in der 32. Schwangerschaftswoche, als mein Sohn an einem Dienstag aufgehört hat zu treten…“ (Claudia Schneider, 11 Anzeigen in der Stichprobe, erstmals 20.06., letzte Aktivität 23.09.); „Meine Tochter wurde an einem Dienstag krank…“ (13 Tage, Juni; Schluss: „Mia wurde vergiftet. Finn hat Gehirnschäden erlitten.“) **[B]** |
| Claims | „Standard-CO-Melder … dürfen erst bei 70 ppm … bis zu vier Stunden“, „Hirnschäden können bei Föten schon bei viel niedrigeren Konzentrationen entstehen“, „Grade-3-Sensortechnologie – den gleichen Sensor-Typ, den wir bei der Feuerwehr … verbaut haben“ **[B]** |
| Plot-Brüche | Hook („Am Freitag wusste ich …, am Sonntag erfuhr ich, was ihn getötet hat“) passt nicht zum Text (Ursache erst ~6 Wochen später). Der Hund schläft im Keller, wo laut Story >90 ppm gemessen werden. „Krankenhausflur“ statt Praxis. Fehlende Leerzeichen („Emil Schneider.Emil, Essen ist fertig.“) **[B]** |
| Funnel-Kohärenz | **schwach**: Die LP (Haushalt-Brandinspektor) erwähnt Schwangerschaft nicht **[B]** |
| Bewertung | maximaler Thumbstop, maximales Policy- und Backlash-Risiko **[I]** |

## F6 · Versagen einer Autorität („Unser Gutachter / Vermieter / Schornsteinfeger / Heizungsfachbetrieb hat übersehen …“)

| Feld | Befund |
|---|---|
| Belege | Gutachter (19.05.–31.08., 105 Tage), Vermieter (28.05.–16.06., 20 Tage, dann weg), Heizungsfachbetrieb (06.–12.07., 7 Tage) → ersetzt durch Schornsteinfeger (03.–30.08.) **[B]** |
| Hook-Mechanik | Vertrauensbruch durch die Instanz, die für Sicherheit zuständig ist. Der Leser verliert sein letztes Sicherheitsnetz („Wartung war doch gemacht“). |
| Belief Shift | „Wartung/Prüfung = Sicherheit“ → „Prüfung ist eine Momentaufnahme“ → „Dauerüberwachung mit Zahl“. |
| Risiko | Pauschale Diskreditierung realer Berufsgruppen (Schornsteinfeger, SHK) **[I]** |

## F7 · Pattern-Interrupt / Neugier-Hooks ⟶ *Tests nach der Sperre*

| Hook (wörtlich) | Absender / Start | Mechanik |
|---|---|---|
| „Ich hab meinen Mann betrogen. Und ich bin froh, dass ich es gemacht hab. Weil es mich und meine Kinder gerettet hat.“ | Claudia Schneider, 19.09., aktiv | Tabu-Geständnis, gegen die Erwartung aufgelöst (Untreue-Story → Urlaub → CO) |
| „Zum Glück ist unser Hund gestorben. Das hat mir der Feuerwehrmann gesagt…“ | Claudia Schneider, 23.08.–01.09. | moralischer Schock, Tier als Frühwarner |
| „Sie hat überlebt und uns das Leben gerettet…“ (Hündin Bella, 23.133 Zeichen) | Claudia Schneider, 23.07.–01.09. | Tierliebe als Emotionsträger |
| „Um 3:15 morgens hat mein siebenjähriger Enkel … vier Wörter zugeflüstert: ‚Oma. Wird Emma sterben?‘“ | Helga Schmidt, 19.09., aktiv | Open Loop + Kinderstimme; Schluss mit Mengen-CTA „Einen für euch. Einen für eure Tochter. Einen für eure Mutter.“ |

**[I]** Nach der Kontosperre testet Schutzix gezielt neue Einstiegswinkel mit geringerer Ähnlichkeit zu den gesperrten Anzeigen. Das dient vermutlich auch dazu, Wiedererkennung durch Review-Systeme zu vermeiden. **[S]** Motivlage nicht belegbar.

## F8 · Amazon/Baumarkt-Enemy mit Selbsttest ⟶ *Direct-Response-Test (Solution-Aware)*

| Feld | Befund |
|---|---|
| Belege | „Ich flehe euch an, hört auf, diese Kohlenmonoxid-Melder auf Amazon oder im Baumarkt zu kaufen.“ (Stefan Weber, 3 Anzeigen, ab 20.09., aktiv; euer Screenshot Native Ad 4) **[B]** |
| Format | Story-Placement: UGC-Unboxing-Foto (Karton, 2 Geräte, Dankeskarte). Laut Buchstaben-Artefakten KI-generiert oder KI-bearbeitet **[I]**. FB-Feed mit Kartonfoto. |
| Struktur | Test-Narrativ in 3 Prüfungen (Live-Anzeige → Mehrgas → Frühwarnung) → Enemy („Amazon hat keine Qualitätskontrolle“) → Produkt mit **neuen Specs** („Werte ab 1 ppm“, „Warnung schon bei 15 ppm“, „Entwickelt von einem ehemaligen Feuerwehrmann“, „nur auf der offiziellen Website“) → Preis-Framing („60 Euro im Familien-Bundle mit 50 Prozent Rabatt. Ja, mehr als die 20-Euro-Melder“) → Garantie („Lebenslange Garantie. 90 Tage Geld-zurück“) → Link direkt auf PDP → P.S. **[B]** |
| Bewertung | **Einzige Familie mit Preis und Garantie im Ad.** Sie spricht Käufer an, die schon bei Amazon vergleichen **[I]**. Gleichzeitig ist sie die widersprüchlichste Ad: 6/8 vs. 12 getestete Melder, 3 vs. 4 Gefahren, falsche EU-Norm, 15 ppm vs. 30 ppm auf der eigenen PDP **[B]**. |

## F9 · Großeltern / Senioren im eigenen Haus

| Feld | Befund |
|---|---|
| Belege | „Meine Frau und ich sind in unseren 60ern. Unsere Enkel schlafen jedes Wochenende bei uns…“ (19.–28.05., **9 Tage**, dann nicht wieder) **[B]**; später in F4/F7 eingewebt (Oma Helga, Mutter Ingrid 68) |
| Befund | Als eigener Einstieg früh abgebrochen, als Rolle in anderen Stories weitergenutzt **[I]** |

## F10 · Statische Problem-Solution- und Notfall-Visuals

| Creative | Befund |
|---|---|
| „RAUCHMELDER ERKENNEN RAUCH. NICHT KOHLENMONOXID. / Deshalb gehört Schutzix in jedes Wohnmobil. CO-Werte in Echtzeit. Früherkennung, die schützt.“ (Story, Wohnmobil-Innenraum, Gerät in Schuko-Dose) | euer Screenshot 22.09.; Render mit verstümmelten LED-Labels („Bstlieo“, „Stirerig“) → KI-generiert **[I]** |
| „Beschütz deine Familie“ + Rettungsdienst im Wohnzimmer (Blaulicht durchs Fenster) | euer Screenshot 19.09. **[B]** |
| Einsatzbilder ohne Produkt: Leiche unter Plane vor Wohnmobil (IG), Campingplatz-Einsatz mit Trage (Reels), Löschfahrzeug vor Reihenhaus mit Kinderwagen | eure Screenshots 17.–19.09. **[B]** |
| Senioren in Rettungsdecken vor Wohnmobil (Native Ad 5) | KI-Artefakte (RTW-Beschriftung verstümmelt) **[I]** |

**Mechanik [I]:** Das Bild imitiert ein Nachrichtenfoto und zeigt bewusst **kein Produkt**. So entsteht keine Werbe-Abwehr, der Text übernimmt den Verkauf.

## F11 · Produkt-/UGC-Beweis

Der Karton auf dem Holztisch (FB-Ad Stefan Weber) wirkt real. Die Story-Version mit Treibholz-Deko zeigt dagegen typische KI-Buchstabenfehler („kining“, Formel „E₃H₂“) **[I]**. **Echte Kunden-UGC ist nirgends zu sehen [B]**: Weder in der Ad-Stichprobe noch auf der Website gibt es identifizierbare Kundenvideos.

## Format-Matrix (quer zu den Familien) [B]

| Format | Beispiele | Länge | Typische Verwendung |
|---|---|---|---|
| Long-Copy-Text + Einsatzfoto | F2, F3, F4, F5, F6, F7 | 4.000–27.000 Zeichen | Hauptformat für Stories |
| Short-Copy + KI-Story-Reel (Voiceover, Wort-Captions, Split-Screen) | F1 | 1:56–2:27 min | Skalierung |
| Short-Copy + illustriertes True-Crime-Video („TATORT am Bodensee“) | F1 | 1:29–1:32 min | Skalierung, News-Anmutung |
| Text-Scroll-Video über Einsatz-B-Roll (kein Voiceover) | F2, F3 | 4:21–15:07 min | Reels-Placement für Long-Copy |
| Statisches Problem-Solution-Visual | F10 | – | Stories |
| UGC-/Unboxing-Foto | F8, F11 | – | Stories, Feed |


---

# 4. WINNER-PROXY ANALYSIS

**Methode.** Es gibt keine internen Daten. Verwendet werden ausschließlich öffentliche Proxies:

- Laufzeit (Start → Ende)
- Anzahl Varianten und Wiederverwendung über Seiten und Konten hinweg
- „Collation“-Duplikate: Meta bündelt Anzeigen mit identischem Creative und Text. „8 Werbeanzeigen verwenden diese Anzeigengestaltung“ heißt, dass dasselbe Creative in 8 Anzeigen bzw. Anzeigengruppen läuft.
- Wiederbelebung nach der Kontosperre
- Reichweitenrang: Die Ad Library sortiert standardmäßig nach Gesamt-Impressionen.

**Wichtige Einschränkung.** Am 01./02.09. endeten fast alle Anzeigen zwangsweise durch die Kontosperre. Stopps **vor dem 29.08.** sind deshalb aussagekräftiger als Enddaten danach. Alle Bewertungen in diesem Kapitel sind **[I] Inferenz**, sofern nicht anders markiert.

## 4.1 Proxy-Tabelle (Stichprobe 244 Anzeigen, 32 Einstiegssätze, Auswahl)

| Hook-Familie (Beispiel-Hook) | Erster Start | Letzte Aktivität | Max. Laufzeit einer Anzeige | Anzeigen in Stichprobe | Seiten | Max. Duplikate | Aktiv 23.09. | Nach Sperre neu aufgelegt? |
|---|---|---|---|---|---|---|---|---|
| F1 „Das grüne Licht bedeutet nur …“ | 18.06. | 23.09. | 76 Tage | **79 + 19** (Varianten „Rauchmelder“, „Standardmelder“, „hat Strom“) | 4 | **8** | **40** | **ja** |
| F2 „Ich bin seit 7 Jahren Feuerwehrmann … vor neun Monaten“ (Haushalt) | 19.05. | 01.09. | **106 Tage** | 11 | 1 | 1 | – | nein (durch Wohnung-/Womo-Varianten ersetzt) |
| F2 „Ich bin seit 27 Jahren Feuerwehrmann … Stellplatz an der Müritz“ | 14.07. | 23.09. | 51 Tage | 19 | 1 | 5 | 2 | **ja** |
| F2 „… 27 Jahren … Einsatz in einer Wohnung“ (Haushalt) | 13.07. | 23.09. | 52 Tage | 5 | 1 | 3 | 1 | **ja** |
| F6 „Unser Gutachter hat alles geprüft …“ | 19.05. | 31.08. | 105 Tage | 6 | 1 | 1 | – | nein |
| F3 „Ein Ehepaar ist letzten Monat in ihrem Wohnmobil gestorben …“ | 11.06. | 01.09. | 83 Tage | 4 | 1 | 1 | – | nein |
| F3 „Ein Vater von zwei Kindern ist letzten Monat …“ | 12.07. | 23.09. | 53 Tage | 15 | 1 | 3 | 3 | **ja** |
| F2 „Ich bin seit 14 Jahren Feuerwehrmann. Gleiche Woche. Gleiches CO-Leck …“ | 04.06. | 01.09. | 89 Tage | 4 | 1 | 1 | – | nein |
| F5 „Ich war in der 32. Schwangerschaftswoche …“ | 20.06. | 23.09. | 37 Tage | 11 | 1 | 1 | (Screenshot 19.09.) | **ja** |
| F4 „Mein Enkel ist gestern in unserem Wohnmobil gestorben …“ | 14.08. | 23.09. | 10 Tage | 3 | 2 | 1 | 2 | **ja**, neue Persona |
| F4 „Meine Mutter ist gestern in ihrer Altbauwohnung gestorben …“ | 29.08. | 23.09. | 6 Tage | 5 | 2 | 1 | 3 | **ja** |
| F8 „Ich flehe euch an … Amazon oder im Baumarkt“ | 20.09. | 23.09. | 4 Tage | 3 | 1 | 1 | 3 | neu |
| F7 „Ich hab meinen Mann betrogen …“ / „Um 3:15 morgens …“ | 19.09. | 23.09. | 5 Tage | je 1 | je 1 | 1 | je 1 | neu |
| F2 „Ich bin seit 14 Jahren Feuerwehrmann. Ich erzähl dir, was jeden Winter 900+ Familien …“ | 19.05. | 11.06. | 24 Tage | 5 | 1 | 1 | – | nein |
| F6 „Unser Vermieter hat gesagt, dieses Haus sei sicher …“ | 28.05. | 16.06. | 20 Tage | 10 | 1 | 1 | – | nein |
| F9 „Meine Frau und ich sind in unseren 60ern …“ | 19.05. | 28.05. | **9 Tage** | 8 | 1 | 1 | – | nein |
| F5 „Meine Tochter wurde an einem Dienstag krank …“ | 17.06. | 30.06. | 13 Tage | 3 | 1 | 1 | – | nein |
| F2 „Ich arbeite seit 14 Jahren an der Notrufzentrale …“ | 17.06. | 19.06. | **3 Tage** | 1 | 1 | 1 | – | nein |
| F6 „Unser Heizungsfachbetrieb hat … übersehen …“ | 06.07. | 12.07. | **7 Tage** | 1 | 1 | 1 | – | → Schornsteinfeger-Variante 03.–30.08. |
| F3/F6 „Eine ganze Familie ist letzten Monat in ihrem eigenen Haus fast gestorben …“ | 17.07. | 21.07. | **5 Tage** | 1 | 1 | 2 | – | nein |

*Quelle: Meta Ad Library, Abfragen vom 23.09.2026. „Aktiv“ = in der Stichprobe als aktiv markiert. Die reale Zahl liegt höher, insgesamt 113 aktive Anzeigen.*

## 4.2 Ableitung

### A. Vermutlich validierte Core Angles [I]
1. **Einsatzkraft-Ich-Erzähler (F2).** Er ist die älteste Idee und hat die längste Laufzeit (106 Tage). Er wurde über drei Settings neu produziert (Haus → Stellplatz → Wohnung), in drei Formate übersetzt (Long-Copy, Text-Scroll-Video, Voiceover-Zitat „Ich bin seit 7 Jahren bei der Feuerwehr“ in F1) und nach der Sperre sofort wieder gestartet. **Stärkstes Einzelsignal:** Niemand produziert eine 12.000-Zeichen-Story dreimal neu, wenn sie nicht verkauft.
2. **Wohnmobil-Todesfall (F3).** Er läuft seit Juni, ein eigener Persona-Absender wurde dafür aufgebaut („Andreas Schneider“, 163 Anzeigen), und er wurde nach der Sperre neu aufgelegt. Dazu kommen der eigene Produkt-Klon „für Wohnmobile“ mit eigenem Template und 12V-Bundle.
3. **Mechanismus „grünes Licht“ (F1).** Dazu mehr unter C.

### B. Creative Tests [I]
- Pattern-Interrupts (Untreue, Hund, Kinderstimme), Amazon-Enemy mit Preis im Ad, „Meine Mutter … Altbauwohnung“. Alle starteten nach der Sperre und sind 4–25 Tage alt, also noch in der Testphase.
- Headline-Test „Dein Melder lügt dich an“ gegen „Beschütz deine Familie“.
- Landingpage-Tests: /sicherheitv2 (Masthead-Variante), /sicherheitsreport (nur 1 Anzeige in der Stichprobe), Sicherheits-Insider-Vergleich (keine Anzeige in der Stichprobe verlinkt direkt darauf), Caravan-Listicle v2.
- Angebots-Tests auf der Produktseite **[B]**: Kaching-A/B bei 50/50-Split. Getestet werden Reihenfolge 1→4 gegen 4→1 (generische PDP) und die Geschenkzeile mit gegen ohne E-Book (Wohnmobil-PDP).

### C. Mögliche Scale Creatives [I]
- **F1 „grünes Licht“ + KI-Story-Reel bzw. True-Crime-Illustration.** Das Konzept hat die meisten Anzeigen und die meisten Duplikate (8 und 6 je Creative), läuft auf den meisten Seiten, bedient beide Segmente und fünf Ziel-URLs und hält am 23.09. allein in der Stichprobe 40 aktive Anzeigen. Zusätzlich wurde es von einem fremden Dropshipper kopiert.
- Innerhalb F2: die Müritz-Version als 15-min-Text-Scroll-Video (5 Duplikate).

### D. Creative-Fatigue-Refreshes [I]
- Die Dienstjahre des Feuerwehrmanns wandern: **7 → 14 → 27 Jahre**. Der Zeitpunkt wandert: „vor neun Monaten“ → „vor acht Monaten“ → „vor zwei Wochen“. Das Setting wandert: Haus → Wohnmobil → Wohnung. Die Kernstory bleibt dieselbe, nur die Oberfläche wird getauscht.
- Die Opfer-Variante rotiert: Ehepaar → Vater → Mutter → Frau → Enkel → Mutter (68).
- „grünes Licht“ rotiert: Melder → Rauchmelder → Standardmelder → „hat Strom“.
- Videos mit Nomen-Tausch: Tochter ↔ Enkel, „463“ ↔ „550“ Tote.
- Die Persona-Rolle rotiert: Peter Schulz (Feuerwehr) → Andreas Schneider (Seitenprofil: „Notfallsanitäter | 20 Jahre Erfahrung“, in den Ads aber Großvater oder Leser) → Claudia Schneider (Mutter) → Helga Schmidt (Oma) → Stefan Weber (Opa bzw. Amazon-Tester).

### E. Vermutlich gescheiterte bzw. depriorisierte Angles [I]
| Angle | Signal |
|---|---|
| Senioren-Paar im eigenen Haus („in unseren 60ern“) | 9 Tage im Mai, danach nie wieder als Einstieg |
| Vermieter-Betrug | 20 Tage, danach weg |
| Notrufzentrale-Erzählerin | 3 Tage |
| Heizungsfachbetrieb hat übersehen | 7 Tage, ersetzt durch Schornsteinfeger-Variante |
| „Familie fast gestorben“ (dritte Person, Haus) | 5 Tage |
| Statistik-Hook „900+ Familien jeden Winter“ | 24 Tage, früh durch Story-Hooks ersetzt |
| Kleinkind-Story „Meine Tochter wurde an einem Dienstag krank“ | 13 Tage |

**Muster [I]:** Überlebt haben Hooks mit (a) einer **Einsatzkraft als Zeugin**, (b) einem **Tod im Wohnmobil** und (c) als Ausnahme der **Gutachter-Hook** für Hauskäufer (105 Tage). Früh beendet wurden Einstiege über eine **Statistik**, über **Senioren im eigenen Haus**, über die **Notrufzentrale** und über **Vermieter bzw. Heizungsfachbetrieb**. Die Schornsteinfeger-Variante endete am 30.08. und ist damit wegen der Sperre nicht eindeutig lesbar. **Implikation für SICHERLUFT:** Das Wohnmobil-Segment und die Autorität der Einsatzkräfte sind validiert. „Der Handwerker hat versagt“ ist bestenfalls gemischt belegt und schadet außerdem der Glaubwürdigkeit bei allen, die ihren eigenen Handwerker kennen. SICHERLUFT sollte Handwerker als **Verbündete** positionieren, nicht als Schuldige.

## 4.3 Reichweitenrang (Meta-Sortierung „Gesamt-Impressionen“) [B]

Die 30 reichweitenstärksten Schutzix-Anzeigen (Suche „schutzix“, alle Status) verteilen sich so: Peter Schulz 19, Kohlenmonoxid Schutz 6, Andreas Schneider 4, Tagesbericht 1. Nach Familie sind es F2 Feuerwehr-Erzähler 15, F1 grünes Licht 10, F3 Wohnmobil-Todesfall 5. **Alle 30 sind inaktiv und tragen den Sperrvermerk.** Die reichweitenstärksten aktiven Anzeigen (Suche „aktiv“) sind überwiegend F1-Videos, dazu Neuauflagen von F2 und F3.


---

# 5. AVATAR ANALYSIS

## 5.1 Was die Daten tatsächlich zeigen

**Targeting [B]:** Alle aktiven Schutzix-Anzeigen mit abrufbaren EU-Transparenzdaten zielen auf **Deutschland + Österreich, Alter 18–65+, alle Geschlechter**. Zahler und Begünstigter ist jeweils **„Schutzix“**. Es gibt also **kein enges Interessen- oder Alterstargeting** in den Ad-Einstellungen. Wer erreicht wird, entscheidet Metas Auslieferung anhand von Creative und Optimierungsziel.

**Ausgelieferte Reichweite nach Alter/Geschlecht [B, Stand 23.09.; Summe der aktiven Anzeigen mit Daten]:** *Das ist Reichweite, nicht Käuferschaft.*

| Familie | Anzeigen | EU-Reichweite | 18–34 | 35–44 | 45–54 | 55–64 | 65+ | 55+ gesamt | Männer | Frauen | Anteil DE |
|---|---|---|---|---|---|---|---|---|---|---|---|
| F1 „grünes Licht“ | 40 | 169.521 | 6,6 | 13,8 | 20,7 | 38,7 | 20,2 | 58,9 | 74,0 | 23,2 | 91,0 |
| F2 Feuerwehr-Ich-Erzähler | 3 | 10.501 | 12,9 | 18,3 | 19,0 | 30,0 | 19,9 | 49,9 | 56,6 | 35,1 | 89,9 |
| F3 Wohnmobil-Tod (3. Person) | 3 | 7.636 | 3,5 | 8,0 | 15,4 | 38,8 | 34,2 | 73,0 | 68,9 | 26,4 | 89,1 |
| F4 Angehörigen-Verlust (Ich) | 5 | 7.907 | 7,3 | 9,0 | 12,9 | 36,2 | 34,6 | 70,8 | 43,9 | 48,5 | 81,6 |
| F7 Pattern-Interrupts | 2 | 1.972 | 11,3 | 19,5 | 18,3 | 28,5 | 22,5 | 50,9 | 47,3 | 39,3 | 84,2 |
| F8 Amazon/Baumarkt-Enemy | 3 | 4.121 | 2,4 | 12,0 | 17,4 | 40,7 | 27,3 | 68,1 | 85,1 | 13,4 | 90,3 |
| **Alle aktiven mit Daten** | **56** | **201.658** | **6,8** | **13,6** | **20,0** | **38,1** | **21,4** | **59,6** | **71,7** | **24,9** | **90,4** |

*Angaben in % der ausgewiesenen Reichweite. Die Differenz zu 100 % bei Männern/Frauen ist „unbekannt“. Quelle: Meta Ad Library, EU-Transparenzangaben (DSA) je Anzeige, Abruf 23.09.2026, alle 56 aktiven Schutzix-Anzeigen der Stichprobe. Alle 56 nennen „Schutzix“ als Zahler und Begünstigten. Einzelwerte je Anzeige: `data/schutzix_ad_inventory.csv` (im Ordner docs/wettbewerbsanalyse) (Spalte eu_reach).*

**Lesart [I]:**
- **F1 trägt 84 % der gesamten Reichweite** der 56 ausgewerteten aktiven Anzeigen (169.521 von 201.658), bei 71 % Anteil an den Anzeigen. Das ist der stärkste öffentliche Beleg dafür, dass „grünes Licht“ die Scale-Engine ist (Kap. 4).
- Metas Auslieferung sucht die Käufer erkennbar **ab 45** (knapp 80 % der Reichweite). Bei den Todesfall-Stories (F3, F4) liegt der Schwerpunkt sogar klar bei **55+** (über 70 %), gut ein Drittel ist **65+**.
- Der **Mechanismus-Creative „grünes Licht“ läuft zu drei Vierteln an Männer (74 %)**, der Amazon-Vergleich (F8) sogar zu 85 %. Die Ich-Verlust-Storys (F4: „Mein Enkel …“, „Meine Mutter …“) erreichen dagegen etwas mehr Frauen als Männer. **Implikation:** Technik, Messwert und Vergleich ziehen Männer 45+. Schuld und Familie ziehen Frauen 55+ gleichermaßen mit.
- Österreich macht rund ein Zehntel der Reichweite aus. Schutzix bespielt AT also mit, aber ohne eigene Ansprache **[B/I]**.
- Bei conversion-optimierten Kampagnen spiegelt die Auslieferung grob wider, wen Meta für kaufwahrscheinlich hält. Das ist **keine** Käuferdemografie und darf nicht so verwendet werden.

## 5.2 Avatar-Steckbriefe (die Segmente, die Schutzix separat anspricht)

| # | Avatar | Belege bei Schutzix | Kernproblem | Stärkste Angst | Bestehende Fehlannahme | Gewünschter Zustand | Dominante Emotion | Schutzix' stärkster Hook | Geeignete Creative-Art | Geeignete LP |
|---|---|---|---|---|---|---|---|---|---|---|
| A1 | **Wohnmobil-Großeltern 60–75** („der vorsichtige Opa“) | F4 „Mein Enkel ist gestern…“, F3 „Ehepaar…“, Wohnmobil-LP (Bodensee, 75/76), PDP-Review „Seit dem Ruhestand … mehrere Monate im Wohnmobil“ **[B]** | Verantwortung für Enkel in engem Raum mit Gas | **Schuld:** „Ich habe der Tochter gesagt, er ist sicher.“ | „Ich prüfe alles (Gas, Keile, Landstrom), also ist alles sicher. Der Werks-Rauchmelder reicht.“ | Ruhig schlafen, Enkel mitnehmen dürfen, Kontrolle behalten | Schuldangst, Stolz auf Sorgfalt | „Ich prüfte alles, was ich sehen konnte. Ich prüfte nie die Luft.“ | Long-Copy-Ich-Story, Senioren-Paar-Visual | Wohnmobil-LP |
| A2 | **Wohnmobil-Familien 35–50** (Vater/Mutter von 2 Kindern) | F3 „Ein Vater von zwei Kindern…“, Nordsee, Truma **[B]** | Kinder im Alkoven, Heizung nachts an | Kinder wachen nicht auf | „Ich weiß, was CO ist, mir passiert das nicht.“ („Andreas war Physiklehrer“) | Sorgenfreier Kurzurlaub | Angst, Empörung („Warum spricht keiner darüber?“) | „Ein Vater von zwei Kindern ist letzten Monat in seinem Wohnmobil gestorben. Warum spricht keiner darüber?“ | Text-Scroll-Video über Einsatz-B-Roll | Wohnmobil-LP |
| A3 | **Schwangere / Paare mit Kinderwunsch** | F5 „32. Schwangerschaftswoche…“ (Claudia) **[B]** | Unerklärliche Müdigkeit/Kopfschmerz in der Schwangerschaft | Verlust des ungeborenen Kindes | „Symptome sind normale Schwangerschaftsbeschwerden.“ | Sichere Schwangerschaft, „jeden Morgen die Null sehen“ | Todesangst, Schuld, Hoffnung (neue Schwangerschaft) | „Ich war in der 32. SSW, als mein Sohn … aufgehört hat zu treten.“ | Long-Copy-Ich-Story | (fehlt, führt auf Haushalt-LP) |
| A4 | **Eltern kleiner Kinder im Reihenhaus/Altbau mit Gastherme** | „Meine Tochter wurde an einem Dienstag krank…“, KI-Reel „Um 3 Uhr nachts … meine Tochter“, Brandinspektor-Haushalt-LP **[B]** | Kinder schlafen neben der Therme bzw. im Altbau mit Gasetagenheizung | Kind wacht nicht auf, Hirnschaden | „Die Therme ist gewartet, Rauchmelder sind Pflicht und hängen.“ | Kontrolle, beweisbare Sicherheit | Panik, Schutzinstinkt | „Um drei Uhr nachts wollte ich meine Tochter wecken und sie konnte ihren Kopf nicht heben.“ | KI-Story-Reel mit Voiceover | Haushalt-LP |
| A5 | **Erwachsene Kinder älterer Eltern (40–60)** | „Meine Mutter ist gestern in ihrer Altbauwohnung gestorben“, „Einen für eure Tochter. Einen für eure Mutter.“, PDP-Review „Dann hat uns unser Sohn den Schutzix geschenkt“ **[B]** | Eltern allein mit Gastherme, man ist nicht da | „Ich hätte es verhindern können.“ | „Mama macht das seit 40 Jahren, sie merkt das schon.“ | Aus der Ferne beruhigt sein | Schuld, Fürsorge | „Meine Mutter ist gestern … gestorben. Das Schlimmste daran ist: Ich hätte es verhindern können.“ | Long-Copy, Geschenk-Logik | Haushalt-LP bzw. Geschenk |
| A6 | **Hauskäufer & Mieter** | Gutachter-Hook (105 Tage), Vermieter-Hook (20 Tage) **[B]** | Unbekannte Vorgeschichte der Immobilie | „Die Familie vor uns ist dort gestorben.“ | „Gutachten/Vermieter garantieren Sicherheit.“ | Sicheres neues Zuhause | Misstrauen, Angst | „Unser Gutachter hat alles geprüft. Er hat übersehen, was die Familie getötet hat…“ | Long-Copy | Haushalt-LP |
| A7 | **Hundebesitzer** | Bruno, Bella, Luna, Labrador in F2, F5, F7 **[B]** | Tier verhält sich komisch | Tier (oder Familie) stirbt | „Der Hund ist halt alt oder hat Hitze.“ | Alle Familienmitglieder sicher | Liebe, Schuld | „Zum Glück ist unser Hund gestorben.“ | Long-Copy mit Tier als Held | Haushalt-LP |
| A8 | **Vergleicher / Amazon-Käufer (Solution-Aware)** | F8 Stefan Weber **[B]** | Gerät gekauft oder im Warenkorb, 20 € | Fake-Qualität, „zeigt immer 0“ | „Ein CO-Melder ist ein CO-Melder.“ | Das richtige Gerät zum fairen Preis | Misstrauen, Clever-Shopper-Stolz | „Ich flehe euch an, hört auf, diese Kohlenmonoxid-Melder auf Amazon oder im Baumarkt zu kaufen.“ | Test-/Review-Format, UGC | direkt PDP |

## 5.3 Blinde Flecken im Avatar-Portfolio von Schutzix [I]

- **Kein Avatar für Kaminofen- und Holzofenbesitzer.** Im Herbst und Winter ist das ein Top-Segment. Kaminöfen tauchen nur in Quellenlisten auf.
- **Kein Avatar für Geschenkkäufer als positive Motivation.** Schenken wird nur als Nebenhandlung nach einem Todesfall erzählt.
- **Kein eigenständiger Avatar für Caravan-Dauercamper und Wintercamper.** Es gibt nur ein LP-Update (Caravan-Listicle v2), kein eigenes Creative in der Stichprobe.
- **Keine technikaffine Zielgruppe mit echter Messdaten-Neugier** (Smart-Home-, Raumklima-Interessierte), obwohl F1 bereits zu 75 % Männer 45+ erreicht.
- **Alle Avatare werden über Angst betreten**, keiner über Kompetenz, Fürsorge oder Vorbereitung.

**Das sind die Einfallstore für SICHERLUFT (Kap. 13).**


---

# 6. LANDINGPAGE REVERSE ENGINEERING

**Übersicht [B]:**

| LP | Typ | Wörter ca. | Produkt-CTAs | Ziel der CTAs | In Ads verlinkt (Stichprobe) |
|---|---|---|---|---|---|
| /pages/wohnmobil | Advertorial „Brandinspektor warnt“, 5 Gründe | 1.730 | 4 | PDP Wohnmobil | **am häufigsten** (u. a. 41× F1, F2, F3, F4) |
| /pages/brandinspektor-warnt-co-melder-haushalt | dasselbe für Haushalt, 6 Gründe | 1.660 | 4 | PDP generisch | häufig (F1, F2, F5, F7) |
| /pages/sicherheit (+ /sicherheitv2) | Listicle „7 Gründe … Ratschlag von einem Feuerwehrmann“ | 1.770 | 5–6 | PDP generisch | Mai–Juli dominierend, im September noch vereinzelt |
| /pages/sicherheitsreport | Ich-Erzählerin-Advertorial „Die 70-ppm-Lüge“ | 2.470 | 3 | PDP generisch | selten (Juni) |
| /pages/sicherheits-insider-co-melder-2026 | fiktiver Vergleichstest | 2.000 | 2 (+ Konkurrenz-Buttons ins Leere) | PDP generisch | in der Stichprobe nicht direkt |
| /pages/co-melder-ratgeber, /6-grunde-… | Kurz-Listicle mit Countdown-Karte | 730 | 1 | PDP generisch | vereinzelt |
| /pages/listicle-blog-style-wohnwagen-and-caravan-v2 | Wohnmobil+Caravan-Update | 1.920 | 4 | PDP Wohnmobil | neu (27.08.) |

## 6.1 /pages/wohnmobil – „Brandinspektor warnt: Der stille Killer in deutschen Wohnmobilen“ (die wichtigste LP)

| Element | Umsetzung [B] | Analyse |
|---|---|---|
| **Above the Fold** | Kein Shop-Header, kein Logo. Beige Zeitungsoptik mit Serifenschrift, Kicker „SICHERHEIT IM WOHNMOBIL“, H1, kursive Unterzeile, Autorenzeile „Von Thomas Wagner · zuletzt bearbeitet: 01.07.2026“ mit Porträtfoto | Native-Optik ohne jede Verkaufsanmutung. Der Leser glaubt, auf einem Magazin zu sein **[I]** |
| **Headline** | „Brandinspektor warnt: Der stille Killer in deutschen Wohnmobilen“ | Autorität + Metapher + Segment. Entspricht dem Video-Cliffhanger „Ein Brandinspektor erklärt…“ |
| **Subheadline** | „Immer mehr Wohnmobil-Besitzer sterben im Schlaf an einem Gas, das kein Rauchmelder erkennt. Was die Feuerwehr seit Jahren weiß – und Camper nicht.“ | Trendbehauptung („immer mehr“, unbelegt) + Wissensgefälle (Insider vs. Laien) |
| **Lead** | „Die Zahlen sind erschütternd. Aber sie sind real.“ → Markus Weber, 20 Jahre Brandinspektor, Einsatz am Bodensee, 75-Jähriger tot, Frau 76 überlebt knapp | Konkretheit (Ort, Alter, ppm) erzeugt Glaubwürdigkeit. Der Fall ist nicht verifizierbar |
| **Story** | Wespennest im Abgaskamin, über 400 ppm. „Der Melder an der Wand … leuchtete grün. Der Testknopf funktionierte. Der Sensor war komplett tot.“ Dazu Testimonial „Karin, 61, aus Bayern“ | Die Geschichte ist die „Bühne“ für den Belief Shift |
| **Problem Intensification** | Grund 1: „Über 400 Menschen sterben … Ein erheblicher Teil davon ereignet sich in Wohnmobilen, Wohnwagen und Booten“. Aufzählung: enge Räume, Gasquellen neben dem Schlafplatz, wechselnde Stellplätze, „Sommerwärme – Abgaskamine funktionieren schlechter“ | Mischung aus plausiblen Risiken und unbelegten Anteilen |
| **Mechanism** | „Dual-Sensor-Technologie“ (CO + brennbare Gase), „Echtzeit-Digitalanzeige“, „Frühwarnung deutlich vor 70 ppm – Stunden bevor Standard-Melder reagieren“ | Der Mechanismus ist die **sichtbare Zahl + zweiter Sensor**, Differenzierung über Anzeige und Gasarten |
| **Enemy / False Solution** | Werks-CO-Melder („schlagen erst bei 70 ppm Alarm“), Rauchmelder („physikalisch unmöglich“), Display-Melder von Amazon/Baumarkt („zeigen unterhalb von 30 ppm einfach ‚0‘“), „Die Industrie? Sie schweigt.“ | Dreifacher Enemy: Gerät, Handel, Industrie |
| **Autorität** | Brandinspektor „Markus Weber“ mit Foto in Einsatzkleidung und Messgerät (Fotolook KI oder Stock **[I]**), „Feuerwehrleute in ganz Deutschland empfehlen“, Zitat „Ich würde meine Familie nicht in einem Wohnmobil schlafen lassen, ohne einen Schutzix an der Wand“ | Anonyme Institution „Feuerwehr“ als Garant. Nicht belegt |
| **Wissenschaft/Technik** | ppm-Schwellen, „Hirnschäden beginnen bei 40 ppm“, „85 dB“, „Akku-Backup“, „USB-C-Ladekabel“ | teils falsch bzw. widersprüchlich (siehe Kap. 9) |
| **Social Proof** | „über 9.437 deutsche Wohnmobil-Besitzer“, „12.800 deutsche Familien“, „4,9 von 5 Sternen“, FB-Kommentarblock „3.247 Kommentare“ mit 4 Kommentaren (Sandra Köhler, Robert Weber, David Bauer, Anke Müller, Likes 14/9/23/7) | Dieselben Namen, Likes und Zeitstempel stehen auf allen LPs mit wechselndem Text **[B]** → konstruierte Kommentare **[I]** |
| **Produkt-Reveal** | nach dem Lead (ca. 20 % Scrolltiefe): „Dieses Gerät ist der Schutzix 4-in-1 – ein Melder mit elektrochemischen Profi-Sensoren, wie sie auch in den Messgeräten der Feuerwehr verwendet werden“ | früher Reveal. Der Rest der Seite ist Beweisführung |
| **Features** | Dual-Sensor, Echtzeit-Display, 230V-Steckdose, tragbar, Ein-Knopf, Akku-Backup, USB-C, 85 dB, tägliche Selbstdiagnose | „Akku/USB-C“ widerspricht der PDP („keine Batterien“) |
| **Benefits** | „Du weißt nicht nur, dass etwas nicht stimmt – du weißt genau, was zu tun ist“; „Wachturm in deiner Wohnmobil-Steckdose“ | Kontrolle und Handlungsfähigkeit |
| **Objection Handling** | Preis („auf Sicherheit kann man keinen Preis setzen“), Stromversorgung (Akku-Behauptung), Qualität („Profi-Sensoren“) | Zentrale Einwände zu Stromversorgung und Fehlalarmen werden falsch bzw. gar nicht beantwortet |
| **Preisanker** | keiner auf der LP | Preis erst auf der PDP |
| **Discount** | „Solange der 50 %-Rabatt noch verfügbar ist“, „bis zu 50 % Rabatt auf Mehrfach-Sets“ | |
| **Bundle** | „Mehrfach-Sets“ als Rabattträger | |
| **Garantie** | „**3-Jahres-Geld-zurück-Garantie** – kein Hersteller von Standard-Meldern bietet das … weil Schutzix bis zu 6 Jahre lang zuverlässig funktioniert“ | Widerspricht der PDP (100 Tage) **[B]** |
| **Urgency / Scarcity** | „Verschieb es nicht“, „nur eine Frage der Zeit“, Rabatt „solange noch verfügbar“ | eher emotional als technisch |
| **CTA-Struktur** | 4 Buttons: „Hier zum Schutzix →“ (2×), „Jetzt Schutzix sichern →“ (2×). Positionen: nach den 5 Gründen, nach dem Experten-Block, nach den Kommentaren, im Closing | typische Advertorial-Platzierung nach jedem Überzeugungsblock |
| **Closing** | „Meine letzten Worte an dich … als Feuerwehrmann mit über 20 Jahren Erfahrung“ + „Über 1,7 Millionen [Wohnmobile] … zugelassen“ + „Der letzte CO-Melder, den du dir für dein Wohnmobil kaufen brauchst“ + „ausschließlich auf … schutzix.com“ | „1,7 Mio.“ ist falsch (KBA: 1,05 Mio. am 01.01.2026) |
| **Übergang** | direkt auf **Wohnmobil-PDP** (12V-Adapter-Bundle) | gute Segment-Konsistenz |
| **Disclaimer** | Footer: „Hierbei handelt es sich um eine Anzeige. Die dargestellten Personen sind Modelle. Erfahrungsberichte sind exemplarisch…“ | Die Kennzeichnung existiert, steht aber erst ganz unten |

## 6.2 /pages/brandinspektor-warnt-co-melder-haushalt (Haushalts-Klon)

Die Struktur ist identisch zu 6.1, mit diesen Abweichungen **[B]**:
- H1: „… Der stille Killer in jedem deutschen Haushalt“. Unterzeile: „**Über 1.063 Deutsche sterben jedes Jahr** im Schlaf …“ (die Wohnmobil-LP sagt „über 400“).
- Die Lead-Story wechselt zum Holzkohlegrill des Nachbarn: „38-jähriger Vater tot vor der Haustür … über 110 ppm am Boden“. Testimonial „Sabine, 41, aus NRW“.
- **6 statt 5 Gründe**, neu sind „Von der Feuerwehr entwickelt und im Einsatz erprobt“ und „Über 12.873 zufriedene Kunden – darunter Feuerwehr und Heizungsmonteure … Weniger als 1 % der Kunden nutzen die Geld-zurück-Garantie“.
- Batterie: „**Keine Batterien.** Kein nerviges Piepen um 3 Uhr morgens“. Lebensdauer: „**Der Schutzix funktioniert lebenslang.**“ Die Wohnmobil-LP sagt „bis zu 6 Jahre“.
- Mechanismus-Slogan: **„Null heißt sicher. Alles andere heißt: handeln.“** Das ist die stärkste Zeile des gesamten Funnels **[I]**.
- Markus Weber hat hier „über **27** Jahre“ Erfahrung, auf der Wohnmobil-LP „über 20“.
- Schluss: „Über 20 Millionen deutsche Haushalte heizen … mit Gas oder Öl. Dazu kommen über 11 Millionen Kaminöfen“ (nicht belegt).
- **Funnel-Bruch:** Die Schwangerschafts- und Untreue-Ads landen hier. Es gibt keinen Text für Schwangere und keine Brücke zur Ad-Geschichte **[B]**.

## 6.3 /pages/sicherheit – das Original („7 Gründe …“, Sie-Form, ab 18.05.)

- Oben ein Aktionsbalken **„🔥 LIMITIERTE AKTION: BIS ZU 50 % RABATT + GRATIS VERSAND 🔥“**. H1: „7 Gründe, warum dieser **virale** Kohlenmonoxid-Detektor jeden Rauchmelder und billigen CO-Melder ersetzen sollte… Ratschlag von einem Feuerwehrmann.“ **[B]**
- Der Unterschied zu den späteren LPs: **Sie-Form, Rabatt-first, 6 CTAs** („JETZT VERFÜGBARKEIT PRÜFEN“, „JETZT 50 % RABATT SICHERN“, „SEELENFRIEDEN HOLEN“), der wiederholte Hinweis **„⚠️ Dieses limitierte Angebot ist NICHT auf Amazon erhältlich“** (6×), Scarcity („mehrfach ausverkauft“, „mehrere Bundles bereits knapp am Ausverkauf“) **[B]**.
- Zahlen: „bis zu **1.000** Menschen … 3.500 bis 4.000 im Krankenhaus. Davon endet **jeder sechste Fall tödlich**.“ Das ergibt 583–667 und widerspricht den 1.000 im selben Absatz **[B]**.
- Footer: **„📞 +49 (0)30 12345678“** (Platzhalternummer) und „service@schutzix.de“ (die Domain existiert nicht, NXDOMAIN) **[B]**.
- **Evolution [I]:** Aus der aggressiven Rabatt-Listicle (Mai) wurde die ruhige Zeitungsoptik mit Du-Ansprache (Juli). Das Muster ist klassisch: Wenn Rabatt-Push nicht mehr trägt, wird Glaubwürdigkeit simuliert.

## 6.4 /pages/sicherheitsreport – „Feuerwehrmann packt aus: Die Rauch- und CO-Melder-Lüge …“ (13.06.)

- Die Erzählerin ist „Frau Berger“, im 6. Monat schwanger, mit Sohn (2). Ein Heizungsmonteur misst 35 ppm, die Feuerwehr 27–38 ppm („Wir evakuieren Häuser ab 50“) **[B]**.
- Kernkapitel „**Die 70-ppm-Lüge**“: „Die EU-Norm EN 50291 erlaubt, dass CO-Melder erst bei 70 ppm Alarm schlagen … 70 ppm: 60 bis 240 Minuten; 150 ppm: 10 bis 50; 400 ppm: 4 bis 15“ **[B]**. **Diese Werte stammen aus der US-Norm UL 2034, nicht aus EN 50291** (siehe 9.2).
- Das Produkt heißt hier „4-in-1 = CO, Erdgas, Propan, Temperatur & Luftfeuchtigkeit“, „ab dem ersten ppm“, „10 ppm? Du siehst es“. Preis „59,95 €“, „100 Tage Geld-zurück“ **[B]**.
- **US-Übersetzungsartefakt:** „Mein Notaufnahme-Besuch … Mehr als 600 Euro Selbstbeteiligung und Folgekosten“. In der deutschen GKV ist das so nicht üblich. Das weist auf ein übersetztes US-Template hin **[I]**.
- Trust-Behauptung „★ Trustpilot TrustScore 4.7 | 3.824 Bewertungen“ (2×). **Real: 2,2 bei 14 Bewertungen [B]**.
- „Zwei Zukünfte“-Close, Rechnung „Mach die Rechnung“ (Kosten Notaufnahme vs. 59,95 €).

## 6.5 /pages/sicherheits-insider-co-melder-2026 – der fiktive Vergleichstest (04.08., datiert „1. August 2026“)

- Masthead „SICHERHEITS Insider – Magazin“ in Rot mit Schloss-Logo. H1: „Die besten CO-Melder im großen Sicherheits-Insider Test 2026“. **Kein Anzeigen-Hinweis im Seitentext [B].**
- Testaufbau mit sechs Kriterien. Platz 1: „Schutzix™ … 9,8/10“. Platz 2–5 sind **fiktive Marken mit ™**: SecuAir CX-10D, HomeVita HV-208, DualGuard DG-40, PureAlarm PA-650 **[B]**. Die „Verfügbarkeit prüfen“-Buttons der Konkurrenz führen auf **/pages/melder-nicht-verfuegbar**: „Dieses Produkt ist derzeit nicht verfügbar … Alternative: Unser Testsieger ist aktuell verfügbar“ **[B]**.
- **Selbstwiderspruch [B]:** Der Test bemängelt bei DualGuard „Keine Notbatterie“, „Fehlalarm-Anfälligkeit: Halbleiter-Gassensoren“ und „Sensor … rund 5 Jahre“. Schutzix hat laut eigener PDP keine Batterie, nutzt laut „Über uns“ Halbleiter-Sensorik für Gas, und Trustpilot-Kunden berichten von Gas-Fehlalarmen.
- **Positiv [B]:** Dies ist die einzige Seite mit sauber zitierten BfR-Zahlen (41 %, 82 %, 15 %, 9 %) und der Aussage „Eine Heizungswartung ist eine Momentaufnahme. Ein Defekt entsteht zwischen den Terminen.“

## 6.6 Produktseiten (generisch + Wohnmobil)

| Element | Umsetzung [B] |
|---|---|
| ATF | Countdown-Leiste „HERBST SALE“ · E-Book-Banner · Bild „empfohlen von der FEUERWEHR“ (Rückseite mit CE-Zeichen) · ★★★★★ „Bewertet bei 4.9 von 12.800+ zufriedenen Kunden!“ · Titel · 5 Häkchen-Bullets („Zeigt Gaswerte in Echtzeit an“, „Erkennt Kohlenmonoxid, Erdgas und Propan“, „Warnt bereits ab 30 PPM“, „Frühe Warnung statt Alarm im letzten Moment“, „Empfohlen von Feuerwehr & Fachbetrieben“) |
| Staffel (Kaching) | 1× 59,95 € („SPAREN SIE 40 %“, „Für kleine Wohnungen“) · **2× 99,95 € vorausgewählt** („50 %“, „Beinhaltet nur die Hauptwohnräume“, + GRATIS Versand + E-Book) · 3× 129,95 € „BESTSELLER“ („57 %“) · 4× 159,95 € „Schützen Sie jedes Schlafzimmer“ („60 %“). Wohnmobil-PDP: „Wohnmobil komplett + 1x Melder für dein Zuhause“ usw., Geschenk **„GRATIS 12V Anschluss“** |
| Unter dem Button | „100 Tage Geld-zurück-Garantie“ · „● Fast ausverkauft“ · „🇩🇪 Kostenloser Versand ab 80 €“ · Avatare „Über 12.800 zufriedene Kunden“ |
| Akkordeons | Installation (200 s Kalibrierung, „nahezu jede Steckdose“) · **„Wie viele Melder benötige ich? 3 bis 4“** (Wohnmobil: „mindestens zwei auf engem Raum … auch Ihr festes Zuhause“) · Anzeigen (PPM, GAS LEL, Luftfeuchte) · Vergleich („Sensoren der Stufe 3“) |
| Experten-Box | „Markus Brandt \| Feuerwehrmann, NRW · Verifizierter Kunde“ mit Trustpilot-ähnlichen grünen Sternkästen |
| Aufklärung | CO-Erklärung („300-mal stärker“ bzw. auf der Wohnmobil-PDP „über 200-mal“), Risikogruppen-Kacheln, „5.000+ Vergiftungen / 500+ Todesfälle jährlich“, ppm-Skala 30/50/70 |
| Reviews | 5 Text-Testimonials ohne Datum, Foto oder Verifizierung; Judge.me/Loox installiert, aber **kein Review-Widget mit Zählung sichtbar** |
| FAQ | „Warum ist das teurer als ein 30€ Gerät?“ · „Wie lange hält der Sensor? … dauerhaft ausgelegt … 3-jährige Garantie“ · Montagehöhe ehrlich („Erdgas … möglichst weit oben“) |
| Popup | Klaviyo „50% Rabatt sofort sichern … Meine 50% freischalten / Nein danke, ich riskiere es!“ |
| Nicht vorhanden | Norm-/Prüfangaben (EN 50291-1, EN 50194-1), Herstellerangaben nach GPSR, Gewicht und Maße, Stromverbrauch, Sensor-Lebensdauer in Jahren, Rücksendeadresse, Telefon |

**Gesamturteil LP-System [I]:** Die **Architektur** ist stark: Native-Pre-Lander, segmentierte PDPs, AOV-Mechanik und laufende A/B-Tests. Die **Beweisführung** ist dagegen schwach bis falsch: widersprüchliche Zahlen, US-Norm als EU-Norm, fiktive Tests und konstruierte Kommentare. Das System ist auf Käufer optimiert, die **nicht prüfen**. Jeder Käufer, der prüft, springt ab oder wird zum 1-Stern-Rezensenten. Genau diese prüfenden Käufer sind die Zielgruppe für SICHERLUFT.


---

# 7. BELIEF-SHIFT MAP

**Ausgangslage im Markt (offizielle Daten) [B]:** Laut BfR-Repräsentativbefragung „Gesundheitsrisiken durch Kohlenmonoxid“ glauben **41 %** derer, die von CO-Vergiftungen gehört haben, dass ihr Rauchmelder bei CO alarmiert. **44 %** glauben, man könne CO riechen. **90 %** besitzen einen Rauchmelder, nur **15 %** einen CO-Melder. Nur **9 %** nennen den CO-Melder spontan als Schutzmaßnahme. Schutzix baut exakt auf diesen Lücken auf.

## 7.1 Die Kette, die Schutzix im Kopf des Käufers baut

| Stufe | Alte Überzeugung | Zerstörung / Neuaufbau (Schutzix-Zitat) [B] | Wahrheitsgehalt | Für SICHERLUFT |
|---|---|---|---|---|
| 1 | „Rauchmelder hängen, also bin ich geschützt.“ | „Ein Rauchmelder erkennt Rauch. Aber kein Kohlenmonoxid.“ / „Rauchmelder und Kohlenmonoxidmelder sind nicht dasselbe.“ / „Sie hatten Warnmelder im Haus. Nur nicht für die Gefahr, die Ihren Sohn getötet hat.“ | **wahr** (BfR) | **übernehmen** mit Quelle |
| 2 | „Ich würde es merken, riechen, spüren.“ | „farblos, geruchlos, geschmacklos“ / Symptome „wie Kopfschmerzen, Schwangerschaftsmüdigkeit, ein Infekt, zu wenig Schlaf“ / „Deshalb tötet es Menschen im Schlaf.“ | **wahr** im Kern | übernehmen, ohne Todesdramaturgie |
| 3 | „Die Therme ist gewartet, die Gasprüfung gemacht.“ | Gutachter/Schornsteinfeger/Heizungsbetrieb „hat übersehen“; Wespen- oder Vogelnest im Abgasweg; „Alles wirkt in Ordnung. Und trotzdem kann Kohlenmonoxid austreten.“ | **teilweise wahr**: Defekte entstehen zwischen Wartungen. Die Schuldzuweisung an Handwerker ist unfair | **umdeuten:** „Wartung ist eine Momentaufnahme, Messen ist Dauerbeobachtung.“ Handwerker als Partner |
| 4 | „Ein normaler CO-Melder reicht.“ | „so konstruiert, dass sie erst bei 70 ppm Alarm schlagen dürfen … bis zu vier Stunden warten … 30, 40, 50 ppm komplett ignorieren“ | **falsch für Europa** (US-Norm UL 2034). EN 50291-1: 50 ppm → 60–90 min, 100 ppm → 10–40 min, 300 ppm → < 3 min; bei 30 ppm darf 120 min **kein** Alarm kommen, um Fehlalarme zu vermeiden | **korrigieren und besetzen:** „Die Norm regelt, wann ein Melder **alarmieren muss**. Was sie nicht regelt: dass du vorher siehst, was er misst.“ |
| 5 | „Grünes Licht = alles okay.“ | „Das grüne Licht bedeutet nur, dass dein Melder eingeschaltet ist.“ / „Diese Taste testet den Lautsprecher. Dieses Licht bedeutet Strom.“ | **weitgehend wahr** (Betriebs-LED, Testtaste prüft typischerweise Elektronik und Signalgeber) | **übernehmen** – stärkster, ehrlichster Hebel |
| 6 | „CO ist die einzige Gefahr.“ | „Kein Erdgas. Kein Propan. Keine brennbaren Gase.“ / „Wenn deine Gastherme unbemerkt Erdgas verliert, ist das … eine Gasexplosion, die auf ihren Zünder wartet.“ | **wahr**, dass CO-Melder keine brennbaren Gase erkennen. **Aber:** Die Schutzix-FAQ selbst sagt korrekt, Erdgas sei „vor allem ein Brand- bzw. Explosionsrisiko“ und kein Schlafrisiko wie CO | übernehmen **mit Platzierungswahrheit** (Erdgas oben, Propan unten) |
| 7 | „Billig ist auch okay.“ | „Bei einem Melder, der nur 20 Euro kostet, wurde irgendwo gespart.“ / „Amazon hat keine Qualitätskontrolle …“ | **pauschal falsch** (es gibt zertifizierte günstige Markengeräte) | **nicht übernehmen.** Stattdessen: „Achte auf Prüfnorm und Anbieter mit EU-Adresse.“ |
| 8 | Neu: „Sicherheit ist eine sichtbare Zahl.“ | „Null heißt sicher. Alles andere heißt: handeln.“ / „Eine Null auf dem Display sagt mehr als jedes grüne Lämpchen.“ / Ritual: „Ich schaue jeden Morgen auf das Display … Null.“ | **Kern-Neuaufbau**. „Null heißt sicher“ ist eine Übertreibung: Das Gerät misst nur am eigenen Standort, Sensoren driften | übernehmen als **„Sehen statt raten“**, nicht als Garantie |
| 9 | Neu: „Profis nutzen so etwas.“ | „den gleichen Sensor-Typ, den wir bei der Feuerwehr in unseren eigenen Messgeräten verbaut haben“ / „Wir Feuerwehrleute haben zu Hause alle einen guten CO-Melder.“ | **unbelegt**: Feuerwehr-Messgeräte nutzen elektrochemische CO-Sensoren, eine Gleichsetzung mit einem Consumer-OEM-Gerät ist nicht belegt | **nur mit echter, benannter Fachperson** |
| 10 | Neu: „Ein Gerät reicht nicht.“ | „Für einen umfassenden Schutz … sind 3 bis 4 Melder ideal.“ / „Ich kaufte noch in derselben Nacht acht Schutzix Detektoren.“ | **plausibel** (Schlafbereich + Quellnähe + Etagen), die Mengen in den Stories sind übertrieben | übernehmen, mit **Raumplan-Logik** statt Angst-Kaufrausch |
| 11 | Neu: „Jetzt, nicht irgendwann.“ | „Bitte prüfe es vor der nächsten Nacht.“ / „bevor du das nächste Mal die Heizung … anmachst“ | **legitimer Trigger** (Heizsaison, nächste Reise) | übernehmen, saisonal gekoppelt |
| 12 | Neu: „Nur hier kaufen.“ | „es gibt ihn nur auf der offiziellen Website, nicht auf Amazon. Nur so lässt sich sicherstellen, dass drinsteckt, was auf der Packung steht.“ | **Marketing-Behauptung**: Das Gerät ist bei Klonen identisch erhältlich | nicht übernehmen, stattdessen **Service-Exklusivität** (Beratung, Garantie, DE-Rückversand) |

## 7.2 Die entscheidende Verschiebung

```
„Ich habe Rauchmelder, also bin ich sicher.“
        ↓   (Stufe 1–2)
„Rauchmelder erkennen kein CO – und ich würde CO nicht bemerken.“
        ↓   (Stufe 3–5)
„Auch ein normaler CO-Melder mit grünem Licht sagt mir nicht, was ich atme – er meldet sich erst spät.“
        ↓   (Stufe 6)
„Und er erkennt kein Gasleck.“
        ↓   (Stufe 8–9)
„Ich brauche ein Gerät, das mir eine Zahl zeigt, mehrere Gase erkennt – und dem Profis vertrauen.“
        ↓   (Stufe 10–11)
„Und zwar für jeden Schlafbereich, fürs Wohnmobil und für meine Eltern – heute.“
```

**Was Schutzix zuerst zerstören muss [I]:** den Glauben, **bereits geschützt** zu sein. Wer glaubt, geschützt zu sein, kauft nichts. Deshalb beginnen nahezu alle Ads mit einer Person, die „alles richtig gemacht“ hat.

**Was danach aufgebaut wird:** **Sichtbarkeit als Sicherheitsbeweis** (die Zahl) plus **Mehrfachabdeckung** (Menge). Alles Weitere (Profi-Sensor, Exklusivität, Rabatt) ist Absicherung.

**Schwachstelle der Kette:** Stufe 4, die Norm-Lüge. Sie ist faktisch falsch **und** tragend. Ohne sie wirkt „ein Melder mit Zahl“ wie ein Komfort-Upgrade, nicht wie eine Lebensfrage. **SICHERLUFT kann Stufe 4 richtigstellen und dabei die Stufen 1, 2, 5, 8 und 10 behalten.** Damit bleibt der Kaufgrund erhalten, und SICHERLUFT ist die einzige glaubwürdige Stimme.

---

# 8. OFFER ANALYSIS

## 8.1 Preis- und Staffelstruktur [B]

| Paket | Preis | Preis/Stück | Streichpreis | Label | Beschreibung (Haushalt / Wohnmobil) | Geschenke |
|---|---|---|---|---|---|---|
| 1× | 59,95 € | 59,95 € | 99,95 € | SPAREN SIE 40 % | „Für kleine Wohnungen“ / „Für kleine Wohnmobile“ | – (Versand kostenpflichtig, frei erst ab 80 €) |
| **2×** (vorausgewählt) | **99,95 €** | 49,98 € | 199,90 € | SPAREN SIE 50 % | „Beinhaltet nur die Hauptwohnräume“ / „Wohnmobil komplett + 1x Melder für dein Zuhause“ | GRATIS Versand + E-Book (+ 12V-Adapter) |
| 3× | 129,95 € | 43,32 € | 299,85 € | 57 % · **BESTSELLER** | „Empfohlen für umfassenden Heimschutz“ / „Wohnmobil komplett + Schutz für Wohnung“ | wie oben |
| 4× | 159,95 € | 39,99 € | 399,80 € | 60 % · „Schützen Sie jedes Schlafzimmer“ | „Vollständige Abdeckung einschließlich aller Schlafzimmer“ / „Wohnmobil komplett + Schutz fürs Haus“ | wie oben |
| 12V-Adapter einzeln | 24,95 € | – | – | – | Zubehör Wohnmobil | – |

**Marktvergleich [B]:** Securias („SECURIAS™ 4 in 1 CO Detektor für Wohnmobile“, seit 15.08.) und Mavoni („PureAlert“, seit 12.08.) verlangen ebenfalls **59,95 € statt 99,95 €**. Der Preis ist also Kategorie-Standard der Klone und kein Schutzix-Asset.

## 8.2 AOV-Mechanismen [B, Wirkung I]

1. **Vorauswahl 2er-Set.** Der Default-Effekt macht 99,95 € zum Normalfall.
2. **Unzulänglichkeits-Framing im Untertitel.** Der Einzel „nur für kleine Wohnungen“, das 2er „nur die Hauptwohnräume“. Jede kleinere Stufe wird als Lücke formuliert.
3. **Geschenke erst ab 2 Stück** (Versand, E-Book, 12V-Adapter im Wert von 24,95 €). Der Einzelkauf fühlt sich wie ein Verlust an.
4. **Versandschwelle 80 €** liegt knapp über dem Einzelpreis.
5. **Raumlogik als Bildungsinhalt** („3 bis 4 Melder ideal“, „mindestens zwei auf engem Raum“ im Wohnmobil).
6. **Cross-Context-Bundle** Wohnmobil + Zuhause.
7. **Story-Seeding:** „acht bestellt: zwei fürs Wohnmobil, zwei fürs Haus, vier für meinen Bruder“, „Einen für euch. Einen für eure Tochter. Einen für eure Mutter.“
8. **Klarna** (Ratenkauf) senkt die Schwelle für 129,95 € und 159,95 €.
9. **Upsell-Infrastruktur** (Zipify, Kaching-Upsell-Blöcke) ist installiert. Konkrete Post-Purchase-Angebote sind ohne Kauf nicht einsehbar **[B]**.

## 8.3 Weitere Offer-Elemente [B]

- **E-Book „Unsichtbare Gefahren“:** Das Banner sagt „zu jeder Bestellung heute“, die Staffel zeigt es erst ab 2 Stück.
- **Countdown:** „HERBST SALE … bis zu 50 %“ läuft täglich um 23:59 Ortszeit ab (gemessen 21.09., 22.09., 23.09.). Auf /co-melder-ratgeber steht im September noch „**Limitierte Juli-Aktion** … Aktion endet in: 02:59:59 · Ausverkauf-Risiko: Hoch“.
- **Knappheit:** „Fast ausverkauft“ auf der PDP. Gleichzeitig weist das öffentliche Kaching-Datenfeld einen Lagerbestand von **25.831** (generisch) bzw. **997.309** (Wohnmobil) mit Überverkauf-Erlaubnis aus. Zwei Messungen im Abstand von 33 Minuten zeigten keine Veränderung. Die Absolutwerte sind nicht als Verkaufszahl interpretierbar.
- **E-Mail-Popup:** „50% Rabatt sofort sichern“. Ob das auf die ohnehin „reduzierten“ Preise addiert wird, ist nicht einsehbar **[S]**.
- **Kein Abo, keine Folgekosten** („Über uns“), nicht in den Ads kommuniziert.

## 8.4 Inkonsistenzen im Angebot [B]

| Thema | Variante A | Variante B | Variante C / weitere |
|---|---|---|---|
| **Geld-zurück-Garantie** | „100 Tage“ (PDP, Über uns, Insider, Sicherheitsreport, Zahlungsrichtlinie) | „**3-Jahres**-Geld-zurück-Garantie“ (Wohnmobil-, Haushalt-, Caravan-, Sicherheit-LPs, Ratgeber) | „**90 Tage** Geld-zurück“ (Ad Stefan Weber) |
| **Produktgarantie** | „3 Jahre Sensor-Garantie“ (Über uns, PDP-FAQ) | „**Lebenslange** Garantie“ (Ad Stefan Weber) | AGB: „Es gelten die gesetzlichen Gewährleistungsrechte“ |
| **Rabatt-Höhe** | Banner „bis zu 50 %“ | Staffel „SPAREN SIE 60 %“ | Mavoni-Klon „bis zu 60 %“, Popup „50 %“ |
| **Versand** | „Kostenloser Versand ab 80 €“ (PDP) | „GRATIS VERSAND“ (LPs) | „Jede Bestellung enthält: Kostenloser Versand“ (Sicherheitsreport, Einzelpreis 59,95 €) |
| **Lieferzeit** | „5 bis 10 Werktage“ (Versandbedingungen) | „1–2 Werktage + 4–8 Tage“ (FAQ) | Trustpilot: „lange Lieferzeit“, Paket „nach 7 Werktagen zurückgesendet“ |
| **Preis im Ad** | „Er kostet 60 Euro im Familien-Bundle mit 50 Prozent Rabatt“ (Ad) | PDP: 59,95 € = Einzelgerät mit 40 %; das 2er-Set kostet 99,95 € | – |
| **Exklusivität** | „nur auf der offiziellen Website schutzix.com“ | „ausschließlich auf … **schutzix.de**“ (/sicherheit, die Domain existiert nicht) | baugleiche Geräte bei Klonen |

**Urteil [I]:** Die **Struktur** ist stark (Default, Geschenke, Schwellen, Raumlogik, Cross-Context). Die **Glaubwürdigkeit** ist schwach: Dauer-„Sale“, fiktive Streichpreise, fünf Garantie-Versionen. Für SICHERLUFT ergibt sich daraus: Die Struktur übernehmen, **jede Zahl darin wahr machen**.


---

# 9. CLAIM & TRUST AUDIT

**Prüffrage bei jedem Claim:** *Erhöht er langfristig Glaubwürdigkeit oder maximiert er nur kurzfristig Aufmerksamkeit?*

**Rechtlicher Hinweis:** Die rechtlichen Einordnungen (UWG, PAngV, Meta-Richtlinien, GPSR/ElektroG) sind Risikohinweise aus Marketing-Sicht, keine Rechtsberatung. Für SICHERLUFT vor Kampagnenstart bitte anwaltlich prüfen lassen.

## 9.1 Faktencheck der tragenden Zahlen

| Schutzix-Behauptung [B] | Fundstellen | Faktenlage [B, Quelle] | Urteil |
|---|---|---|---|
| CO-Tote pro Jahr: „über 400“, „463“, „500+“, „550“, „bis zu 1.000“, „über 1.063“, „900+ Familien jeden Winter“ | LPs, PDP, Videos, Ads | Destatis: **382 Todesfälle (2024)** durch toxische Wirkung von CO. GBE/BfR: **397 (2021), davon 117 unbeabsichtigt**, der Rest sind überwiegend Suizide | **7 verschiedene Zahlen, alle ohne Quelle.** Die Unfallzahl wird mit Suiziden aufgebläht |
| Krankenhaus: „3.000 bis 4.000 in der Notaufnahme“, „~3.500“, „5.000+ Vergiftungen“ | LPs, PDP | Destatis: **1.834 vollstationär (2024)**. GBE/BfR: 2.199 (2021) | überhöht |
| „Die europäische Norm sagt: bei 70 ppm … bis zu vier Stunden“; „EN 50291 … 70 ppm: 60–240 min; 150 ppm: 10–50 min; 400 ppm: 4–15 min“ | Ad Stefan Weber, Sicherheitsreport, Ur-Ad Feuerwehrmann | **EN 50291-1:** 30 ppm → kein Alarm vor 120 min; **50 ppm → 60–90 min; 100 ppm → 10–40 min; 300 ppm → < 3 min.** Die zitierten Werte entsprechen der **US-Norm UL 2034** | **falsch**, und zwar das Kernargument |
| „Hirnschäden beginnen bei 40 ppm“ / „Bei 30 ppm fangen bei den meisten Menschen schon die ersten Hirnschäden an“ / „Kinder zeigen Symptome ab 20“ / „Körper eines Kindes fängt schon bei 30 an zu versagen. Bei 50 kannst du schütteln … es reagiert nicht mehr“ | LPs, Ads, Videos | keine Quelle angegeben; widersprüchlich (20/30/35/40 ppm) | **unbelegt, medizinisch überzogen**, im Kinder-Kontext besonders heikel |
| „CO bindet sich 200- / 245- / 300-mal stärker an Hämoglobin“ | Videos, Insider, PDP | Fachliteratur nennt typischerweise ca. 200–250-fach | 300 ist überzogen, die Spanne unbegründet uneinheitlich |
| „Über 1,7 Millionen Wohnmobile … zugelassen“ | Wohnmobil-LP, Caravan-LP | KBA: **1,05 Mio. Wohnmobile am 01.01.2026** | **falsch** (+60 %) |
| „41 % der Deutschen glauben fälschlich, ihr Rauchmelder warne auch vor CO (BfR)“; „82 % … gehört, 15 % … CO-Melder, 9 % …“ | Über uns, Insider | BfR-Befragung bestätigt die Werte. Die 41 % beziehen sich auf Befragte, die schon von CO-Vergiftungen gehört haben (n = 832) | **korrekt**, der beste Claim im gesamten Funnel |
| „Juni 2026 am Bodensee, Stellplatz 17“, „Müritz, Samstag im Juni, 4:17 Uhr“ | Videos, Ads | in der Websuche vom 23.09.2026 kein Pressebericht auffindbar | **nicht belegt** (vermutlich fiktiv **[S]**) |

## 9.2 Die vier Claim-Kategorien

### A) Claims, die Vertrauen aufbauen (behalten, belegen)
| Claim | Warum er trägt |
|---|---|
| „Ein Rauchmelder erkennt Rauch, aber kein Kohlenmonoxid.“ | wahr, überprüfbar, durch BfR-Daten als verbreiteter Irrtum belegt |
| „Das grüne Licht zeigt nur, dass der Melder eingeschaltet ist.“ | technisch korrekt, für jeden zu Hause nachprüfbar, entzaubert ein Alltagssignal |
| „Du siehst die Werte, bevor ein reiner Alarm-Melder anschlagen muss.“ (Insider-Formulierung: „Die bleiben still, bis ihr Alarm-Schwellenwert erreicht ist“) | ehrlicher Kern des Display-Mechanismus |
| „Eine Heizungswartung ist eine Momentaufnahme. Ein Defekt entsteht zwischen den Terminen.“ | logisch zwingend, entlastet den Handwerker |
| „Propan ist schwerer als Luft … niedrige Steckdose; Erdgas … möglichst weit oben“ (FAQ) | ehrliche Einschränkung = Kompetenzbeweis |
| BfR-Zahlen mit Quellenangabe | offizielle Quelle schlägt jede Story |

### B) Claims, die Risiko erzeugen (rechtlich, plattformseitig, Chargeback/Refund)
| Claim | Risiko |
|---|---|
| „empfohlen von der FEUERWEHR“ (PDP-Hauptbild), „Von der Feuerwehr entwickelt“ (Ad-Link-Beschreibung, LP), „Feuerwehrleute in ganz Deutschland empfehlen“ | Irreführung über Empfehlung durch eine Institution (UWG-Risiko), Imageschaden für echte Feuerwehren. Eine Trustpilot-Kundin hielt die Seite für „angeblich der deutschen Feuerwehr“ **[B]** |
| Fiktiver „Sicherheits-Insider Test 2026 – Testsieger 9,8/10“ ohne Anzeigenkennzeichnung, Konkurrenz-Buttons ins Leere | getarnte Werbung und irreführender Test (UWG). Fiktive Konkurrenzprodukte schützen nicht vor dem Vorwurf der Irreführung |
| „Trustpilot TrustScore 4.7 \| 3.824 Bewertungen“ | nachweislich falsch (real 2,2 bei 14) |
| „Fast ausverkauft“, „regelmäßig ausverkauft“, täglicher Evergreen-Countdown, „Juli-Aktion“ im September | Scheinknappheit (UWG-Risiko), leicht zu entlarven |
| Streichpreis 99,95 € bei Dauer-„Sale“ | PAngV-Risiko (niedrigster Preis der letzten 30 Tage), Glaubwürdigkeitsverlust, weil Klone denselben Anker nutzen |
| Tote Kinder, Totgeburt, „Hirnschäden“, sensationelle Notfallbilder, Persona-Seiten | Meta-Werberichtlinien (sensationelle Inhalte, irreführende Praktiken, unauthentisches Verhalten) → **belegte Kontosperre [B]** |
| Fehlende Angaben nach GPSR (Hersteller, EU-verantwortliche Person) und ElektroG (WEEE-Reg.-Nr., Rücknahme) auf der PDP | Abmahn- und Marktaufsichtsrisiko bei Elektrogeräten **[B: nicht auf PDP gefunden; Box-Aufdruck unbekannt]** |

### C) Claims, die nur mit starken Belegen verwendet werden sollten
| Claim | Benötigter Beleg |
|---|---|
| „Warnt ab 30 ppm“ / „ab 15 ppm“ / „Werte ab 1 ppm“ | Datenblatt, Messprotokoll mit Referenzgerät; Klärung Anzeige-Schwelle vs. Alarm-Schwelle. **Achtung:** Ein Alarm bei 30 ppm innerhalb von 120 min wäre mit EN 50291-1 nicht vereinbar |
| „Elektrochemischer Profi-Sensor wie in Feuerwehr-Messgeräten“ | Sensor-Hersteller und -Typ, Vergleichsmessung |
| „Erkennt Erdgas und Propan“ | Prüfung nach EN 50194-1 oder dokumentierter Test mit Prüfgas |
| „85 dB“ | Messung in 3 m (normüblich) |
| „Kalibriert sich in 200 Sekunden“ | Herstellerangabe. Aufwärmzeit ≠ Kalibrierung |
| Sensor-Lebensdauer („6 Jahre“, „lebenslang“) | Datenblatt des Sensors. Elektrochemische CO-Sensoren altern immer |
| „X Familien vertrauen“ / Bewertungsschnitt | Bestell- und Review-System mit Nachweis |

### D) Claims, die unglaubwürdig oder übertrieben wirken
| Claim | Warum er Vertrauen kostet |
|---|---|
| „Der letzte CO-Melder, den du dir … kaufen brauchst“ / „funktioniert lebenslang“ | Jeder Käufer weiß, dass Elektronik altert. Die AGB relativieren selbst („ersetzen keine … Sicherheitsmaßnahmen“) |
| „Null heißt sicher.“ | Ein einzelnes Gerät misst nur seinen Standort. Es verspricht mehr, als ein Sensor leisten kann |
| „4-in-1“ in vier Definitionen (CO+Erdgas+Propan+brennbare Gase / +Luftfeuchte / +Temp & Feuchte / „3 Gase + Raumklima“) | Wer vergleicht, merkt es. Propan und Erdgas **sind** brennbare Gase: Die „vierte Gefahr“ ist eine Doppelzählung |
| „Akku-Backup, USB-C“ (LP) vs. „keine Batterien“ (PDP) + separater 12V-Adapter | erzeugt Enttäuschung nach dem Kauf (Refund-Treiber) |
| „Standard-Detektoren verwenden Sensoren der Stufe 1. Schutzix … Stufe 3“ / „Grade-3-Sensortechnologie“ | kein etablierter Normbegriff, klingt technisch und ist inhaltsleer |
| „Entwickelt von einem ehemaligen Feuerwehrmann“ / „in enger Zusammenarbeit mit … Berufsfeuerwehrleuten … entwickelt“ | Dasselbe Gerät verkaufen Klone. Das Impressum nennt eine HK-Handelsgesellschaft |
| „Emil hat Sie beide gerettet, indem er gestorben ist.“ / „Zum Glück ist unser Hund gestorben.“ | maximaler Thumbstop, aber Trustpilot-Reaktionen belegen den Backlash: „Achtung, Fake-Story & Schleichwerbung!“, „Totaler Fake! Fake Geschichten“ **[B]** |
| „Die meisten Opfer hatten Rauchmelder“ / „Jede Familie, die ich tot aus einem Haus getragen habe, hatte Rauchmelder“ | pseudo-statistisch, nicht belegbar |

## 9.3 Trust-Inventar: Was ein prüfender Käufer findet [B]

| Prüfschritt des Käufers | Was er bei Schutzix findet |
|---|---|
| Google „Schutzix Erfahrungen“ | Trustpilot als Top-Treffer: **2,2 / 5, 14 Bewertungen, 86 % 1-Stern**. Themen: Fehlalarme („Piepst ununterbrochen, auch wenn kein Gas … da ist“; Gasalarm bis 6 % LEL in fast allen Zimmern ohne Leck), Retoure unmöglich oder auf eigene Kosten nach China, keine Antwort, „Support sendet nur KI Mails“, „KI Videos von Deutschen Feuerwehrleuten“, „Fake-Story & Schleichwerbung“. Zwei 5-Sterne-Bewertungen am selben Tag (15.09.) mit exakt den Werbe-USPs |
| Impressum | Black Dragon Goals Limited, Hongkong. Nur E-Mail (mit Tippfehler „soforthife@“), kein Telefon |
| Widerruf | HK-Adresse, Rücksendekosten trägt der Kunde |
| Kontakt auf den Advertorials | „service@schutzix.de“: **Domain existiert nicht**. „+49 (0)30 12345678“: Platzhalter |
| Facebook-Absender | Seiten mit 0–140 Likes, Kategorie „Personal blog“/„Künstler/in“. Profil „Peter Schulz“: „Ehemaliger Elektrotechniker bei Schönemann / Ehrenamtlicher Feuerwehrmann“, in den Ads aber „seit 27 Jahren Feuerwehrmann“ mit „Dienst-Messgerät“. Profil „Andreas Schneider“: „Notfallsanitäter | 20 Jahre“, in den Ads Großvater bzw. „21 Jahre Notfallsanitäter“. IG „peter.schulz64“: 0 Beiträge, 516 Follower |
| Startseite | oben „4,9 / 5,0 ‚Hervorragend‘ … über 10.000 Familien“, unten „★★★½ 6 Reviews“ |

**Fazit Trust [I]:** Schutzix gewinnt den **ersten Eindruck** und verliert jeden **zweiten Blick**. Die Conversion hängt davon ab, dass Käufer innerhalb der Emotionsspanne kaufen, bevor sie prüfen. Das begrenzt die Skalierung auf impulsive Käufer. Es erklärt die hohe Werbefrequenz und die Neukonto-Strategie, und es erzeugt Kosten für Refunds und Chargebacks, die öffentlich nicht messbar sind.


---

# 10. SCHUTZIX DOs – was Schutzix marketingtechnisch gut macht

### DO 1 – Ein Alltagssymbol umcodieren („Das grüne Licht bedeutet nur, dass dein Melder eingeschaltet ist.“)
- **SCHUTZIX MACHT:** Das konzeptionell stärkste Creative (F1, meiste Duplikate, meiste Seiten) nimmt ein Signal, das jeder zu Hause sieht, und gibt ihm eine neue Bedeutung: Grün heißt „Strom“, nicht „sicher“. **[B]**
- **WARUM ES FUNKTIONIERT:** Es entsteht ein *pattern interrupt* im Vertrauten, und die Behauptung ist **sofort selbst prüfbar**: Man geht zum Melder und sieht nur ein Licht. Der Zweifel wird physisch erlebt statt erzählt. Das Symbol wird zum Erinnerungsanker, weil jedes Mal, wenn der Kunde das grüne Licht sieht, die Werbung nachwirkt.
- **WAS SICHERLUFT LERNEN SOLLTE:** Den Mechanismus übernehmen, **aber beweisen statt behaupten**. Ein echtes Messvideo zeigt Referenzgerät, LED-Melder und SICHERLUFT-Display nebeneinander (Kap. 13, Creative 1). Eigene Formel: „Ein Licht sagt dir, dass er an ist. Eine Zahl sagt dir, was du atmest.“

### DO 2 – Belief Shifts vor dem Produkt verkaufen
- **SCHUTZIX MACHT:** Das Produkt erscheint erst nach 60–80 % des Textes. Vorher werden nacheinander Rauchmelder, eigene Wahrnehmung, Wartung und „normaler“ CO-Melder als Schutz delegitimiert (Kap. 7). **[B]**
- **WARUM ES FUNKTIONIERT:** Problem-unaware Käufer kaufen keine Lösung für ein Problem, das sie nicht zu haben glauben. Erst muss das Sicherheitsgefühl zerstört werden, dann ist das Produkt die logische Konsequenz statt ein Angebot.
- **WAS SICHERLUFT LERNEN SOLLTE:** Dieselbe Reihenfolge verwenden: Irrtum → Mechanismus → Lösung. Aber mit **Quellen** (BfR, Destatis, Norm) statt erfundener Tote. Jede LP braucht die Sektion „Was die meisten fälschlich glauben“.

### DO 3 – Den Käufer sich selbst diagnostizieren lassen
- **SCHUTZIX MACHT:** „Sieh dir dein Wohnmobil heute an. Hast du überhaupt einen Kohlenmonoxidmelder? Oder nur einen Rauchmelder? Falls du einen CO-Melder hast: zeigt er echte Live-Werte? Erkennt er auch Propan und Erdgas?“ Dazu drei Merksätze am Ende. **[B]**
- **WARUM ES FUNKTIONIERT:** Aktivierung statt Überredung. Der Leser beantwortet die Fragen innerlich mit Nein und hat sich damit selbst überzeugt. Das senkt Reaktanz und verankert die Kaufkriterien des Anbieters als Prüfkriterien des Kunden.
- **WAS SICHERLUFT LERNEN SOLLTE:** Einen **„60-Sekunden-Melder-Check“** als eigenes Asset bauen: Ad, LP-Modul und PDF. Die Kriterien so setzen, dass SICHERLUFT sie ehrlich erfüllt und Klone nicht: *Anzeige vorhanden? CO **und** Gas? Prüfnorm angegeben? Anbieter mit EU-Adresse und Rücksendeadresse? Erreichbarer Service?* Die letzten beiden Punkte kann Schutzix nicht bestehen.

### DO 4 – Segmentierung mit eigener Welt pro Avatar
- **SCHUTZIX MACHT:** Wohnmobil hat eigene Stories (Truma, Alkoven, Wespennest, Nachbar-Aggregat, Absorberkühlschrank in Schräglage), eigene LPs und eigene PDP mit 12V-Bundle. Haushalt hat Therme, Altbau-Gasetagenheizung und Grill des Nachbarn. **[B]**
- **WARUM ES FUNKTIONIERT:** Spezifität signalisiert Kompetenz und Relevanz („Das ist genau mein Leben“). Camper-Details wie Truma oder Kühlschrank im Gasbetrieb sind echte Insider-Codes.
- **WAS SICHERLUFT LERNEN SOLLTE:** Mindestens **zwei komplett getrennte Welten**: Wohnmobil und Haushalt-Heizsaison. Jede bekommt eigene Visuals, eigenes Vokabular, eigenes Bundle und eigene FAQ. Die Camper-Details sind echt; SICHERLUFT kann sie mit echten Campern und Fotos noch glaubwürdiger machen.

### DO 5 – Native-Tonalität, die nicht nach Werbung riecht
- **SCHUTZIX MACHT:** Privatpersonen-Absender, Long-Copy mit Alltagsdetails (Decathlon-Angelbox, Stoffhase, Zitronenkuchen), Zeitungs-Optik auf der LP ohne Shop-Header, Soft-CTA („unten verlinkt, falls es jemanden interessiert“), Kommentar-Aufforderung. **[B]**
- **WARUM ES FUNKTIONIERT:** Die Werbeabwehr springt nicht an. Sensorische Details erzeugen Glaubwürdigkeit durch Konkretheit. Kommentar-Prompts erzeugen Engagement, das die Auslieferung verbilligen kann **[I]**.
- **WAS SICHERLUFT LERNEN SOLLTE:** Native-Tonalität ja, **Täuschung nein**. Eine ehrliche Native-Form ist ein erkennbar von SICHERLUFT herausgegebener Ratgeber (z. B. „SICHERLUFT Sicherheits-Check“) mit echten Autoren, echten Kundengeschichten (mit Einwilligung) und echten Einsatzberichten aus der Presse, jeweils mit Quellenlink.

### DO 6 – Autorität über die „Was würden Sie selbst nehmen?“-Frage
- **SCHUTZIX MACHT:** „Ich fragte Hauptbrandmeister Keller, was ich dort hätte haben sollen. Nicht das, was im Wohnmobil verbaut war. Sondern das, was er in ein Wohnmobil stellen würde, wenn seine eigenen Enkel darin schlafen.“ **[B]**
- **WARUM ES FUNKTIONIERT:** Die private Wahl eines Experten wirkt ehrlicher als eine offizielle Empfehlung. Der Experte hat scheinbar nichts zu verkaufen.
- **WAS SICHERLUFT LERNEN SOLLTE:** Dasselbe Format mit **echten, namentlich genannten Fachleuten** (SHK-Meister, Schornsteinfegermeister, Brandschutzbeauftragte), die erklären, was sie privat nutzen und warum. Die Kooperation wird transparent gekennzeichnet. Das kann Schutzix nicht kopieren, ohne seine Personas zu entlarven.

### DO 7 – AOV-Architektur, die Mehrfachkauf logisch macht
- **SCHUTZIX MACHT:** 2er vorausgewählt, Unzulänglichkeits-Untertitel, Geschenke ab 2, Versand frei ab 80 €, „3 bis 4 Melder ideal“, Wohnmobil + Zuhause im Bundle, Story-Seeding von Mengen und Geschenkkäufen. **[B]**
- **WARUM ES FUNKTIONIERT:** Die Menge wird nicht als Upsell verkauft, sondern als **Schutzlogik**: Jeder Schlafbereich und jede Quelle braucht ein Gerät. Wer einen Raum ungeschützt lässt, fühlt sich schuldig.
- **WAS SICHERLUFT LERNEN SOLLTE:** Die Logik übernehmen, **mit einem echten Raumplan** (interaktiver Mini-Konfigurator: Wohnform, Heizung, Etagen, Wohnmobil → empfohlene Anzahl und Platzierung). Mengenrabatt ehrlich auf den eigenen Einzelpreis beziehen, ohne fiktiven 99,95-€-Anker.

### DO 8 – Schnelles, strukturiertes Testen
- **SCHUTZIX MACHT:** 32 verschiedene Einstiegssätze in 4 Monaten (in der Stichprobe), Neuauflagen mit getauschter Oberfläche (7/14/27 Jahre, Haus/Stellplatz/Wohnung), 9+ LP-Versionen, Kaching-A/B-Tests auf der PDP (Staffel-Reihenfolge, Geschenktext), Headline-Tests. **[B]**
- **WARUM ES FUNKTIONIERT:** Hohe Testfrequenz findet schneller Gewinner-Winkel. Modulare Templates (Hook-Formel + Autoritätsszene + Mechanismus + Selbst-Check + Soft-CTA) machen jede Variante billig.
- **WAS SICHERLUFT LERNEN SOLLTE:** Ein **modulares Copy-System** aufbauen (Hook-Bibliothek, belegte Mechanismus-Bausteine, Proof-Bausteine, CTA-Bausteine) und wöchentlich 6–10 neue Varianten testen. Der Unterschied: Jeder Baustein muss vor dem Einsatz faktengeprüft sein.

### DO 9 – Emotion im Video, Rationalität im Text
- **SCHUTZIX MACHT:** Der F1-Text ist nüchtern, das angehängte Video ist ein emotionaler Schock. **[B]**
- **WARUM ES FUNKTIONIERT:** Das System-1-Signal stoppt den Daumen, das System-2-Signal liefert die Kaufbegründung. Der Kunde kann sich den Kauf rational erklären.
- **WAS SICHERLUFT LERNEN SOLLTE:** Dieselbe Arbeitsteilung, aber mit einer **anderen Emotion**: Fürsorge, Kontrolle, Erleichterung beim Blick auf die Null, echte Beinahe-Ereignisse. Tote Kinder braucht es dafür nicht.

### DO 10 – Einwände in die Story einbauen
- **SCHUTZIX MACHT:** „Ich weiß, dass sie billig sind. Ich weiß, dass sie in zwei Tagen da sind. Ich weiß, die Reviews sehen überzeugend aus.“ / „Ja, mehr als die 20-Euro-Melder auf Amazon. Aber das ist der Punkt.“ **[B]**
- **WARUM ES FUNKTIONIERT:** Der Autor spricht den Einwand vor dem Leser aus. Das wirkt fair, und der Einwand ist entschärft, bevor er entsteht.
- **WAS SICHERLUFT LERNEN SOLLTE:** Die echten Einwände gegen SICHERLUFT antizipieren: Preis, „Brauche ich das?“, Fehlalarm, Stromversorgung im Wohnmobil, Lieferzeit, Seriosität. Jeden davon in Ads und LP **ehrlich** beantworten. Beim Einwand „Fehlalarm“ schweigt Schutzix; genau dort kann SICHERLUFT punkten.

---

# 11. SCHUTZIX DON'Ts – die Schwächen

### DON'T 1 – Widersprüchliche Kernfakten
- **PROBLEM:** „4-in-1“ hat vier Definitionen, die Alarmschwelle liegt bei 1/15/30/„vor 70“ ppm, die Todeszahlen reichen von 400 bis 1.063 (sieben Varianten), die Stromversorgung schwankt zwischen Akku/USB-C und „keine Batterien“, die Kundenzahl zwischen 9.437 und 12.873, die Sensor-Lebensdauer zwischen 6 Jahren und lebenslang. **[B]**
- **WARUM ES SCHUTZIX SCHWÄCHT:** Jede Inkonsistenz ist ein Abbruchgrund für Vergleicher, ein Refund-Grund für Enttäuschte und ein Beweismittel für Abmahner und Plattformen.
- **WIE SICHERLUFT ES BESSER MACHEN SOLLTE:** Ein **Claims-Register**, also eine einzige Tabelle mit jedem Zahlen- und Technik-Claim, Quelle, Datum und Verantwortlichem. Keine Ad geht live, deren Claims nicht im Register stehen.

### DON'T 2 – Falsche Norm als Hauptargument
- **PROBLEM:** Die US-Norm UL 2034 wird als „europäische Norm“ verkauft. **[B]**
- **WARUM ES SCHUTZIX SCHWÄCHT:** Das Kernargument („dürfen 4 Stunden warten“) ist für jeden Fachmann widerlegbar. Die eigene Zielgruppe (Feuerwehr-, SHK-, Technikaffine) ist genau die, die das weiß.
- **WIE SICHERLUFT ES BESSER MACHEN SOLLTE:** Die Norm korrekt erklären und daraus den ehrlichen Mehrwert ableiten. Der Alarm kommt normgerecht; das Display zeigt dir vorher den Verlauf. So wird SICHERLUFT zur **Richtigstellungs-Instanz** der Kategorie.

### DON'T 3 – Erfundene Menschen, erfundene Tote, erfundene Tests
- **PROBLEM:** Persona-Seiten mit widersprüchlichen Profilen, nicht belegbare Einsätze („Bodensee, Stellplatz 17“), fiktiver „Sicherheits-Insider“-Test, konstruierte FB-Kommentare mit identischen Namen und Likes auf allen LPs. **[B/I]**
- **WARUM ES SCHUTZIX SCHWÄCHT:** Das Muster ist öffentlich entlarvt: „Achtung, Fake-Story & Schleichwerbung!“, „KI Videos von Deutschen Feuerwehrleuten“ (Trustpilot). Meta hat Werbekonten gesperrt. Jede weitere Welle verbrennt Konten und Vertrauen der Kategorie.
- **WIE SICHERLUFT ES BESSER MACHEN SOLLTE:** Null erfundene Personen. Echte Kunden, echte Fachleute, echte Presseberichte mit Link. „Echt“ wird zum sichtbaren Markenversprechen.

### DON'T 4 – Social-Proof-Behauptungen, die mit zwei Klicks kollabieren
- **PROBLEM:** „4,9 / 12.800+“ und „Trustpilot 4.7 | 3.824“ stehen gegen die Realität von Trustpilot 2,2 bei 14 Bewertungen und „6 Reviews“ auf der eigenen Startseite. **[B]**
- **WARUM ES SCHUTZIX SCHWÄCHT:** Genau die kaufkräftigen, vorsichtigen Käufer 55+ googeln vor dem Kauf. Die Differenz zwischen Behauptung und Realität ist der stärkste Abbruchgrund, der sich denken lässt.
- **WIE SICHERLUFT ES BESSER MACHEN SOLLTE:** Nur echte, verifizierte Bewertungen zeigen (auch wenige), Trustpilot-Einladung für **jeden** Kunden automatisieren, schlechte Bewertungen öffentlich beantworten.

### DON'T 5 – Kein Trust-Unterbau
- **PROBLEM:** HK-Firma ohne Telefon, Rücksendung auf Kundenkosten nach Asien, eine nicht existierende Domain im Footer, eine Platzhalter-Telefonnummer, laut Trustpilot keine Antworten. **[B]**
- **WARUM ES SCHUTZIX SCHWÄCHT:** Die 100-Tage-Garantie ist praktisch wertlos, wenn die Rücksendung nach Hongkong geht. Das Risiko liegt beim Kunden, und der Kunde merkt es.
- **WIE SICHERLUFT ES BESSER MACHEN SOLLTE:** EU-Rücksendeadresse, vorfrankiertes Retourenlabel, Telefon oder WhatsApp in deutscher Sprache, sichtbare Antwortzeiten, Impressum mit ladungsfähiger EU-Anschrift. **Das ist die größte Einzelchance.**

### DON'T 6 – Produktrisiko Fehlalarm wird ignoriert
- **PROBLEM:** Trustpilot berichtet mehrfach von Gas-Fehlalarmen (bis 6 % LEL in fast allen Zimmern ohne Leck, „geht einfach los“). Der Halbleiter-Gassensor reagiert typischerweise auch auf Sprays, Alkohol und Dämpfe **[I]**. Kommuniziert wird: „intelligente Algorithmen“ gegen Fehlalarme. **[B]**
- **WARUM ES SCHUTZIX SCHWÄCHT:** Fehlalarme sind der schnellste Weg zu Retoure, 1-Stern und Rückbuchung. Bei einem Sicherheitsgerät gilt zudem: Ein Gerät, das zu oft falsch warnt, wird ausgesteckt.
- **WIE SICHERLUFT ES BESSER MACHEN SOLLTE:** Vor der Skalierung **eigene Burn-in- und Störtests** machen (siehe 13.5). Ehrliche Platzierungs- und Störquellen-Hinweise schon auf der PDP und in der Verpackung, dazu eine Hotline für „Mein Gerät zeigt Gas, was tun?“.

### DON'T 7 – Angst-Eskalation statt Angst-Management
- **PROBLEM:** Totgeburt, tote Kinder, „Finn hat Gehirnschäden erlitten“, „Zum Glück ist unser Hund gestorben“, Leiche unter Plane. **[B]**
- **WARUM ES SCHUTZIX SCHWÄCHT:** Die Methode liefert kurzfristig Thumbstop, erzeugt aber Reaktanz, Meldungen, Kontosperren und Markenekel. Sie ist nicht skalierbar in Kanäle, die Seriosität brauchen (Google, Presse, Partner, Handel).
- **WIE SICHERLUFT ES BESSER MACHEN SOLLTE:** **Angst dosieren und auflösen.** Das Problem wird ernst benannt, danach geht es sofort in Kontrolle und Handlungsfähigkeit über. Die Zielemotion ist „Erleichterung“, nicht „Panik“.

### DON'T 8 – Funnel-Brüche
- **PROBLEM:** Die Schwangerschafts- und Untreue-Stories landen auf einer LP ohne Bezug. Der Feuerwehr-Erzähler „Peter Schulz“ übergibt an Brandinspektor „Markus Weber“. Die Wohnmobil-LP verspricht einen Akku, den es nicht gibt. **[B]**
- **WARUM ES SCHUTZIX SCHWÄCHT:** Bei fehlendem Message Match kippt der Vertrauensbogen zwischen Klick und Kauf.
- **WIE SICHERLUFT ES BESSER MACHEN SOLLTE:** Jede Creative-Familie bekommt eine **passende LP-Variante** (mindestens eine eigene Einleitung mit dynamischem Abschnitt). Die Hook-Person oder -Situation taucht oben auf der LP wieder auf.

### DON'T 9 – Discount-Abhängigkeit und fiktive Anker
- **PROBLEM:** Dauer-„Sale“ (Juli-Aktion, Herbst-Sale, Evergreen-Countdown), 99,95-€-Anker, der identisch bei Klonen steht. **[B]**
- **WARUM ES SCHUTZIX SCHWÄCHT:** Preisglaubwürdigkeit null, Markenwert null. Sobald der nächste Klon 49,95 € verlangt, bleibt kein Argument.
- **WIE SICHERLUFT ES BESSER MACHEN SOLLTE:** Echte Preise, echte Set-Vorteile, echte Aktionen mit echten Enddaten. Wert über Service, Beratung und Garantie schaffen statt über Prozente.

### DON'T 10 – Null Brand Equity, maximale Plattform-Abhängigkeit
- **PROBLEM:** Keine Marken-Seite, keine organischen Kanäle, keine Presse, kein Suchvolumen außer „Schutzix Erfahrungen“ (→ Trustpilot). Kontosperre am ~01.09. **[B]**
- **WARUM ES SCHUTZIX SCHWÄCHT:** Jede Sperre setzt Pixel-Lernen, Social Proof und Reichweite zurück. Klone kopieren Produkt, Preis und Angle binnen Wochen (Securias ab 15.08., „Logic Tech“ ab 17.09.).
- **WIE SICHERLUFT ES BESSER MACHEN SOLLTE:** Von Tag 1 Brand-Assets aufbauen, die nicht über Nacht verschwinden: echte Marken-Seite mit Historie, Suchmaschinen-Content, Partner, Bewertungsprofil, E-Mail-Liste und Community.

### DON'T 11 – Technische und Compliance-Lücken
- **PROBLEM:** Keine Norm- oder Prüfangaben, keine GPSR-Herstellerangaben und keine WEEE-Nummer auf der PDP, „C₂H₂“ und „ExNx“ auf dem Karton, LED-Beschriftungen, die zwischen „Green/Fault/Störung“ und „Betrieb/Alarm/Störung“ wechseln. **[B]**
- **WARUM ES SCHUTZIX SCHWÄCHT:** Das angreifbar bei Marktaufsicht und Abmahnern und erzeugt beim technikaffinen Käufer Zweifel am Produkt.
- **WIE SICHERLUFT ES BESSER MACHEN SOLLTE:** Einen **Technik- und Konformitätsblock** auf der PDP: Norm/Prüfzeichen (falls vorhanden), Sensortyp, Messbereich, Anzeige- und Alarmschwellen, Stromversorgung, Lebensdauer, Hersteller und EU-Verantwortlicher, WEEE-Nr., Konformitätserklärung als PDF.

---

# 12. WARUM MENSCHEN SCHUTZIX KAUFEN

**Nicht: „weil es ein 4-in-1-Melder ist“.** Die Kaufentscheidung setzt sich psychologisch so zusammen **[I, abgeleitet aus Copy-Architektur, Auslieferungsdaten und Kundenstimmen]**:

**1. Welche Angst?**
Nicht die Angst zu sterben, sondern die Angst, **schuld zu sein**. Alle erfolgreichen Hooks drehen sich um eine Person, die jemanden schützen wollte und versagt hat: der Opa, der der Tochter „Er ist sicher“ versprochen hat; die Mutter, deren Kind nicht mehr aufwacht; der Sohn, der die Mutter „hätte retten können“. Die EU-Reichweitendaten passen dazu: Die Stories mit Schuld-Motiv laufen überwiegend an **55+**. Das sind die Menschen in der Rolle der Beschützer von Enkeln und Partnern und des eigenen Zuhauses.

**2. Welche neue Überzeugung?**
**„Sicherheit ist nur echt, wenn ich sie sehen kann.“** Das grüne Licht wird vom Sicherheitsbeweis zum Beweis für Nichtwissen. Die Zahl auf dem Display wird zum neuen Beweis. Dazu kommt „mehr als eine Gefahr“ als Rechtfertigung für ein teureres Gerät.

**3. Welcher Moment erzeugt Dringlichkeit?**
**Die nächste Nacht.** „Bitte prüfe es vor der nächsten Nacht.“ / „vor der nächsten Fahrt“ / „bevor du das nächste Mal die Heizung anmachst“. Die Gefahr wird an ein unausweichliches, nahes Alltagsereignis gekoppelt: Schlafen, Heizen, Camping-Wochenende. Dazu kommen Countdown und „fast ausverkauft“ als zweite, künstliche Uhr.

**4. Welche bestehende Lösung wird delegitimiert?**
Nacheinander: der **Rauchmelder** („erkennt kein CO“), die **eigene Wahrnehmung** („farb-, geruchlos; Symptome wie Erkältung“), die **Wartung und der Fachmann** („hat übersehen“), der **normale CO-Melder** („darf bis 70 ppm und 4 Stunden warten“, „grünes Licht“), **Amazon und Baumarkt** („keine Qualitätskontrolle“) und sogar die **Norm** („Mindestnorm, rettet keine Leben“). Am Ende bleibt nichts, dem der Käufer noch vertraut, außer dem, was ihm der „Experte“ in der Story empfiehlt.

**5. Warum erscheint Schutzix danach als logische Konsequenz?**
Weil es die **einzige verbleibende Option ist, die jedes zerstörte Kriterium erfüllt**. Es hat eine Zahl statt Licht und erkennt Gas plus CO. Es wirkt „vom Profi“ empfohlen, braucht keinen Einbau („Einstecken, 30 Sekunden“) und ist „nicht bei Amazon“. Die Menge folgt der Raumlogik, der Preis der Enemy-Logik („bei 20 € wurde gespart“). **Der Kauf ist dann keine Ausgabe mehr, sondern eine Wiedergutmachung im Voraus.** Man kauft sich frei von der Schuld, die man in der Geschichte gerade durchlebt hat.

**Die Schwachstelle dieser Psychologie [I]:** Sie funktioniert nur, solange der Käufer **nicht prüft**. Die Wiedergutmachung wird entwertet, sobald das Gerät Fehlalarm gibt, die Rücksendung nach Hongkong geht oder der Käufer die Fake-Story erkennt (Trustpilot). Dann kippt die Schuld in Wut: „Totaler Fake“, „Betrug“, „Finger weg“. **SICHERLUFT muss dieselbe Kaufmotivation bedienen – Schutz der Liebsten, sichtbare Kontrolle, Handeln vor der nächsten Nacht – und sie gegen genau diese Prüfung immun machen.**


---

# 13. SICHERLUFT COMPETITIVE ATTACK PLAN

**Grundsatz:** SICHERLUFT kopiert nicht, was Schutzix *sagt*. SICHERLUFT übernimmt, was bei Schutzix nachweislich *wirkt*: den Belief-Shift-Mechanismus, das Wohnmobil-Segment, die Autorität von Fachleuten und die Raumlogik im Angebot. Die Belege tauscht SICHERLUFT komplett aus. Wo Schutzix erfindet, misst SICHERLUFT. Wo Schutzix Personas vorschiebt, zeigt SICHERLUFT echte, benannte Menschen. Wo Schutzix beim zweiten Blick zerfällt, macht SICHERLUFT den zweiten Blick selbst zum Verkaufsargument.

**Warum dieser Weg und nicht „Schutzix, nur besser getextet“ [I]:**
1. **Das Gerät ist austauschbar.** Schutzix, Mavoni und sehr wahrscheinlich Securias und SICHERLUFT verkaufen dasselbe OEM-Gerät zum selben Preis (Kap. 8). Zusätzlich gibt es Markenware mit CO-Display im Handel, laut Vergleichsportalen ab etwa 30–40 € **[B: Vergleichsportale, Stand 09/2026, Einzelpreise vor Nutzung prüfen]**. „Nur wir zeigen eine Zahl“ ist deshalb **kein** haltbares Alleinstellungsmerkmal. Haltbar sind nur die Kombination (CO + brennbare Gase in einem Steckgerät), die Nachprüfbarkeit und der Service.
2. **Das Angst-Modell verbrennt Konten.** Schutzix hat im September seine Werbekonten verloren und musste neu starten (Kap. 1). Eine Marke, die auf dieselben Motive setzt, erbt dasselbe Sperrrisiko und verliert mit jeder Sperre Lernphase und Pixel-Historie.
3. **Der Markt ist mit unbelegten Behauptungen gesättigt.** In einem Markt, in dem mehrere Shops dasselbe Gerät mit denselben Superlativen verkaufen, gewinnt nach Schwartz' Logik der „Market Sophistication“ nicht der lauteste Claim. Es gewinnt der, der seinen Mechanismus **beweist**. Das ist SICHERLUFTs Eintrittspunkt.

## 13.1 Positionierung

**Positionierungssatz (intern):**
> Für Menschen, die für andere Verantwortung tragen (Kinder, Enkel, Eltern, Mitreisende) und merken, dass ein Rauchmelder sie nicht vor Kohlenmonoxid und Gas schützt, ist SICHERLUFT der Luftwächter mit Anzeige, bei dem **jede Aussage nachprüfbar** ist: Messwerte, Normen, Menschen, Firmenadresse. Anonyme Angst-Shops liefern dagegen Geschichten, Tests und Bewertungen, die beim zweiten Blick zerfallen.

**Positionierungs-Landkarte [I]:**

| | **Wenig Aufklärung, wenig Emotion** | **Starke Aufklärung und Emotion** |
|---|---|---|
| **Hohe Nachprüfbarkeit** (Normen, Hersteller, erreichbar) | Etablierte Markengeräte im Handel und auf Amazon: sachlich, günstig, erklären wenig | **↯ freier Platz: SICHERLUFT** |
| **Niedrige Nachprüfbarkeit** | Namenlose Marktplatz-Geräte | Schutzix, Securias, Mavoni und Klone: starke Geschichten ohne Belege |

**Markenversprechen, 3 Kandidaten zum Testen (Kap. 14):**
- „Sehen, was du atmest.“ (Mechanismus)
- „Sicherheit, die du nachprüfen kannst.“ (Trust)
- „Die Zahl statt des grünen Lichts.“ (direkte Umdeutung des Schutzix-Kernbilds, ohne Schutzix zu nennen)

**Emotionale Position:** Schutzix führt über Angst und Schuld in den Panikkauf. SICHERLUFT führt über **Verantwortung und Klarheit zu ruhigem Handeln**. Die Gefahr wird nicht kleingeredet. Sie wird mit echten Zahlen dosiert: Destatis zählt 382 CO-Tote (2024) und 1.834 vollstationäre Fälle. Das reicht als Ernst der Lage, dafür braucht niemand erfundene tote Kinder.

**Ansprache:** In Social Ads und im Wohnmobil-Strang „du“. Das ist in der Camping-Community üblich, und alle Schutzix-Ads nutzen es **[B]**. Anleitungen, die bei älteren Eltern ankommen (Geschenk-Strang, Beipackzettel), in „Sie“.

**Was SICHERLUFT bewusst nicht tut, und warum:**

| Nicht tun | Grund |
|---|---|
| Persona-Seiten („Peter Schulz“, „Tagesbericht“) | Unauthentisches Verhalten nach Meta-Richtlinien und Kern der Schutzix-Sperre **[I]**. Das legale Äquivalent sind Partnership Ads mit echten, gekennzeichneten Personen |
| Erfundene Todesfälle, Schwangerschaften, tote Kinder oder Haustiere | Trustpilot belegt den Backlash **[B]**, sensationelle Inhalte verstoßen gegen Meta-Werberichtlinien, und die Geschichten halten keiner Prüfung stand |
| „Empfohlen von der Feuerwehr“ oder Feuerwehr-Optik ohne Freigabe | Irreführung über die Empfehlung einer Institution (UWG-Risiko) |
| Selbstgebaute „Tests“ und „Testsieger“ | getarnte Werbung und Irreführung |
| Evergreen-Countdown, „fast ausverkauft“, Streichpreis ohne echte Referenz | UWG/PAngV-Risiko, und genau die Muster, an denen Käufer Schutzix entlarven |
| Konkurrenten nennen oder herabsetzen | § 4 Nr. 1 und § 6 UWG. Der Angriff läuft über **Kaufkriterien**, nicht über Namen |
| „Nur hier erhältlich“, „der letzte Melder, den du je brauchst“ | nachweislich falsch bzw. physikalisch unhaltbar (Sensoren altern) |

## 13.2 Creative Strategy – 10 Familien

**Übersicht und Priorität:**

| # | Familie | Kontert Schutzix-Familie | Segment | Priorität | Start |
|---|---|---|---|---|---|
| S1 | Grünes Licht – live gemessen | F1 (Scale-Engine) | beide | **P1** | Woche 3 |
| S2 | Der 41-%-Irrtum (BfR-Quiz) | F1/F10 (Rauchmelder-Mythos) | Haushalt | **P1** | Woche 3 |
| S3 | Nacht-Check im Wohnmobil | F3/F4 (Wohnmobil-Tod) | Wohnmobil | **P1** | Woche 3 |
| S4 | Die Fachperson, die es jeden Tag sieht | F2 (Einsatzkraft-Ich) + F6 (Handwerker versagt) | beide | P2 | Woche 3–4 |
| S5 | Der erste kalte Abend (Heizsaison + Kaminofen) | – (Schutzix-Lücke) | Haushalt | P2 | Woche 3–4 |
| S6 | Das Geschenk für die Eltern | F4 „Meine Mutter …“ (Schuld) | Haushalt | P2 | ab Woche 4 (Q4) |
| S7 | 5 Fragen vor dem Kauf | F8 (Amazon-Enemy) | beide, Retargeting | **P1** (Retargeting) | Woche 3 |
| S8 | Gründer und Team | – (Schutzix hat kein Gesicht) | Retargeting | P2 | Woche 3 |
| S9 | Echte Messwerte unserer Kunden | F11 (Schein-UGC) | beide | P3 | ab erster Kundenbasis |
| S10 | Neues Zuhause-Check | F6 Gutachter (105 Tage) | Mieter/Käufer | P3 | nach Woche 4 |

**Pflicht für alle Familien:**
- Jede Zahl steht im Claims-Register (13.5) mit Quelle.
- Keine KI-generierten Menschen oder „Einsatzfotos“.
- Absender ist die SICHERLUFT-Seite oder eine echte Person per Partnership Ad.
- Headline und Link-Beschreibung sind mit Seite und PDP identisch.

---

### S1 · „Grünes Licht – live gemessen“ (Mechanismus-Demo)

| Feld | Inhalt |
|---|---|
| **Avatar** | breit (Haushalt und Wohnmobil). Kern: Vergleicher (A8) und technikaffine Männer 45+, die Schutzix' F1 laut EU-Reichweitendaten bereits überproportional erreicht (Kap. 5) |
| **Hook (Varianten)** | a) „Dieses grüne Licht heißt nur: Strom ist da. Wir zeigen dir, was es dir nicht sagt.“ · b) „Zwei Melder. Gleiche Luft. Nur einer sagt dir, was gerade passiert.“ · c) „Drück mal auf die Testtaste deines Rauchmelders. Weißt du, was du gerade getestet hast?“ |
| **Angle** | Ein Alltagssymbol wird umgedeutet (der validierte Schutzix-Mechanismus), aber **per Messung bewiesen** statt per Geschichte behauptet |
| **Format** | 9:16-Reel, 20–40 s, echte Aufnahme ohne Schnitt im Messteil. Dazu 4:5-Split-Bild (Feed) und ein Karussell „Was die Testtaste wirklich testet“ |
| **Visual** | Transparente Prüfbox, darin links ein handelsüblicher Rauchmelder (grün, stumm), rechts SICHERLUFT mit Display. Eine benannte Fachperson (z. B. Schornsteinfeger oder Gas-Fachbetrieb) leitet zertifiziertes CO-Prüfgas ein. Timer-Overlay, Display steigt sichtbar. Einblendung: „Durchgeführt von [Name, Qualifikation] mit Prüfgas. Nicht nachmachen.“ |
| **Story** | Hook → „Was du hier siehst“ (Aufbau in 1 Satz) → Rauchmelder bleibt grün, weil er kein CO erkennt (wahr, BfR-Irrtum) → Display zeigt die Zahl → Einordnung: „Auch ein normgerechter CO-Melder darf bei 50 ppm bis zu 90 Minuten warten, bevor er Alarm gibt. So verhindert die Norm Fehlalarme. Ein Display zeigt dir die Entwicklung schon vorher.“ (Quelle EN 50291-1 eingeblendet) → CTA |
| **CTA** | „Mach den 30-Sekunden-Check: Was schützt dich heute wirklich?“ |
| **Landingpage** | LP-B Heizsaison-Check. Wohnmobil-Schnitt (Prüfbox im Fahrzeug) → LP-A Wohnmobil. Die ungeschnittene Langversion liegt auf LP-C (Nachweise) |
| **Belief-Shift** | Stufen 1, 4, 5, 8 (siehe 13.4) |
| **Warum** | F1 ist Schutzix' Scale-Engine: die meisten Anzeigen, die meisten Duplikate, von einem Dropshipper kopiert **[B]**. Der Text-Kern ist weitgehend wahr. Schutzix kann ihn aber nur **behaupten**, weil die Videos KI-Szenen sind. SICHERLUFT kann ihn **zeigen**. Eine Messung ist schwerer zu ignorieren als eine Behauptung, und sie ist policy-sicher, weil nichts Sensationelles zu sehen ist |
| **Risiko / Voraussetzung** | Nur nach Gerätetest (Woche 1). Vergleich mit einem **CO-Melder** nur generisch (keine Marke sichtbar) und nur mit korrekten Normzeiten (§ 6 UWG). Kein Prüfgas-Test ohne Fachperson. Keine Aussage „alarmiert bei 30 ppm“, bevor geklärt ist, was das Gerät tatsächlich tut (13.5) |

### S2 · „Der 41-%-Irrtum“ (BfR-Aufklärung als Quiz)

| Feld | Inhalt |
|---|---|
| **Avatar** | Haushalt 30–65, Eltern mit Gastherme oder Altbau-Etagenheizung (A4), Heizsaison |
| **Hook (Varianten)** | a) „41 % glauben, ihr Rauchmelder warnt auch vor Kohlenmonoxid. Das stimmt nicht.“ · b) „3 Fragen. Wenn du eine falsch beantwortest, lies weiter.“ · c) „Kann man Kohlenmonoxid riechen? 44 % sagen: ja.“ · d) „90 % haben einen Rauchmelder. 15 % einen CO-Melder.“ |
| **Angle** | Die offizielle Quelle schlägt die Story. Der Leser testet sich selbst und steigt von „problem-unaware“ zu „problem-aware“ auf |
| **Format** | 4:5-Karussell („Antwort auf der nächsten Karte“), 15-s-Text-Reel, Story mit Umfrage-Sticker. **Viele günstige Varianten:** Das ist die Familie für schnelles Hook-Lernen |
| **Visual** | typografische Karten in SICHERLUFT-Farben, Quellenzeile „BfR-Verbraucherbefragung Kohlenmonoxid“ auf jeder Karte, keine Stockfotos von Notfällen |
| **Story** | Frage → Auflösung → Konsequenz (90 % vs. 15 %) → „Was du heute tun kannst“ (Therme warten lassen, Abgasweg frei, CO-Melder im Schlafbereich) → SICHERLUFT als **eine** Option, nicht als einzige Rettung |
| **CTA** | „Mach den 60-Sekunden-Check für dein Zuhause“ |
| **Landingpage** | LP-B Heizsaison-Check (Quiz-Einstieg → Raumplan) |
| **Belief-Shift** | Stufen 1–2 |
| **Warum** | Die BfR-Zahl ist der **einzige korrekt belegte Claim** im gesamten Schutzix-Funnel, versteckt auf „Über uns“ und der Insider-Seite **[B]**. SICHERLUFT macht ihn zur Headline. Ein Quiz aktiviert zudem das Muster „Käufer diagnostiziert sich selbst“, das Schutzix mit Selbst-Check-Fragen im Text nutzt (Kap. 10, DO 3) |
| **Risiko** | Gering. Die Prozentwerte korrekt einordnen: Die 41 % beziehen sich auf Befragte, die schon von CO-Vergiftungen gehört hatten |

### S3 · „Nacht-Check im Wohnmobil“ (Ritual statt Todesfall)

| Feld | Inhalt |
|---|---|
| **Avatar** | Wohnmobil-Großeltern 60–75 (A1) und Wohnmobil-Familien 35–50 (A2) |
| **Hook (Varianten)** | a) „Meine Abend-Routine im Wohnmobil hat seit diesem Jahr einen Punkt mehr.“ · b) „Gas zu. Fenster auf Kipp. Heizung auf 18 Grad. Und dann schaue ich auf diese Zahl.“ · c) „30 Jahre Wohnmobil. Ich habe alles geprüft, nur nie die Luft.“ |
| **Angle** | Kompetenz-Ritual. Schutzix nutzt die Kompetenz-Liste (Keile, Landstrom, Druckminderer) als Fallhöhe vor dem Tod (F4). SICHERLUFT macht daraus eine **positive Routine**, in der ein Punkt gefehlt hat |
| **Format** | Partnership Ad mit echtem Camper-Creator aus DE/AT, 9:16, 45–60 s. Dazu ein **Long-Copy-Textpost mit Foto** vom Creator: Das ist das Format, mit dem Schutzix' langlebigste Anzeigen liefen (83–106 Tage, F2/F3) **[B]**. Zusätzlich statische Checkliste 4:5 |
| **Visual** | echtes Fahrzeug in der Dämmerung, Heizungs-Bedienteil, Gaskasten, Gerät an einer niedrigen Steckdose, Display „0 ppm“, Alkoven |
| **Story** | Abendroutine (4–5 Handgriffe) → „Was ich früher nie geprüft habe“ → ein Fakt ohne Drama (CO ist geruchlos; Quellen im Wohnmobil: Heizung, Kocher, Aggregat des Nachbarn) → wo das Gerät steckt und warum (Propan ist schwerer als Luft → unten) → **ehrliche Einschränkung** zur Stromversorgung (Landstrom, Wechselrichter oder verifizierte 12-V-Lösung) → „So schlafen wir ruhiger.“ |
| **CTA** | „Hol dir die Nacht-Check-Liste als PDF“ (E-Mail-Erfassung) bzw. „Zum Wohnmobil-Set“ |
| **Landingpage** | LP-A Wohnmobil-Nacht-Check |
| **Belief-Shift** | Stufen 1, 2, 6, 7 |
| **Warum** | Das Wohnmobil-Segment ist bei Schutzix am klarsten validiert: eigenes Produkt, eigenes Template, eigene Persona-Seite, 83 Tage Laufzeit, Neuauflage nach der Sperre **[B/I]**. Schutzix besetzt es aber ausschließlich über den **Tod**. Die Ritual-Variante ist unbesetzt, policy-sicher und für Camper-Creator glaubwürdig erzählbar. Sie bringt die Native-Anmutung der Persona-Posts **legal** zurück |
| **Saison** | Herbsttouren und Wintercamping (jetzt), Saisonstart März/April |
| **Risiko / Voraussetzung** | **Wohnmobil-Eignung nur behaupten, wenn belegt.** Für Freizeitfahrzeuge gibt es eigene Normen: EN 50291-2 (CO, u. a. mit Vibrationsprüfung) und EN 50194-2 (Flüssiggas) **[B]**. Ohne diese Nachweise lautet die Formulierung „für den Einsatz im stehenden Fahrzeug mit Landstrom“, nicht „für Wohnmobile entwickelt“ |

### S4 · „Die Fachperson, die es jeden Tag sieht“ (echte, benannte Autorität)

| Feld | Inhalt |
|---|---|
| **Avatar** | Haushalt (A4, A5, A6). Wohnmobil-Variante mit Gas-Prüfer oder Caravan-Werkstatt |
| **Hook-Vorlagen** (mit echten Aussagen der Person füllen) | a) „Ich bin [Beruf] in [Ort]. Das sehe ich jede Heizsaison: …“ · b) „Wartung ist eine Momentaufnahme. Was dazwischen passiert, sieht keiner.“ · c) „Was ich meinen eigenen Eltern empfohlen habe.“ |
| **Angle** | Handwerker als **Verbündete**. Das ist die Umkehrung von Schutzix' F6 („Gutachter/Schornsteinfeger hat übersehen“) |
| **Format** | Interview- oder Talking-Head-Video 30–60 s plus Long-Copy-Post. Wenn die Person eine eigene Seite hat: Partnership Ad von ihrer Seite |
| **Visual** | echter Heizungsraum, echtes Abgasmessgerät, Firmenwagen mit echtem Logo (nur mit Freigabe) |
| **Story** | Wer ich bin → was ich sehe (reale, anonymisierte Fälle ohne Dramatisierung) → warum die Wartung allein nicht reicht → allgemeine Empfehlung (CO-Melder im Schlafbereich und im Aufstellraum der Feuerstätte) → warum eine Anzeige hilft → Kennzeichnung „bezahlte Partnerschaft“ |
| **CTA** | „Den ganzen Beitrag lesen“ |
| **Landingpage** | LP-B (Experten-Abschnitt) oder LP-C |
| **Belief-Shift** | Stufen 3, 4, 7 |
| **Warum** | Der Einsatzkraft-Ich-Erzähler ist Schutzix' **ältester und langlebigster Core Angle** (106 Tage, dreimal neu produziert) **[B/I]**. Die Autoritätsmechanik ist also validiert. Schutzix fälscht sie aber (Seite „Peter Schulz“ ist als *Künstler/in* kategorisiert, dazu ein Feuerwehr-Banner ohne Beleg). **Eine** echte, benannte Fachperson ist in der Prüfphase mehr wert als hundert Persona-Posts |
| **Risiko** | Keine Institution als Empfehler („die Feuerwehr empfiehlt“). Feuerwehrangehörige nur als Privatperson, Dienstkleidung nur mit Freigabe der Wehr **[I – prüfen]**. Bezahlung offenlegen. Die Person sagt nur, was sie tatsächlich vertritt |

### S5 · „Der erste kalte Abend“ (Heizsaison + Kaminofen)

| Feld | Inhalt |
|---|---|
| **Avatar** | Eltern mit Gastherme oder Altbau-Etagenheizung (A4). Dazu die **Schutzix-Lücke Kaminofen-, Holz- und Pelletheizer** |
| **Hook (Varianten)** | a) „Bevor du heute zum ersten Mal die Heizung aufdrehst: 3 Dinge, die in keinem Wartungsprotokoll stehen.“ · b) „Dein Kaminofen braucht Luft. Und du einen Blick auf die Zahl.“ · c) „Erster Frost diese Woche. Hier ist die 5-Minuten-Liste.“ |
| **Angle** | Ein echter Kalendermoment als legitimer Dringlichkeits-Trigger. Schutzix' „vor der nächsten Nacht“ ist erfunden, der erste Heizabend ist real |
| **Format** | statische Checkliste 4:5, Karussell, 15–20-s-Reel. **Budget an Wetter koppeln**: Wenn Frost angekündigt ist, Budget erhöhen **[I]** |
| **Visual** | Thermostat, Wohnzimmer am Abend, Kaminofen mit Holz, Gerät mit Display an der Steckdose, echte Wohnung |
| **Story** | Saisonstart → Checkliste (Wartung, Abgasweg und Nester nach dem Sommer, Zuluft beim Kaminofen, Melder im Schlafbereich) → warum eine Anzeige hilft → Produkt |
| **CTA** | „Checkliste + passender Melder für dein Zuhause“ |
| **Landingpage** | LP-B Heizsaison (Kaminofen-Abschnitt); ab Oktober optional LP-E Kaminofen |
| **Belief-Shift** | Stufen 3, 9 |
| **Warum** | Schutzix hat keinen Kaminofen-Avatar und keinen Saisonkalender (Kap. 5.3). Heizsaison bedeutet mehr Feuerstätten-Betrieb, damit mehr reale CO-Quellen und mehr Aufmerksamkeit für das Thema **[I]** |
| **Risiko** | Pelletlager als CO-Quelle nur mit Fachquelle erwähnen |

### S6 · „Das Geschenk für die Eltern“ (Fürsorge statt Schuld)

| Feld | Inhalt |
|---|---|
| **Avatar** | Erwachsene Kinder 35–60 älterer Eltern (A5). Q4-Geschenkzeit |
| **Hook (Varianten)** | a) „Meine Eltern heizen seit 40 Jahren mit derselben Therme. Dieses Jahr schenke ich ihnen etwas, das hoffentlich nie piept.“ · b) „Das unromantischste Geschenk, über das sich meine Mutter am meisten gefreut hat.“ · c) „Eins für uns. Eins für Oma.“ |
| **Angle** | Positive Fürsorge. Der Kauf ist eine Geste, keine vorweggenommene Wiedergutmachung. Schutzix nutzt Schenken nur als Nebenhandlung nach einem Todesfall (Kap. 5.3) |
| **Format** | UGC echter Kunden (sobald vorhanden) bzw. Creator mit Eltern. Statisches Geschenk-Visual und ein kurzes Erklärstück zum Geschenkservice |
| **Visual** | Übergabe, Einrichten beim Besuch, Mutter liest die Zahl vor, großes Display, Einrichtungskarte in großer Schrift |
| **Story** | Situation der Eltern → warum gerade dort (Symptome wie Müdigkeit oder Kopfschmerz werden leicht als Alter oder Infekt abgetan) → Übergabe → Ruhe auf beiden Seiten |
| **CTA** | „Als Geschenk senden – mit Karte und Anleitung in großer Schrift“ |
| **Landingpage** | LP-D Geschenk |
| **Belief-Shift** | Stufen 2, 7 |
| **Warum** | Schutzix hat Mehrfachkauf für Angehörige als stärksten AOV-Treiber in den Geschichten verankert („Einen für eure Mutter“) **[B]**. SICHERLUFT holt diesen Kaufanlass ohne Todesfall ab und öffnet damit Q4 (Weihnachten), wo Angst-Creatives schlechter passen **[I]** |
| **Risiko** | Gesundheitsaussagen zu älteren Menschen allgemein halten oder mit Quelle belegen |

### S7 · „5 Fragen vor dem Kauf“ (Transparenz-Angriff über Kaufkriterien)

| Feld | Inhalt |
|---|---|
| **Avatar** | Vergleicher (A8), Menschen, die bereits Klon-Werbung gesehen haben, Warenkorbabbrecher (Retargeting) |
| **Hook (Varianten)** | a) „Bevor du 60 € für einen CO-Melder aus einer Facebook-Anzeige ausgibst: Stell diese 5 Fragen.“ · b) „Wer steht hinter dem Shop? 5 Dinge, die du in 2 Minuten prüfen kannst.“ · c) „Keine Telefonnummer, keine Rücksendeadresse in der EU? Dann lies das hier.“ |
| **Angle** | Den zweiten Blick selbst liefern. Der prüfende Blick ist Schutzix' schwächster Moment (Kap. 9.3) und wird so zu SICHERLUFTs stärkstem |
| **Format** | 4:5-Karussell als Checkliste, Gründer-Talking-Head, Long-Copy |
| **Visual** | Checkliste mit Haken, echte Dokumente (Deckblatt des Prüfberichts, Impressum, Rücksendeetikett mit Adresse in DE/AT, Telefonnummer) |
| **Story** | Viele Shops verkaufen baugleiche Geräte mit starken Geschichten → die 5 Fragen: (1) Welche Norm, mit Prüfbericht? (2) Wer ist Hersteller bzw. EU-Verantwortlicher? (3) Wohin geht die Rücksendung, und wer zahlt? (4) „Ab X ppm“: Anzeige oder Alarm? (5) Wo sind echte, geprüfte Bewertungen? → „Hier sind unsere Antworten.“ |
| **CTA** | „Alle Nachweise ansehen“ |
| **Landingpage** | LP-C Nachweise |
| **Belief-Shift** | Stufe 8 |
| **Warum** | Schutzix' Conversion hängt davon ab, dass Käufer kaufen, **bevor** sie prüfen (Kap. 9). S7 macht das Prüfen zum Standard. Das funktioniert nur für den Anbieter, der die Prüfung besteht. Das ist ein struktureller Angriff, den ein Hongkonger Handelsunternehmen ohne sichtbare Nachweise nicht kontern kann **[I]** |
| **Risiko** | **Keine Namen, keine Herabsetzung.** Nur Fakten, die SICHERLUFT über sich selbst beweisen kann. Erst schalten, wenn alle 5 Antworten wirklich vorliegen |

### S8 · „Gründer und Team“ (das Gesicht, das Schutzix fehlt)

| Feld | Inhalt |
|---|---|
| **Avatar** | Retargeting aller Segmente, Kommentarleser |
| **Hook (Varianten)** | a) „Wir sind [Name] und [Name] aus [Ort]. Wir verkaufen CO-Melder und erzählen dir keine erfundenen Geschichten.“ · b) „Warum auf unserer Seite eine Telefonnummer steht.“ |
| **Format** | 45–60-s-Talking-Head, Behind-the-scenes (Wareneingang, Stichproben-Funktionsprüfung, sofern eingeführt) |
| **Story** | Wer wir sind → warum es SICHERLUFT gibt → was wir belegen → was wir **nicht** versprechen (Sensoren altern, Norm erklärt, kein Wundergerät) |
| **CTA** | „Frag uns, bevor du kaufst“ (Telefon/WhatsApp/E-Mail) |
| **Landingpage** | LP-C bzw. „Über uns“ |
| **Warum** | Schutzix hat **null Markenkapital** (Kap. 11, DON'T 10). Jedes Gesicht mit Namen, Adresse und Telefonnummer ist ein Asset, das Schutzix ohne Umbau der eigenen Struktur nicht kopieren kann |

### S9 · „Echte Messwerte unserer Kunden“ (UGC-Beweis)

| Feld | Inhalt |
|---|---|
| **Avatar** | alle, v. a. solution-aware |
| **Hook (Varianten, nur mit echten Einsendungen)** | a) „Kundenfoto aus [Ort]: 0 ppm. Genau so soll es aussehen.“ · b) „Was unsere Kunden in der ersten Woche auf dem Display gesehen haben.“ |
| **Format** | Karussell mit verifizierten Display-Fotos am Aufstellort, kurze Kundenvideos (Einwilligung, Anreize offenlegen) |
| **Story** | bewusst auch „langweilige“ Werte → „Sicherheit sieht meistens unspektakulär aus.“ Das ist die ruhige Gegenerzählung zum Schutzix-Drama. Reale Auffälligkeiten nur verifiziert, mit Einwilligung und ohne Dramatisierung |
| **Landingpage** | PDP |
| **Warum** | Schutzix hat **keinerlei identifizierbare Kunden-UGC [B]**. Ein zeitbasierter Burggraben, der mit jedem Kunden wächst. Quelle ist der Aufstell-Check im Post-Purchase-Flow (13.6) |

### S10 · „Neues Zuhause-Check“ (Umzug als Lebensereignis)

| Feld | Inhalt |
|---|---|
| **Avatar** | Mieter und Hauskäufer (A6) |
| **Hook** | „Beim Einzug prüft jeder die Rauchmelder. Fast niemand die Luft an der Therme.“ |
| **Angle** | Lebensereignis statt Versagen. Schutzix' Gutachter-Hook („hat übersehen, was die Familie getötet hat“) lief 105 Tage **[B]**. Die Nachfrage im Segment ist also belegt, die Schuldzuweisung an Gutachter ist aber unnötig |
| **Format** | Checklisten-Karussell „Die ersten 7 Tage im neuen Zuhause“ |
| **Landingpage** | LP-B mit Einstieg „neu eingezogen“ |
| **Warum P3** | nur eine Schutzix-Laufzeit als Beleg. Sinnvoll, sobald S1–S3 Daten liefern |

## 13.3 Landingpage-Strategie

**Prinzipien, die alle Seiten erfüllen:**
1. **Offen als Marke.** Ratgeber-Anmutung ist erlaubt, aber mit sichtbarem Absender („Ratgeber von SICHERLUFT“). Schutzix tarnt Werbung als Journal und „Insider-Test“ **[B]**. Das ist ein UWG-Risiko (§ 5a Abs. 4: kommerzieller Zweck muss erkennbar sein).
2. **Jede Zahl mit Fußnote und Link** (Destatis, BfR, Normtext). Schutzix nennt sieben verschiedene Todeszahlen ohne Quelle (Kap. 9.1).
3. **Eine Datenquelle für alle Spezifikationen.** Technisch: Kernwerte (Sensoren, Anzeigebereich, Alarmverhalten, Garantie, Rückgabe, Lieferzeit) als Produkt-Metafelder in Shopify pflegen und in allen Sections daraus ziehen. So kann „4-in-1“ nicht an vier Stellen vier Dinge bedeuten wie bei Schutzix.
4. **Autor mit Namen und Foto.** Wenn eine Fachperson zitiert wird, dann mit Beruf, Ort und Offenlegung der Zusammenarbeit.
5. **Ehrliche Grenzen stehen auf der Seite:** Messung nur am Standort, Sensor-Lebensdauer, Fehlalarm-Quellen, Stromversorgung unterwegs. Das kostet vermutlich wenig Conversion und senkt Retouren **[I]**. Schutzix' Trustpilot-Beschwerden drehen sich genau um diese Punkte **[B]**.

### LP-A · Wohnmobil „Der Nacht-Check“ (`/pages/wohnmobil-nacht-check`)

Traffic: S1 (Wohnmobil-Schnitt), S3, S4 (Wohnmobil). Awareness: problem-unaware bis problem-aware.

| # | Abschnitt | Inhalt | Belief-Shift | Beweis |
|---|---|---|---|---|
| 1 | Hero | „Gas zu, Fenster auf Kipp, Heizung an. Und die Luft?“ / Subline „Der Nacht-Check, der in den meisten Wohnmobil-Checklisten fehlt.“ Echtes Foto: Fahrzeug bei Nacht, Display mit Zahl | Ich prüfe viel, aber nicht alles | echtes Foto |
| 2 | Drei Irrtümer | Rauchmelder erkennt CO · CO riecht man · grünes Licht = alles okay | Stufen 1, 2, 5 | BfR-Zitat mit Link, Testtasten-Demo (GIF) |
| 3 | Warum gerade im Wohnmobil | kleiner Raum, Heizung und Kocher mit Flüssiggas, Abgasführung, Aggregate auf Nachbarstellplätzen, Nester nach der Standzeit | Risiko ist konkret, nicht abstrakt | Fachperson-Zitat. Keine Todesgeschichte |
| 4 | Was die Norm regelt | EN 50291-1: Alarmzeiten (50/100/300 ppm). Für Freizeitfahrzeuge zusätzlich EN 50291-2 und EN 50194-2. Warum verzögerter Alarm sinnvoll ist, und was ein Display zusätzlich zeigt | Stufen 4, 5 | Normtabelle mit Quelle. **Hier wird Schutzix' „70-ppm-Lüge“ indirekt korrigiert, ohne Schutzix zu nennen** |
| 5 | So funktioniert SICHERLUFT | Anzeige (CO in ppm, brennbare Gase in %LEL, Temperatur, Luftfeuchte), Alarm, Aufwärmzeit | Stufe 5 | ungeschnittenes Messvideo |
| 6 | Platzierung im Wohnmobil | Grafik: 1 Gerät bodennah (Propan ist schwerer als Luft), 1 Gerät im Schlafbereich in Atemhöhe. **Stromversorgung ehrlich** (Landstrom, Wechselrichter oder verifizierte 12-V-Lösung) | Stufe 7 (→ 2er-Set) | Installationsleitfaden EN 50292 sinngemäß, Herstellerangabe |
| 7 | Echte Stimmen | Camper-Creator (gekennzeichnet), verifizierte Bewertungen mit Hinweis zur Prüfung nach § 5b Abs. 3 UWG | Andere wie ich machen das | nur echte Inhalte |
| 8 | Nachweise | Prüfberichte, Hersteller/EU-Verantwortlicher, Rücksendeadresse, Telefonnummer | Stufe 8 | Dokumente verlinkt |
| 9 | Angebot | Wohnmobil-Set (2) als Standard, Option „+ 1 fürs Zuhause“ | Stufe 7 | Preislogik transparent |
| 10 | FAQ | Fehlalarme (Deo, Kochen, Alkohol), Aufwärmzeit, Winterbetrieb, Fahrbetrieb, Lebensdauer, Rückgabe | Einwände | klare Antworten |
| 11 | Lead-Magnet | „Nacht-Check-Liste als PDF“ gegen E-Mail | Nicht-Käufer halten | – |

**Warum diese Seite zuerst [I]:** Schutzix schickt den größten Teil seines F1-Traffics auf die Wohnmobil-LP (41 von 79 Anzeigen) **[B]**. Das ist der am besten belegte Funnel im Markt. SICHERLUFTs Startseite verspricht bereits „Sichere Luft für ZUHAUSE & WOHNMOBIL“ **[B]**, hat dafür aber keine eigene Seite.

### LP-B · Haushalt „Bevor die Heizung angeht“ (`/pages/heizsaison-check`)

Traffic: S1, S2, S4, S5, S10. Kernstück ist ein **Raumplan-Check** (Quiz, 4–5 Fragen): Heizungsart (Gastherme, Etagenheizung, Kaminofen, Pellet, Wärmepumpe), Anzahl Schlafräume, Kinder, ältere Angehörige, Garage. Ergebnis: individuelle Empfehlung („In deiner Situation: 1 Gerät im Aufstellraum der Therme, je 1 in den Schlafräumen“) mit passendem, **vorausgewähltem** Set.

| # | Abschnitt | Belief-Shift | Warum |
|---|---|---|---|
| 1 | Hero „Bevor du heute die Heizung aufdrehst“ + Quiz-Start | Jetzt ist der richtige Moment | echter saisonaler Trigger |
| 2 | Die 3 Irrtümer (BfR) | Stufen 1–2 | offizielle Quelle |
| 3 | „Wartung ist eine Momentaufnahme“ mit Zitat der Fachperson | Stufe 3 | Handwerker als Verbündete |
| 4 | Norm erklärt (Alarm vs. Anzeige) | Stufen 4–5 | Korrektur des Markt-Irrtums, Autoritätsgewinn |
| 5 | Erdgas vs. CO: zwei verschiedene Gefahren | Stufe 6 | ehrliche Platzierungslogik (Erdgas steigt, Propan sinkt) |
| 6 | Raumplan-Ergebnis + Set | Stufe 7 | **ehrlicher Default**: Die Vorauswahl folgt der Wohnsituation, nicht dem Umsatzziel |
| 7 | Nachweise, Team, Kontakt | Stufe 8 | zweiter Blick |
| 8 | FAQ und Garantie | Einwände | Retouren-Prävention |

**Warum ein Quiz statt Schutzix' Listicle [I]:** Schutzix lässt den Leser sich per Fragen im Text selbst diagnostizieren (DO 3) und rechtfertigt Menge mit Raumlogik (DO 7). Ein Konfigurator macht beides **explizit und individuell**. Die Mehrfachkauf-Empfehlung ist dann begründet statt erzwungen. Das ist glaubwürdiger und erzeugt als Nebeneffekt First-Party-Daten zu Heizungsart und Haushalt.

### LP-C · „Nachweise“ / Trust-Hub (`/pages/nachweise`)

Traffic: S7, S8, Retargeting, Links aus allen Seiten und aus dem Footer.
Inhalt: Prüfberichte und Konformitätserklärung (als PDF), Datenblatt des Sensors (Typ, Lebensdauer), Anzeige- und Alarmverhalten als Tabelle, **ungeschnittene Messvideos**, Fehlalarm-Tests, Hersteller und EU-verantwortliche Person (GPSR), WEEE-Registrierung, Firmensitz, Team mit Fotos, Telefonnummer, Rücksendeadresse, Garantiebedingungen, **Quellenverzeichnis aller Zahlen** (öffentliche Fassung des Claims-Registers).
**Warum:** Diese Seite ist der Burggraben in HTML. Sie beantwortet jede Frage, an der Schutzix scheitert (Kap. 9.3), und kann nur von einem Anbieter gebaut werden, der die Nachweise hat.

### LP-D · Geschenk „Für die, die uns wichtig sind“ (`/pages/geschenk-eltern`, ab November)

Inhalt: Geschenk-Set (2 Geräte in getrennter Verpackung), Grußkarte, Einrichtungsanleitung in großer Schrift, Versand direkt an die Eltern ohne Rechnung im Paket, „Einrichten beim nächsten Besuch in 2 Minuten“. Traffic: S6.
**Warum:** Es ist der einzige positive Kaufanlass mit natürlichem Mehrfachkauf, und Schutzix bedient ihn nicht (Kap. 5.3).

### LP-E · Kaminofen & Holz (optional, Oktober–Februar)
Nur wenn S5 im Kaminofen-Schnitt eigenständig besser performt als auf LP-B.

### PDP-Umbau (bestehende SICHERLUFT-Produktseite)
1. Alle Platzhalter „[CLAIM VERIFIZIEREN]“ durch **geprüfte** Angaben ersetzen oder den Satz streichen. Die Platzhalter sind gut: Sie zeigen, dass das Team die Lücke kennt **[B: templates/product.json]**.
2. Abschnitt „Anzeige vs. Alarm“ (ab welchem Wert zeigt das Display an, wann alarmiert das Gerät) mit Quelle.
3. Platzierungsgrafik Haushalt/Wohnmobil.
4. Nachweis-Leiste mit Links zu LP-C.
5. Bewertungen: nur echte, mit Hinweis, wie die Echtheit geprüft wird. Bis dahin **keine** Sternzahl.

## 13.4 Belief-Strategie

SICHERLUFT übernimmt die funktionierenden Stufen der Schutzix-Kette (Kap. 7) und ersetzt die falschen. Jede Stufe bekommt einen **Beweis**, den Schutzix nicht liefern kann.

| Stufe | Neue Überzeugung beim Käufer | Beweisart | Asset | Schutzix-Äquivalent |
|---|---|---|---|---|
| 1 | „Mein Rauchmelder erkennt kein CO.“ | offizielle Quelle + Selbsttest | S2-Quiz, Testtasten-Demo | gleiche Aussage, meist ohne Quelle |
| 2 | „CO bemerke ich nicht, weder durch Geruch noch sicher an Symptomen.“ | BfR, medizinische Fachquelle | S2, LP-Abschnitt | Todesgeschichte |
| 3 | „Wartung ist wichtig, aber eine Momentaufnahme.“ | echte Fachperson | S4 | „Der Handwerker hat versagt“ |
| 4 | „Ein normgerechter Melder alarmiert bewusst verzögert, aus gutem Grund.“ | Normtabelle EN 50291-1 | S1, LP-Abschnitt „Norm erklärt“ | **falsche** US-Normwerte |
| 5 | „Eine Anzeige zeigt mir die Entwicklung, bevor ein Alarm kommen muss.“ | Live-Messung | S1 | KI-Video, Behauptung |
| 6 | „Ein Gasleck ist eine zweite, andere Gefahr, und dafür zählt der richtige Platz.“ | Physik (Dichte), Norm EN 50194 (wenn zertifiziert) | Platzierungsgrafik | „4-in-1“ in vier Definitionen |
| 7 | „Ein Gerät pro Schlafbereich plus eins an der Gasquelle.“ | Installationsleitfaden EN 50292, Raumplan-Check | LP-B-Quiz, LP-A-Grafik | „8 in einer Nacht bestellt“ |
| 8 | „Und ich kann prüfen, wem ich das abkaufe.“ | Dokumente, Adresse, Telefon | LP-C, S7, S8 | „nur auf der offiziellen Website“ |
| 9 | „Vor dieser Heizsaison bzw. vor der nächsten Tour.“ | echter Kalender | S5, S3 | „vor der nächsten Nacht“, Evergreen-Countdown |

**Die eine Überzeugung, die SICHERLUFT exklusiv besetzen soll:**
> **„Ein Melder, der mir nichts erklären kann, reicht mir nicht mehr. Und ein Anbieter, den ich nicht prüfen kann, auch nicht.“**

Der erste Halbsatz übernimmt den validierten Schutzix-Shift (Zahl statt Lämpchen). Der zweite Halbsatz richtet ihn gegen Schutzix selbst.

## 13.5 Trust-Strategie

### Gate 0: Voraussetzungen, bevor ein Euro in Ads fließt

| # | Maßnahme | Warum | Evidenz-Status heute |
|---|---|---|---|
| 1 | **Gerät verifizieren:** Prüfberichte eines akkreditierten Labors zu EN 50291-1 (CO, Haushalt), für Wohnmobil-Claims EN 50291-2; für die Gasfunktion EN 50194-1, für Wohnmobil EN 50194-2. Dazu Konformitätserklärung (EMV, Niederspannung, RoHS) | Jede Kernaussage hängt daran. Eine CE-Kennzeichnung allein ersetzt keinen Normprüfbericht | unbekannt **[intern klären]** |
| 2 | **Anzeige- vs. Alarmverhalten messen:** Ab welchem Wert zeigt das Display an? Wann genau alarmiert das Gerät bei 30, 50, 100, 300 ppm (Prüfgas)? | Die aktuelle SICHERLUFT-Aussage „Alarmiert Stunden früher bei 30+ PPM“ ist **ungeprüft**. Ein Alarm bei 30 ppm innerhalb von 120 min wäre **nicht** mit EN 50291-1 vereinbar. Entweder ist die Aussage falsch oder das Gerät nicht normkonform. Beides muss man vor Kampagnenstart wissen | Claim steht live im Repo **[B: templates/index.json, Zeile 62]** |
| 3 | **Fehlalarm-Test:** Deo, Haarspray, Reinigungsmittel, Alkohol, Kochdunst, Aufwärmphase nach dem Einstecken | Schutzix-Kunden berichten Gasalarme „bis 6 % LEL in fast allen Zimmern“ ohne Leck **[B: Trustpilot]**. Günstige Sensoren für brennbare Gase reagieren typischerweise auch auf Alkohol- und Lösemitteldämpfe **[I]**. Wer das vorher erklärt, verwandelt einen Retourengrund in einen Kompetenzbeweis | offen |
| 4 | **Stromversorgung unterwegs klären:** 230 V (Schuko) im Wohnmobil nur mit Landstrom oder Wechselrichter. Gibt es eine geprüfte 12-V-Lösung? | Schutzix widerspricht sich hier selbst (Akku-Backup vs. „keine Batterien“ vs. 12-V-Adapter) **[B]**. Genau das erzeugt Enttäuschung nach dem Kauf | Platzhalter im Repo **[B: templates/product.json, Zeile 343]** |
| 5 | **Pflichtangaben:** GPSR (Hersteller, EU-verantwortliche Person, Sicherheitshinweise auf Deutsch), ElektroG (WEEE-Registrierung, Rücknahme-Info), Verpackungsregister, Garantiebedingungen nach § 479 BGB, Widerruf mit Rücksendeadresse in der EU, PAngV (30-Tage-Tiefstpreis bei Rabatten), Bewertungs-Hinweis nach § 5b Abs. 3 UWG | Bei Schutzix nicht auf der PDP gefunden **[B]**. Für eine Marke, die mit Nachprüfbarkeit wirbt, ist jede Lücke hier ein Eigentor | intern/anwaltlich prüfen |
| 6 | **Claims-Register anlegen:** Tabelle mit Claim, Wortlaut, Quelle/Beleg-Datei, verantwortliche Person, Prüfdatum, Einsatzorte (Ads/LP/PDP) | Verhindert Widersprüche (Schutzix DON'T 1), macht Freigaben schnell und ist die Grundlage für LP-C | neu |
| 7 | **Meta-Setup ohne Personas:** eine SICHERLUFT-Seite, verifiziertes Business, verifizierte Domain, Pixel + Conversions API. Creator ausschließlich per Partnership Ads | stabile Konten und kumulierende Lern-Historie, der Gegenentwurf zu Schutzix' Konto-Rotation | intern |

### Sofort entfernen oder ersetzen: Claims, die SICHERLUFT von Schutzix übernommen hat [B: Repo]

| Fundstelle | Aktueller Text | Problem | Ersatz (Vorschlag) |
|---|---|---|---|
| `templates/index.json:60` | „Erkennt CO, Erdgas & Propan zuverlässig“ | wortgleich mit Schutzix-Hero, „zuverlässig“ unbelegt | nach Gate 0: „Zeigt CO und brennbare Gase (Erdgas, Propan) als Wert an“ + Normangabe, falls geprüft |
| `templates/index.json:62` | „Alarmiert Stunden früher bei 30+ PPM“ | ungeprüft, potenziell normwidrig, basiert auf dem US-Norm-Vergleich | „Zeigt dir CO-Werte ab [X] ppm, bevor ein Alarm fällig ist“ (erst nach Messung) |
| `templates/index.json:70` | „Schützen Sie ihre Familie heute“ | Schutzix-Formel, dazu Rechtschreibfehler („ihre“ statt „Ihre“) | „Jetzt Raumplan-Check starten“ bzw. „Sehen, was Sie atmen“ |
| `templates/index.json:75` | „Vertraut von mehr als 10.000 Familien aus Deutschland & Österreich“ | ohne Bestellnachweis irreführend, identisch mit Schutzix' „über 10.000 Familien“ | streichen, bis echte Zahl belegbar ist |
| `templates/index.json:788` | „Excellent 4.8 \| 1319 reviews“ | ohne echtes Review-System irreführend (Schutzix: 4,9/12.800+ vs. real 2,2/14) | streichen oder echte, verifizierte Bewertungen einbinden |
| `templates/index.json:820, 849–853` | „100 Tage Geld-zurück-Garantie“ | identisch mit Schutzix. Zulässig nur, wenn tatsächlich angeboten und Bedingungen veröffentlicht | behalten **nur** mit Bedingungen, Rücksendeadresse und Kostenregel |
| `sections/header-group.json:18` | „HERBST-SALE — Jetzt sichern und bis zu 50% sparen“ (Enddatum 30.11.2026) | derselbe Wortlaut wie bei Schutzix, Referenzpreis unklar (PAngV) | nur mit echtem Vorpreis (30-Tage-Tiefstpreis) und echter Aktion |
| `templates/index.json:622 ff.` „Das sagen unsere Kunden“ (4 Karten: „Nadine H.“, „Thomas B.“, „Julia M.“, „Frank S.“, z. B. „Direkt das Bundle genommen“, „Für unser Wohnmobil gekauft … an die Bordsteckdose anschließen“) | Laut Commit 4c1465c als Platzhalter gedacht. **Im Shop sind sie aber nicht als Platzhalter erkennbar**: Name, Text, Stückzahl, kein Hinweis **[B: Theme-Code; ob diese Version live ist, ist von hier nicht prüfbar]** | Wirken wie echte Kundenbewertungen. Das ist ein UWG-Risiko (Anhang Nr. 23b/23c: Bewertungen ohne Echtheitsprüfung bzw. gefälschte Bewertungen). Eine Karte enthält zudem einen ungeprüften Produkt-Claim zur Bordsteckdose | Sektion ausblenden, bis echte Bewertungen vorliegen |

**Warum das Priorität 1 ist:** Solange SICHERLUFT dieselben Formeln nutzt, sieht ein prüfender Käufer **zwei gleiche Shops** und überträgt Schutzix' Trustpilot-Ruf auf SICHERLUFT. Die Differenzierung beginnt mit dem Löschen.

### Trust-Assets, die Schutzix strukturell nicht kopieren kann

| Asset | Was genau | Warum Schutzix es nicht kann [I] | Aufwand |
|---|---|---|---|
| Prüfberichte öffentlich | PDFs auf LP-C, in Ads zitiert | setzt geprüftes Gerät und die Bereitschaft zur Offenlegung voraus | niedrig (wenn vorhanden) |
| Ungeschnittene Messvideos | Prüfgas-Test, Fehlalarm-Test | Schutzix' Videos sind KI-Szenen **[B]**. Eine echte Messung widerspricht den eigenen Behauptungen (15/30 ppm, 1 ppm) | mittel |
| Benannte Fachperson | Schornsteinfeger oder SHK mit Name, Ort, Betrieb | Personas statt Menschen **[B]** | mittel (Vertrag, Honorar) |
| Erreichbarkeit | Telefon/WhatsApp mit Servicezeiten in DE/AT | Schutzix: nur E-Mail, mit Tippfehler in der Adresse **[B]** | mittel |
| Rücksendeadresse in der EU | kostenloses Retourenlabel | Schutzix: Hongkong, Kunde zahlt **[B]** | mittel |
| Verifizierte Bewertungen | Review-App mit Kaufnachweis, Trustpilot mit Einladungen nach Kauf | Schutzix' Trustpilot ist öffentlich schlecht (2,2) **[B]** | wächst mit der Zeit |
| Garantie mit einem Wortlaut | überall identisch, mit Bedingungen | Schutzix: fünf Versionen **[B]** | niedrig |

## 13.6 Offer-Strategie

**Grundsatz:** Die **Struktur** von Schutzix übernehmen (Default, Staffel, Raumlogik, sinnvolle Geschenke, Schwellen), **jede Zahl darin wahr machen** (Kap. 8, Urteil).

| Element | Empfehlung | Begründung |
|---|---|---|
| **Preisanker** | Kein fiktiver Streichpreis. Entweder ehrlicher Normalpreis ohne Durchstreichung oder eine **echte** Einführungsaktion mit Enddatum und PAngV-konformem Vorpreis | Der Anker 99,95 € wird von allen Klonen identisch genutzt und ist damit wertlos **[B]**. Ehrliche Preise sind ein Trust-Signal für genau die Käufer, die prüfen |
| **Preisniveau** | Nicht festgelegt, weil Marge, Einkauf und Retourenquote SICHERLUFT-intern sind. Referenzpunkte: Schutzix/Klone 59,95 € (1er), 99,95 € (2er); Markengeräte mit CO-Display ab ca. 30–40 € **[B]** | Der Aufpreis gegenüber Markenware muss über **CO + Gas in einem**, Service und Nachweise begründet werden, nicht über Angst |
| **Staffel** | Nach Situation benannt: „Wohnmobil-Set (2)“, „Zuhause-Set (3)“, „Familien-Set (4): Zuhause + Eltern“ | Schutzix nutzt Unzulänglichkeits-Framing („nur für kleine Wohnungen“) **[B]**. SICHERLUFT begründet jede Stufe mit dem Raumplan (EN 50292-Logik) |
| **Default** | Wohnmobil-LP: 2er vorausgewählt. Haushalt: Vorauswahl nach Raumplan-Ergebnis | Default-Effekt nutzen, aber **begründet**. Ein persönlicher Default ist glaubwürdiger als ein pauschaler |
| **Zugaben** | Nützliche Zugaben statt E-Book: gedruckter Platzierungsplan, Notfallkarte „Was tun bei Alarm?“ (Magnet/Sticker), im Wohnmobil-Set die verifizierte Stromlösung, im Geschenk-Set Grußkarte und Anleitung in großer Schrift | Schutzix' E-Book-Versprechen ist widersprüchlich („zu jeder Bestellung“ vs. erst ab 2) **[B]**. Nützliche Zugaben stützen zugleich den Belief (richtige Platzierung, richtiges Verhalten) |
| **Versandschwelle** | Gratisversand ab dem 2er-Set, klar kommuniziert | übernimmt Schutzix' Schwellen-Mechanik ohne die Widersprüche („ab 80 €“ vs. „jede Bestellung“) |
| **Garantie** | **Eine** Formulierung überall. Rücksendung an eine Adresse in DE/AT, Kostenregel klar. Optional ein **Fehlalarm-Tauschversprechen** („Piept er ohne erkennbaren Grund, tauschen wir ihn“), wenn der Fehlalarm-Test das trägt | Fehlalarme und Rückgabe sind die Top-Beschwerden bei Schutzix **[B]**. Wer genau dort ein Versprechen gibt, besetzt den Schmerzpunkt des Wettbewerbers |
| **Aktionen** | Nur echte Anlässe mit echtem Enddatum: Heizsaison-Start, Black Friday, Weihnachten, Camping-Saisonstart | Evergreen-Countdowns werden von Käufern erkannt und sind rechtlich riskant (Kap. 9) |
| **Zahlung** | PayPal, Klarna, Karten, Apple/Google Pay | Pflicht-Standard. Schutzix hat dasselbe, das ist kein Differenzierungsmerkmal |
| **Post-Purchase** | Tag 0: Einrichtungsvideo · Tag 2: „Aufstell-Check: Schick uns ein Foto, wir prüfen die Platzierung“ (Service + UGC-Quelle für S9) · Tag 14: Bewertungseinladung mit Kaufnachweis · Heizsaison: Erinnerung · vor Sensor-Lebensende: Austauscherinnerung · jederzeit: „Set für die Eltern“ | Schutzix hat Upsell-Apps, aber keine sichtbare Nachkauf-Beziehung **[B/I]**. Der Austauschzyklus des Sensors ist ein **ehrlicher, planbarer Wiederkauf** |
| **Später (nach 30 Tagen)** | B2B: Wohnmobil-Vermieter (Flottenausstattung), Campingplätze, Hausverwaltungen | Vertriebskanäle, die ein anonymer Hongkonger Shop nicht erschließen kann **[I]** |

## 13.7 Burggraben (Moat)

| Burggraben | Wie er entsteht | Zeit bis wirksam | Kopierbarkeit durch Schutzix [I] |
|---|---|---|---|
| **1. Nachprüfbarkeit als Markenkern** | Gate 0 + LP-C + S7 | 2–4 Wochen | sehr gering: erfordert Nachweise, eine EU-Präsenz und die Bereitschaft, die eigene Werbung zu korrigieren |
| **2. Echte Menschen** | Fachperson, Creator, Gründer, Kunden-UGC | 4–12 Wochen | gering: Schutzix' Modell beruht auf austauschbaren Personas |
| **3. Konto-Stabilität** | policy-konforme Creatives, eine verifizierte Marke, Partnership Ads | laufend | Schutzix startet nach jeder Sperre bei null **[B]** |
| **4. Bewertungsbasis** | Post-Purchase-Flow, verifizierte Reviews, Trustpilot-Einladungen | 3–6 Monate | sinkt mit jedem schlechten Schutzix-Review |
| **5. Organische Nachfrage** | Ratgeber-Inhalte (LP-A/B/C sind zugleich SEO-Seiten: „CO-Melder Wohnmobil“, „erkennt Rauchmelder CO“, „EN 50291“), YouTube-Langversionen der Messvideos | 3–12 Monate | Schutzix hat keine Inhalte, die eine Prüfung überstehen |
| **6. Produkt-Iteration** | Mit dem OEM-Lieferanten ein differenziertes Modell entwickeln: EN 50291-2-geprüfte Wohnmobil-Variante, nativer 12-V-Betrieb, Batterie-Backup | 6–12 Monate | das einzige Asset, das auch Klone nicht mit einem Klick kopieren |
| **7. Vertriebspartnerschaften** | Vermieter, Campingplätze, Fachhandwerker als Empfehler | 3–9 Monate | Handwerker wurden von Schutzix als Schuldige dargestellt (F6) **[B]** |

**Die ehrliche Einschätzung [I]:** Die Burggräben 1–3 sind schnell und günstig, schützen aber nur gegen Schutzix und seine direkten Klone. Gegen Markengeräte aus dem Handel schützt langfristig nur die Kombination aus 4, 5 und 6. Deshalb gehört die Produkt-Iteration (6) schon jetzt auf die Roadmap, auch wenn sie nicht in den 30-Tage-Plan passt.

## 13.8 30-Tage-Plan (Kurzfassung, Details in Kap. 15)

| Woche | Fokus | Ergebnis |
|---|---|---|
| 1 | Gate 0: Gerät verifizieren, kopierte Claims entfernen, Recht, Meta-Setup, Partner anfragen | Shop ist „prüfbar sauber“, Claims-Register steht |
| 2 | Assets und Seiten: S1-Messvideo, S2-Quiz, S3-Briefings, S7/S8, LP-A, LP-B, LP-C, PDP-Umbau, Post-Purchase-Flows | 3 LPs live, 20–30 Creative-Varianten fertig |
| 3 | Launch der P1-Tests (H1–H4, Kap. 14), Retargeting mit S7/S8 | erste eigene Daten |
| 4 | Auswerten, Verlierer stoppen, Gewinner variieren, Q4 vorbereiten (S5, S6, LP-D) | Entscheidungsvorlage für Monat 2 |


---

# 14. PRIORISIERTE TEST-HYPOTHESEN

**Spielregeln für alle Tests:**
- **Erfolgsgröße ist der Kauf**, nicht die Klickrate. Primär: Kosten pro Kauf (CPA) und Deckungsbeitrag pro Kauf. Sekundär: Warenkorb-Rate, Warenkorbwert (AOV), Retouren- und Rückerstattungsquote nach 30 Tagen.
- **Zielwerte kommen aus SICHERLUFTs eigenen Zahlen, nicht aus diesem Bericht.** Vor dem Start wird der Break-even-CPA berechnet:
  `Break-even-CPA = AOV × Rohertragsmarge − (Versand + Zahlungsgebühren + erwartete Retourenkosten je Bestellung)`
  Schutzix' Zahlen sind unbekannt und werden nicht geschätzt.
- **Stopp-Regel (relativ):** Eine Variante wird pausiert, wenn sie das **2- bis 3-Fache des Break-even-CPA** ausgegeben hat, ohne einen Kauf zu erzeugen. Sie wird skaliert, wenn sie über mindestens 5–10 Käufe unter dem Ziel-CPA bleibt. Die genauen Schwellen legt SICHERLUFT anhand des Budgets fest.
- **Eine Variable pro Test.** Hook-Tests mit identischem Visual, Format-Tests mit identischem Hook.
- **Kommentare sind Daten.** Kommentare werden täglich nach Thema codiert (Einwand, Frage, Misstrauen, Zustimmung). Das ist die einzige frühe Qualitätsmessung, die nicht von der Klickrate abhängt.

**Priorisierung:** P1 = stärkste öffentliche Evidenz aus dem Schutzix-Funnel und niedriges Risiko. P2 = gute Evidenz oder hoher erwarteter Hebel, aber mehr Aufwand. P3 = Wette oder Saison-Test.

| # | Hypothese | Evidenz / Begründung | Testdesign | Primäre Messgröße | Prio |
|---|---|---|---|---|---|
| **H1** | Eine **echte Live-Messung** („grünes Licht vs. Display“) verkauft besser als dieselbe Botschaft als **Text-/Grafik-Behauptung** | F1 ist Schutzix' Scale-Engine: 98 Anzeigen, bis 8 Duplikate, 84 % der EU-Reichweite der aktiven Anzeigen **[B]**. Schutzix kann den Mechanismus nur behaupten. Ein Beweis ist schwerer zu ignorieren **[I]** | S1-Demo-Reel vs. S1-Statik mit identischem Hook, identische Zielgruppe und LP | CPA, Warenkorb-Rate | **P1** |
| **H2** | Wohnmobil-Traffic konvertiert über eine **eigene Wohnmobil-LP** besser als direkt auf der PDP | Schutzix schickt 95 von 244 Anzeigen auf /pages/wohnmobil und nur 10 auf die Wohnmobil-PDP **[B]** | S3-Creative, 50/50-Split der Ziel-URL: LP-A vs. PDP | CPA, Conversion Rate je Sitzung | **P1** |
| **H3** | Für Camper verkauft das **Ritual-Framing** („Nacht-Check“) mindestens so gut wie ein **ehrliches Risiko-Framing** (Fakten zu Heizung, Kocher, Nachbar-Aggregat), ohne Todesgeschichte | Schutzix besetzt nur den Tod (F3/F4) **[B]**. Ob Ruhe statt Angst in diesem Segment trägt, ist offen **[S]** | S3a (Ritual) vs. S3b (Risiko-Fakten), gleicher Creator, gleiches Setting | CPA, Kommentar-Tonalität | **P1** |
| **H4** | Der **BfR-Irrtum** als Einstieg („41 % glauben …“) schlägt im Haushalt-Segment den „grünes Licht“-Einstieg | Die BfR-Zahl ist der einzige korrekt belegte Claim im Schutzix-Funnel, wird dort aber nicht als Hook genutzt **[B]**. Eine offizielle Quelle als Hook ist ungetestet **[S]** | S2-Karussell vs. S1-Statik, beide → LP-B | CPA, Quiz-Start-Rate auf LP-B | **P1** |
| **H5** | Retargeting mit **Nachweisen** („5 Fragen vor dem Kauf“, Gründer) holt mehr Abbrecher zurück als klassisches Produkt-Retargeting | Schutzix verliert beim zweiten Blick (Trustpilot 2,2, fehlende Kontaktdaten) **[B]**. Abbrecher sind häufig genau die Prüfer **[I]** | Retargeting-Zielgruppe (LP-Besucher und Warenkorb ohne Kauf, 14 Tage) 50/50: S7/S8 vs. Produkt-Karussell | CPA im Retargeting | **P1** |
| **H6** | Eine **benannte Fachperson** (S4) senkt den CPA gegenüber derselben Botschaft in Markenstimme | F2 (Einsatzkraft-Ich) ist Schutzix' langlebigster Angle (106 Tage) **[B]**. Die Autoritätsmechanik ist belegt, die echte Variante noch nicht **[I]** | S4-Video vs. Marken-Voiceover mit identischem Skript | CPA, Kommentare mit Misstrauen | P2 |
| **H7** | **Long-Copy-Textpost + Foto** schlägt für Wohnmobil 55+ ein kurzes Video | Schutzix' langlebigste Anzeigen sind Long-Copy mit Bild (83–106 Tage) **[B]**. Die EU-Reichweite der Todesfall-Storys liegt zu über 70 % bei 55+ **[B]** | Creator-Post lang (≈ 2.000–4.000 Zeichen) vs. 45-s-Reel desselben Creators | CPA, AOV | P2 |
| **H8** | Eine **Vorauswahl nach Raumplan-Ergebnis** erhöht den AOV ohne Conversion-Verlust gegenüber einer pauschalen 2er-Vorauswahl | Schutzix nutzt eine pauschale 2er-Vorauswahl und testet die Staffel-Reihenfolge **[B]**. Ein begründeter Default ist glaubwürdiger **[I]** | LP-B: Konfigurator-Default vs. fixer 2er-Default | AOV, CR, Umsatz je Besucher | P2 |
| **H9** | **Ehrliche Preisdarstellung** (ohne Streichpreis) konvertiert nicht schlechter als eine echte Einführungsaktion mit Enddatum. Die Retourenquote ist bei ehrlicher Darstellung niedriger | Alle Klone nutzen denselben Anker 99,95 € → 59,95 € **[B]**. Der Effekt bei prüfenden Käufern ist offen **[S]** | Preisdarstellung A/B auf PDP (PAngV-konform) | CR, Umsatz je Besucher, Retouren nach 30 Tagen | P2 |
| **H10** | Ein **konkretes Garantie- und Rückgabeversprechen** („kostenlose Rücksendung an unsere Adresse in [DE/AT]“) schlägt die generische Formel „100 Tage Geld-zurück“ | Rückgabe nach Hongkong auf eigene Kosten ist eine Top-Beschwerde bei Schutzix **[B]** | Garantie-Block A/B auf PDP und LP | CR | P2 |
| **H11** | Ein **Fehlalarm-Abschnitt** („Warum er beim Haarspray piepen kann und was du tust“) senkt die Retouren ohne Conversion-Verlust | Fehlalarme sind eine Top-Beschwerde bei Schutzix **[B]** | FAQ-Block sichtbar vs. eingeklappt | Retourenquote, Support-Tickets, CR | P2 (erst nach Gerätetest) |
| **H12** | Das **Geschenk-Framing** für die Eltern (S6 + LP-D) steigert im November den AOV gegenüber dem Haushalt-Standard | Schutzix seedet Mehrfachkauf für Angehörige nur über Todesfälle **[B]** | S6 → LP-D vs. S6 → LP-B | AOV, CPA | P3 (ab November) |
| **H13** | **Kaminofen- und Holzheizer** sind als eigener Einstieg günstiger zu gewinnen als der breite Haushalt | Blinder Fleck bei Schutzix **[B]**. Saisonale Relevanz **[I]** | S5-Kaminofen-Schnitt als eigene Anzeigengruppe | CPA, Anteil Neukunden | P3 |
| **H14** | Eine **eigene Marken-Headline** („Sehen, was du atmest.“) konvertiert mindestens so gut wie die Schutzix-Formel „Beschütz deine Familie“ | Schutzix nutzt „Beschütz deine Familie“ in 224 von 244 Anzeigen, testet daneben „Dein Melder lügt dich an“ (18) **[B]** | Headline-Test bei identischem Creative | CPA | P3 |

**Bewusst nicht getestet:**
- Todesgeschichten, Schwangerschaft, Kinder in Not, Tier-Tod. Grund: Policy-Risiko, Backlash und Widerspruch zur Positionierung.
- Persona-Absender.
- Evergreen-Countdown gegen keinen Countdown. Grund: rechtliches Risiko, und das Ergebnis wäre für eine Vertrauensmarke nicht verwendbar.

**Reihenfolge-Logik:** H1–H5 laufen parallel in Woche 3, weil sie verschiedene Ebenen testen (Beweisformat, Seite, Framing, Einstieg, Retargeting) und sich nicht gegenseitig verzerren. H6–H11 folgen in Woche 4 bzw. Monat 2 auf Basis der Gewinner. H12–H14 sind saisonal oder nachrangig.


---

# 15. 30-DAY EXECUTION PLAN

**Rollen:** GF (Geschäftsführung), PM (Performance-Marketing), CR (Content/Creative), DEV (Shopify), EK (Einkauf/Produkt), CS (Kundenservice), RA (Anwalt, extern).

## Woche 1 (Tag 1–7): Fundament und Gate 0

| Tag | Aufgabe | Rolle | Ergebnis |
|---|---|---|---|
| 1 | **Claims-Stopp im Shop:** alle Fundstellen aus 13.5 entfernen oder neutralisieren. Dazu gehören die Countdown-Leiste, die Platzhalter-Bewertungen, „Excellent 4.8 \| 1319 reviews“, „10.000 Familien“ und „30+ PPM“ | DEV | Shop ohne unbelegte Claims |
| 1–3 | **Lieferantenanfrage:** Prüfberichte EN 50291-1/-2 und EN 50194-1/-2, Konformitätserklärung, Sensor-Datenblatt (Typ, Lebensdauer), Anzeige- und Alarmlogik, 12-V-Option | EK | Dokumentenpaket oder klare Lücke |
| 2–5 | **Eigene Tests:** Fehlalarme (Deo, Haarspray, Alkohol, Kochdunst), Aufwärmzeit, Anzeigeverhalten. Termin für einen Prüfgas-Test mit Schornsteinfeger oder Gas-Fachbetrieb | EK + Fachperson | Testprotokoll mit Video |
| 2–5 | **Rechtsprüfung:** GPSR, ElektroG/WEEE, Verpackung, Garantietext (§ 479 BGB), Widerruf mit EU-Rücksendeadresse, PAngV, Bewertungs-Hinweis (§ 5b Abs. 3 UWG), Advertorial-Kennzeichnung | GF + RA | Freigabe-Checkliste |
| 3–7 | **Partner gewinnen:** 1 Fachperson (Schornsteinfeger oder SHK-Meister), 3 Camper-Creator aus DE/AT. Briefing mit Regeln: keine erfundenen Geschichten, Kennzeichnung, nur eigene Erfahrung | CR | unterschriebene Vereinbarungen |
| 3–7 | **Meta-Setup:** Business- und Domain-Verifizierung, Pixel + Conversions API, Katalog, Partnership-Ads-Berechtigungen, Moderationsregeln für Kommentare | PM | stabiles Konto-Fundament |
| 5–7 | **Claims-Register** anlegen, Freigabe nach dem Vier-Augen-Prinzip | GF + PM | Register v1 |
| **7** | **Gate-0-Entscheidung** | GF | siehe unten |

**Gate 0, Entscheidungslogik:**
- **Prüfberichte liegen vor, Test bestanden** → Plan läuft wie beschrieben.
- **Prüfberichte fehlen oder das Gerät verhält sich anders als beworben** → **keine** Sicherheits-Claims über die reine Anzeige hinaus. Parallel entscheiden: Prüfung beauftragen (akkreditiertes Labor, mehrere Wochen) oder Lieferanten bzw. Gerät wechseln. In der Zwischenzeit nur Aufklärungs-Content (S2, S5) mit Lead-Magnet (Checklisten) schalten. So wächst die E-Mail-Liste ohne Produktversprechen.
- **Wohnmobil ohne EN 50291-2/EN 50194-2** → Wohnmobil-Kommunikation auf „im stehenden Fahrzeug mit Landstrom“ begrenzen.

## Woche 2 (Tag 8–14): Assets und Seiten

| Aufgabe | Rolle | Ergebnis |
|---|---|---|
| **S1 drehen:** Prüfgas-Demo mit Fachperson, dazu die ungeschnittene Langversion für LP-C | CR | 3–4 Schnitte (Haushalt, Wohnmobil, 20 s, 40 s) |
| **S2 bauen:** 10 Quiz-Karussell-Varianten (je ein Irrtum als Einstieg) | CR | 10 Anzeigen |
| **S7 und S8:** Checklisten-Karussell, Gründer-Video | CR + GF | 3–4 Anzeigen |
| **S3:** Creator-Briefings verschicken, erste Lieferung bis Tag 16 | CR | Rohmaterial |
| **LP-A Wohnmobil, LP-B Heizsaison** (Raumplan-Quiz als MVP: 4 Fragen → Set-Empfehlung), **LP-C Nachweise** | DEV + CR | 3 Seiten live, mobil getestet |
| **PDP-Umbau:** Kernwerte als Produkt-Metafelder (eine Quelle für alle Sections), Abschnitt „Anzeige vs. Alarm“, Platzierungsgrafik, Nachweis-Leiste | DEV | PDP v2 |
| **Angebot:** Sets anlegen (Wohnmobil 2, Zuhause 3, Familie 4), Zugaben drucken lassen (Platzierungsplan, Notfallkarte), Versandschwelle, eine Garantie-Formulierung | GF + DEV | Offer v1 |
| **Post-Purchase:** Einrichtungs-Mail, Aufstell-Check, Bewertungseinladung mit Kaufnachweis, Review-App mit Verifizierung | PM + DEV | Flows aktiv |
| **Service:** Telefon- oder WhatsApp-Zeiten, Antwortbausteine (Fehlalarm, Strom unterwegs, Platzierung) | CS | Service-Handbuch v1 |
| **QA:** alle Seiten gegen das Claims-Register prüfen, Testkauf, Tracking-Check | PM | Freigabe Launch |

## Woche 3 (Tag 15–21): Launch der P1-Tests

**Kampagnenstruktur (Startpunkt, nicht Dogma):**

| Kampagne | Creatives | Ziel-URL | Tests | Budget-Anteil (Vorschlag) | Begründung |
|---|---|---|---|---|---|
| Haushalt-Prospecting | S1, S2 | LP-B | H1, H4 | ca. 45 % | Heizsaison beginnt, größerer Markt |
| Wohnmobil-Prospecting | S1-Womo, S3 | LP-A vs. PDP | H2, H3 | ca. 40 % | bei Schutzix am besten validiertes Segment, Herbsttouren |
| Retargeting | S7, S8 vs. Produkt | LP-C / PDP | H5 | ca. 15 % | kleine Zielgruppen, hoher Hebel beim zweiten Blick |

- **Targeting:** breit, DE + AT, ab 25 Jahren, alle Geschlechter. Schutzix zielt ebenfalls breit (18–65+). Metas Auslieferung landet dort ohnehin zu rund 80 % bei 45+ **[B, Kap. 5]**. Das Creative definiert die Zielgruppe.
- **Täglich:** Kommentare moderieren und codieren, Anzeigen-Ablehnungen prüfen, Quiz-Start- und Abschlussrate auf LP-B.
- **Tag 21:** erste Lesung auf Hook-Ebene. Endgültige Entscheidungen erst, wenn die Stopp-Regeln aus Kap. 14 greifen.

## Woche 4 (Tag 22–30): Auswerten, iterieren, Q4 vorbereiten

| Aufgabe | Rolle | Ergebnis |
|---|---|---|
| Stopp- und Skalierungsregeln anwenden | PM | bereinigtes Konto |
| **Gewinner variieren nach dem Schutzix-Muster:** Kern behalten, Oberfläche tauschen (Setting, Person, erste Zeile). 3–5 neue Varianten je Gewinner | CR | Refresh-Paket 1 |
| H6 (Fachperson) und H7 (Long-Copy) starten, H8 (Raumplan-Default) auf LP-B | PM | Tests 2. Welle |
| **Q4 vorbereiten:** S5-Kaminofen-Schnitt, S6 + LP-D Geschenk, Black-Friday-Plan (echte Aktion, PAngV-konformer Vorpreis) | CR + DEV + GF | Q4-Paket |
| **Erste UGC-Anfragen** (S9) über den Aufstell-Check | CS | erste echte Kundenfotos |
| **Monatsbericht:** Ergebnisse nach Hook, Format und LP, Retourengründe, Kommentar-Themen, Konto-Gesundheit. Entscheidungsvorlage für Monat 2 inklusive Produkt-Roadmap (EN 50291-2-Variante, 12 V) | PM + GF | Entscheidungsvorlage |

**Wöchentliche Kennzahlen (nur eigene Daten):** CPA gegen Break-even, AOV, Conversion Rate je Seite, Quiz-Abschlussrate, Retouren- und Erstattungsquote mit Gründen, Support-Tickets nach Thema, Anzahl und Schnitt echter Bewertungen, Kommentar-Tonalität, abgelehnte Anzeigen bzw. Kontoqualität.

**Wenn alle P1-Tests über dem Break-even liegen:** Nicht die Angst erhöhen. Stattdessen in dieser Reihenfolge prüfen: Seite (Conversion je Sitzung), Angebot (Preis, Set, Garantie), Einstieg (Hook). Schutzix zeigt, wohin Eskalation führt: gesperrte Konten und 2,2 Sterne.


---

# ABSCHLUSS: DIE LISTEN

## TOP 10 Dinge, die SICHERLUFT von Schutzix lernen sollte

1. **Ein Alltagssymbol in einem Satz umdeuten.** „Das grüne Licht bedeutet nur, dass dein Melder eingeschaltet ist.“ Die Familie trägt 84 % der EU-Reichweite der aktiven Anzeigen **[B]**.
2. **Die Überzeugung vor dem Produkt verkaufen:** Rauchmelder ≠ CO-Schutz → Alarm kommt spät → eine Zahl zeigt mehr → ein Gerät reicht nicht.
3. **Eigene Welten pro Segment:** Wohnmobil mit eigener LP, eigenem Produkt, eigenem Set und eigener Sprache (95 von 244 Anzeigen führen auf die Wohnmobil-LP) **[B]**.
4. **Die Autorität von Fachleuten nutzen.** Der Einsatzkraft-Ich-Erzähler ist der langlebigste Angle (106 Tage) **[B]**. SICHERLUFT macht es mit echten Menschen.
5. **Long-Copy mit Bild für 55+.** Die langlebigsten Schutzix-Anzeigen sind 4.000–12.000 Zeichen lang **[B]**.
6. **Emotion und Beweis trennen:** Das Visual stoppt den Daumen, der Text überzeugt.
7. **Den Leser sich selbst diagnostizieren lassen:** Selbst-Check-Fragen, bei SICHERLUFT als Raumplan-Quiz.
8. **Raumlogik als AOV-Treiber:** Default-Set, Staffel, Geschenke ab 2 Stück, Versandschwelle.
9. **Refresh statt Neuerfindung:** Den Kern halten und die Oberfläche tauschen (7/14/27 Jahre, Haus/Stellplatz/Wohnung).
10. **Mehrfachkauf für Angehörige in der Geschichte vorleben:** „Einen für eure Mutter.“ SICHERLUFT macht daraus ein Geschenk ohne Todesfall.

## TOP 10 Dinge, die SICHERLUFT bewusst besser machen muss

1. **Eine Wahrheit für alle Spezifikationen.** Schutzix nennt 4 Definitionen von „4-in-1“ und 4 Alarmschwellen.
2. **Die richtige Norm erklären** (EN 50291-1/-2) statt US-Werte als EU-Norm auszugeben.
3. **Echte Menschen statt Personas:** Gründer, Fachperson, gekennzeichnete Creator.
4. **Belege statt Fake-Test, Fake-Trustpilot und Feuerwehr-Banner.**
5. **Erreichbar sein:** Telefon, EU-Rücksendeadresse, eine einzige Garantie-Formulierung.
6. **Grenzen vorab erklären:** Fehlalarm-Quellen, Sensor-Lebensdauer, Strom im Wohnmobil.
7. **Angst mit offiziellen Zahlen dosieren** statt mit toten Kindern eskalieren.
8. **Funnel-Kohärenz:** Was die Anzeige verspricht, steht auf der Seite. Bei Schutzix führt die Schwangerschafts-Anzeige dagegen auf eine Grill-Geschichte.
9. **Preise ohne fiktiven Anker,** Aktionen nur mit echtem Anlass und Enddatum.
10. **Marke und Konto-Stabilität aufbauen:** Pixel-Historie, Suchnachfrage, Bewertungen. Handwerker sind Partner, keine Schuldigen.

## Die 5 größten Schwachstellen von Schutzix

1. **Trust-Kollaps beim zweiten Blick:** Trustpilot 2,2 von 5 bei 14 Bewertungen (86 % 1-Stern), dagegen die Behauptung „4.7 | 3.824“, eine nicht existierende Service-Domain, ein Platzhalter als Telefonnummer, Firmensitz Hongkong **[B]**.
2. **Das tragende Argument ist falsch:** US-Normwerte als „europäische Norm“, dazu widersprüchliche Spezifikationen **[B]**.
3. **Plattform-Abhängigkeit:** 161 von 244 Anzeigen stammen von inzwischen gesperrten Konten oder Seiten. Neustart ab 06.09. mit neuen Personas **[B]**.
4. **Commodity ohne Differenzierung:** dasselbe Gerät zum selben Preis bei Klonen. „Nur hier erhältlich“ ist nachweislich falsch **[B/I]**.
5. **Nachkauf-Erlebnis:** Fehlalarme, Rücksendung nach Hongkong auf Kundenkosten, lange Lieferzeit, keine Antworten **[B: Trustpilot]**.

## Die 5 größten Chancen für SICHERLUFT

1. **Den freien Platz „nachprüfbar + aufklärend“ besetzen.** Weder die Klone noch die Markenhersteller stehen dort.
2. **Wohnmobil mit Ritual statt Tod** und mit der richtigen Norm (EN 50291-2/EN 50194-2). Mittelfristig eine eigene Wohnmobil-Variante.
3. **Heizsaison jetzt (Oktober–Februar)**, dazu das von Schutzix nicht bediente Kaminofen-Segment.
4. **Q4: Geschenk für die Eltern.** Ein positiver Kaufanlass mit natürlichem Mehrfachkauf.
5. **Die Prüfer und Enttäuschten auffangen:** S7 „5 Fragen vor dem Kauf“, Nachweis-Seite, Ratgeber-SEO für generische Suchanfragen („CO-Melder Wohnmobil“, „4-in-1 CO-Detektor Erfahrungen“). Werbung auf fremde Markennamen nur nach rechtlicher Prüfung.

## Die 3 wahrscheinlich stärksten Schutzix-Angles

1. **F1 „Das grüne Licht bedeutet nur, dass dein Melder eingeschaltet ist.“** 98 Anzeigen in der Stichprobe, bis 8 Duplikate, 40 von 56 aktiven Anzeigen, **84 % der EU-Reichweite**. Ein Dropshipper hat den Text kopiert (Seite „Logic Tech“, ≈1.327 Anzeigen) **[B]** → **Scale-Creative [I]**.
2. **F2 Feuerwehrmann-Ich-Erzähler.** 106 Tage Laufzeit, in drei Settings neu produziert, nach der Sperre sofort wieder aktiv **[B]** → **validierter Core Angle [I]**.
3. **F3 Wohnmobil-Todesfall** („… ist letzten Monat in seinem Wohnmobil gestorben. Warum spricht keiner darüber?“). 83 Tage, eigene Persona-Seite, Neuauflage nach der Sperre, über 70 % der Reichweite bei 55+ **[B]** → **validierter Segment-Angle [I]**.

## Die 3 ersten SICHERLUFT-Angles, die sofort getestet werden sollten

1. **S1 „Grünes Licht – live gemessen“.** Der validierte Schutzix-Mechanismus, bewiesen statt behauptet (H1).
2. **S3 „Nacht-Check im Wohnmobil“.** Das validierte Segment ohne Todesfall, erzählt von echten Campern, mit eigener LP (H2, H3).
3. **S2 „Der 41-%-Irrtum“.** Die einzige offiziell belegte Zahl des Marktes als Einstieg in die Heizsaison (H4).

Flankierend im Retargeting: **S7 „5 Fragen vor dem Kauf“** (H5). Hier gewinnt der zweite Blick, und den kann nur SICHERLUFT bestehen.


---

# ANHANG

## A. Methodik und Grenzen

- **Keine internen Kennzahlen.** CTR, CPC, CPA, ROAS, Conversion Rate, Umsatz, Spend und Käuferdemografie von Schutzix sind nicht öffentlich und werden nirgends geschätzt.
- **Ad Library:** Ausgeloggt liefert die Ad Library pro Abfrage nur die ersten 30 Treffer. Paginierung war per Rate-Limit gesperrt. Die 244 Anzeigen stammen deshalb aus vielen gefilterten Abfragen und bilden eine reichweitengewichtete Stichprobe. Die Seitengesamtzahl für „Kohlenmonoxid Schutz“ war nicht abrufbar.
- **EU-Reichweite** ist die von Meta ausgewiesene Reichweite je Anzeige (DSA-Transparenz), kumuliert bis 23.09. Sie ist keine Käuferschaft.
- **Laufzeiten** zählen Start- und Endtag mit. Enddaten am 01./02.09. sind überwiegend durch die Kontosperre erzwungen.
- **Familien-Zuordnung** erfolgt über den ersten Satz des Primärtexts.
- **Videos:** 6 Top-Videos wurden per Frame-Extraktion und Spracherkennung (Whisper) ausgewertet. Zitate aus Voiceovers können einzelne Erkennungsfehler enthalten.
- **Rechtliche Hinweise** sind Risikohinweise aus Marketing-Sicht, keine Rechtsberatung.
- Alle Rohdaten liegen im Ordner `data/` neben diesem Bericht (Anzeigen-CSV, Hook-Inventar, EU-Reichweite je Anzeige).

## B. Quellen

**Schutzix (abgerufen 23.09.2026)**
- Meta Ad Library, Suche „schutzix“: https://www.facebook.com/ads/library/?active_status=all&ad_type=all&country=ALL&q=schutzix&search_type=keyword_unordered
- Seiten: [Peter Schulz](https://www.facebook.com/ads/library/?active_status=all&ad_type=all&country=ALL&view_all_page_id=598649190003799) · [Kohlenmonoxid Schutz](https://www.facebook.com/ads/library/?active_status=all&ad_type=all&country=ALL&view_all_page_id=1238673782654607) · [Andreas Schneider](https://www.facebook.com/ads/library/?active_status=all&ad_type=all&country=ALL&view_all_page_id=1245109945346392) · [Claudia Schneider](https://www.facebook.com/ads/library/?active_status=all&ad_type=all&country=ALL&view_all_page_id=1057626940774811) · [Tagesbericht](https://www.facebook.com/ads/library/?active_status=all&ad_type=all&country=ALL&view_all_page_id=1283776534816019) · [Stefan Weber](https://www.facebook.com/ads/library/?active_status=all&ad_type=all&country=ALL&view_all_page_id=1101722279688439) · [Helga Schmidt](https://www.facebook.com/ads/library/?active_status=all&ad_type=all&country=ALL&view_all_page_id=1300866896449004)
- Landingpages: https://schutzix.com/pages/wohnmobil · https://schutzix.com/pages/brandinspektor-warnt-co-melder-haushalt · https://schutzix.com/pages/sicherheit · https://schutzix.com/pages/sicherheitv2 · https://schutzix.com/pages/sicherheitsreport · https://schutzix.com/pages/co-melder-ratgeber · https://schutzix.com/pages/sicherheits-insider-co-melder-2026 · https://schutzix.com/pages/listicle-blog-style-wohnwagen-and-caravan-v2
- Produktseiten: https://schutzix.com/products/schutzix-4-in-1-co-detektor · https://schutzix.com/products/schutzix-4-in-1-co-detektor-fur-wohnmobile
- Trustpilot: https://de.trustpilot.com/review/schutzix.com

**Wettbewerb**
- Securias: https://securias.de · Impressum https://securias.de/pages/impressum
- Mavoni/PureAlert: https://mavonishop.de · Impressum https://mavonishop.de/pages/impressum
- Logic Tech (SE, übersetzte F1-Copy): https://store.svelund.com/gasvakt

**Fakten und Normen**
- BfR, „Gesundheitsrisiken durch Kohlenmonoxid“ (Verbraucherbefragung; enthält GBE-Zahlen 2021: 397 Todesfälle, davon 117 unbeabsichtigt, 2.199 stationär): https://www.bfr.bund.de/cm/350/gesundheitsrisiken-durch-kohlenmonoxid.pdf
- Destatis-Zahlen 2024 (382 Todesfälle, 1.834 vollstationär), zitiert in Sicherheitsmelder/Boorberg, 09.09.2026: https://sicherheitsmelder.boorberg.de/2026/09/09/kohlenmonoxid-der-stille-tod/
- KBA, Wohnmobilbestand 01.01.2026: https://www.kba.de/DE/Presse/Pressemitteilungen/Fahrzeugbestand/2026/pm09_fz_bestand_pm_komplett.html
- EN 50291-1 Alarmzeiten (Normtext BS EN 50291-1:2010+A1:2012): https://www.safehome-alarms.com/wp-content/uploads/2019/07/BS-EN-50291-1-2010A1-2012.pdf
- EN 50291-2 (Freizeitfahrzeuge): https://standards.iteh.ai/catalog/standards/clc/ac230e93-4f28-46f5-98da-11b0c08bc8a9/en-50291-2-2019 · https://standards.globalspec.com/std/1318000/en-50291-2
- EN 50194-1 / EN 50194-2: https://standards.iteh.ai/catalog/standards/clc/e6b20701-2d85-448c-a282-26045371abf3/en-50194-1-2023 · https://www.dinmedia.de/en/standard/din-en-50194-2/266377813
- Platzierung nach EN 50292 (Ratgeber-Zusammenfassung): https://www.kohlenmonoxidmelder.com/kohlenmonoxid-melder-anbringen/ · https://schornsteinfeger.ws/co-melder
- Marktpreise CO-Melder mit Display (Vergleichsportale): https://www.vergleich.org/co-melder/ · https://www.heimwerker.de/co-melder-test/

## C. SICHERLUFT-Repo: Fundstellen zur sofortigen Korrektur

`templates/index.json` Zeilen 60, 62, 70, 75, 622 ff., 788, 820, 849–853 · `sections/header-group.json` Zeile 18 · `templates/product.json` alle Platzhalter „[CLAIM VERIFIZIEREN]“ (u. a. Zeilen 48, 70, 96, 176, 262, 315, 322, 336, 343, 364). Details und Ersatzvorschläge: Kap. 13.5.

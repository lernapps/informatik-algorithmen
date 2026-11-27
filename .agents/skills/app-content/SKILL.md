---
name: app-content
description: Use for any content work in this app - researching, writing, extending, correcting or reviewing its competencies, chapters, pages, rounds, questions, exercises, figures, terms or sources. This app's own content decisions; they take precedence over the generic lernapps content skills. Load it before you change any content.
---

# Content guide of this app

Explainer „Algorithmen und Programme“ (Issue lernapps/apps#495, Epic Informatik lernapps/apps#509). Strang-App
`informatik/algorithmen`, Format 2, Deutsch und Englisch. Kiko, der Roboter der Programmierwerkstatt
(https://lernapps.net/coding/), läuft über ein Spielfeld: erst unplugged mit Befehlskarten, dann mit Blöcken in der
Werkstatt. **Programmieren findet in der Werkstatt statt.** Der Explainer erklärt, übt mit eigenen Fragen und
`generated` und schickt Lernende mit Challenge-Links in die Werkstatt.

## Curriculum

- Lernlandkarte Informatik, Strang `algorithmen` (https://lernapps.net/apps/map/informatik.json); sie gibt Bausteine,
  „Ich kann …“-Sätze und Reihenfolge (`requires`). Kein Land, keine Schulform: Richtstufe der Karte.
- Orientierung: GI-Bildungsstandards Informatik Sek I (2025), doi:10.18420/rec2025_052, Abschnitt 5.2 „Algorithmen“,
  AL-1 bis AL-8 (S. 17).
- Welle 2 (gebaut): Klasse 7-8, Kapitel 1 und 2. Später (9-10): Kapitel 3–5, siehe „Adding a chapter or round“.

## Competencies

Kapitel 1 `algorithmen` · Was ist ein Algorithmus?

- `algorithmus-begriff` · „Ich kann erklären, was ein Algorithmus ist, und für einen Ablauf aus dem Alltag eine
  eindeutige Handlungsvorschrift aufschreiben.“ · `src/algorithmen/algorithmus.yaml` · Übungen `welche-beschreibung`,
  `welche-sind-algorithmen`, `algorithmus-aufgabe`, `weg-sekretariat`, `nur-computer` · Bild `schulhaus-plan.svg`
  (von Hand gezeichnet, Namen als Marker der `labelled-figure`)
- `algorithmische-eigenschaften` · „Ich kann prüfen, ob eine Handlungsvorschrift ein Algorithmus ist: endlich
  beschrieben, eindeutig und nach endlich vielen Schritten fertig.“ · `src/algorithmen/eigenschaften.yaml` · Übungen
  `ein-stueck`, `was-fehlt`, `karten-reparieren`, `karten-in-ordnung`, `kurz-endet`
- `sequenz` · „Ich kann Anweisungen in der richtigen Reihenfolge zu einer Sequenz anordnen.“ ·
  `src/algorithmen/sequenz.yaml` · Übungen `wo-steht-kiko`, `karten-zaehlen`, `welche-folge`, `hin-und-zurueck`,
  `drehen-ist-schritt` · Challenge `kiko-sequenz-schulhof`

Kapitel 2 `bloecke` · Programmieren mit Blöcken

- `visuelle-programmierung` · „Ich kann einen Algorithmus in einer blockbasierten (visuellen) Programmiersprache als
  Programm umsetzen und ausführen.“ · `src/bloecke/bloecke.yaml` · Übungen `was-macht-das-programm`,
  `welcher-block-falsch`, `werkstatt-teile`, `computer-raet`, `bloecke-zaehlen` · Challenge `kiko-fehler-finden`
- `verzweigung` · „Ich kann mit einer Verzweigung (wenn – dann – sonst) festlegen, dass ein Algorithmus abhängig von
  einer Bedingung verschiedene Anweisungen ausführt.“ · `src/bloecke/verzweigung.yaml` · Übungen `spielfeld-b`,
  `spielfeld-a-felder`, `welcher-zweig`, `was-ist-bedingung`, `ohne-sonst` · Challenge `kiko-wenn-sonst`
- `wiederholung-feste-anzahl` · „Ich kann mit einer Wiederholung mit fester Anzahl Anweisungen mehrmals ausführen
  lassen.“ · `src/bloecke/zaehlschleife.yaml` · Übungen `wo-nach-schleife`, `befehle-zaehlen`, `wie-oft-wiederholen`,
  `sequenz-zu-schleife`, `rumpf-reihenfolge` · Challenges `kiko-langer-gang`, `kiko-treppe`
- `wiederholung-mit-bedingung` · „Ich kann mit einer Wiederholung mit Bedingung Anweisungen so lange ausführen
  lassen, bis eine Bedingung erfüllt ist.“ · `src/bloecke/bedingte-wiederholung.yaml` · Übungen `welche-schleife`,
  `wie-oft-vorwaerts`, `wie-oft-pruefen`, `endlosschleife`, `zahl-oder-bedingung` · Challenges
  `kiko-gang-unbekannt`, `kiko-immer-dem-gang-nach`

Keine Recap-Seite und kein `ahead`: Jede Voraussetzung liegt im Strang und kommt auf einer früheren Seite.

## Content structure

- Eine Seite je Baustein. Sektionen mit festen ids, in dieser Reihenfolge; Titel sagen, was die Sektion auf der Seite tut:
  1. `einstieg`: Klassenchat (ein `text`-Block, Zeilen „**Name:** …“ mit Leerzeile dazwischen, eine Einleitungszeile
     „Im Klassenchat der 7b, …“), ein Satz, was du auf der Seite lernst, dann die erste Aufgabe.
  2. `idee`: kurze Erklärung, `definition` des neuen Begriffs (geht ins Glossar), Kasten `note` „Merke“ mit dem
     typischen Fehler.
  3. `ausprobieren` „Selbst ausprobieren“: nummerierte Unplugged-Anleitung (Druck-Links auf
     `https://lernapps.net/coding/karten/{de,en}/…`), dann „Mit Computer:“ und der Challenge-Link, darunter das
     Spielfeld der Challenge als Bild. Nur, wo man etwas tut.
  4. `uebung` „Übung“: mindestens 4 Übungen, gemischt, höchstens die Hälfte zum Ankreuzen.
  5. `weiter`: Rückblick und was als Nächstes kommt, mit der nächsten Chat-Nachricht. Die letzte Seite eines
     Kapitels blickt auf das ganze Kapitel zurück.
- Höchstens 350 Wörter zum Lesen je Seite.
- Geschichte: Klasse 7b (Jona, Selin, Mia, Tom, Ben, Ali, Lea; alle 12 oder 13) und Frau Berg, ihre
  Informatiklehrerin, im Klassenchat, keine Szenenbilder. Eingeführt auf `algorithmus` (Einstieg und Rückblick). Wer
  zum ersten Mal in einer Aufgabe auftaucht, heißt „Tom aus der 7b“. Erst
  steuern die Kinder sich gegenseitig mit Befehlskarten, ab Kapitel 2 übernimmt Kiko in der Werkstatt.

## Terminology

- „du“, einfache Sprache; englisch plain English, „you“. Namen bleiben (Frau Berg bleibt Frau Berg).
- Kiko ist „er“ im Deutschen (wie in der Werkstatt), „it“ im Englischen.
- Befehle und Blöcke immer mit den Wörtern der Werkstatt, in Anführungszeichen, wenn sie im Satz stehen:
  „gehe vorwärts“, „drehe dich nach links“, „drehe dich nach rechts“, „wiederhole … mal“, „solange … tue“,
  „wenn … dann … sonst“, „Wand voraus?“, „Wand links?“, „Wand rechts?“, „am Ziel?“, „Weg frei?“, „nicht“.
  Englisch: “move forward”, “turn left”, “turn right”, “repeat … times”, “while … do”, “if … then … else”,
  “wall ahead?”, “wall on the left?”, “wall on the right?”, “at the goal?”, “way ahead clear?”, “not”.
  Werkstatt-Knöpfe: „Start“ / “Run”, „Ein Schritt“ / “One step”.
- Kurzformen in Antwortoptionen: „vorwärts, links, rechts“ / “forward, left, right”.
- Fachbegriffe (GI 2025, Lernlandkarte): Algorithmus, Anweisung, Befehl, Sequenz, Programm, Programmiersprache,
  blockbasierte (visuelle) Programmiersprache, Verzweigung, Bedingung, Sensor, Zählschleife (Wiederholung mit fester
  Anzahl), bedingte Wiederholung (Wiederholung mit Bedingung), Schleifenrumpf, Endlosschleife, testen, Fehler.
  Englisch (Computing curriculum England): algorithm, instruction, command, sequence, program, programming language,
  block-based programming language, selection, condition, sensor, count-controlled loop, condition-controlled loop,
  loop body, infinite loop, test, bug.
- Algorithmus: „eine genaue Anleitung (Handlungsvorschrift) aus endlich vielen Schritten, die eine Aufgabe löst. Wer
  sie ausführt, muss nichts raten.“ Englisch: “a precise set of step-by-step instructions that solves a problem or
  completes a task”.
- Eigenschaften eines Algorithmus, immer diese vier, und die Seite sagt, dass es vier sind (das „Ich kann …“ der
  Karte nennt drei; es bleibt Zitat): endlich beschrieben, eindeutig, ausführbar (jeder Schritt ist für den, der ihn
  ausführt, machbar, z. B. für Kiko), endet (nach endlich vielen Schritten fertig). Englisch, parallel: finite
  (finitely described), unambiguous, can be carried out (executable), terminates (finishes after a finite number of
  steps).
- Endlosschleife: „Ein Programm, das nie endet, löst keine Aufgabe, die enden soll. Darum muss ein Algorithmus enden.“
  Ursache konkret nennen: Die Bedingung wird nie falsch. Programme, die absichtlich weiterlaufen (Ampel aus #500),
  sind kein Fehler.
- Befehl: „eine einfache Anweisung, die Kiko kennt und direkt ausführen kann“. Anweisung ist das allgemeinere Wort:
  Auch „wiederhole … mal“ und „wenn … dann … sonst“ sind Anweisungen.
- Programm: „ein Algorithmus, aufgeschrieben in einer Programmiersprache, damit ein Computer ihn ausführen kann“.
- Sequenz: „eine Folge von Anweisungen, die nacheinander ausgeführt werden, jede genau einmal, in der aufgeschriebenen
  Reihenfolge“. Auf `zaehlschleife` sagen: „Der Schleifenrumpf ist eine Sequenz, die mehrmals ausgeführt wird.“
- Bedingung: „eine Frage, auf die es nur die Antworten wahr oder falsch gibt (ja oder nein)“. Sensor: der Teil von
  Kiko, der etwas prüft; der Block „Wand voraus?“ ist die Bedingung, die der Sensor beantwortet. Den Block in
  Definitionen nicht „Sensor“ nennen.
- Verzweigung: „wenn … dann … sonst“ (zweiseitig); „wenn … dann“ ohne „sonst“ ist einseitig. Englisch: selection,
  “if statement”.
- Wiederholung (Schleife) als Oberbegriff; Englisch iteration (loop), einmal mit „repetition“ erklärt.
- Bedingte Wiederholung: „führt den Schleifenrumpf aus, solange die Bedingung wahr ist. Kiko prüft die Bedingung vor
  jedem Durchlauf. Ist sie falsch, hört die Wiederholung auf, auch schon vor dem ersten Durchlauf.“ Englisch: “runs
  the loop body while the condition is true. Kiko checks the condition before each pass; if it is false, the loop
  stops, even before the first pass.” Das „bis“ der Karte als Merke: „Kiko soll laufen, bis er am Ziel ist. Das
  schreibst du: solange nicht am Ziel? tue gehe vorwärts.“ (bis X = solange nicht X); „bis“ nie in der Definition,
  englisch nie “until”. Dazu: Geprüft wird nur zwischen den Durchläufen, nicht mitten im Rumpf; der Rumpf kann
  null-mal laufen.
- Fehler finden und beheben (debuggen); Englisch debug, debugging, bug.
- Richtungen: In Aufgaben und `alt` Bildrichtungen mit „im Bild“: „Kiko schaut im Bild nach rechts / nach oben“,
  englisch “faces right on the board / up the board”. Nacktes „links/rechts“ nur für Drehungen, aus Kikos Sicht.
- Felder auf dem Spielfeld: „Spalte 3, Zeile 2“ / “column 3, row 2” (die Nummern stehen am Rand des Bildes, die
  Wand am Rand zählt mit).
- Pseudocode-Schlüsselwörter (für später): `wiederhole … mal`/`repeat … times`, `solange … tue`/`while … do`,
  `wenn … dann … sonst`/`if … then … else`.

## Exercise patterns

- Jede Übung ist allein verständlich: Sie erscheint auch in der Selbsteinschätzung und beim Tutor. Kein „oben“, kein
  „drück Prüfen“; was sie braucht, steht in ihrem Text oder ihrem `material`.

- **Wo endet Kiko?** · Programm lesen (sequenz, Schleifen, Verzweigung) · `single-choice` mit `material`: Spielfeld
  mit Markern A–D und Karten- oder Blockbild. Fest: Optionen A–D; jedes falsche Feld ist ein typischer Fehler
  (Drehen als Schritt, Reihenfolge vertauscht, links/rechts verwechselt, Startfeld mitgezählt) mit eigener `info`.
  Die richtige Antwort steht nicht immer bei A. Beispiel `src/algorithmen/sequenz.yaml#wo-steht-kiko`.
- **Karten zählen** · Sequenz bilden · `number` mit Spielfeld als `material`; die Erklärung nennt „Drehungen
  vergessen“. Beispiel `karten-zaehlen`.
- **Welche Folge / welches Programm?** · auswählen · `single-choice`, Optionen sind Befehlsfolgen (Kurzform) oder
  Programme; falsch: Richtung verwechselt, eins zu weit, Reihenfolge vertauscht. Beispiel `welche-folge`.
- **Rechnen mit Programmen** · auswerten · `generated` mit `int`; `where` schließt Zahlen aus, bei denen ein Fehler
  die Antwort trifft. Fehler: halbe Drehung übersehen (a+b), nur ein Teil gezählt, Startfeld mitgezählt (d+1),
  n+k statt n·k. Beispiel `hin-und-zurueck`.
- **Zuordnen** · erkennen · `matching` (Alltagsalgorithmus ↔ Aufgabe; Anweisung ↔ verletzte Eigenschaft;
  Werkstatt-Teil ↔ Zweck; Situation ↔ Zweig; Sequenz ↔ Schleife).
- **Beurteilen** · entscheiden · `true-false` mit Grund in `explanation`; `multiple-choice` mit `info` je Option.
  Beispiel `drehen-ist-schritt`.
- **Challenge** · implementieren · Link in die Werkstatt in `ausprobieren`. Nie die Pflichtübung einer Seite.
- Keine eigenen Vue-Komponenten.

## Figures

- Spielfelder, Befehlskarten und Blockprogramme: statische SVGs `src/images/kiko-*.svg`, erzeugt von
  `node scripts/kiko-bilder.ts` aus `scripts/kiko-bilder.json`. Nie von Hand ändern; `test/kiko-bilder.test.ts` prüft, dass sie zur Quelle passen.
  - `felder.<name>`: `map` (wie in den Challenges: `#` Wand, `.` Weg, `S` Kiko, `Z` Ziel), `facing`
    (`north|east|south|west`), `marks` (`{ "A": [spalte, zeile] }`, gezählt wie die Randnummern ab 1). Ohne
    Wörter, eine Datei `<name>.svg` für beide Sprachen.
  - `programme.<name>`: `program` (Programm-IR der Werkstatt, wie `challenges/*.loesung.json`), `als: karten`
    (nur Befehle, nummerierte Karten) oder Blöcke (Standard, `numbers: true` nummeriert die Befehlsblöcke), `title`
    `{ de, en }`. Zwei Dateien `<name>-de.svg`, `<name>-en.svg`; im YAML `image: { de: …-de.svg, en: …-en.svg }`.
- Aussehen wie in der Werkstatt: dunkle Felder Wände, grünes Feld mit Fahne Ziel, Kiko orange mit gelbem Dreieck in
  Blickrichtung, Spalten- und Zeilennummern am Rand; Blöcke blau (Befehle), grün (Schleifen, Verzweigungen), lila
  (Sensoren), braun (Kopf „Programm“).
- `alt` nennt Kikos Feld und Blickrichtung, den Weg und jeden Marker mit Spalte und Zeile; `caption` sagt, worauf
  man schaut; nie die Lösung. `source: { de: "eigene Zeichnung, Kiko nach lernapps.net/coding", en: "own drawing,
  Kiko after lernapps.net/coding" }`, `licence: CC-BY-4.0`.
- Kiko, Farben und Wörter: Programmierwerkstatt lernapps.net/coding, © 2026 Oliver Jägle, CC BY 4.0.

## Sources

- Lernlandkarte Informatik (Bausteine, „Ich kann …“, `requires`), gelesen 2026-11-26.
- GI-Bildungsstandards Informatik Sek I (2025), doi:10.18420/rec2025_052, 5.2 AL-1 bis AL-8, im Volltext gelesen.
  Die Eigenschaften eines Algorithmus stehen dort nicht; sie kommen aus dem „Ich kann …“ der Karte und aus #495
  („eindeutig, ausführbar und endlich“).
- Programmierwerkstatt: Schema https://lernapps.net/coding/schemas/challenge.v1.schema.json, Prüfskript
  https://lernapps.net/coding/tools/challenge-check.v1.mjs (MIT, Kopie in `scripts/challenge-check.v1.mjs`),
  Befehlskarten und Spielfeld zum Ausdrucken https://lernapps.net/coding/karten/{de,en}/….
- Lehrpläne der Länder: nicht nötig (Strang der Karte), im Einzelnen ungeprüft.
- Keine Videos, keine Seiten außerhalb von lernapps.net nötig.

## Challenges

- `challenges/<id>.json` nach dem Schema challenge.v1 und `challenges/<id>.loesung.json` (Musterlösung als
  Programm-IR). `id` = Dateiname. `back.url`: `{ "de": "/informatik-algorithmen/<kapitel>/<seite>/", "en":
  "/informatik-algorithmen/en/<kapitel>/<seite>/" }`, `back.label` „Zurück zum Explainer“ / “Back to the explainer”.
- Den Link holen: `node scripts/challenges.ts --links`. Im deutschen Text `https://lernapps.net/coding/app/?c=…`,
  im englischen `https://lernapps.net/coding/en/app/?c=…`. Nach jeder Änderung an einer Challenge die Links in der
  Seite ersetzen.
- Die Unit-Tests (`test/challenges.test.ts`, auch `node scripts/challenges.ts`) prüft: Prüfskript v1 mit Musterlösung, Format und Version 1, jeder
  Werkstatt-Link in `src/**/*.yaml` gehört zu einer Challenge und zur Sprache des Textes, jede Challenge ist auf
  ihrer `back.url`-Seite in beiden Sprachen verlinkt.
- Zu jeder Challenge mindestens eine typische falsche Lösung als `challenges/<id>.falsch-<n>.json` (links/rechts
  verwechselt, Drehungen vergessen, eins zu weit, Schleife statt Sequenz …). Der Test verlangt, dass jede durchfällt;
  sonst prüft die Challenge zu wenig (dann Blocklimit, `benutzt-block:…` oder weitere Testfälle ergänzen).
- Höchstens 8 Blöcke in der Musterlösung, solange die Arbeitsfläche der Werkstatt klein ist (Orchestrator,
  Checkpoint Musterseite). `back.label` „Zurück zur Seite „<Titel>““ / “Back to the page “<title>””.
- Die Challenge-Seite zeigt das Spielfeld der Challenge als Bild (`kiko-challenge-<name>.svg`) und erklärt einmal
  (auf `sequenz`), dass die Werkstatt Felder kurz als (Spalte|Zeile) nennt.
- Fehlt in der Werkstatt etwas (Block, Welt, Aufgabentyp): dem Orchestrator melden, nicht selbst bauen.

## Adding a chapter or round

1. Bausteine des Kapitels aus der Karte nehmen (id, „Ich kann …“, `requires`); Kapitel 3 `darstellen`
   (struktogramm, programmablaufplan, pseudocode, darstellungen-ueberfuehren), 4 `text` (textbasierte-programmierung,
   algorithmus-ausfuehren, quelltext-aendern, programm-testen), 5 `variablen` (Recap-Seite für
   `informatik/datentypen` aus #494 am Anfang, dann variable, unterprogramme, parameter).
2. Ordner `src/<kapitel>/` mit `chapter.yaml` (`title`, `summary`, `pages`), in `chapters` von `src/app.yaml`
   eintragen.
3. Je Baustein eine Seite nach „Content structure“, mit Übungen nach „Exercise patterns“; 1 bis 3 ihrer Übungen in
   `selfAssessment` des Kapitels aufnehmen, wie Skill `lernapps-explainer-self-assessment` sagt; dieselbe Kiko-Aufgabe in
   allen Ansichten (Blöcke, Struktogramm nach DIN 66261, PAP, Pseudocode) nebeneinander.
4. Bilder in `scripts/kiko-bilder.json` eintragen, `node scripts/kiko-bilder.ts`.
5. Challenges in `challenges/`, Links mit `node scripts/challenges.ts --links` holen.
6. `npx vp check --fix`, `npx vp test`, `npx --no -- lernapps check`, Commit.

## Rules learned from mistakes

- Text mit Komma oder Doppelpunkt in `{ de: …, en: … }` immer in Anführungszeichen; sonst zerlegt YAML ihn, und
  `vp check --fix` formatiert den Fehler mehrzeilig weiter (passiert auf `eigenschaften`, `bloecke`).
- Rechte Seiten von `matching` höchstens etwa 24 Zeichen: Bei 360 px schneidet das Auswahlfeld längere ab
  (Prüfung als Lernende).
- Eine Challenge mit Sensoren, die die Seite noch nicht hatte, nennt diese Sensoren auf der Seite („Oben oder
  unten?“ braucht „Wand links?“).
- Die Werkstatt sagt „Liste“ für die Werkzeugkiste und „Rätsel“ für die Spielfelder einer Challenge; die Seiten nennen
  beide Wörter.
- „Programm“ erst ab der Seite `bloecke` (dort definiert); in Kapitel 1 „Ablauf“, „Anleitung“ oder „Sequenz“.
- Ein Bildtitel (`title` in `scripts/kiko-bilder.json`) verrät keine Antwort; er steht im SVG.
- Die Startzahl eines Blocks „wiederhole … mal“ in der Werkstatt ist 3: Eine Challenge mit Zählschleife braucht eine
  andere Zahl.

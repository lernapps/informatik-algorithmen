---
# Read by the hooks, the review, the evals. Schema: @lernapps/tooling/guidance/plan-front-matter.v1.schema.json
# Written by `lernapps plan` and the hooks. Never change a key or a value by hand.
# Archetype, null until chosen in Explore. Allowed values: explainer, interactive, quiz.
archetype: explainer
# Current phase. Allowed values: explore, plan, code, commit.
phase: commit
# prePushFailures: failed pre-push runs, written by the hook.
prePushFailures: 0
# failedChecks: failed rules and runs, written by lernapps check and the hooks.
failedChecks: { checks-pass: 4 }
---

# Plan: informatik-algorithmen, first version

<!--
For you, the assistant. The process is in AGENTS.md; this plan holds the method.
- `npx --no -- lernapps plan next` prints the task to do now, `plan done` ticks it and prints the next one.
- You write only below Goal, Key decisions, Notes, Answers, Entry draft, Content method and Retrospective, in the
  creator's language. Delete the comment of a section once the section is filled.
- Work on the branch `work`, locally: push nothing before Commit.
-->

*Started 2026-11-26. Explore, Plan, Code, Commit.*

## Goal

Lernende der Klassen 7 und 8 erkennen Algorithmen im Alltag, prüfen ihre Eigenschaften und steuern den Roboter Kiko erst mit Befehlskarten (unplugged), dann mit Blöcken in der Programmierwerkstatt `coding`: Sequenz, Verzweigung, Zählschleife und bedingte Wiederholung. Welle 2 baut Kapitel 1 und 2 (7 Bausteine); Kapitel 3–5 (Klasse 9-10) kommen später.

## Key decisions

- Archetyp `explainer`: Auftrag #495 ist ein Explainer im Format 2 mit `strand: informatik/algorithmen`.
- Programmieren findet in der Werkstatt `coding` statt: Der Explainer erklärt, übt mit eigenen Fragen und `generated` und verlinkt Challenges (Auftrag).
- Keine eigenen Vue-Komponenten: Chat als Textblock wie #492, Vorhersage „Wo endet Kiko?“ als Frage mit Spielfeldbild A–D (Orchestrator, Checkpoint Recherche).
- Spielfelder und Blockprogramme als statische SVGs aus `scripts/kiko-bilder.json` per `scripts/kiko-bilder.mjs`: Sie gehen als `material` in Fragen, eine Komponente nicht.
- Challenges als JSON in `challenges/`, je mit Musterlösung; `scripts/challenges.mjs` prüft sie mit dem Prüfskript v1 (Kopie mit Herkunft) und gleicht die Links in den Seiten ab; läuft in `npm test`.
- Keine Recap-Seite: Kein Baustein der Welle braucht etwas außerhalb des Strangs.
- Kein `scope`: kein `open-task`.
- Kein `tasks: { start: first }`, also der Standard `random`: Laut Schema ist `first` für junge Lernende gedacht; mit `random` bekommen Lernende einer Klasse verschiedene Aufgaben (guess, der Auftrag sagt „Erwäge“).
- Musterseite `sequenz` (Orchestrator, Checkpoint Plan).

## Notes

- Strang `informatik/algorithmen` (Lernlandkarte https://lernapps.net/apps/map/informatik.json, `explainerFocus: strand`).
- Kapitel 1 `algorithmen` (7-8): `algorithmus-begriff` → Seite `algorithmus`; `algorithmische-eigenschaften` → `eigenschaften`; `sequenz` → `sequenz`.
- Kapitel 2 `bloecke` (7-8): `visuelle-programmierung` → `bloecke`; `verzweigung` → `verzweigung`; `wiederholung-feste-anzahl` → `zaehlschleife`; `wiederholung-mit-bedingung` → `bedingte-wiederholung`.
- Reihenfolge nach `requires`: algorithmus-begriff (–); eigenschaften, sequenz (← begriff); bloecke, verzweigung, zählschleife (← sequenz); bedingte Wiederholung (← zählschleife, verzweigung). Keine Voraussetzung außerhalb des Strangs.
- Später (9-10, nicht in Welle 2): Kapitel 3 `darstellen` (struktogramm, programmablaufplan, pseudocode, darstellungen-ueberfuehren), Kapitel 4 `text` (textbasierte-programmierung, algorithmus-ausfuehren, quelltext-aendern, programm-testen), Kapitel 5 `variablen` (Recap `datentypen` aus #494, variable, unterprogramme, parameter).
- Didaktik: wachsende Umgebung mit Kiko. Unplugged mit Befehlskarten auf dem Spielfeld (ein Kind ist Kiko), dann Blöcke in der Werkstatt mit denselben Wörtern und Farben. Geschichte: Klasse 7b im Klassenchat (Frau Berg, Jona, Selin, Mia, Tom, Ben, Ali, Lea).
- Wie Lernende hinkommen und welcher Fehler abgefangen wird:
  - algorithmus-begriff: von einer vagen und einer genauen Wegbeschreibung zur Definition; Fehler: „Algorithmus gibt es nur am Computer“, Beschreibung statt Anleitung (Wetterbericht).
  - algorithmische-eigenschaften: kaputte Karten selbst ausprobieren; Fehler: „endlich beschrieben“ mit „endet“ verwechselt.
  - sequenz: Karten auf dem Spielfeld ausführen; Fehler: Drehen als Schritt, links/rechts aus eigener Sicht, Reihenfolge egal.
  - visuelle-programmierung: Karten werden Blöcke, Programm testen und Fehler finden; Fehler: Computer rät, was gemeint ist.
  - verzweigung: ein Programm, zwei Spielfelder; Fehler: nur einen Fall testen, Zweige vertauscht.
  - wiederholung-feste-anzahl: Gang mit 9 Feldern; Fehler: Startfeld mitgezählt, Rumpf und Anzahl verwechselt.
  - wiederholung-mit-bedingung: Gänge unbekannter Länge; Fehler: um eins verzählt, Endlosschleife.
- Umfang: Kapitel 1 und 2, de und en. Labyrinth-Welt der Werkstatt, keine Turtle-Welt.
- Quellen: Lernlandkarte Informatik (Bausteine, iCan); GI-Bildungsstandards Informatik Sek I 2025, doi:10.18420/rec2025_052, Abschnitt 5.2 AL-1 bis AL-8 (gelesen); Programmierwerkstatt lernapps.net/coding: Schema challenge.v1, Prüfskript v1 (MIT), Befehlskarten, Kiko (CC BY 4.0). Lehrpläne HE/BY/NRW: nicht nötig, die Karte gibt Strang und Reihenfolge (Skill lernapps-content-research, 3); im Einzelnen ungeprüft.
- Behoben nach der Prüfung der ganzen App als Lernende (7. Klasse, de/en, 360 px, alle 7 Challenges gelöst):
  Personen und Kiko auf `algorithmus` eingeführt; Kartenspiel-Befehle auf `eigenschaften` genannt; „Programm“ in
  Kapitel 1 ersetzt; Übergänge Sequenz → Blöcke und Zählschleife-Chat stimmig; Glossar um Befehl, Sensor, debuggen,
  Schleife, Endlosschleife ergänzt; alle Sensoren auf `verzweigung` vor der Challenge genannt; Spielfeld A/B → 1/2
  (Namenskonflikt mit Feld A/B); Treppe mit 4 Stufen (Startzahl 3 der Werkstatt war die Lösung); Toms reparierte
  Karten aus Kikos Befehlen; Auswahlfelder bei 360 px gekürzt; Werkstatt-Wörter „Liste“, „Rätsel“; EN-Wendungen.
- Behoben nach der fachlichen Prüfung: keine Sachfehler; Begriffe präzisiert (Bedingung wahr, einseitige Verzweigung,
  Prüfung vor jedem Durchlauf, Endlosschleife allgemein, kein „until“), „im Bild“ in Challenges, neutrale Bildtitel.
- Voraussetzungen, die die App nicht übt: keine, je Seite (alle `requires` liegen im Strang und werden auf einer früheren Seite geübt). Darum keine Recap-Seite und kein `ahead`.

## Explore

<!--
- Find out what the app teaches, for whom, how much and how it looks. Ask; write no code, run no `create`.
- An answer counts only in the creator's words under "Answers". At most 2 questions per message, one topic each.
-->

### Tasks

- [x] Check the start: the folder `.agents/skills/lernapps-app` exists (else stop and tell the creator that the folder
      was not started with `init`), and `git branch --show-current` prints `work` (else `git switch -c work`).
- [x] Load skill `lernapps-app`. Tell the creator in two sentences what a lernapps app is and where it will live: at
      their own address, free and public, and once listed as a copy on lernapps.net. Say that the technical part
      (GitHub) comes at the end and that you do it.
- [x] Interview: ask the topics "Goal" and "Learners" of "Answers".
- [x] Load skill `lernapps-map-assignment` and read the learning map of the subject as it says. The creator brings
      the content themselves (material, a word list, the pages): note under "Notes" which competencies of the map it
      covers. Else write the skill's assignment, with its story; the creator's yes answers the topics Content and
      Amount. A subject without a map: skip this task and say so.
- [x] Load skill `lernapps-exercise-patterns` and read its reference for the subject. Note under "Notes" how learners
      will practise what the goal names.
- [x] Choose the archetype as skill `lernapps-app` says: read the README of each archetype in question, then tell the
      creator in plain words what the chosen one can and cannot do. Write the archetype and its reason under "Key
      decisions".
- [x] Run `npx --no -- lernapps skills --archetype <name>` with the chosen archetype. It installs the archetype's
      skills and adds the archetype's tasks to this plan.
- [x] Load skill `lernapps-explainer-design`. An explainer has the look of the runtime: write "fixed by the
      archetype" under the topic "Look and feel" of "Answers".
- [x] Interview: ask every other topic of "Answers", in order. Leave out only a topic that an answer of the creator
      already covers, and note which answer. A topic nobody answered is asked once before you write an assumption
      with "(guess)".
- [x] Load skill `lernapps-content-research` and research as it says. Write under "Notes": the strand or subject, the
      competencies by chapter with their ids, the sources you opened.
- [x] Write under "Notes" which competency goes on which page and which pages form a chapter, as "Map the content" of
      skill `lernapps-explainer-design` says. Per page, name the prerequisites the app does not practise.
- [x] Write under "Notes", one line per competency: how learners get there (they derive it, they do not only read it
      off), and which misconception the feedback catches.
- [x] Write under "Notes" the scope: what is in, what is out and why, the data range (for example "all main-group
      elements", never a silent "1–20"), the languages.
- [x] **Checkpoint:** research. Show in plain words: the strand or why none, the competencies by chapter, the didactic
      approach, the scope, every "(guess)", the sources and what is unchecked, the archetype and its reason. Stop and
      wait. Changes: change them, then ask again.
      Creator: Einverstanden, weiter mit dem Plan. Klassenchat: keine eigene Komponente, Textblock mit Zeilen „**Selin:** …“ wie #492. KikoZiel: keine zweite Werkstatt im Explainer; Frage oder generated mit statischem Spielfeld-SVG mit Feldern A–D. Rückweg: kein Rückkanal, back.url mit {de, en} reicht. Statische SVGs per Skript und der Link-Test sind gut.

### Answers

<!-- The interview: per topic the creator's answer, in their words. Keep the topics. -->

Die Antworten stehen im Auftrag des Orchestrators (Epic lernapps/apps#509, Issue #495), zitiert:

- Goal: „Ich kann Algorithmen im Alltag erkennen, ihre Eigenschaften prüfen und Anweisungen als Sequenz formulieren.“ / „Ich kann mit Blöcken Programme mit Verzweigungen, Zählschleifen und bedingten Wiederholungen schreiben.“
- Learners: „Stufen 7-8, 9-10“; Welle 2: „Kapitel 1 und 2 (7-8)“.
- Model and focus: „Eine wachsende Programmierumgebung mit einer wiederkehrenden Figur (ein Roboter auf einem Spielfeld)“; „Der Explainer erklärt, übt mit eigenen Fragen und generated-Aufgaben und schickt die Lernenden mit Challenge-Links in die Werkstatt.“
- Hurdles: aus der Didaktik: „prüfen, ob die Anweisungen eindeutig, ausführbar und endlich sind“; die Fehler je Baustein unter „Notes“ (guess, aus der Recherche).
- Content: „Folge den Skills von lernapps/tooling“; Quellen „die Lernlandkarte, die GI-Bildungsstandards Sek I (2025), Lehrpläne HE/BY/NRW“.
- Amount: „Kapitel 1 und 2 mit 7 Bausteinen. Kapitel 3 bis 5 (9-10) kommen später als Inkrement; plane sie mit, baue sie nicht.“
- Languages: „Jede App in Deutsch und Englisch, ein Seitenbaum je Sprache.“
- Look and feel: fixed by the archetype.
- Terms: „Kiko ist der Roboter auf dem Spielfeld, wie in coding“; Befehle und Blöcke mit den Wörtern der Werkstatt; „Fachbegriffe wie die GI-Bildungsstandards 2025“, englisch „wie im Computing curriculum in England (algorithm, sequence, selection, iteration, loop)“.
- Finding the app: Algorithmus, Sequenz, Verzweigung, Schleife, Blockprogrammierung, Roboter, Klasse 7/8 (guess; Katalogeintrag macht der Orchestrator).

## Plan

<!--
- Map the confirmed content onto the archetype. No new content questions: a gap in the content goes back to Explore.
- The creator confirms the plan in one read. After the yes you work on your own.
-->

### Tasks

- [x] Map the content as "Map the content" of skill `lernapps-explainer-design` says, and write the result under
      "Content method".
- [x] Choose a pattern per competency as skill `lernapps-exercise-patterns` says, and add it to "Content method".
- [x] Add to "Content method" one line per page, as "Engagement" of skill `lernapps-explainer-design` says: the
      opening task, the change of activity, the reward, the story.
- [x] Add the tasks of Code, each one a piece of work that ends in a commit. First the pattern: one complete page or
      screen, `npx --no -- lernapps plan add --at pattern "<task>"`. Then the others, one call each:
      `npx --no -- lernapps plan add --at pages "<task>"`. Each task says what it builds and what it shows.
- [x] Draw a sketch of each screen, component or interactive exercise: a static SVG or image, or the steps with what
      learners see after each. Keep the files in `.vibe/sketches/`.
- [x] Show the creator, short: goal, competencies by chapter, the Code tasks, the sketches, and the content method in
      plain words (what learners see and do, what the app cannot do). At most 2 questions.
- [x] **Checkpoint:** confirm the plan and the content method. Stop and wait for an explicit yes. Changes: change
      them, then ask again.
      Creator: Ja, so bauen. Musterseite sequenz: ja. Endlosschleife enger formulieren („Ein Programm, das nie endet, löst keine Aufgabe, die enden soll. Darum muss ein Algorithmus enden.“), kein Widerspruch zur Ampel aus #500. Wetterbericht als Gegenbeispiel mit Rückmeldung, warum keine Handlungsvorschrift. C7 mit festem Block passt. Kopie des Prüfskripts mit Herkunft: ja, und im Test die Version v1 prüfen.

### Content method

**Seiten und Bausteine** (Format 2, `strand: informatik/algorithmen`, de und en):

- Kapitel 1 `algorithmen` · Was ist ein Algorithmus?: `algorithmus` (algorithmus-begriff), `eigenschaften` (algorithmische-eigenschaften), `sequenz` (sequenz).
- Kapitel 2 `bloecke` · Programmieren mit Blöcken: `bloecke` (visuelle-programmierung), `verzweigung` (verzweigung), `zaehlschleife` (wiederholung-feste-anzahl), `bedingte-wiederholung` (wiederholung-mit-bedingung).
- Sektionen mit festen ids: `einstieg` (Chat und erste Aufgabe), `idee` (Erklärung, Definition, Merke), `ausprobieren` (Unplugged-Anleitung, Challenge-Links; nur wo man etwas tut), `uebung`, `weiter` (Rückblick, was als Nächstes kommt).
- Keine Recap-Seite, kein `ahead`: keine Voraussetzung außerhalb des Strangs.

**Muster** (Name · Baustein-Art · Form · Beispiel):

- Wo endet Kiko? · Programm lesen · `single-choice`, `material`: Spielfeld-SVG mit Markern A–D und Karten- oder Blockbild; jedes falsche Feld ist ein typischer Fehler mit eigener `info` · Seite `sequenz`, Einstieg.
- Karten zählen · Sequenz bilden · `number` mit Spielfeld als `material`; Erklärung nennt den Fehler „Drehungen vergessen“ · `sequenz`.
- Welche Folge / welches Programm · Programm auswählen · `single-choice`, Optionen sind Befehlsfolgen bzw. Programme; falsche Optionen: Richtung verwechselt, eins zu weit, Reihenfolge vertauscht.
- Rechnen mit Programmen · Schleifen und Sequenzen auswerten · `generated` mit `int`; Fehler: a+b statt a−b, n+k statt n·k, Startfeld mitgezählt (d+1), um eins verzählt · `sequenz`, `zaehlschleife`, `bedingte-wiederholung`.
- Zuordnen · erkennen · `matching` (Alltagsalgorithmus ↔ Aufgabe; Anweisung ↔ verletzte Eigenschaft; Werkstatt-Teil ↔ Zweck; Situation ↔ Zweig; Sequenz ↔ Schleife).
- Beurteilen · entscheiden · `true-false` mit Grund in der Erklärung; `multiple-choice` (welche sind Algorithmen; in welchen Spielfeldern dreht Kiko).
- Challenge · implementieren · Link in die Werkstatt im Abschnitt `ausprobieren`, nie die Pflichtübung.

**Engagement je Seite** (Einstieg · Wechsel · Belohnung · Geschichte):

- `algorithmus`: Welche Wegbeschreibung hilft Ali? · Chat, Frage, Definition, Plan des Schulhauses, Unplugged, Übungen · Ali findet den Computerraum; eigene Wegbeschreibung · Ali ist neu in der 7b.
- `eigenschaften`: Was geht bei „gehe ein Stück“ schief? · Chat, Frage, vier Prüffragen, Merke, Kartenspiel · Toms Karten repariert · Tom schreibt kaputte Karten.
- `sequenz`: Wo steht Kiko nach Jonas Karten? · Chat, Frage mit Bild, Merke, Unplugged, Challenge, Übungen · erstes Programm in der Werkstatt; Rückblick auf Kapitel 1 · Mia ist Kiko, Jona legt Karten; Ausblick: Kiko soll selbst laufen.
- `bloecke`: Was macht dieses Programm? · Chat, Blockbild, Werkstatt-Teile, Fehler finden, Challenge · Bens Fehler gefunden · Ben baut ein Programm mit Fehler.
- `verzweigung`: zwei Spielfelder, ein Programm · Chat, Frage, Sensor und Bedingung, Challenge · ein Programm für beide Felder · Lea fragt, woher Kiko das weiß.
- `zaehlschleife`: 9 gleiche Blöcke · Chat, Rechnen, Schleifenbild, Challenges · Gang mit 3 Blöcken · Jona ist das Ziehen leid.
- `bedingte-wiederholung`: Gänge unbekannter Länge · Chat, Rechnen, Merke Endlosschleife, Challenges · Kiko findet durch jeden Gang; Rückblick auf Kapitel 2 und Ausblick auf 9-10 · Selin baut ein Labyrinth für alle.

**Bilder:** Spielfelder, Karten und Blockprogramme sind statische SVGs in `src/images/kiko/`, erzeugt von `scripts/kiko-bilder.mjs` aus `scripts/kiko-bilder.json` (Felder: `map`, `facing`, `marks`; Programme: Programm-IR wie in den Challenges, `als: karten|bloecke`, `numbers`). Spielfelder ohne Wörter (eine Datei), Programme je Sprache (`-de.svg`, `-en.svg`). Aussehen, Farben und Wörter wie `coding` (CC BY 4.0). Lernende lesen am Spielfeld: Spalten- und Zeilennummern, dunkle Felder sind Wände, grünes Feld mit Fahne ist das Ziel, das gelbe Dreieck an Kiko zeigt die Blickrichtung; das erklärt die Seite `sequenz` vor der ersten Aufgabe, jede weitere Seite nennt es im `alt`. Nach einer Änderung: `node scripts/kiko-bilder.mjs`; der Test prüft mit `--check`.

**Challenges:** `challenges/<id>.json` (Schema challenge.v1 der Werkstatt) und `challenges/<id>.loesung.json`. `back.url` `{ de: /informatik-algorithmen/<kapitel>/<seite>/, en: /informatik-algorithmen/en/<kapitel>/<seite>/ }`. Link holen: `node scripts/challenges.mjs --links`. `npm test` prüft: Prüfskript v1 mit Lösung, Version, jeder Link in `src/**/*.yaml` je Sprache, jede Challenge auf ihrer Seite verlinkt. C1 `kiko-sequenz-schulhof` (sequenz), C2 `kiko-fehler-finden` (bloecke), C3 `kiko-wenn-sonst` (verzweigung), C4 `kiko-langer-gang` und C5 `kiko-treppe` (zaehlschleife), C6 `kiko-gang-unbekannt` und C7 `kiko-immer-dem-gang-nach` (bedingte-wiederholung).

**Komponenten:** keine. Der Chat ist ein `text`-Block mit Zeilen „**Name:** …“ (wie #492).

**Ein späteres Kapitel** (3–5, 9-10): Ordner unter `src/`, in `chapters` eintragen, Bausteine aus der Karte; Kapitel 5 beginnt mit einer Recap-Seite `datentypen`. Neue Bilder in `scripts/kiko-bilder.json`, neue Challenges in `challenges/`.


## Code

<!--
- Build the app, locally on `work`, on your own. After each task: `plan done`, then one commit with the work and this
  plan. The hooks check each commit; a failing check is fixed from its message, as skill `lernapps-cli` says.
- What you cannot decide: choose, write it under "Key decisions" with "(guess)", go on.
- The creator asks for a change: say your reading in one sentence first, then change every place it holds for
  (`feedback-applied-everywhere`).
-->

### Tasks

- [x] Load skill `lernapps-cli`. Create the app as its section "Create" says:
      `npx --no -- lernapps create --archetype explainer`.
- [x] Fill the content guide `.agents/skills/app-content/SKILL.md` from "Notes" and "Content method": every heading,
      no "FILL IN" left. Commit it before any content.
- [x] Load skill `lernapps-explainer`.
- [x] Load skill `lernapps-content-questions`. Read whole, with your file tool:
      `.agents/skills/lernapps-explainer/references/blocks.md` and
      `.agents/skills/lernapps-explainer/references/exercises.md`. A foreign language: also
      `references/language-tasks.md` in the same folder. A component in the plan: also `references/components.md`.
- [x] Decide whether the app needs `scope`, as "`scope`" in
      `.agents/skills/lernapps-explainer/references/structure.md` says. Write the choice under "Key decisions".
- [x] Musterseite algorithmen/sequenz (Baustein sequenz) in de und en: Chat, Frage A–D mit Spielfeld- und Kartenbild, Merke, Unplugged-Anleitung, Challenge C1, Übungen number, single-choice, generated, true-false; dazu scripts/kiko-bilder.mjs, scripts/challenges.mjs mit Prüfskript v1 in npm test, LICENSE auf Oliver Jägle.
<!-- tasks: pattern (1 added): the one page or screen that is the pattern for the others -->
- [x] **Checkpoint:** the pattern page. Load skill `lernapps-learner-check` and do its learner check on the page. Fix
      what it finds. Then show the creator the page and ask whether the others may follow it. Stop and wait. A
      change: change the pattern first.
      Creator: Ja, die übrigen 6 Seiten folgen diesem Muster. tasks.start: random ja. „Frau Berg“ bleibt auf Englisch. Bis coding die Arbeitsfläche behebt: Challenges kurz halten, höchstens 8 Blöcke, wo es geht.
- [x] Seite algorithmen/algorithmus (algorithmus-begriff): Ali sucht den Computerraum, Definition Algorithmus, Schulhausplan, Wegbeschreibung zu zweit, Übungen.
- [x] Seite algorithmen/eigenschaften (algorithmische-eigenschaften): Toms kaputte Karten, vier Prüffragen, Merke endlich beschrieben ≠ endet, Kartenspiel, Übungen.
- [x] Seite bloecke/bloecke (visuelle-programmierung): Karten werden Blöcke, Programm und Programmiersprache, Werkstatt, Fehler finden, Challenge C2, Übungen.
- [x] Seite bloecke/verzweigung (verzweigung): Sensor, Bedingung, wenn … dann … sonst, zwei Spielfelder, Challenge C3, Übungen.
- [x] Seite bloecke/zaehlschleife (wiederholung-feste-anzahl): wiederhole … mal, Schleifenrumpf, Challenges C4 und C5, Übungen mit generated.
- [x] Seite bloecke/bedingte-wiederholung (wiederholung-mit-bedingung): solange … tue, Endlosschleife, Challenges C6 und C7, Übungen mit generated, Rückblick auf Kapitel 2.
<!-- tasks: pages (6 added): the other pages or screens, after the pattern -->
- [x] Update the content guide so that it describes the app as built (`app-content-matches`).
- [x] Run `npx --no -- lernapps check` until it passes.
- [x] Look at every screen and state, at 360 px and on a desktop, as "Look at the app" of skill `lernapps-cli` says.
      Compare each with its sketch.
- [x] Do the whole-app check of skill `lernapps-learner-check`. Fix what it finds and write under "Notes" what you
      fixed.

## Commit

<!--
- Put the app on GitHub, publish it with the creator's yes, then list it. A push to `main` publishes.
- Open the pull requests (to `main`, to the catalog) without asking: they publish nothing.
- The creator asked to stop before publishing (a trial): stop here and say so.
-->

### Tasks

- [x] Load skill `lernapps-explainer-self-assessment`. Add the self-assessment as it says, or write under "Key
      decisions" why the app has none. Commit.
- [x] Load skill `lernapps-github`. Set up the repository and Pages as it says. Ask for the repository's name and
      every click only the creator can make, in one message.
- [x] Push `work`, open the preview pull request and see its checks to green, as skill `lernapps-github` says.
- [ ] **Checkpoint:** publish. Show what the app does and the preview link from the comment "Vorschau der App". Ask
      whether it may go online. Stop and wait for the yes.
- [ ] Load skill `lernapps-commit`. Publish as skill `lernapps-github` says: `work` into `main` as one squash commit,
      the run of `Pages` watched to its end.
- [ ] Open the address the job `deploy` printed and confirm that the app shows. Never use a derived address.
- [ ] Load skill `lernapps-listing`. Write the entry under "Entry draft" as it says, with the creator's answer to
      "Finding the app".
- [ ] Fill the retrospective.
- [ ] Commit this plan on `main` and push it: the listing check and the review read it there.
- [ ] **Checkpoint:** list. Open the listing pull request as skill `lernapps-listing` says, without asking first: the
      pull request is the review. See it to "bestanden", then show the creator the pull request and its result.
- [ ] If the plan changed since its last push, commit it on `main` and push again.

### Entry draft

<!-- YAML valid against the entry schema the listing skill names. Only known values, never invented. -->

```yaml
```

## Retrospective

<!-- At the end of Commit, before the listing pull request. Facts, short, no names. Read by review and evals. -->

### Phases reached

Code abgeschlossen, Commit bis Checkpoint „Veröffentlichen“ (gemeldet, Antwort ausstehend). Checkpoints Recherche,
Plan und Musterseite bestätigt. Merge, Veröffentlichen und Katalogeintrag machen Orchestrator und Mensch.

### Creator turns after the plan

4 Nachrichten des Orchestrators nach der Bestätigung des Plans: Nachtrag 5 (falsche Lösungen per Skript, Übungen
allein verständlich, Kernbegriffe früh fachlich klären); Ja zur Musterseite mit „höchstens 8 Blöcke“; Eingang des
Checkpoints mit der Bitte um Tastaturprobe, Suchwörter, Kompetenz-ids und Retro; dazu 1 Nachricht des Menschen
(„Du darfst npx ausführen“) vor Code.

### Where I had to guess

- `init` war zuerst vom Auto-Modus gesperrt; Recherche und Plan liefen über die geklonten Skills, Entwürfe im
  Scratchpad, bis der Mensch `npx` freigab.
- `tasks.start`: Standard `random` statt `first` (Schema: `first` für junge Lernende).
- `src/images/` erlaubt keine Unterordner: Bilder heißen `kiko-*.svg`.
- Skripte als TypeScript (Regel `strict-typescript`) mit `@types/node` per Referenz, weil `tsconfig` des Presets nur
  `vite-plus/client` lädt.
- Die Kopie des Prüfskripts formatiert `vp check --fix` (leeres `export {};` fällt weg); ausnehmen ginge nur im
  Preset. Der Dateikopf sagt es.
- Vorhersage-Aufgaben (coding#4) kamen nach der Musterseite; ohne Musterlösung, der Test wurde dafür erweitert.
- Englische Klassenstufen: „class 7b“ wie in #490; im Rückblick keine Jahrgangsstufe (England zählt anders).

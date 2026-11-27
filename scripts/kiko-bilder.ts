/// <reference types="node" />
// Zeichnet die Bilder von Kiko als statische SVGs nach src/images/kiko-*.svg, aus scripts/kiko-bilder.json.
//
// - Spielfelder ("felder"): Wände, Boden, Ziel mit Fahne, Kiko mit Blickrichtung, Spalten- und Zeilennummern und
//   Marker (A–D) auf Feldern. Ohne Wörter: eine Datei für beide Sprachen (kiko-<name>.svg).
// - Programme ("programme"): ein Programm (dieselbe Form wie in den Challenges, Programm-IR v1 der Werkstatt) als
//   Blöcke oder als Befehlskarten, je Sprache eine Datei (kiko-<name>-de.svg, kiko-<name>-en.svg).
//
// Aussehen, Farben und Wörter wie in der Programmierwerkstatt (https://lernapps.net/coding/, Quellcode
// https://github.com/lernapps/coding: src/ui/worlds/labyrinth/View.vue, src/ui/worlds/Robot.vue,
// src/ui/editor/blocks.ts, src/messages/{de,en}.json), © 2026 Oliver Jägle, CC BY 4.0.
//
// Aufruf: node scripts/kiko-bilder.ts          schreibt die Bilder
//         node scripts/kiko-bilder.ts --check  prüft, ob die Bilder zur Quelle passen (auch test/kiko-bilder.test.ts)
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, "src/images");
/** Alle erzeugten Bilder heißen kiko-<name>.svg; andere Bilder in src/images/ fasst das Skript nicht an. */
const PREFIX = "kiko-";
const SOURCE = join(ROOT, "scripts/kiko-bilder.json");
const CREDIT = "Kiko und die Welt nach der Programmierwerkstatt lernapps.net/coding, © 2026 Oliver Jägle, CC BY 4.0";

type Lang = "de" | "en";
type Facing = "north" | "east" | "south" | "west";
type Expr = { e: "sense"; name: string } | { e: "not"; a: Expr } | { e: "empty" } | { e: "num"; value: number };
type Stmt =
  | { s: "cmd"; name: string }
  | { s: "repeat"; times: Expr; body: Stmt[] }
  | { s: "while"; cond: Expr; body: Stmt[] }
  | { s: "if"; cond: Expr; then: Stmt[]; else?: Stmt[] };
type Program = { main: Stmt[] };
type Feld = { title: string; map: string[]; facing: Facing; marks?: Record<string, [number, number]>; kiko?: boolean };
type Programm = { title: Record<Lang, string>; program: Program; als?: "karten" | "bloecke"; numbers?: boolean };
type Source = { felder?: Record<string, Feld>; programme?: Record<string, Programm> };

/** Die Wörter der Blöcke, wie in der Werkstatt (src/messages/{de,en}.json). */
const WORDS: Record<Lang, Record<string, string>> = {
  de: {
    programm: "Programm",
    vorwaerts: "gehe vorwärts",
    links: "drehe dich nach links",
    rechts: "drehe dich nach rechts",
    wiederhole: "wiederhole %1 mal",
    solange: "solange %1 tue",
    wenn: "wenn %1 dann",
    sonst: "sonst",
    nicht: "nicht %1",
    "wand-voraus": "Wand voraus?",
    "wand-links": "Wand links?",
    "wand-rechts": "Wand rechts?",
    "am-ziel": "am Ziel?",
    "weg-frei": "Weg frei?",
  },
  en: {
    programm: "Program",
    vorwaerts: "move forward",
    links: "turn left",
    rechts: "turn right",
    wiederhole: "repeat %1 times",
    solange: "while %1 do",
    wenn: "if %1 then",
    sonst: "else",
    nicht: "not %1",
    "wand-voraus": "wall ahead?",
    "wand-links": "wall on the left?",
    "wand-rechts": "wall on the right?",
    "am-ziel": "at the goal?",
    "weg-frei": "way ahead clear?",
  },
};
/** Die Farben der Blöcke (src/ui/editor/blocks.ts). */
const COLOURS = { move: "#2f5d8a", control: "#2e6b30", sense: "#6f3a96", start: "#7a4f24" } as const;
type Kind = "move" | "control";

const esc = (s: string): string => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function word(words: Record<string, string>, key: string): string {
  const w = words[key];
  if (w === undefined) throw new Error(`Für „${key}“ gibt es kein Wort`);
  return w;
}

/** Kiko, aufrecht, um (0|0), etwa 40 Einheiten hoch; das Dreieck zeigt die Blickrichtung (Robot.vue). */
function kiko(angle: number): string {
  return `<g>
  <circle r="19" fill="#ffffff" fill-opacity="0.55" stroke="#1f2a44" stroke-width="1"/>
  <line x1="0" y1="-11" x2="0" y2="-16" stroke="#5c2400" stroke-width="1.5"/>
  <circle cx="0" cy="-16.5" r="2" fill="#ffc300" stroke="#5c2400" stroke-width="0.8"/>
  <rect x="-10" y="-11" width="20" height="13" rx="5" fill="#e8590c" stroke="#5c2400" stroke-width="1.2"/>
  <rect x="-7" y="-8.5" width="14" height="7.5" rx="3" fill="#1f2a44"/>
  <circle cx="-3.2" cy="-4.8" r="1.7" fill="#ffffff"/>
  <circle cx="3.2" cy="-4.8" r="1.7" fill="#ffffff"/>
  <rect x="-7.5" y="3" width="15" height="8" rx="3" fill="#e8590c" stroke="#5c2400" stroke-width="1.2"/>
  <rect x="-8.5" y="11" width="6" height="3.5" rx="1.5" fill="#1f2a44"/>
  <rect x="2.5" y="11" width="6" height="3.5" rx="1.5" fill="#1f2a44"/>
  <path transform="rotate(${angle})" d="M 17 -7 L 26 0 L 17 7 Z" fill="#ffc300" stroke="#1f2a44" stroke-width="1.5" stroke-linejoin="round"/>
</g>`;
}

const ANGLE: Record<Facing, number> = { north: -90, east: 0, south: 90, west: 180 };
const CELL = 40;
const PAD = 22;
/** Weißer Streifen unten: Dort liegt das Lizenzschild der Seite, ohne etwas zu verdecken. */
const FOOT = 34;

function svg(w: number, h: number, title: string, body: string, style: string): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">
<title>${esc(title)}</title>
<desc>${esc(CREDIT)}. Erzeugt mit scripts/kiko-bilder.ts.</desc>
<style>${style}</style>
${body}
</svg>
`;
}

/** Ein Spielfeld: map wie in den Challenges (# Wand, . Weg, S Start, Z Ziel), marks: { "A": [spalte, zeile] } ab 1. */
export function feld({ map, facing, marks = {}, kiko: showKiko = true, title }: Feld): string {
  const cols = map[0]?.length ?? 1;
  const w = cols * CELL + PAD + 8;
  const h = map.length * CELL + PAD + 8 + FOOT;
  const parts: string[] = [];
  for (let x = 0; x < cols; x++)
    parts.push(`<text x="${PAD + x * CELL + CELL / 2}" y="15" class="num">${x + 1}</text>`);
  map.forEach((_, y) => parts.push(`<text x="11" y="${PAD + y * CELL + CELL / 2 + 4}" class="num">${y + 1}</text>`));
  let start: { px: number; py: number } | undefined;
  map.forEach((row, y) =>
    row.split("").forEach((ch, x) => {
      const px = PAD + x * CELL;
      const py = PAD + y * CELL;
      const cls = ch === "#" ? "wall" : ch === "Z" ? "goal" : "floor";
      parts.push(`<rect x="${px}" y="${py}" width="${CELL}" height="${CELL}" class="${cls}"/>`);
      if (ch === "Z")
        parts.push(
          `<g transform="translate(${px + 12} ${py + 8})"><line x1="2" y1="0" x2="2" y2="25" class="pole"/><path d="M 2 1 L 18 6 L 2 11 Z" class="flag"/></g>`,
        );
      if (ch === "S") start = { px, py };
    }),
  );
  for (const [letter, [cx, cy]] of Object.entries(marks)) {
    const px = PAD + (cx - 1) * CELL;
    const py = PAD + (cy - 1) * CELL;
    parts.push(
      `<g><circle cx="${px + CELL - 11}" cy="${py + CELL - 11}" r="9" class="mark"/><text x="${px + CELL - 11}" y="${py + CELL - 7}" class="mark-text">${esc(letter)}</text></g>`,
    );
  }
  if (showKiko && start !== undefined)
    parts.push(`<g transform="translate(${start.px + CELL / 2} ${start.py + CELL / 2})">${kiko(ANGLE[facing])}</g>`);
  const style =
    ".num{font:11px sans-serif;text-anchor:middle;fill:#3b4252}.wall{fill:#3b4252}.floor{fill:#f3f1ea;stroke:#d8d4c8}.goal{fill:#a6dba0;stroke:#1e5a20;stroke-width:3}.pole{stroke:#1f2a44;stroke-width:2}.flag{fill:#2f7d32}.mark{fill:#ffffff;stroke:#1f2a44;stroke-width:1.5}.mark-text{font:bold 12px sans-serif;text-anchor:middle;fill:#1f2a44}";
  return svg(w, h, title, `<rect width="${w}" height="${h}" fill="#ffffff"/>` + parts.join(""), style);
}

// Programme -----------------------------------------------------------------------------------------------------

const FONT = 14;
const LINE = 30;
const INDENT = 22;
const charWidth = (s: string): number => s.length * FONT * 0.56;

/** Der Text einer Bedingung, z. B. „nicht am Ziel?“. */
function cond(e: Expr, words: Record<string, string>): string {
  if (e.e === "sense") return word(words, e.name);
  if (e.e === "not") return word(words, "nicht").replace("%1", cond(e.a, words));
  if (e.e === "empty") return "___";
  throw new Error(`Bedingung ${JSON.stringify(e)} kann ich nicht zeichnen`);
}

type Row = { depth: number; kind: Kind; text?: string; end?: boolean; mid?: boolean };

/** Die Zeilen eines Programms: Blöcke, „sonst“ und das Ende jeder Klammer. */
function lines(block: Stmt[], words: Record<string, string>, depth = 0, out: Row[] = []): Row[] {
  for (const s of block) {
    if (s.s === "cmd") out.push({ depth, text: word(words, s.name), kind: "move" });
    else if (s.s === "repeat") {
      const n = s.times.e === "num" ? String(s.times.value) : "___";
      out.push({ depth, text: word(words, "wiederhole").replace("%1", n), kind: "control" });
      lines(s.body, words, depth + 1, out);
      out.push({ depth, end: true, kind: "control" });
    } else if (s.s === "while") {
      out.push({ depth, text: word(words, "solange").replace("%1", cond(s.cond, words)), kind: "control" });
      lines(s.body, words, depth + 1, out);
      out.push({ depth, end: true, kind: "control" });
    } else {
      out.push({ depth, text: word(words, "wenn").replace("%1", cond(s.cond, words)), kind: "control" });
      lines(s.then, words, depth + 1, out);
      if (s.else !== undefined) {
        out.push({ depth, text: word(words, "sonst"), kind: "control", mid: true });
        lines(s.else, words, depth + 1, out);
      }
      out.push({ depth, end: true, kind: "control" });
    }
  }
  return out;
}

/**
 * Ein Programm als Blöcke: oben der braune Kopf „Programm“, darunter die Blöcke; Schleifen und Verzweigungen
 * umfassen ihren Rumpf wie in der Werkstatt. numbers: true schreibt vor jeden Befehlsblock seine Nummer (1, 2, …).
 */
export function bloecke(program: Program, lang: Lang, title: string, numbers = false): string {
  const words = WORDS[lang];
  const rows = lines(program.main, words);
  const gutter = numbers ? 28 : 0;
  const x0 = 8 + gutter;
  let y = 8;
  const parts: string[] = [];
  const bars: string[] = [];
  const head = word(words, "programm");
  const headW = charWidth(head) + 28;
  parts.push(`<rect x="${x0}" y="${y}" width="${headW}" height="${LINE}" rx="8" fill="${COLOURS.start}"/>`);
  parts.push(`<text x="${x0 + 12}" y="${y + 20}" class="t">${esc(head)}</text>`);
  y += LINE + 2;
  let maxW = headW;
  let n = 0;
  // Offene Klammern (Schleife, Verzweigung): ihre Startzeile, für den Balken links am Rumpf.
  const stack: number[] = [];
  for (const r of rows) {
    const x = x0 + r.depth * INDENT;
    if (r.end === true) {
      const open = stack.pop() ?? y;
      bars.push(`<rect x="${x}" y="${open}" width="10" height="${y + 10 - open}" fill="${COLOURS.control}"/>`);
      parts.push(`<rect x="${x}" y="${y}" width="60" height="10" rx="3" fill="${COLOURS.control}"/>`);
      y += 12;
      continue;
    }
    const text = r.text ?? "";
    const w = charWidth(text) + 28;
    maxW = Math.max(maxW, x - x0 + w);
    parts.push(`<rect x="${x}" y="${y}" width="${w}" height="${LINE}" rx="5" fill="${COLOURS[r.kind]}"/>`);
    parts.push(`<text x="${x + 12}" y="${y + 20}" class="t">${esc(text)}</text>`);
    if (numbers && r.kind === "move") {
      n += 1;
      parts.push(`<text x="${8 + gutter / 2}" y="${y + 20}" class="n">${n}</text>`);
    }
    if (r.kind === "control" && r.mid !== true) stack.push(y);
    y += LINE + 2;
  }
  const w = Math.ceil(x0 + maxW + 8);
  const h = y + 6 + FOOT;
  const style = `.t{font:${FONT}px sans-serif;fill:#ffffff}.n{font:bold 13px sans-serif;fill:#1f2a44;text-anchor:middle}`;
  return svg(w, h, title, `<rect width="${w}" height="${h}" fill="#ffffff"/>` + bars.join("") + parts.join(""), style);
}

/** Eine Reihe Befehlskarten (nur Befehle ohne Schleifen), nummeriert, wie die Karten zum Ausdrucken. */
export function karten(program: Program, lang: Lang, title: string): string {
  const words = WORDS[lang];
  const cards = program.main.map((s) => {
    if (s.s !== "cmd") throw new Error("Karten zeigen nur Befehle");
    return word(words, s.name);
  });
  const cw = Math.max(...cards.map((c) => charWidth(c))) + 46;
  const parts: string[] = [];
  let y = 8;
  cards.forEach((c, i) => {
    parts.push(`<text x="20" y="${y + 24}" class="n">${i + 1}</text>`);
    parts.push(
      `<rect x="36" y="${y}" width="${cw}" height="36" rx="6" fill="#ffffff" stroke="${COLOURS.move}" stroke-width="3"/>`,
    );
    parts.push(`<path d="M 46 ${y + 12} L 56 ${y + 18} L 46 ${y + 24} Z" fill="${COLOURS.move}"/>`);
    parts.push(`<text x="64" y="${y + 23}" class="t">${esc(c)}</text>`);
    y += 44;
  });
  const w = Math.ceil(36 + cw + 8);
  const style = `.t{font:${FONT}px sans-serif;fill:#111111}.n{font:bold 14px sans-serif;fill:#1f2a44;text-anchor:middle}`;
  const h = y + 2 + FOOT;
  return svg(w, h, title, `<rect width="${w}" height="${h}" fill="#ffffff"/>` + parts.join(""), style);
}

// Alles aus der Quelle --------------------------------------------------------------------------------------------

/** Dateiname → Inhalt, für jedes Bild der Quelle. */
export function render(source: Source): Map<string, string> {
  const files = new Map<string, string>();
  for (const [name, f] of Object.entries(source.felder ?? {})) files.set(`${PREFIX}${name}.svg`, feld(f));
  for (const [name, p] of Object.entries(source.programme ?? {}))
    for (const lang of ["de", "en"] as const)
      files.set(
        `${PREFIX}${name}-${lang}.svg`,
        p.als === "karten"
          ? karten(p.program, lang, p.title[lang])
          : bloecke(p.program, lang, p.title[lang], p.numbers ?? false),
      );
  return files;
}

function readSource(): Source {
  return JSON.parse(readFileSync(SOURCE, "utf8")) as Source;
}

/** Die Bilder, die nicht zur Quelle passen; leer, wenn alles aktuell ist. */
export function stale(): string[] {
  const files = render(readSource());
  const problems: string[] = [];
  for (const [name, text] of files) {
    const path = join(OUT, name);
    if (!existsSync(path) || readFileSync(path, "utf8") !== text) problems.push(`${name} ist nicht aktuell`);
  }
  if (existsSync(OUT))
    for (const name of readdirSync(OUT))
      if (name.startsWith(PREFIX) && name.endsWith(".svg") && !files.has(name))
        problems.push(`${name} hat keine Quelle mehr`);
  return problems.map((p) => `src/images/${p}: node scripts/kiko-bilder.ts`);
}

function main(argv: string[]): number {
  if (argv.includes("--check")) {
    const problems = stale();
    for (const p of problems) console.error(`✗ ${p}`);
    return problems.length > 0 ? 1 : 0;
  }
  const files = render(readSource());
  mkdirSync(OUT, { recursive: true });
  for (const [name, text] of files) writeFileSync(join(OUT, name), text);
  console.log(`✓ ${files.size} Bilder in src/images/`);
  return 0;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) process.exitCode = main(process.argv.slice(2));

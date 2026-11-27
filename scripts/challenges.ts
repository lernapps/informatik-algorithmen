/// <reference types="node" />
// Prüft die Challenges für die Programmierwerkstatt (lernapps.net/coding) und ihre Links in den Seiten.
//
// 1. Jede Challenge in challenges/<id>.json besteht das Prüfskript der Werkstatt mit ihrer Musterlösung
//    challenges/<id>.loesung.json (scripts/challenge-check.v1.mjs, eine Kopie mit Herkunft im Dateikopf).
// 2. Format und Version stimmen: Prüfskript v1 mit der Kennung „// source:“ der Werkstatt, Challenge "format": 1,
//    Welt "version": 1, die id ist der Dateiname.
// 3. Jeder Werkstatt-Link in src/**/*.yaml ist genau der Link, den das Prüfskript für eine Challenge ausgibt:
//    im deutschen Text /coding/app/?c=…, im englischen /coding/en/app/?c=….
// 4. Jede Challenge ist auf der Seite verlinkt, auf die ihr back.url zeigt, in beiden Sprachen.
// 5. Jede falsche Lösung challenges/<id>.falsch-<n>.json fällt durch (mindestens eine je Challenge).
//
// Aufruf: node scripts/challenges.ts          prüft alles (auch test/challenges.test.ts)
//         node scripts/challenges.ts --links  gibt die Links je Challenge aus (zum Einfügen in eine Seite)
import { execFileSync } from "node:child_process";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { parse } from "yaml";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const CHECK = join(ROOT, "scripts/challenge-check.v1.mjs");
const DIR = join(ROOT, "challenges");
const SRC = join(ROOT, "src");
const APP = "/informatik-algorithmen/";
const LINK = /https:\/\/lernapps\.net\/coding\/(en\/)?app\/\?c=[A-Za-z0-9_-]+/g;

type Lang = "de" | "en";
type Challenge = { id: string; de: string; en: string; back: Record<Lang, string> };

/** Die Challenges mit ihren Links, so wie das Prüfskript sie ausgibt, und alles, was dabei schiefging. */
export function challenges(): { list: Challenge[]; problems: string[] } {
  const problems: string[] = [];
  const fail = (where: string, what: string): void => {
    problems.push(`${where}: ${what}`);
  };
  const script = readFileSync(CHECK, "utf8");
  if (!script.includes("https://lernapps.net/coding/tools/challenge-check.v1.mjs"))
    fail("scripts/challenge-check.v1.mjs", "Der Dateikopf nennt die Herkunft nicht.");
  if (!/^\/\/ source: [0-9a-f]{16}$/m.test(script))
    fail("scripts/challenge-check.v1.mjs", "Die Kennung „// source:“ der Werkstatt fehlt: Ist es eine Kopie von v1?");

  const list: Challenge[] = [];
  const all = readdirSync(DIR);
  const names = all.filter((n) => /^[a-z0-9-]+\.json$/.test(n));
  for (const name of names.sort()) {
    const id = name.slice(0, -".json".length);
    const where = `challenges/${name}`;
    const c = JSON.parse(readFileSync(join(DIR, name), "utf8")) as {
      id?: unknown;
      format?: unknown;
      world?: { version?: unknown };
      back?: { url?: unknown };
    };
    if (c.id !== id) fail(where, `"id" ist „${String(c.id)}“, der Dateiname sagt „${id}“.`);
    if (c.format !== 1) fail(where, `"format" ist ${String(c.format)}, das Prüfskript v1 kennt Format 1.`);
    if (c.world?.version !== 1) fail(where, `Die Welt hat Version ${String(c.world?.version)}, erwartet 1.`);
    const url = c.back?.url;
    const back =
      typeof url === "object" && url !== null && "de" in url && "en" in url ? (url as Record<Lang, unknown>) : null;
    if (
      back === null ||
      typeof back.de !== "string" ||
      typeof back.en !== "string" ||
      !back.de.startsWith(APP) ||
      !back.en.startsWith(`${APP}en/`)
    ) {
      fail(where, `"back.url" braucht { "de": "${APP}…", "en": "${APP}en/…" }.`);
      continue;
    }
    let out: string;
    try {
      out = execFileSync(process.execPath, [CHECK, join(DIR, name), join(DIR, `${id}.loesung.json`)], {
        encoding: "utf8",
        stdio: ["ignore", "pipe", "pipe"],
      });
    } catch (error) {
      const e = error as { stdout?: string; stderr?: string };
      fail(where, `Das Prüfskript lehnt Challenge oder Musterlösung ab:\n${e.stderr ?? ""}${e.stdout ?? ""}`);
      continue;
    }
    const links = [...out.matchAll(LINK)];
    const de = links.find((m) => m[1] === undefined)?.[0];
    const en = links.find((m) => m[1] !== undefined)?.[0];
    if (de === undefined || en === undefined) {
      fail(where, "Das Prüfskript hat keine Links ausgegeben.");
      continue;
    }
    // Falsche Lösungen (challenges/<id>.falsch-<n>.json): Jede muss das Prüfskript ablehnen. Mindestens eine.
    const wrong = all.filter((n) => n.startsWith(`${id}.falsch-`) && n.endsWith(".json")).sort();
    if (wrong.length === 0)
      fail(where, `Es fehlt eine falsche Lösung challenges/${id}.falsch-1.json, die durchfallen muss.`);
    for (const w of wrong) {
      try {
        execFileSync(process.execPath, [CHECK, join(DIR, name), join(DIR, w)], { stdio: ["ignore", "pipe", "pipe"] });
        fail(`challenges/${w}`, "Diese falsche Lösung besteht das Prüfskript: Die Challenge prüft zu wenig.");
      } catch {
        // abgelehnt, wie es sein soll
      }
    }
    list.push({ id, de, en, back: { de: back.de, en: back.en } });
  }
  return { list, problems };
}

function yamlFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((n) => {
    const p = join(dir, n);
    return statSync(p).isDirectory() ? yamlFiles(p) : n.endsWith(".yaml") ? [p] : [];
  });
}

/** Alle Texte eines YAML-Werts mit ihrer Sprache; ein Text ohne Sprache gilt als deutsch (Ausgangssprache). */
function texts(value: unknown, lang: Lang, out: { lang: Lang; text: string }[]): { lang: Lang; text: string }[] {
  if (typeof value === "string") out.push({ lang, text: value });
  else if (Array.isArray(value)) for (const v of value) texts(v, lang, out);
  else if (typeof value === "object" && value !== null)
    for (const [k, v] of Object.entries(value)) texts(v, k === "de" || k === "en" ? k : lang, out);
  return out;
}

/** Alle Probleme der Challenges und ihrer Links; leer, wenn alles stimmt. */
export function check(): string[] {
  const { list, problems } = challenges();
  const byLink = new Map<string, { id: string; lang: Lang }>();
  for (const c of list) {
    byLink.set(c.de, { id: c.id, lang: "de" });
    byLink.set(c.en, { id: c.id, lang: "en" });
  }
  /** "<lang> <seitenpfad>" → verlinkte Challenge-ids */
  const linked = new Map<string, Set<string>>();
  for (const file of yamlFiles(SRC)) {
    const rel = relative(SRC, file).replace(/\\/g, "/");
    const page = rel.replace(/\.yaml$/, "/");
    for (const { lang, text } of texts(parse(readFileSync(file, "utf8")), "de", [])) {
      for (const m of text.matchAll(LINK)) {
        const found = byLink.get(m[0]);
        if (found === undefined) {
          problems.push(
            `src/${rel}: Der Link ${m[0].slice(0, 60)}… gehört zu keiner Challenge oder ist veraltet: node scripts/challenges.ts --links`,
          );
          continue;
        }
        if (found.lang !== lang)
          problems.push(
            `src/${rel}: Im ${lang === "de" ? "deutschen" : "englischen"} Text steht der ${found.lang === "de" ? "deutsche" : "englische"} Link zu „${found.id}“.`,
          );
        const key = `${lang} ${page}`;
        const set = linked.get(key) ?? new Set<string>();
        set.add(found.id);
        linked.set(key, set);
      }
    }
  }
  for (const c of list)
    for (const lang of ["de", "en"] as const) {
      const page = lang === "de" ? c.back.de.slice(APP.length) : c.back.en.slice(`${APP}en/`.length);
      if (linked.get(`${lang} ${page}`)?.has(c.id) !== true)
        problems.push(
          `challenges/${c.id}.json: back.url zeigt auf ${page}, aber dort fehlt der ${lang === "de" ? "deutsche" : "englische"} Link.`,
        );
    }
  return problems;
}

function main(argv: string[]): number {
  if (argv.includes("--links")) {
    const { list, problems } = challenges();
    for (const c of list) console.log(`${c.id}\n  de: ${c.de}\n  en: ${c.en}`);
    for (const p of problems) console.error(`✗ ${p}`);
    return problems.length > 0 ? 1 : 0;
  }
  const problems = check();
  for (const p of problems) console.error(`✗ ${p}`);
  if (problems.length === 0)
    console.log("✓ Alle Challenges bestehen das Prüfskript mit Musterlösung, alle Links stimmen.");
  return problems.length > 0 ? 1 : 0;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) process.exitCode = main(process.argv.slice(2));

// Die Challenges für die Programmierwerkstatt: Prüfskript v1 mit Musterlösung, Version, Links in den Seiten
// (scripts/challenges.ts sagt, was genau geprüft wird).
import { expect, test } from "vite-plus/test";
import { check } from "../scripts/challenges.ts";

test("jede Challenge besteht das Prüfskript mit Musterlösung, alle Werkstatt-Links stimmen", () => {
  expect(check()).toEqual([]);
});

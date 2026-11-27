// Die Bilder in src/images/kiko-*.svg sind aus scripts/kiko-bilder.json erzeugt und aktuell.
import { expect, test } from "vite-plus/test";
import { stale } from "../scripts/kiko-bilder.ts";

test("die Kiko-Bilder passen zu ihrer Quelle (sonst: node scripts/kiko-bilder.ts)", () => {
  expect(stale()).toEqual([]);
});

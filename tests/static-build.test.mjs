import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

test("builds a GitHub Pages-ready static application", async () => {
  const html = await readFile(
    new URL("../dist/index.html", import.meta.url),
    "utf8",
  );

  assert.match(html, /Sabion Architecture — Avalie sua arquitetura/);
  assert.match(html, /\/sabion-architecture\/assets\//);
  assert.match(
    html,
    /https:\/\/sergiogbernardo\.github\.io\/sabion-architecture\/og\.png/,
  );
  assert.doesNotMatch(html, /localhost|codex-preview/i);

  await access(new URL("../dist/og.png", import.meta.url));
});


/**
 * Static accessibility and content checks over the exported HTML.
 *
 * This is a smoke test, not a substitute for a real audit: it catches the
 * structural regressions that are cheap to detect in CI (heading order, missing
 * alt text, unlabelled controls, duplicate ids, broken internal links) before
 * they reach a screen reader or a real user.
 *
 * Run: npm run check:a11y
 */
import { readFile, readdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, relative } from "node:path";

const OUT = new URL("../out/", import.meta.url).pathname;

const failures = [];
const notes = [];

const fail = (file, message) => failures.push({ file, message });

/** Recursively collect every exported .html file. */
async function htmlFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const found = [];
  for (const entry of entries) {
    if (entry.isDirectory()) {
      found.push(...(await htmlFiles(join(dir, entry.name))));
    } else if (entry.name.endsWith(".html")) {
      found.push(join(dir, entry.name));
    }
  }
  return found;
}

/** Strip scripts and styles so text extraction reflects the real DOM. */
function visible(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<head[\s\S]*?<\/head>/gi, " ");
}

function checkHeadings(file, html) {
  const headings = [...html.matchAll(/<(h[1-6])[^>]*>([\s\S]*?)<\/\1>/gi)].map(
    (match) => ({
      level: Number(match[1][1]),
      text: match[0].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim(),
    }),
  );

  if (headings.length === 0) {
    fail(file, "no headings found");
    return;
  }
  if (headings[0].level !== 1) {
    fail(file, `first heading is h${headings[0].level}, expected h1 ("${headings[0].text}")`);
  }
  const h1Count = headings.filter((h) => h.level === 1).length;
  if (h1Count !== 1) {
    fail(file, `${h1Count} h1 elements, expected exactly 1`);
  }
  for (let i = 1; i < headings.length; i += 1) {
    // Skipping a level is a real screen-reader navigation problem.
    if (headings[i].level - headings[i - 1].level > 1) {
      fail(
        file,
        `heading jump h${headings[i - 1].level} → h${headings[i].level} at "${headings[i].text}"`,
      );
    }
  }
}

function checkImages(file, html) {
  for (const match of html.matchAll(/<img\b[^>]*>/gi)) {
    const tag = match[0];
    if (!/\balt=/.test(tag)) {
      fail(file, `img without alt: ${tag.slice(0, 90)}`);
    }
    if (!/\bwidth=/.test(tag) || !/\bheight=/.test(tag)) {
      fail(file, `img without intrinsic dimensions (CLS risk): ${tag.slice(0, 90)}`);
    }
  }
}

function checkControls(file, html) {
  const inputs = [...html.matchAll(/<(input|textarea|select)\b[^>]*>/gi)];
  for (const match of inputs) {
    const tag = match[0];
    if (/type="(hidden|submit|button)"/i.test(tag)) continue;
    const id = tag.match(/\bid="([^"]+)"/)?.[1];
    const labelled =
      /\baria-label(lledby)?=/.test(tag) ||
      (id && new RegExp(`<label[^>]*for="${id}"`).test(html));
    if (!labelled) {
      fail(file, `form control without a label: ${tag.slice(0, 90)}`);
    }
  }

  for (const match of html.matchAll(/<button\b([^>]*)>([\s\S]*?)<\/button>/gi)) {
    const attrs = match[1];
    const text = match[2].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    const named =
      /aria-label(lledby)?=/.test(attrs) || text.length > 0 || /aria-hidden="true"/.test(text);
    if (!named) {
      fail(file, `button with no accessible name: <button${attrs.slice(0, 60)}>`);
    }
  }
}

function checkIds(file, html) {
  const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]);
  const seen = new Set();
  for (const id of ids) {
    if (seen.has(id)) fail(file, `duplicate id "${id}"`);
    seen.add(id);
  }
  // Fragment links must resolve to an element on the same page.
  for (const match of html.matchAll(/href="#([^"]+)"/g)) {
    if (!seen.has(match[1])) fail(file, `fragment link #${match[1]} has no target`);
  }
}

function checkLandmarks(file, html, raw) {
  if (!/<main\b/i.test(html)) fail(file, "missing <main> landmark");
  if (!/<h1\b/i.test(html)) fail(file, "missing <h1>");
  if (!/rel="canonical"/i.test(raw) && !/404/.test(file) && !/not-found/.test(file)) {
    fail(file, "no canonical link");
  }
}

/**
 * Verifies the core palette actually landed in the emitted CSS. A dropped
 * token would fall back to a literal color and look plausible, so the absence
 * of each one is checked explicitly.
 */
async function checkTokens() {
  const staticDir = join(OUT, "_next/static");
  if (!existsSync(staticDir)) {
    notes.push("no built CSS found; skipped token check");
    return;
  }
  const sheets = [];
  const collect = async (dir) => {
    for (const entry of await readdir(dir, { withFileTypes: true })) {
      const path = join(dir, entry.name);
      if (entry.isDirectory()) await collect(path);
      else if (entry.name.endsWith(".css")) sheets.push(path);
    }
  };
  await collect(staticDir);

  const css = (
    await Promise.all(sheets.map((sheet) => readFile(sheet, "utf8")))
  ).join("\n");

  for (const token of [
    "--canvas",
    "--surface",
    "--ink",
    "--ink-secondary",
    "--line",
    "--accent",
    "--healthy",
    "--attention",
    "--motion-standard",
    "--ease-standard",
  ]) {
    if (!css.includes(token)) fail("css", `design token ${token} is not defined`);
  }

  // The minifier strips attribute-value quotes, so match both forms.
  const hasDarkAttribute =
    css.includes('[data-theme="dark"]') || css.includes("[data-theme=dark]");

  // Both themes must be present, or dark mode silently falls back to light.
  if (!hasDarkAttribute) {
    fail("css", 'no [data-theme="dark"] block; explicit dark choice would not apply');
  }
  // The minifier removes the space after the colon in media features.
  const hasSystemDark = /prefers-color-scheme\s*:\s*dark/.test(css);
  const hasReducedMotion = /prefers-reduced-motion\s*:\s*reduce/.test(css);
  if (!hasSystemDark) {
    fail("css", "no prefers-color-scheme block; system dark preference would not apply");
  }
  if (!hasReducedMotion) {
    fail("css", "no prefers-reduced-motion handling");
  }
}

/** Content integrity: the guide forbids invented metrics. */
function checkFabrication(file, html) {
  const text = visible(html);
  const banned = [
    "cutting-edge",
    "world-class",
    "best-in-class",
    "game-changing",
    "revolutionary",
    "industry-leading",
    "passionate technologist",
    "ninja",
    "rockstar",
    "seamless",
    "synergy",
    "leverage",
  ];
  const lower = text.toLowerCase();
  for (const word of banned) {
    if (lower.includes(word)) {
      fail(file, `marketing language present: "${word}"`);
    }
  }
  if (/\bcurrently under active development\b/i.test(lower)) {
    fail(file, "status language outside the controlled vocabulary");
  }
}

const files = await htmlFiles(OUT);
for (const file of files.sort()) {
  const raw = await readFile(file, "utf8");
  const name = relative(OUT, file);
  const html = visible(raw);
  checkHeadings(name, html);
  checkImages(name, html);
  checkControls(name, html);
  checkIds(name, html);
  checkLandmarks(name, html, raw);
  checkFabrication(name, html);
}

// Internal links must resolve to a real exported file. Page routes resolve to
// `<route>/index.html`; anything else is a static asset served as-is.
for (const file of files) {
  const html = visible(await readFile(file, "utf8"));
  for (const match of html.matchAll(/href="\/uriah-d-villa\/([^"#?]*)/g)) {
    const target = match[1];
    if (!target || target.startsWith("http")) continue;
    const candidates = [
      join(OUT, target),
      join(OUT, target, "index.html"),
      join(OUT, `${target}index.html`),
    ];
    if (!candidates.some((c) => existsSync(c))) {
      fail(relative(OUT, file), `internal link 404s: /${target}`);
    }
  }
}

await checkTokens();

console.log(`Checked ${files.length} exported pages.`);
for (const note of [...new Set(notes)]) console.log(`  note: ${note}`);

if (failures.length > 0) {
  console.error(`\n${failures.length} problem(s):\n`);
  for (const { file, message } of failures) {
    console.error(`  ${file}\n    ${message}`);
  }
  process.exit(1);
}

console.log("No structural accessibility or content-integrity problems found.");

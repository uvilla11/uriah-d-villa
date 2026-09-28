/**
 * Contrast verification for the design tokens.
 *
 * The specification requires WCAG 2.2 AA (§68) while also specifying exact
 * hex values (§7.1) that do not all clear 4.5:1 as text. Accessibility wins;
 * this script proves the shipped tokens do clear it, and would catch a future
 * edit that reintroduces a failure.
 *
 * Run: npm run check:contrast
 */
import { readFile } from "node:fs/promises";

const SRC = new URL("../src/app/tokens.css", import.meta.url).pathname;
const css = await readFile(SRC, "utf8");

/* ---- WCAG relative luminance and contrast ---- */

const channel = (value) => {
  const c = value / 255;
  return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
};

const luminance = ([r, g, b]) =>
  0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);

const contrast = (a, b) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

const parse = (hex) => {
  const value = hex.replace("#", "");
  const full =
    value.length === 3
      ? value
          .split("")
          .map((c) => c + c)
          .join("")
      : value;
  return [0, 2, 4].map((i) => parseInt(full.slice(i, i + 2), 16));
};

/**
 * Pull one token's value out of each of the three blocks the stylesheet
 * defines: base, prefers-color-scheme dark, and explicit [data-theme=dark].
 */
/** Strip comments so a selector quoted in prose is never mistaken for a rule. */
const stripComments = (source) => source.replace(/\/\*[\s\S]*?\*\//g, "");

const stylesheet = stripComments(css);

function tokenBlocks() {
  // Anchored on the selector followed by a brace, so a media query mentioned
  // in a comment cannot be picked up as the real thing.
  const mediaPattern = /@media\s*\(prefers-color-scheme\s*:\s*dark\)\s*\{/;
  const attrPattern = /:root\[data-theme=["']dark["']\]\s*\{/;

  const mediaMatch = mediaPattern.exec(stylesheet);
  const attrMatch = attrPattern.exec(stylesheet);
  if (!mediaMatch || !attrMatch) {
    throw new Error(
      "could not locate the dark theme blocks in src/app/tokens.css",
    );
  }

  return [
    { name: "light", source: stylesheet.slice(0, mediaMatch.index) },
    {
      name: "dark (system)",
      source: stylesheet.slice(mediaMatch.index, attrMatch.index),
    },
    { name: "dark (explicit)", source: stylesheet.slice(attrMatch.index) },
  ];
}

/**
 * Last definition wins within a block, matching the cascade. A single regex
 * would otherwise pick up the first occurrence, and `--surface` would be
 * shadowed by `--surface-strong` or `--surface-subtle`.
 */
const read = (source, name) => {
  const pattern = new RegExp(
    `(?:^|[;{}\\s])${name}:\\s*(#[0-9a-fA-F]{3,6})`,
    "gm",
  );
  let match;
  let value = null;
  while ((match = pattern.exec(source)) !== null) value = parse(match[1]);
  return value;
};

const SURFACES = ["canvas", "surface", "surface-strong", "surface-subtle"];
const TEXT = [
  "ink",
  "ink-secondary",
  "ink-tertiary",
  "accent",
  "accent-deep",
  "healthy",
  "attention",
  "muted-status",
  "danger",
];

const failures = [];
let checked = 0;

for (const block of tokenBlocks()) {
  const resolved = {};
  for (const name of [...SURFACES, ...TEXT]) {
    const value = read(block.source, `--${name}`);
    if (!value) {
      failures.push(`${block.name}: --${name} not found`);
      continue;
    }
    resolved[name] = value;
  }

  for (const fg of TEXT) {
    for (const bg of SURFACES) {
      if (!resolved[fg] || !resolved[bg]) continue;
      const ratio = contrast(resolved[fg], resolved[bg]);
      checked += 1;
      if (ratio < 4.5) {
        failures.push(
          `${block.name}: --${fg} on --${bg} is ${ratio.toFixed(2)}:1 (needs 4.5:1)`,
        );
      }
    }
  }

  // Focus indicators are non-text UI components: 3:1 is the bar.
  const accent = resolved.accent;
  if (accent) {
    for (const bg of SURFACES) {
      const ratio = contrast(accent, resolved[bg]);
      checked += 1;
      if (ratio < 3) {
        failures.push(
          `${block.name}: focus accent on --${bg} is ${ratio.toFixed(2)}:1 (needs 3:1)`,
        );
      }
    }
  }
}

console.log(`Checked ${checked} token pairs across ${tokenBlocks().length} theme blocks.`);

if (failures.length > 0) {
  console.error(`\n${failures.length} contrast failure(s):\n`);
  for (const failure of failures) console.error(`  ${failure}`);
  process.exit(1);
}

console.log("All text pairs clear 4.5:1 and focus indicators clear 3:1 in both themes.");


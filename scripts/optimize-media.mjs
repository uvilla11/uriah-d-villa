/**
 * Pre-generates responsive image variants for the static export.
 *
 * The site ships as a static tree, so Next's runtime image optimizer is off.
 * Instead this script produces AVIF and WebP at several widths up front; the
 * Media component then serves them through explicit <picture> srcset, which
 * keeps the original file as the fallback and adds no client JavaScript.
 *
 * Run: npm run media
 */
import { readdir, mkdir, stat } from "node:fs/promises";
import { join, parse } from "node:path";
import sharp from "sharp";

const MEDIA_DIR = new URL("../public/media/", import.meta.url).pathname;
const OUT_DIR = join(MEDIA_DIR, "generated");

/** Candidate widths. Any wider than the source is dropped. */
const WIDTHS = [480, 768, 1200, 1600];
const FORMATS = [
  { ext: "avif", options: { quality: 55, effort: 6 } },
  { ext: "webp", options: { quality: 72 } },
];

/** Only raster images. PDFs are linked, never inlined. */
const EXTENSIONS = new Set([".png", ".jpg", ".jpeg"]);

const kb = (n) => `${Math.round(n / 1024)} KB`;

async function process(file) {
  const { name } = parse(file);
  const source = join(MEDIA_DIR, file);
  const meta = await sharp(source).metadata();
  const sourceWidth = meta.width ?? 0;

  const widths = [...new Set(WIDTHS)].filter((w) => w < sourceWidth);
  // Always keep the intrinsic width so the largest useful candidate exists.
  if (!widths.includes(sourceWidth)) widths.push(sourceWidth);
  widths.sort((a, b) => a - b);

  const before = (await stat(source)).size;
  let after = 0;
  const written = [];

  for (const width of widths) {
    for (const { ext, options } of FORMATS) {
      const target = join(OUT_DIR, `${name}-${width}.${ext}`);
      const info = await sharp(source)
        .resize({ width, withoutEnlargement: true })
        .toFormat(ext, options)
        .toFile(target);
      after += info.size;
      written.push(`${parse(target).base} (${kb(info.size)})`);
    }
  }

  const ratio = ((after / before) * 100).toFixed(0);
  console.log(
    `${file}  ${sourceWidth}px  source ${kb(before)}  →  ${written.length} variants ${kb(after)} total (${ratio}% of source across all widths)`,
  );
  return { name, widths };
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  const files = (await readdir(MEDIA_DIR)).filter((f) =>
    EXTENSIONS.has(parse(f).ext.toLowerCase()),
  );

  if (files.length === 0) {
    console.log("No source images found.");
    return;
  }

  const results = [];
  for (const file of files) results.push(await process(file));

  // A manifest keeps the Media component free of hard-coded width lists.
  // Written into src/ so it can be imported at build time.
  const manifest = Object.fromEntries(results.map((r) => [r.name, r.widths]));
  const { writeFile } = await import("node:fs/promises");
  const target = new URL("../src/data/media-manifest.json", import.meta.url);
  await writeFile(target, `${JSON.stringify(manifest, null, 2)}\n`);
  console.log(`\nWrote manifest for ${results.length} images.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

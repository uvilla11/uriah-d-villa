# Uriah Villa — Precision Signal

An engineering portfolio built to the **Precision Signal — Editorial Engineering
System** specification. Static site, pre-rendered, no client-side router.

Live: https://uvilla11.github.io/uriah-d-villa/

---

## What this site is

Two modes, one system:

1. **Editorial** (`/`, `/work`, `/work/[project]`) — high typography, generous
   whitespace, four flagship case studies documented end to end.
2. **Engineering workspace** (`/workspace`) — the same systems reorganised as an
   operational view: project state, silicon and bus matrix, validation results,
   bench equipment, and the dated build log.

The design goal is clarity under technical density. A visitor should first think
the site is exceptionally well designed, then that the work spans real hardware
and software, then that there is evidence behind the claims, then be able to
inspect how the engineering was actually done.

## Routes

| Route | Contents |
|---|---|
| `/` | 12-section homepage |
| `/work` | Flagship cards + searchable project directory |
| `/work/[slug]` | Full case study: 8 case studies, 4 with narrative |
| `/workspace` | Operational view: 7 panels |
| `/experience` | Roles, related work, education, credentials |
| `/about` | Background, method, principles, scope |
| `/notes` | Decision records + build log |
| `/contact` | Email and form |
| `/resume` | Credentials, coverage, project index, documents |

## Content integrity

This is the constraint that shaped the whole content layer. The specification
forbids inventing credentials, metrics, dates, technologies, or outcomes
(§78, §92), so:

- **All content lives in `src/data/*.ts`**, typed against `src/lib/types.ts`.
  Nothing is hardcoded in a component.
- **Empty means empty.** A project with no published `problem` renders a
  "supporting work" template rather than filler prose. Fields that have no
  confirmed value are `[]`, never plausible text.
- **`nextSteps` is derived from `limitations`** — it restates the documented
  open question, it does not assert new work.
- **Credentials list badge names only.** Issuing body, issue date, and
  credential IDs are omitted because they are not on record.
- **Code excerpts are slots, not content.** `codeSlots` renders as a labelled
  empty state ("Awaiting source"). Real excerpts get dropped in when you supply
  them; nothing plausible-looking is invented in the meantime.
- **Status uses the controlled vocabulary** (§20). `status` is the verb, `stage`
  is the domain qualifier — `PROTOTYPE · BUILDING`.
- `npm run check:a11y` fails the build on marketing language and on
  non-vocabulary status strings.

## Deviation from the specification, and why

The spec gives exact hex values in §7.1 and requires WCAG 2.2 AA in §68. Several
of those hex values do not clear 4.5:1 as text — `--ink-tertiary` is 2.8:1 on
`--surface`, `--accent` is 4.2:1 on `--surface-strong`. Both cannot hold.

Accessibility wins. The affected tokens were moved the minimum distance needed
to pass, preserving hue and warmth:

| Token | Spec | Shipped | Worst-case ratio |
|---|---|---|---|
| `--ink-tertiary` light | `#99958E` | `#6B6863` | 4.56:1 |
| `--ink-tertiary` dark | `#7E7A73` | `#88847C` | 4.58:1 |
| `--accent` light | `#D54435` | `#BB3C2F` | 4.55:1 |
| `--healthy` light | `#567B5C` | `#4F7155` | 4.52:1 |
| `--attention` light | `#9A7131` | `#86622B` | 4.55:1 |
| `--muted-status` light | `#73777A` | `#666A6D` | 4.51:1 |
| `--accent-deep` dark | `#C74839` | `#E35241` | 4.51:1 |

`--line` and `--line-strong` were left as specified. They are borders, not text,
and the 1px rule system is part of the visual identity. `--accent` still clears
3:1 for focus rings and non-text UI in both themes.

`npm run check:contrast` proves all 120 token pairs, and would fail on a
regression.

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · CSS Modules. Static export to
GitHub Pages via `basePath: "/uriah-d-villa"`.

Deliberate choices:

- **Server Components by default.** Client components are only the theme store,
  mobile nav, command palette, scroll progress, reveal observer, directory
  search, and the workspace scroll-spy. Everything else renders to static HTML.
- **No image optimizer.** It does not run on a static host, so
  `scripts/optimize-media.mjs` pre-generates AVIF and WebP at 4–5 widths and
  writes a manifest. `<picture>` serves them; the original is the fallback.
  A 1200px AVIF of the capstone poster is 55 KB against a 1.1 MB PNG.
- **No `next/font` network dependency at runtime.** Geist and Geist Mono are
  self-hosted at build time with `display: swap`.
- **No analytics, no cookies, no third-party scripts** (§89).

## Commands

```sh
npm run dev             # local dev server
npm run build           # static export to out/
npm run media           # regenerate responsive image variants
npm run check:a11y      # structural a11y + content integrity (needs a build)
npm run check:contrast  # token contrast ratios
npm run verify          # build + both checks
```

### Local preview

`out/` uses a `basePath`, so serve it from a parent directory:

```sh
npm run build
mkdir -p /tmp/preview/uriah-d-villa && cp -R out/* /tmp/preview/uriah-d-villa/
python3 -m http.server 4321 -d /tmp/preview
# http://localhost:4321/uriah-d-villa/
```

## Deployment

GitHub Pages via Actions (`.github/workflows/deploy.yml`):

- Pushes to `main` build, gate (`lint` + `verify`), and publish `out/`.
  Work on `build/**` branches is verified but never published.
- `verify.yml` runs the same gates on every push and pull request.
- One-time setup in repo Settings → Pages: **Source → GitHub Actions**.
- `public/.nojekyll` ships as `out/.nojekyll` so Pages serves `_next/`
  assets instead of letting Jekyll swallow them.
- `sitemap.xml` and `robots.txt` are generated at build time from
  `src/app/sitemap.ts` and `src/app/robots.ts`; new case studies appear
  automatically because both enumerate the project registry.
- `public/media/generated/` (responsive AVIF/WebP) is gitignored and
  regenerated in CI via `npm run media` before every build.

## Architecture

```
src/
├── app/                 routes; tokens.css and base.css are global
├── components/
│   ├── case/            case study template + architecture figures
│   ├── home/            homepage sections
│   ├── page/            shared interior page styles
│   ├── shell/           header, mobile nav, palette, footer, theme
│   ├── ui/              buttons, status, media, tables, prose
│   ├── work/            project directory + flagship cards
│   └── workspace/       sidebar, panels, nav
├── data/                all content, typed
└── lib/                 types, status mapping, theme store, asset paths
```

`lib/status.ts` maps status to a tone. Accent red is deliberately absent from
that map — §7.2 reserves red for critical status and interface emphasis, so a
routine `ACTIVE` tag does not dilute it.

## Accessibility

- Semantic landmarks, one `h1` per page, no heading-level skips.
- Every control has an accessible name; icon-only buttons carry `aria-label`.
- Status is never color-only — the literal word is always rendered.
- Focus is `2px solid var(--accent)` at `3px` offset, never removed.
- Touch targets are ≥44×44 CSS px.
- Tables recompose into stacked rows on mobile with visible column labels
  rather than scrolling sideways.
- Reduced Motion is a designed state: reveals drop their transform and keep a
  short opacity fade, the hero trace stops sweeping, the scroll bar hides.
  Content is never removed.
- Content is visible with JavaScript disabled. Reveals only hide once the `js`
  class proves an observer is running.

## Performance

- Every route is pre-rendered static HTML.
- Images: AVIF/WebP with `srcset` and intrinsic dimensions reserved, so CLS
  stays at 0. Below-fold images are lazy; the hero image is `fetchpriority=high`.
- One shared `IntersectionObserver` for all reveals, unobserved after firing.
- Scroll progress is rAF-throttled and passive.
- The 30 MB evidence appendix is a labelled download link, never inlined.

## Adding a project

Append to `src/data/projects.ts`. Fill only what you know:

```ts
{
  slug: "my-project",
  index: "09",
  title: "My Project",
  result: "One sentence with the outcome.",
  status: "BUILDING",          // controlled vocabulary only
  stage: "PROTOTYPE",
  year: "2026",
  featured: false,             // true gets a full case study page
  disciplines: ["embedded"],
  // ... leave the rest empty if unconfirmed
}
```

`featured: true` gets a route automatically via `generateStaticParams`. The
directory, the workspace table, the résumé index, and the status counts all
derive from this one array.

## Before deploying

- [ ] `npm run verify` passes
- [ ] Test with JavaScript disabled — every page still readable
- [ ] Keyboard-only pass: skip link, header, palette, directory filters, mobile nav
- [ ] 200% zoom on `/workspace` (densest page)
- [ ] Light and dark in every theme, plus forced-colors mode
- [ ] Replace the `codeSlots` empty states with real excerpts when available

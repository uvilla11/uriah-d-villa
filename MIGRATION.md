# Portfolio Migration Inventory

Updated October 12, 2026. This is the local review handoff, not publication or deployment approval. Claim sources and unresolved facts are in `CLAIMS.md`.

## Candidate and References

The user selected `FINAL` instead of rebuilding the older shell. `git fetch origin` confirmed the remote at `bcad74b076864141e22a5b5ad6c3dd04ea78c0e8`. That commit was already public before this pass. The qualified candidate is committed locally as `448e9a0`; the transfer changes remain local. No new changes have been pushed.

The eventual destination remains `https://uvilla11.github.io/uriah-d-villa/`. Both `main` and `origin/main` remain at `a6079577448cd60e0084baa81ab4918e8774f2fc`. No Pages settings or deployment workflow changed.

| Reference | Branch or snapshot | Starting tip | Status before the candidate review | Use |
| --- | --- | --- | --- | --- |
| Candidate | `FINAL` | `bcad74b` | Clean; matched freshly fetched `origin/FINAL` | Candidate being reviewed. |
| Split-assets reference | `archive/refactor-split-assets` | `2b0a20b` | Modified homepage/CSS/JS and user-owned untracked files | Preserved in local archive commit `56faa28` and a temporary backup; never push this archive. |
| Legacy shell | `feature/copper-shell-review` | `0222a3c` | Clean | Legacy named routes and renamed asset paths. |
| Evidence draft | `feature/copper-evidence-site` | `a607957` | Staged draft, not committed | Protected source reference; untouched. |
| Published baseline | Detached `main` snapshot | `a607957` | Clean | Published-path and original-byte baseline. |
| Precision-signal reference | Detached precision-signal snapshot | `8a903cb` | Clean | Claim-conflict reference only; no application or workflow imported. |

## Route Matrix

Every path below is relative to `/uriah-d-villa/`. The same relative links work at a local server root. Forwarding replaces the legacy history entry rather than adding a redirect loop.

| Old entry | Intended destination | JavaScript behavior | Script-free behavior |
| --- | --- | --- | --- |
| `/` or `index.html` | `index.html` | Homepage and interactive simulated scope. | All text, project links, menu, source links, and email remain readable. Scope controls and composed form stay hidden. |
| `index.html#case/psyche` | `psyche.html` | Forward on direct entry, hash change, and restored page. | Native anchor reaches Hephaestus summary with a case link. |
| `index.html#case/solarsense` | `solarsense.html` | Same forwarding. | Native anchor reaches SolarSENSE summary with a case link. |
| `index.html#case/shadeshift` | `shadeshift.html` | Same forwarding. | Native anchor reaches ShadeShift summary with a case link. |
| `index.html#case/microgrid` | `index.html#microgrid` | Normalize hash and scroll to Other systems. | Original anchor remains at the modeled-study entry. |
| `index.html#archive` | Same | Neutral review notice, not a document browser. | Same notice and Work link. |
| `index.html#education` | Same | Education is inside the grouped Experience composition. | Both education cards remain readable. |
| `psyche.html`, `solarsense.html`, `shadeshift.html` | Same names | Real static cases, replacing old shell shims. | Full text and back link to Work. |
| `pic32cm.html` | Same | Real static firmware case. | Full text and back link to Work. |
| Unknown `#case/*` | `index.html#work` | Replace with Work instead of a dead route. | Homepage navigation remains available. |

## File-by-file Inventory

"Old URL" is a published `main` path unless marked as a shell path. New display copies do not replace retained originals. "Advertised" includes displayed images, source links, favicon, and social metadata, not merely being present in Git. Documentation and unlinked PDFs are still public bytes if this branch is pushed.

| Old URL | Target URL | Destination filename | Advertised on a page | Byte-content change |
| --- | --- | --- | --- | --- |
| `.nojekyll` | Same | `.nojekyll` | No; Pages marker | No; same empty blob as `main`. |
| `index.html` and `/` | Same | `index.html` | Yes; homepage | Yes; consolidated markup and content. |
| `psyche.html` (shell shim) | Same | `psyche.html` | Yes; flagship case | Yes; replaces shim with static case. |
| `solarsense.html` (shell shim) | Same | `solarsense.html` | Yes; flagship case | Yes; replaces shim with static case. |
| `shadeshift.html` (shell shim) | Same | `shadeshift.html` | Yes; flagship case | Yes; replaces shim with static case. |
| None on `main` | `pic32cm.html` | `pic32cm.html` | Yes; first flagship | New static case, revised from `FINAL`. |
| `styles.css` (shell) | Same | `styles.css` | Loaded by homepage | Yes; one copper stylesheet. |
| `main.js` (shell) | Same | `main.js` | Loaded by homepage | Yes; scope, route, menu, and composer behavior. |
| None on `main` | `case.css` | `case.css` | Loaded by cases | New on `FINAL`; formatted and corrected in this pass. |
| `favicon.svg` (shell) | Same | `favicon.svg` | Yes; favicon | No; same existing copper favicon. |
| None on `main` | `og-image.png` | `og-image.png` | Yes; social metadata | Revised from `FINAL`; 1200 x 630 homepage-derived image without the stale GPA hero. |
| None on `main` | `archivo-sub.woff2` | `archivo-sub.woff2` | Loaded font | No change from `FINAL`; 54,268 bytes. |
| None on `main` | `plexmono-sub.woff2` | `plexmono-sub.woff2` | Loaded font | No change from `FINAL`; 9,084 bytes. |
| `Capstone_ASU-A_01_Hephaestus_Lander.png` | Same | `Capstone_ASU-A_01_Hephaestus_Lander.png` | Original retained; display copy used on case | No; same blob as `main` and shell. |
| `psyche-poster.png` | Same | `psyche-poster.png` | Yes; full-resolution source link | No; same blob as `main` and shell. |
| `EGR%20598%20SolarSPELL.jpeg` | Same | `EGR 598 SolarSPELL.jpeg` | Yes; original showcase source link | No; same blob as `main`. |
| `ShadeShift-prototype.jpg` | Same | `ShadeShift-prototype.jpg` | Yes; original prototype source link | No; same blob as `main` and shell. |
| `Uriah%20Villa%20Portfolio%20MS%20in%20Engineering.pdf` | Same | `Uriah Villa Portfolio MS in Engineering.pdf` | No; unreviewed | No; same blob as `main`. |
| `Appendix%20for%20Portfolio_%20MS%20in%20Engineering.pdf` | Same | `Appendix for Portfolio_ MS in Engineering.pdf` | No; unreviewed | No; same blob as `main`. |
| `ShadeShift_%20Smart%20Modular%20Eyewear%20for%20Neurological%20Recovery%20and%20Visual%20Stress%20Alleviation.pdf` | Same | `ShadeShift_ Smart Modular Eyewear for Neurological Recovery and Visual Stress Alleviation.pdf` | No; unreviewed | No; same blob as `main`. |
| None | `media/hephaestus-cad-640.webp` | `media/hephaestus-cad-640.webp` | Yes; case image | New lossless display copy, 640 x 690, 67,132 bytes. |
| None | `media/psyche-poster-700.webp` | `media/psyche-poster-700.webp` | Responsive case source | New lossless display copy, 700 x 460, 262,528 bytes. |
| None | `media/psyche-poster-1400.webp` | `media/psyche-poster-1400.webp` | Responsive case source | New lossless display copy, 1400 x 919, 762,774 bytes. |
| None | `media/solarsense-480.webp` | `media/solarsense-480.webp` | Responsive homepage/case source | New display copy, 480 x 360, 30,384 bytes. |
| None | `media/solarsense-960.webp` | `media/solarsense-960.webp` | Responsive homepage/case source | New display copy, 960 x 720, 71,792 bytes. |
| None | `media/solarsense-1440.webp` | `media/solarsense-1440.webp` | Responsive homepage/case source | New display copy, 1440 x 1080, 115,308 bytes. |
| None | `media/shadeshift-480.webp` | `media/shadeshift-480.webp` | Responsive homepage/case source | New display copy, 480 x 360, 21,818 bytes. |
| None | `media/shadeshift-960.webp` | `media/shadeshift-960.webp` | Responsive homepage/case source | New display copy, 960 x 720, 60,350 bytes. |
| None | `media/shadeshift-1600.webp` | `media/shadeshift-1600.webp` | Responsive homepage/case source | New display copy, 1600 x 1200, 130,212 bytes. |
| None on `main` | `MIGRATION.md` | `MIGRATION.md` | No navigation link; review record | Revised from `FINAL`; this inventory. |
| None | `CLAIMS.md` | `CLAIMS.md` | No navigation link; review record | New; source/ownership/qualification ledger. |
| `README.md` (split-assets branch) | Same | `README.md` | Repository introduction; not site navigation | Rewritten for the four static cases, current contact, and PDF review boundary. |

Responsive images derive only from existing academic artifacts. Photo derivatives use WebP quality 84. The CAD and poster use lossless encoding to preserve geometry and text. Originals remain unchanged. Images have intrinsic dimensions, lazy loading, async decoding, and viewport-aware `srcset`/`sizes` where needed.

Neither private resume PDF was accessed or copied in this pass. No employer-owned source code, captures, unpublished bench data, or customer records were imported. No Next.js application, package/build requirement, command palette, or deployment workflow was added.

## Verification Handoff

The local preview is `http://127.0.0.1:8110/`, served directly from this worktree with `python -m http.server`. The separate temporary QA server also mounts this candidate under `/uriah-d-villa/`; its ephemeral URL is not a deployment.

The QA tooling, raw reports, and screenshots remain outside the repository in the local temporary QA harness and its `final-review/` output directory. `final-audit.cjs`, `motion-check.cjs`, `failure-check.cjs`, `review-regression.cjs`, and `active-controls-check.cjs` are temporary developer tools, not site dependencies.

The browser matrix covers all five pages at desktop 1440 x 900 and mobile 390 x 844, both at root and at the Pages prefix. It also checks 320 px and 768 px layouts, script-free pages, canvas failure, keyboard controls, legacy direct/hash-change/reload/Back behavior, visible form errors, mailto encoding, local links, and unchanged original bytes.

The October 12 Phase 2 matrix passed 153 assertions with no console exceptions, broken local URLs, or automated WCAG violations. It audited 280 local link/asset references across both bases. Earlier manual scope-overlay color checks passed AA, with the smallest measured text ratio 4.9:1 against the lightest dark-surface glow. Live pause and the three bounded project illustrations passed separate motion checks in the Phase 2 rerun.

Separate failed-script tests pass with both ordinary and reduced-motion preferences. The four-second boot failsafe reveals the headline if script loading fails. Blocked fonts still render the copy and form with fallback fonts. These deliberate failed-request tests are separate from the clean-network console/asset pass.

The raw browser report records SHA-256 hashes for every rendered HTML/CSS/JS/font/image input. Phase 2 screenshots match the files committed as `448e9a0`. Earlier candidate implementation and spec reviews are recorded as complete; the transfer-plan review remains a later gate. An initial Room Weather Control ledger mismatch was corrected against the public team's PIC18F27J53 component-selection source.

The independent implementation review found text-scaling reflow, wrapped case-navigation clearance, cancelled Hall-index feedback, and live reduced-motion issues. Corrected behavior passes targeted 200% text, anchor, animation-cancellation, and preference-change probes. On small screens the case header stays in normal document flow so wrapped navigation cannot obscure section headings.

Browser coverage is Chromium only. Firefox and WebKit runtimes are not installed, and no real screen-reader or physical-phone pass was run. Automated checks are not a WCAG certification. These are review limitations, not claims that every assistive/browser environment was verified.

Screenshot review uses the single supported copper palette. There is no partial dark-mode toggle. Both subset fonts load, and their glyph maps cover all shipped HTML text. The scope uses simulated signals, not hardware captures; case pages have no scripted motion. Below-the-fold illustrations stop within five seconds instead of looping indefinitely.

These browser resource totals include loading every lazy image, use an empty browser cache, and exclude the main HTML document and response headers. The baseline is committed `FINAL`; measurements are not a public network benchmark.

| Mobile page, 2x pixel density | Baseline resources | Candidate resources | Candidate image bytes |
| --- | ---: | ---: | ---: |
| Homepage | 902,660 B | About 270 KB | 132,142 B |
| PIC32CM | 67,399 B | About 69 KB | 0 B |
| Hephaestus | 1,369,419 B | About 398 KB | 329,660 B |
| SolarSENSE | 360,191 B | About 140 KB | 71,792 B |
| ShadeShift | 541,671 B | About 129 KB | 60,350 B |

Local source links and media return HTTP 200. Public source destinations were reachable, including redirects for Psyche and YouTube. LinkedIn rejects automated HEAD/GET requests with 405/999; its profile destination is retained but its current profile content cannot be independently confirmed by this audit.

## Remaining Gates

- Phase 2 cleanup and all five required harnesses passed on October 12. The qualified candidate is committed locally as `448e9a0`.
- Phase 3 behavior ports and the README rewrite are in progress. Phase 4 verification and the transfer review remain pending.
- Content approval is pending. Review the four case drafts and `CLAIMS.md`, including project-reported figures and artifact reuse. Corrective edits do not substitute for owner approval.
- Visual approval is pending. Automated checks and local screenshot inspection do not record the user's acceptance of desktop/mobile output.
- Public push clearance is pending for these changes. The existing public `FINAL` commit does not authorize publishing its new local diff.
- Merge/deploy approval is separate and pending. `main`, its publication path, and Pages settings remain unchanged.

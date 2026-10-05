# Portfolio migration inventory and claim review

This branch is a static site candidate for the existing GitHub Pages project URL. A push to `FINAL` does not update the live `main` branch or deploy the candidate.

## Pages and old entry points

| Previous entry | Candidate destination | Handling |
| --- | --- | --- |
| `/uriah-d-villa/` | `index.html` | Four flagships, supporting work, Experience, About, and contact. |
| `#case/psyche` | `psyche.html` | JavaScript forwards to the standalone case. Without JavaScript, the native anchor lands at the Hephaestus summary and its case link. |
| `#case/solarsense` | `solarsense.html` | Same forwarding and fallback pattern. |
| `#case/shadeshift` | `shadeshift.html` | Same forwarding and fallback pattern. |
| `#case/microgrid` | `#microgrid` | JavaScript normalizes the hash; a native anchor remains at the Other systems entry. This is a modeled study, not an installed system. |
| `#archive` | `#archive` | Explains that full documents are under review and links back to Work. |
| `pic32cm.html` | `pic32cm.html` | New public-source-based firmware case study. |

## Preserved files

These filenames are unchanged from `main`. Direct old links continue to address the same assets when the candidate eventually replaces `main`.

| Filename | Candidate use |
| --- | --- |
| `Capstone_ASU-A_01_Hephaestus_Lander.png` | Hephaestus case evidence. |
| `psyche-poster.png` | Team poster on the Hephaestus case page. |
| `EGR 598 SolarSPELL.jpeg` | SolarSENSE showcase on the home and case pages. HTML links URL-encode spaces as `%20`. |
| `ShadeShift-prototype.jpg` | ShadeShift prototype on the home and case pages. |
| `Uriah Villa Portfolio MS in Engineering.pdf` | Retained at its old URL; not linked from the candidate. |
| `Appendix for Portfolio_ MS in Engineering.pdf` | Retained at its old URL; not linked from the candidate. |
| `ShadeShift_ Smart Modular Eyewear for Neurological Recovery and Visual Stress Alleviation.pdf` | Retained at its old URL; not linked from the candidate. |

The resume PDFs in Downloads are not included. New shared assets are `archivo-sub.woff2`, `plexmono-sub.woff2`, `og-image.png`, `favicon.svg`, and `case.css`. The home page uses separate `styles.css` and `main.js`; each page can be served directly as static files.

## Publication claims to review

| Claim | Basis and boundary |
| --- | --- |
| 82% lower Ch4 average current in the PIC32CM hero | Public [Microchip four-lab repository](https://github.com/microchip-pic-avr-examples/pic32cm6408pl10048-low-power-design-vscode), Lab 2 active vs. Lab 4 SleepWalking. Its rounded readings are approximately 3.02 mA and 559 µA using the Curiosity Nano Explorer monitor. This is the repository's reported comparison, not the technical brief's result. |
| Approximately 9.91 µA below-threshold average and 2.39 µA between wake-ups | Public [Microchip TB3388](https://ww1.microchip.com/downloads/aemDocuments/documents/MCU32/ProductDocuments/SupportingCollateral/SleepWalking-Reducing-Power-Consumption-in-Arm-Cortex-M-based-MCUs-DS90003388.pdf), Table 3-1. The latter is an isolated 78.7 ms window. The brief uses an Atmel Power Debugger and different conditions; the two documents do not establish that an instrument change caused the reduction. |
| Hephaestus ±2 degrees and 500+ cycles | Project-reported results from supplied academic material. The [official Psyche listing](https://psyche.ssl.berkeley.edu/landing-system-for-hypothesized-surfaces-asu-a/) supports project affiliation, not independent certification of these figures. Uriah's electronics role is separate from the team's lander build. |
| SolarSENSE sensing and model | [Team repository](https://github.com/JPisors/SolarSENSE) and supplied material. Uriah integrated teammate-trained inference into ESP32 firmware and its offline dashboard; the board does not directly measure NPK. No combined model-accuracy claim is made. |
| ShadeShift PNLC prototype | Supplied research paper, photo, and [demonstration video](https://youtu.be/Cl6hf7lQr3M). Switching response remained a constraint. No completed PDLC validation or clinical efficacy is claimed. The research paper itself is not linked. |
| More than 10 hours of weekly reporting time saved and 100+ cases | Personal contribution estimates, labeled as estimates in Experience. No internal tools, source code, customer information, or employer-owned test data are posted. |
| Education and employment chronology | Current resume PDFs were used for factual reference only. The PDFs are not part of the site. |

## Review and release boundary

The user requested a `FINAL` preview branch. Inspect the case-study claims, individual/team attribution, measurements, and this inventory before merging. Verify desktop/mobile display, legacy hashes, no-JavaScript fallbacks, and direct file URLs. Merging to `main` or changing Pages remains a separate decision.

# Uriah D. Villa

PIC32CM PL10 low-power firmware leads this portfolio of my work at Microchip Technology and Arizona State University. I connect MCU firmware with sensors, electronics, and physical systems. The site separates my contributions from team outcomes and states the limits of each reported result.

## Case Studies

- [PIC32CM low-power labs](pic32cm.html): I developed four firmware labs, their documentation, and a Lab 4 power revision, then authored TB3388. Microchip published the work, and a colleague supplied the initial repository and CI scaffold. The repository reports 82% lower Ch4 average current for Lab 4 versus the 8 MHz Lab 2 active reference. TB3388 uses different instruments, clocks, and capture windows, so its readings are not interchangeable with the repository results.
- [Hephaestus landing system](psyche.html): I led electronics and firmware integration for an ASU capstone through Psyche Student Collaborations. The team built the broader lander prototype. My subsystem used a custom PIC18/PSoC PCB and Hall-effect feedback for six exit positions. Project reports cite rotation accuracy of +/-2 degrees and 500+ automated cycles. No supplied logs establish that accuracy for every cycle, and the official listing certifies neither figure. This was academic work, not flight-qualified hardware.
- [SolarSENSE](solarsense.html): I integrated a teammate-trained Edge Impulse model with LILYGO T-Higrow ESP32 firmware and ESP DASH. The team showed a potted-soil proof of concept with a dashboard over local Wi-Fi, without internet access. The board senses moisture and salinity-related inputs, not direct NPK measurements. The reports do not establish field accuracy or calibrated nutrient concentrations.
- [ShadeShift](shadeshift.html): I led the five-author team and contributed to electronics integration, enclosure design, and modular prototypes. The team explored tint, hue, strobe, and binasal occlusion. The case covers the PNLC phase, an external-electronics design, and unresolved switching latency. The paper mixes PNLC and PDLC terminology. The sources establish neither a validated later material change nor clinical efficacy or electrical safety.

Supporting work includes dsPIC33 BLDC control, the PIC18/ESP32 Room Weather Control team project, and internal Python support automation. Other academic work includes a SCARA drawing arm and a modeled critical-facility microgrid.

## Site Layout

The site uses static HTML, CSS, and JavaScript without a build step. Case studies have separate pages rather than a JavaScript case router.

| Path | Purpose |
| --- | --- |
| `index.html` | Homepage, selected work, experience, and contact |
| `styles.css` | Homepage layout and visual styles |
| `main.js` | Homepage navigation, simulated scope, project illustrations, and email composer |
| `case.css` | Shared case-study layout and styles |
| `pic32cm.html`, `psyche.html`, `solarsense.html`, `shadeshift.html` | Four static case studies |
| `media/` | Display images derived from retained project assets |
| `archivo-sub.woff2` | Local Archivo font |
| `plexmono-sub.woff2` | Local Plex Mono font |
| `CLAIMS.md` | Sources, attribution boundaries, and review gates |

The animated scope and project diagrams illustrate concepts, not captured hardware measurements. The email composer opens the visitor's email app. The page does not send or store messages.

## Local Preview

From the repository root, run:

```sh
python -m http.server 8000
```

Open `http://localhost:8000/` in a browser.

## Document Review

The repository retains the full portfolio, appendix, and ShadeShift paper PDFs at their legacy URLs. Those documents remain under publication review and have no links in this README or the site UI. Retaining them preserves previous file addresses, not publication approval.

## Contact

- [uriah.villa2023@gmail.com](mailto:uriah.villa2023@gmail.com)
- [GitHub](https://github.com/uvilla11)
- [LinkedIn](https://www.linkedin.com/in/uriah-villa/)

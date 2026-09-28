# Uriah Villa — Precision Signal Engineering Portfolio

Live site: https://uvilla11.github.io/uriah-d-villa/

Uriah Villa is an MCU Applications Engineer II at Microchip Technology. He specializes in embedded systems, from silicon to motion: bare-metal firmware, custom PCB layout, robotics, closed-loop motor control, and edge AI.

## Architectural Concept: Precision Signal — Editorial Engineering System

This portfolio implements a dual-mode engineering presentation:
1. **Editorial Engineering Journal (Homepage):** High-typography, balanced whitespace, operational signals, verified flagship case studies, and career timelines.
2. **Engineering Workspace (`#workspace`):** A dense, application-style engineering directory featuring live search, discipline category filtering, silicon & protocol matrices, and full chronological build logs.

## Case Studies

- **ASU Capstone × NASA Psyche (Hephaestus Lander):** Student capstone with NASA Psyche as mission partner. Led custom KiCad PCB design, dual PIC18 and PSoC 4 firmware, and Hall-effect sensor indexing across 6 exits (±2° precision, 500+ test cycles, 36° slope test).
- **SolarSENSE (Edge AI Soil Inference):** EGR 598 SolarSPELL course prototype. Integrated quantized Edge Impulse classification with live moisture/EC sensor readings and an offline, on-device ESP-DASH interface hosted on a LILYGO T-Higrow ESP32 platform.
- **ShadeShift (Modular Therapeutic Eyewear):** Developed with Barrow Neurological Institute and Dignity Health for photophobia and visual rehabilitation after neurological injury. Features electrochromic tint, color filtration, PDLC stroboscopic training (1–15 Hz), and modular magnetic binasal occlusion.
- **Critical-Facility Microgrid Study:** Independent XENDEE techno-economic simulation for a Honolulu Level I trauma center. Interrogated and rejected an unconstrained mathematical optimum (4.98 MW PV / 12.3 MWh BESS) that violated physical hospital space limits, rebuilding a constructible hybrid PV + BESS + Diesel resilience design.

## Capabilities & Technical Coverage

- **Silicon & Firmware:** Embedded C/C++, PIC18, PIC32, dsPIC33, PSoC 4/6, ESP32, bare-metal bring-up, DMA, low-power optimization.
- **Hardware & EDA:** KiCad, Cadence Allegro, schematic capture, multi-layer PCB layout, gate drivers, sensor conditioning, hand soldering.
- **Lab & Instrumentation:** 4-channel oscilloscopes, logic analyzers, bench power supplies, function generators, automated validation test scripts.
- **Systems & Automation:** Motor control (BLDC/stepper), robotics kinematics, Edge Impulse TinyML, MQTT, Python automation, Simulink, XENDEE.

## Education & Distinctions

- **M.S. in Engineering**, Arizona State University (4.0 GPA, With Distinction, 2025). Accelerated 4+1 program in systems, mechatronics, and power.
- **B.S.E. in Robotics**, Arizona State University (Cum Laude, 2024).

## Contact

- Email: uvilla11@gmail.com
- LinkedIn: https://www.linkedin.com/in/uriah-villa/
- GitHub: https://github.com/uvilla11

## Architecture & Local Preview

Hand-built with vanilla semantic HTML5, modern CSS custom properties (light & dark mode tokens), and modular JavaScript. Zero external frameworks, zero build steps, sub-2.0s LCP, and WCAG 2.2 AA accessibility.

File layout:
- `index.html`: Semantic markup, 12 homepage progression sections, `#workspace` engineering view, and upgraded case studies
- `styles.css`: Precision Signal design tokens, typography scale, responsive grid, workspace panels, and reduced-motion rules
- `main.js`: Hash router, directory search/filter engine, theme persistence, and accessible drawer handling
- Project media and PDFs at repository root

To preview locally:
```sh
python -m http.server 8000
```
Then navigate to `http://localhost:8000/`.

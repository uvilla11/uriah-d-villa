# Uriah Villa: Portfolio

Live site: https://uvilla11.github.io/uriah-d-villa/

Uriah Villa is an MCU Applications Engineer II at Microchip Technology. He
works on embedded systems, from silicon to motion: firmware, electronics,
robotics, motor control, and edge AI.

## Case studies

- **ASU Capstone × NASA Psyche.** A student capstone with NASA Psyche as
  mission partner. A steel-and-aluminum prototype lander stabilizes on
  unknown terrain and deploys an internal rover through one of six doors.
- **SolarSENSE.** An EGR 598 SolarSPELL course project. It combines live soil
  sensing, Edge Impulse inference, and an offline ESP-DASH interface on a
  LILYGO T-Higrow ESP32 platform.
- **ShadeShift.** A smart-eyewear proof of concept, built with Barrow
  Neurological Institute and Dignity Health, for visual stress and
  rehabilitation after neurological injury. It supports four visual modes on
  one modular platform.
- **Critical-Facility Microgrid Study.** An independent XENDEE course study
  for a Level I trauma center in Honolulu. It compares a mathematically
  optimal result against a physically credible system.

The bench index lists five smaller builds, including room weather control
and a critical-facility microgrid model, as supporting work behind the four
main case studies.

## Education

- M.S. Engineering, Arizona State University. 4.0 GPA, with distinction,
  2025. Accelerated 4+1 program in systems, mechatronics, and power.
- B.S.E. Robotics, Arizona State University. Cum laude, 2024.

## Capabilities

- **Firmware and silicon.** Embedded C/C++, PIC18, PIC32, dsPIC, PSoC, ESP32,
  peripheral bring-up, low-power techniques.
- **Hardware.** KiCad, Cadence, PCB layout, motor drivers, analog and
  digital circuits, soldering, board bring-up.
- **Lab and validation.** Oscilloscopes, logic analyzers, power supplies,
  function generators, automated test, fault isolation.
- **Systems.** Motor control, robotics, TinyML and Edge Impulse, MQTT,
  Python automation, Simulink, XENDEE.

## Contact

- Email: uvilla11@gmail.com
- LinkedIn: https://www.linkedin.com/in/uriah-villa/

## About this site

The site is hand-built static HTML. It has no framework and no build step.

File layout:

- `index.html`: page markup and the four case-study articles
- `styles.css`: all styling
- `main.js`: theme toggle, hash router, scroll progress, and the contact form
- Images and PDFs at the repository root

To preview the site locally, serve the folder over HTTP so the router and
fetch calls work as they do in production. `file://` URLs will not work
correctly for the hash router.

```
npx serve .
```

or

```
python -m http.server 8000
```

Then open the printed local address in a browser.

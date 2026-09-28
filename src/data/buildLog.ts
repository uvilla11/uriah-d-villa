import type { BuildLogEntry, NoteEntry } from "@/lib/types";

/**
 * Build log (§32).
 *
 * Entries exist only for events with a confirmed date. Where a project
 * milestone and a personal milestone share a month they stay as separate
 * entries, because they are separate events.
 */
export const buildLog: BuildLogEntry[] = [
  {
    id: "log-2025-10-portfolio",
    date: "2025-10",
    project: "M.S. Engineering",
    category: "education",
    title: "M.S. Engineering conferred — 4.0 GPA, with distinction",
    summary:
      "Completed the accelerated 4+1 M.S. in Engineering across systems, mechatronics, and power, with the technical portfolio and its evidence appendix finalized.",
    changes: [
      "Compiled the comprehensive evidence appendix with KiCad layouts and SolidWorks FEA results",
      "Submitted and validated for degree distinction",
    ],
    status: "SHIPPED",
  },
  {
    id: "log-2025-04-showcase",
    date: "2025-04",
    project: "SolarSENSE",
    projectSlug: "solarsense",
    category: "ai",
    title: "SolarSENSE demonstrated at the ASU Innovation Showcase",
    summary:
      "Presented self-contained soil inferencing hardware with live sensor telemetry served from a local ESP32 web server.",
    changes: [
      "Ran inference entirely on-device against calibration samples",
      "Demonstrated the offline dashboard with no internet dependency",
    ],
    status: "VALIDATED",
  },
  {
    id: "log-2025-04-model",
    date: "2025-04",
    project: "SolarSENSE",
    projectSlug: "solarsense",
    category: "ai",
    title: "Edge Impulse model reconciled to measurable features",
    summary:
      "Retrained the soil-health classification network on electrical conductivity and moisture features, then deployed it to the LILYGO T-Higrow ESP32.",
    changes: [
      "Integrated local C++ model tensors into the ESP-DASH dashboard firmware",
      "Eliminated the external cloud dependency for remote agricultural sensing",
    ],
    status: "VALIDATED",
  },
  {
    id: "log-2025-02-microgrid",
    date: "2025-02",
    project: "Critical-Facility Microgrid",
    projectSlug: "critical-facility-microgrid",
    category: "power",
    title: "Constrained optimum reconstructed for the hospital campus",
    summary:
      "Applied real-world spatial constraints to the campus model in XENDEE, bringing diesel generation in to replace oversized battery capacity.",
    changes: [
      "Rejected the 4.98 MW PV / 12.3 MWh BESS unconstrained result against the roof audit",
      "Capped PV at 1.2 MW and resized storage for peak shaving and life-support transition loads",
    ],
    status: "VALIDATED",
  },
  {
    id: "log-2024-11-shadeshift",
    date: "2024-11",
    project: "ShadeShift",
    projectSlug: "shadeshift",
    category: "embedded",
    title: "Driver architecture shifted from PNLC to PDLC",
    summary:
      "Moved the stroboscopic switching layer from PNLC to PDLC film after bench tests showed inconsistent electro-optical transmittance response.",
    changes: [
      "Relocated controller and battery to an external tethered enclosure to minimize head mass",
      "Designed a magnetic clip mechanism for modular binasal occlusion plates",
    ],
    status: "BUILDING",
  },
  {
    id: "log-2024-05-pcb",
    date: "2024-05",
    project: "Hephaestus Lander",
    projectSlug: "hephaestus-lander",
    category: "embedded",
    title: "Lander PCB v1.1 revision and indexing validation",
    summary:
      "Re-spun the KiCad board to add active op-amp conditioning on the Hall sensors and replaced an under-rated motor driver with a higher peak-current package.",
    changes: [
      "Completed 500+ uninterrupted automated positioning cycles at ±2° precision",
      "Validated the physical lander chassis on a custom 36° tilted slope fixture",
    ],
    status: "VALIDATED",
  },
  {
    id: "log-2024-05-degree",
    date: "2024-05",
    project: "B.S.E. Robotics",
    category: "education",
    title: "B.S.E. in Robotics conferred cum laude",
    summary:
      "Conferred the B.S.E. in Robotics and exhibited the completed Team Hephaestus prototype lander to NASA mission partners and academic evaluators.",
    changes: [
      "Exhibited the prototype lander and custom PCB at the showcase",
    ],
    status: "SHIPPED",
  },
];

/**
 * Engineering notes (§75).
 *
 * These are decision records, not articles: each captures a change that is
 * documented in the project record, with the alternative that was rejected.
 * No note is written for work that has not happened.
 */
export const notes: NoteEntry[] = [
  {
    id: "note-pnlc-pdlc",
    date: "2024-11",
    title: "The wrong liquid crystal film is not a cheaper version of the right one",
    category: "Optoelectronics",
    summary:
      "PNLC film was replaced with PDLC because slow optical decay turned crisp stroboscopic pulses into blur.",
    context:
      "The stroboscopic training mode needs sharp transitions. PNLC film showed optical decay times too slow to hold a square wave, so each intended pulse arrived smeared.",
    alternatives:
      "Keep PNLC and accept softer transitions, or drive it harder. Neither recovers the missing decay time — the response is a property of the material, not the drive strength.",
    outcome:
      "PDLC driven with high-voltage AC square waves, verified at 10 Hz with a photodiode and oscilloscope, with crisp transitions across 1–15 Hz.",
    projectSlug: "shadeshift",
  },
  {
    id: "note-hardware-features",
    date: "2025-04",
    title: "A model must be honest about what the hardware can measure",
    category: "Edge AI",
    summary:
      "The soil classifier was retrained on measurable features rather than filled out with synthetic data for absent sensors.",
    context:
      "The research datasets assume NPK chemical sensors. The evaluation board physically does not carry them, so the published feature set could not be reproduced on the target hardware.",
    alternatives:
      "Populate the missing features with synthetic values to preserve the published feature set, or restrict the model to real measurements and accept a smaller feature set.",
    outcome:
      "The second option. Retrained on capacitive moisture, electrical conductivity, and temperature — roughly 42 ms per inference, fully on-device with zero network overhead.",
    projectSlug: "solarsense",
  },
  {
    id: "note-optimum-rejected",
    date: "2025-02",
    title: "Rejecting a mathematically optimal answer is a result, not a failure",
    category: "Power Systems",
    summary:
      "An unconstrained microgrid optimum was published alongside the reason it could not be built, rather than quietly discarded.",
    context:
      "Run without area constraints, the optimizer returned 4.98 MW PV and 12.3 MWh storage — the lowest Net Present Cost, and physically impossible for an urban medical campus.",
    alternatives:
      "Report the unconstrained result as the recommendation, which would have been wrong, or drop it silently and present only the constrained design, which would hide the most informative finding.",
    outcome:
      "Reported the optimum, the spatial audit that invalidated it, and the rebuild: PV capped at 1.2 MW with diesel generation carrying multi-day resilience.",
    projectSlug: "critical-facility-microgrid",
  },
  {
    id: "note-signal-conditioning",
    date: "2024-05",
    title: "Condition the noisy signal in hardware, debounce it in firmware second",
    category: "Embedded Firmware",
    summary:
      "False position interrupts were fixed ahead of the MCU inputs rather than in the interrupt handler.",
    context:
      "Motor startup produced inductive noise spikes that crossed the Hall sensor threshold and desynchronized the rotation index on the first board revision.",
    alternatives:
      "Debounce in the ISR, which hides the symptom while the analog signal stays out of spec, or condition the front end so the firmware receives a clean schmitt-triggered input.",
    outcome:
      "RC filtering plus op-amp hysteresis ahead of the MCU inputs, with the driver replaced by a higher peak-current package on PCB v1.1. 500+ uninterrupted cycles at ±2°.",
    projectSlug: "hephaestus-lander",
  },
  {
    id: "note-externalize-mass",
    date: "2024-11",
    title: "When a mass budget fails, change what is on the frame",
    category: "Mechanical Design",
    summary:
      "Head mass came down by moving electronics off the eyewear frame entirely, not by optimizing what stayed on it.",
    context:
      "Mounting the battery and boost circuitry to the frame created excessive facial pressure on wearers who already have limited tolerance for load.",
    alternatives:
      "Reduce the battery and boost circuitry mass while keeping them on the frame, or relocate the electronics to a tethered enclosure.",
    outcome:
      "Relocation, with head mass held under 45 g and the frame reduced to optics and structure.",
    projectSlug: "shadeshift",
  },
];

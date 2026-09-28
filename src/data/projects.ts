import type { Project } from "@/lib/types";

/**
 * Project registry.
 *
 * Rules applied throughout, per §78 / §92:
 *  - No employer, role, metric, date, tool, or outcome is invented. Every
 *    claim traces to verified source material.
 *  - Fields with no confirmed value are left as empty arrays, not filled with
 *    plausible-sounding content.
 *  - `nextSteps` is derived strictly from each project's documented
 *    `limitations` — it describes the open engineering gap, never a new claim.
 *  - `codeSlots` are placeholders for real source. They render as clearly
 *    labelled empty states until actual excerpts are supplied (§51, §84).
 */
export const projects: Project[] = [
  /* ======================================================================
     FLAGSHIP 01 — Hephaestus Asteroid Lander
     ====================================================================== */
  {
    slug: "hephaestus-lander",
    index: "01",
    title: "Hephaestus Asteroid Lander",
    result:
      "Rover deployment indexed to ±2° across 500+ automated cycles on a surface that has never been sampled.",
    summary:
      "A landing and indexing mechanism for hypothesized asteroid terrain, built as an ASU capstone with NASA Psyche as mission partner.",
    role: "Embedded Electronics Lead · Capstone Design Lead",
    context: "ACADEMIC",
    status: "VALIDATED",
    stage: "PROTOTYPE",
    year: "2024",
    confidential: false,
    featured: true,
    disciplines: ["embedded", "firmware", "robotics"],
    category: "Robotics / Electronics",
    platform: "PIC18 · PSoC 4 · KiCad PCB",
    technologies: [
      "Embedded C",
      "KiCad",
      "PIC18",
      "PSoC 4",
      "MPLAB X",
      "ModusToolbox",
      "SolidWorks FEA",
    ],
    hardware: [
      "PIC18F microcontroller",
      "PSoC 4 microcontroller",
      "2-layer KiCad PCB, revision 1.1",
      "Geared DC motor with H-bridge drive",
      "6× neodymium magnets at 60° increments",
      "Op-amp conditioned Hall effect sensors",
    ],
    protocols: ["SPI", "GPIO", "Hall-effect interrupts", "PWM", "UART logging"],
    platforms: ["PIC18F", "PSoC 4"],
    constraints: [
      "Surface granularity, friction, and slope are entirely uncharacterized.",
      "The platform must settle in any orientation and still identify a single valid departure vector.",
      "Six outward-opening panels must actuate independently once the chassis is locked.",
      "Motor startup transient coupling into the sensing path corrupted position reads on the first board revision.",
    ],
    problem: [
      "Asteroid 16 Psyche has never been visited by a lander, so surface properties — granularity, friction, and slope — remain uncharacterized. The mechanical architecture paired a self-righting rounded chassis with six outward-opening panels that stabilize the platform regardless of orientation.",
      "The embedded problem was to orient an internal micro-rover toward the single exit with the clearest departure trajectory, lock the indexed platform in place, and actuate the corresponding door with no ambiguity between the two decisions.",
    ],
    decisions: [
      {
        title: "Split the work across two controllers rather than one.",
        body: "The PIC18F owns the rotation state machine, closed-loop motor control, and the Hall interrupt service routine — a timing-critical role. The PSoC 4 independently manages the six panel servos, illumination, power rail monitoring, and fault telemetry. Neither controller can stall the other's critical path, and each carries its own peripheral set suited to the job.",
      },
      {
        title: "Index position with magnets instead of an encoder.",
        body: "Six neodymium magnets at 60° increments around the turntable give contactless, dust-resistant position markers. No optical path to foul, no mechanical wear over repeated cycles, and the reference is absolute rather than relative — the platform always knows which of the six bays it is facing.",
      },
      {
        title: "Condition the Hall inputs instead of debouncing in firmware.",
        body: "The first board read false interrupts during motor startup. RC filtering plus op-amp hysteresis was placed ahead of the MCU inputs, so the signal is already clean and schmitt-triggered before the firmware ever samples it. Firmware debouncing was left as a secondary layer, not the primary defence.",
      },
      {
        title: "Re-spin the board rather than work around the driver.",
        body: "The original motor driver package was under-rated for the peak current. Revision 1.1 moved to a higher peak-current package and added thermal copper pours, instead of limiting duty cycle in software to keep the part inside its envelope.",
      },
    ],
    implementation: [
      "Designed a unified 2-layer PCB in KiCad integrating the power supply, motor drivers, sensor signal conditioning, and both microcontrollers.",
      "Implemented the rotation state machine on the PIC18F with position tracked from Hall-edge interrupts, and a closed-loop correction step driving the PWM stage.",
      "Implemented independent panel actuation sequencing on the PSoC 4, with status indication and power rail monitoring handled in the same controller.",
      "Ran the chassis through fabrication and assembly, then brought the board up on the bench: first power, clock configuration, peripheral init, then functional testing.",
    ],
    debugging: [
      "Initial testing revealed inductive noise spikes during motor startup that triggered false Hall interrupts and desynchronized the index. Captured on a 4-channel scope with the motor current and Hall line viewed together.",
      "Added RC filtering and op-amp hysteresis ahead of the MCU inputs to clean the signal before it reached the firmware.",
      "Identified the motor driver as under-rated for peak startup current; replaced it with a higher peak-current package and added thermal copper pours on PCB v1.1.",
      "Result: 500+ uninterrupted automated rotation and lock cycles completed without an index fault.",
    ],
    validation: [
      {
        target: "Rover Positioning",
        criterion: "Accuracy within ±5° across all exits",
        tool: "Hall effect + optical reference",
        result: "±2° repeatable across 500+ runs",
        verdict: "PASS",
      },
      {
        target: "Chassis Tilt",
        criterion: "Mechanical stability beyond 20° slope",
        tool: "Adjustable tilt test fixture",
        result: "36° physical incline achieved",
        verdict: "PASS",
      },
    ],
    measurements: [
      {
        label: "Positioning Error",
        value: "±2.0",
        unit: "°",
        condition: "Measured across 6 exits over 500+ automated cycles",
        interpretation: "Within the ±5° project requirement.",
      },
      {
        label: "Reliability Cycles",
        value: "500+",
        condition: "Automated rotation and lock test, uninterrupted",
        interpretation: "No index fault across the full run.",
      },
      {
        label: "Slope Stability",
        value: "36",
        unit: "°",
        condition: "Adjustable incline test fixture, steel and aluminum chassis",
        interpretation: "Exceeded the 20° stability requirement.",
      },
    ],
    outcomes: [
      "±2° positioning error held repeatably over 500+ automated rotation and lock cycles.",
      "Chassis stability validated on a 36° incline, well beyond the 20° requirement.",
      "Delivered as an exhibited prototype to NASA mission partners and academic evaluators.",
    ],
    limitations: [
      "This is not flight hardware. It is a ground-demonstrated prototype validated on Earth.",
      "SolidWorks FEA impact simulations reported a 2.794 safety factor at 2 m/s under titanium-alloy assumptions, but the physical prototype was manufactured from steel and aluminum for cost efficiency — the simulation and the article tested do not share a material.",
      "Terrain properties of the target body remain uncharacterized, so the slope and friction assumptions behind the test fixture are Earth-derived.",
    ],
    nextSteps: [
      "Validate impact tolerance on a flight-representative material so the FEA assumption and the tested article match.",
      "Repeat the positioning run against simulated regolith friction and granular slope rather than a rigid tilt fixture.",
      "Add closed-loop current limiting in firmware to make the driver thermal margin observable instead of relying on a larger package.",
    ],
    media: [
      {
        src: "/media/hephaestus-lander.png",
        alt: "CAD rendering of the Team Hephaestus asteroid lander prototype: a rounded chassis with six outward-opening landing panels",
        caption: "Prototype lander, CAD render",
      },
      {
        src: "/media/hephaestus-poster.png",
        alt: "Team Hephaestus engineering showcase poster: lander fabrication, custom PCB, and slope testing",
        caption: "ASU innovation showcase poster",
      },
    ],
    artifacts: [
      {
        label: "Official capstone page",
        href: "https://psyche.ssl.berkeley.edu/get-involved/capstone-projects/capstone-projects-tungsten-class/landing-system-for-hypothesized-surfaces-asu-a/",
        external: true,
      },
      {
        label: "Showcase poster, high resolution",
        href: "/media/hephaestus-poster.png",
        external: false,
      },
      {
        label: "M.S. evidence appendix",
        href: "/media/uriah-villa-ms-portfolio-appendix.pdf",
        external: false,
      },
    ],
    diagram: "hephaestus-architecture",
    codeSlots: [
      {
        id: "hephaestus-index-isr",
        label: "Hall-edge index ISR",
        note: "Interrupt service routine that advances the rotation index from the six magnet positions.",
      },
      {
        id: "hephaestus-hall-front-end",
        label: "Hall conditioning configuration",
        note: "Op-amp hysteresis and RC filter values selected against the captured motor startup transient.",
      },
    ],
    nextSlug: "solarsense",
  },

  /* ======================================================================
     FLAGSHIP 02 — SolarSENSE
     ====================================================================== */
  {
    slug: "solarsense",
    index: "02",
    title: "SolarSENSE",
    result:
      "On-device soil-health inference at ~42 ms with zero network dependency, after the sensing hardware forced a change of approach.",
    summary:
      "Edge AI soil inference for off-grid agricultural diagnostics, with a quantized model and dashboard running entirely on the microcontroller.",
    role: "Firmware & TinyML Integration",
    context: "ACADEMIC",
    status: "BUILDING",
    stage: "PROTOTYPE",
    year: "2025",
    confidential: false,
    featured: true,
    disciplines: ["embedded", "firmware", "ai"],
    category: "Edge AI / Firmware",
    platform: "ESP32 · Edge Impulse · ESP-DASH",
    technologies: [
      "Edge Impulse",
      "ESP-IDF",
      "ESP-DASH",
      "Embedded C++",
      "Python",
      "FreeRTOS",
    ],
    hardware: [
      "LILYGO T-Higrow (ESP32)",
      "Capacitive soil moisture probe",
      "Electrical conductivity probe",
      "Temperature probe",
    ],
    protocols: ["Wi-Fi 802.11 (SoftAP)", "HTTP", "WebSockets", "I²C"],
    platforms: ["ESP32"],
    constraints: [
      "The board was selected for evaluation and does not carry the NPK chemical sensors the research datasets assume.",
      "The tool is meant for extension workers in resource-constrained environments, so it cannot depend on an internet gateway.",
      "A local web server and the inference tensor arena compete for the same memory budget under FreeRTOS.",
    ],
    problem: [
      "The project goal was a low-cost, off-grid diagnostic tool for agricultural extension workers in resource-constrained environments. The initial research datasets relied on chemical nitrogen-phosphorus-potassium measurements — sensors that are physically absent from the selected T-Higrow evaluation board.",
      "The engineering problem was not the model. It was making the model honest about what the hardware can actually measure, without falling back on synthetic data to fill the gap.",
    ],
    decisions: [
      {
        title: "Retrain the model on measurable features instead of simulating the missing ones.",
        body: "Rather than relying on synthetic NPK data or unavailable sensors, the classification model was retrained exclusively on features the physical board can measure: capacitive soil moisture, electrical conductivity, and temperature. The dataset shrank, but every input is a real measurement from real hardware.",
      },
      {
        title: "Serve the dashboard from the microcontroller in SoftAP mode.",
        body: "The ESP32 runs a standalone access point and hosts the ESP-DASH interface over local Wi-Fi. The device needs no internet gateway, no cloud account, and no hosted backend — which is the entire point for the intended deployment.",
      },
      {
        title: "Budget memory between the web server and the tensor arena explicitly.",
        body: "Running both in one FreeRTOS context risks a stack overflow. Buffers were sized so the two subsystems do not collide, and the allocation was treated as a design constraint rather than something to discover at runtime.",
      },
    ],
    implementation: [
      "Integrated the generated C++ inference library into the ESP32 Arduino framework, bridging sensor sampling, feature normalization, neural inference, and dashboard updates.",
      "Configured the ESP32 in standalone SoftAP mode, serving an interactive ESP-DASH web interface over local Wi-Fi without an internet gateway.",
      "Optimized memory buffers to prevent FreeRTOS stack overflow between the web server and the tensor arena.",
      "Surfaced instantaneous classification probabilities and actionable remediation advice on the local display.",
    ],
    debugging: [
      "The first classification attempt reproduced the published dataset's feature set, which the hardware could not supply. The model could not be deployed honestly, so the feature definition was the thing that had to change.",
      "Co-existing the local web server and the inference arena produced memory pressure under FreeRTOS. Buffer sizing was reworked and re-tested until the two subsystems ran without contention.",
    ],
    validation: [
      {
        target: "Edge Inference",
        criterion: "On-device latency under 200 ms",
        tool: "Internal hardware timer",
        result: "~42 ms inference on ESP32",
        verdict: "PASS",
      },
    ],
    measurements: [
      {
        label: "Inference Time",
        value: "42",
        unit: "ms",
        condition: "Quantized int8 model on ESP32",
        interpretation: "Inside the 200 ms design budget.",
      },
      {
        label: "Network Overhead",
        value: "0",
        unit: "KB",
        condition: "100% offline, local browser over SoftAP",
        interpretation: "No cloud dependency in the sensing path.",
      },
      {
        label: "Input Features",
        value: "2",
        condition: "Reconciled to moisture and electrical conductivity",
        interpretation: "Every input is a real board measurement.",
      },
    ],
    outcomes: [
      "Quantized int8 classification running on-device at roughly 42 ms per inference.",
      "Removed the external cloud dependency entirely, so the tool operates without connectivity.",
      "Demonstrated at the 2025 ASU Innovation Showcase using controlled soil calibration samples.",
    ],
    limitations: [
      "A controlled course prototype, not a ruggedized or field-validated agricultural instrument.",
      "Demonstrated against controlled soil calibration samples rather than a real field survey.",
      "The feature set is limited to what the evaluation board can measure, so the classification granularity is bounded by the available hardware.",
    ],
    nextSteps: [
      "Repeat accuracy measurement against real field samples to establish what the controlled calibration overstated.",
      "Add power-loss persistence so classification history survives a field session, which the local dashboard cannot currently cover.",
      "Evaluate a soil-type input the board can measure, to widen classification beyond a two-feature boundary.",
    ],
    media: [
      {
        src: "/media/solarsense-showcase.jpg",
        alt: "SolarSENSE prototype board and team at the ASU innovation showcase, with live sensor telemetry on the connected display",
        caption: "ASU innovation showcase, 2025",
      },
    ],
    artifacts: [
      {
        label: "Showcase photo",
        href: "/media/solarsense-showcase.jpg",
        external: false,
      },
      {
        label: "Academic portfolio",
        href: "/media/uriah-villa-ms-portfolio.pdf",
        external: false,
      },
    ],
    diagram: "solarsense-pipeline",
    codeSlots: [
      {
        id: "solarsense-feature-normalization",
        label: "Feature normalization",
        note: "Scaling the raw moisture and EC reads into the range the trained model expects.",
      },
      {
        id: "solarsense-espdash-handler",
        label: "ESP-DASH telemetry handler",
        note: "Pushing classification probabilities to the local dashboard over WebSockets.",
      },
    ],
    nextSlug: "shadeshift",
  },

  /* ======================================================================
     FLAGSHIP 03 — ShadeShift
     ====================================================================== */
  {
    slug: "shadeshift",
    index: "03",
    title: "ShadeShift",
    result:
      "Four clinical visual modalities on one modular frame, after the optical film and the mass budget both failed bench review.",
    summary:
      "Modular therapeutic eyewear for photophobia and visual rehabilitation, developed with Barrow Neurological Institute and Dignity Health.",
    role: "Team Lead & Systems Architect",
    context: "ACADEMIC",
    status: "BUILDING",
    stage: "PROTOTYPE",
    year: "2025",
    confidential: false,
    featured: true,
    disciplines: ["embedded", "robotics"],
    category: "Mechatronics / Wearables",
    platform: "ESP32 · PDLC Optics · 3D Printed",
    technologies: [
      "Embedded C",
      "ESP32",
      "PWM control",
      "High-voltage AC drive",
      "3D printed enclosures",
    ],
    hardware: [
      "ESP32 controller in external tethered enclosure",
      "PDLC switchable film (replaced PNLC)",
      "Electrochromic glass",
      "LiPo battery with boost circuitry",
      "Magnetic binasal occlusion plates",
    ],
    protocols: ["PWM", "UART", "GPIO"],
    platforms: ["ESP32"],
    constraints: [
      "Clinical patients recovering from stroke, concussion, or traumatic brain injury experience photophobia and spatial disorientation that static broadband attenuation does not address.",
      "Stroboscopic training requires crisp optical transitions, not gradual fades.",
      "Anything mounted on the frame directly loads the wearer's face, which is already the limiting factor.",
    ],
    problem: [
      "Patients recovering from stroke, concussion, or traumatic brain injury frequently experience debilitating photophobia and spatial disorientation. Commercial sunglasses offer only static, broadband attenuation that fails to adapt to shifting indoor and outdoor lighting, or to the needs of therapeutic exercise.",
      "The engineering task was to unify four distinct clinical modalities into a single wearable frame: gradable electrochromic tint, interchangeable colour wavelength filters, liquid-crystal stroboscopic training, and magnetic binasal occlusion plates.",
    ],
    decisions: [
      {
        title: "Move the stroboscopic layer from PNLC to PDLC.",
        body: "Polymer Network Liquid Crystal film suffered slow optical decay times, which turned intended crisp stroboscopic pulses into visible blur. Polymer Dispersed Liquid Crystal film, driven by high-voltage AC square waves, produced clean transitions up to 15 Hz. The original material was not a cheaper version of the requirement — it was the wrong physics.",
      },
      {
        title: "Externalize the electronics instead of lightening the frame.",
        body: "Mounting the LiPo battery and boost circuitry onto the glasses frame created excessive facial pressure. Rather than chasing grams on the frame, the architecture moved all power and electronics into a pocket-sized tethered controller, which is what brought head mass under 45 g.",
      },
      {
        title: "Make occlusion plates magnetic and removable.",
        body: "Binasal occlusion needs to be reconfigurable per patient. A magnetic clip mechanism allows plates to be added, removed, and repositioned without tools, keeping the frame itself unchanged across configurations.",
      },
    ],
    implementation: [
      "Built the optical stack from electrochromic tint, interchangeable colour filters, the PDLC stroboscopic layer, and magnetic binasal occlusion plates on a single 3D-printed frame.",
      "Drove the PDLC layer from a high-voltage AC square wave with configurable PWM duty, supporting 1–15 Hz stroboscopic operation.",
      "Externalized the ESP32 controller, battery, and boost circuitry into a tethered pocket enclosure to cut head mass.",
      "Iterated the printed frame across multiple revisions to resolve fit and head-mass issues.",
    ],
    debugging: [
      "Bench testing of the original PNLC film showed optical decay times too slow for stroboscopic use, blurring each pulse. Replacing the material with PDLC and driving it with high-voltage AC square waves restored crisp transitions.",
      "The frame-mounted battery and boost circuitry produced excessive facial pressure. Relocating all electronics to an external tethered enclosure resolved the ergonomic problem rather than iterating on the frame's mass budget.",
    ],
    validation: [
      {
        target: "Strobe Transmittance",
        criterion: "Square-wave contrast ratio above 80%",
        tool: "Photodiode + oscilloscope",
        result: "PDLC film verified at 10 Hz",
        verdict: "PASS",
      },
    ],
    measurements: [
      {
        label: "Optical Modes",
        value: "4",
        condition: "Tint, colour, strobe, binasal occlusion",
        interpretation: "Four modalities on one modular platform.",
      },
      {
        label: "Strobe Frequency",
        value: "1–15",
        unit: "Hz",
        condition: "Configurable PWM duty cycle into PDLC film",
        interpretation: "Crisp transitions across the therapeutic range.",
      },
      {
        label: "Head Mass",
        value: "< 45",
        unit: "g",
        condition: "Electronics in external tethered enclosure",
        interpretation: "Frame load reduced by externalizing power and control.",
      },
    ],
    outcomes: [
      "Four clinical visual modalities integrated on one modular frame.",
      "Stroboscopic training confirmed at 10 Hz with photodiode and oscilloscope measurement.",
      "Head mass held under 45 g after externalizing the electronics.",
    ],
    limitations: [
      "Clinical efficacy, patient trials, and medical device safety certification remain designated for future clinical phases. This work demonstrates mechanical and electro-optical integration, not a validated therapy.",
      "A proof of concept built on an iterated 3D-printed platform, not a production enclosure.",
    ],
    nextSteps: [
      "Run the photophobia and visual-rehabilitation protocols with clinical supervision before any efficacy claim is made.",
      "Characterize transmittance across the full 1–15 Hz range rather than the single verified frequency.",
      "Assess enclosure and ingress protection for daily wear, which a printed prototype does not address.",
    ],
    media: [
      {
        src: "/media/shadeshift-prototype.jpg",
        alt: "ShadeShift prototype modular eyewear beside its external tethered controller enclosure",
        caption: "Prototype frame with external controller",
      },
    ],
    artifacts: [
      {
        label: "Research paper (PDF)",
        href: "/media/shadeshift-research-paper.pdf",
        external: false,
      },
      {
        label: "Video demonstration",
        href: "https://youtu.be/Cl6hf7lQr3M",
        external: true,
      },
    ],
    codeSlots: [
      {
        id: "shadeshift-pdlc-drive",
        label: "PDLC high-voltage AC drive",
        note: "Square-wave generation and duty control for stroboscopic operation across 1–15 Hz.",
      },
      {
        id: "shadeshift-mode-state",
        label: "Visual mode state machine",
        note: "Arbitrating between tint, colour filter, strobe, and binasal occlusion modalities.",
      },
    ],
    nextSlug: "microgrid",
  },

  /* ======================================================================
     FLAGSHIP 04 — Critical-Facility Microgrid Study
     ====================================================================== */
  {
    slug: "critical-facility-microgrid",
    index: "04",
    title: "Critical-Facility Microgrid Study",
    result:
      "A buildable resilience design, reached by rejecting a mathematically optimal result that did not physically fit.",
    summary:
      "An independent techno-economic microgrid simulation for a Level I trauma centre in Honolulu, testing the model against the building it has to serve.",
    role: "Sole Author & Modeler",
    context: "ACADEMIC",
    status: "VALIDATED",
    stage: "SIMULATED",
    year: "2025",
    confidential: false,
    featured: true,
    disciplines: ["power"],
    category: "Power / Resilience",
    platform: "XENDEE · PV · BESS · Diesel",
    technologies: ["XENDEE", "Techno-economic modelling", "Python"],
    hardware: [],
    protocols: [],
    platforms: ["XENDEE microgrid platform"],
    constraints: [
      "High Hawaiian electric utility tariffs and extreme island vulnerability to natural disasters.",
      "The facility is an urban medical campus with no contiguous land and limited structural roof capacity.",
      "Life-safety loads require multi-day outage survival, not just a one-cycle ride-through.",
    ],
    problem: [
      "Queen's Medical Center is a Level I trauma facility operating under high Hawaiian electric tariffs and extreme island vulnerability to natural disasters.",
      "Run without explicit physical area constraints, the optimizer returned a 4.98 MW solar PV array and a 12.3 MWh battery storage system. That result minimizes calculated Net Present Cost, and it is not buildable: a spatial audit confirmed an urban medical campus does not have the contiguous land or structural roof capacity for a 5 MW solar installation.",
    ],
    decisions: [
      {
        title: "Treat the unconstrained optimum as a finding, not an answer.",
        body: "The cheapest solution was reported as a rejected candidate rather than quietly discarded. Presenting it, and the reason it fails, is the most useful part of the study — it shows exactly which constraint the model was missing.",
      },
      {
        title: "Cap PV on structural grounds and bring the existing diesel in.",
        body: "Rooftop solar was capped to 1.2 MW based on structural estimates, and the site's existing diesel generation was integrated for multi-day catastrophic outage survival instead of trying to buy that resilience with battery capacity alone.",
      },
      {
        title: "Right-size the BESS for its actual job.",
        body: "The battery was resized to peak-shaving and critical life-support transition loads. Twelve-hour-plus storage was doing a job diesel generation does far more cheaply.",
      },
    ],
    implementation: [
      "Built the techno-economic model in XENDEE for a Level I trauma centre load profile under Honolulu tariffs.",
      "Ran the unconstrained optimization to establish the mathematical baseline and the gap between score and buildability.",
      "Performed a spatial and structural audit of the campus to establish real boundaries.",
      "Re-ran the model with explicit physical constraints, hybrid PV + BESS + diesel, bounded by footprint and a 14-day resilience target.",
    ],
    debugging: [
      "The unconstrained run produced a result that scored well and could not be constructed. Rather than accepting or hiding it, the model was interrogated to find which boundary condition was missing.",
      "Introducing the footprint and roof capacity limits exposed the storage sizing error: the optimizer was purchasing outage resilience through batteries because diesel generation had not been given the option to compete.",
    ],
    validation: [
      {
        target: "Spatial Feasibility",
        criterion: "PV capacity within available roof area and structure",
        tool: "Campus spatial and structural audit",
        result: "4.98 MW rejected; PV capped to 1.2 MW",
        verdict: "PASS",
      },
    ],
    measurements: [
      {
        label: "Unconstrained PV",
        value: "4.98",
        unit: "MW",
        condition: "Optimization with no area constraint",
        interpretation: "Exceeded available hospital roof area. Rejected.",
      },
      {
        label: "Unconstrained BESS",
        value: "12.3",
        unit: "MWh",
        condition: "Optimization with no area constraint",
        interpretation: "Mathematically cheapest, physically unrealistic. Rejected.",
      },
      {
        label: "Revised Scenario",
        value: "PV + Diesel",
        condition: "Bounded by footprint and 14-day resilience",
        interpretation: "Constructible hybrid architecture for life-safety loads.",
      },
    ],
    outcomes: [
      "Identified and rejected an unconstrained optimum of 4.98 MW PV / 12.3 MWh BESS that violated physical campus limits.",
      "Rebuilt a constructible hybrid PV + BESS + diesel design capped at 1.2 MW PV with a 14-day resilience target.",
      "Demonstrated that an optimization model is only as valid as its representation of physical boundary conditions.",
    ],
    limitations: [
      "An academic modelling study, not an installed or commissioned system.",
      "Roof capacity estimates are engineering estimates; the 1.2 MW cap is bounded by those estimates rather than a certified structural survey.",
    ],
    nextSteps: [
      "Replace the structural estimate with a certified survey so the 1.2 MW cap rests on measured capacity.",
      "Add a fault-level and protection-coordination study, which a techno-economic model does not cover.",
      "Re-run with real load data from the facility rather than a modelled profile.",
    ],
    media: [],
    artifacts: [
      {
        label: "Archived academic report (PDF)",
        href: "/media/uriah-villa-ms-portfolio.pdf",
        external: false,
      },
      {
        label: "Evidence appendix (PDF)",
        href: "/media/uriah-villa-ms-portfolio-appendix.pdf",
        external: false,
      },
    ],
    codeSlots: [
      {
        id: "microgrid-constraint-sweep",
        label: "Constraint sweep",
        note: "Parameter sweep re-running the optimization across roof-capacity bounds to locate the feasible frontier.",
      },
    ],
    nextSlug: undefined,
  },

  /* ======================================================================
     SUPPORTING WORK — directory rows (§24). Full case studies are reserved
     for flagships; these carry the evidence that already exists.
     ====================================================================== */
  {
    slug: "bldc-motor-control",
    index: "05",
    title: "BLDC Closed-Loop Motor Control",
    result: "5.4% measured current ripple against an 8% criterion at rated load.",
    summary:
      "Hardware PWM commutation with current sensing on a 16-bit digital signal controller.",
    role: "Firmware & Control Design",
    context: "ACADEMIC",
    status: "VALIDATED",
    year: "2024",
    confidential: false,
    featured: false,
    disciplines: ["embedded", "firmware", "robotics"],
    category: "Motor Control",
    platform: "dsPIC33EP256MC506 · Embedded C",
    technologies: ["Embedded C", "dsPIC33EP256MC506", "PWM", "QEI"],
    hardware: ["dsPIC33EP256MC506", "Motor PWM stage", "Current probe"],
    protocols: ["PWM", "QEI"],
    platforms: ["dsPIC33EP"],
    constraints: [],
    problem: [],
    decisions: [],
    implementation: [
      "Implemented hardware PWM commutation and current sensing on a 16-bit digital signal controller.",
    ],
    debugging: [
      "Measured phase current on a Tektronix current clamp with the scope to confirm ripple against the 8% criterion.",
    ],
    validation: [
      {
        target: "Motor Commutation",
        criterion: "Current ripple below 8% at rated load",
        tool: "Tektronix current clamp + scope",
        result: "5.4% measured ripple",
        verdict: "PASS",
      },
    ],
    measurements: [
      {
        label: "Current Ripple",
        value: "5.4",
        unit: "%",
        condition: "Rated load, Tektronix current clamp + scope",
        interpretation: "Inside the 8% design criterion.",
      },
    ],
    outcomes: ["5.4% current ripple measured against an 8% criterion at rated load."],
    limitations: ["Criterion measured at rated load; transient and cold-start behaviour is not characterised here."],
    nextSteps: [],
    media: [],
    artifacts: [
      {
        label: "M.S. portfolio (PDF)",
        href: "/media/uriah-villa-ms-portfolio.pdf",
        external: false,
      },
    ],
  },
  {
    slug: "room-weather-controller",
    index: "06",
    title: "Room Weather Automation Controller",
    result: "A running connected-hardware build: custom PCB, dual controller, live telemetry.",
    summary:
      "Room climate automation on a custom Cadence layout pairing a PIC18 with an ESP32 over MQTT.",
    role: "Embedded Design & Integration",
    context: "ACADEMIC",
    status: "ACTIVE",
    year: "2023",
    confidential: false,
    featured: false,
    disciplines: ["embedded", "firmware"],
    category: "Connected Hardware",
    platform: "PIC18 · ESP32 · Cadence PCB",
    technologies: ["Embedded C", "Cadence Allegro", "MQTT", "Wi-Fi"],
    hardware: ["PIC18 microcontroller", "ESP32", "Custom PCB"],
    protocols: ["MQTT", "Wi-Fi (802.11)", "UART"],
    platforms: ["PIC18", "ESP32"],
    constraints: [],
    problem: [],
    decisions: [
      {
        title: "Split sensing from connectivity across two controllers.",
        body: "A PIC18 handles the local control loop while the ESP32 owns the network side, so a dropped connection cannot stall local actuation.",
      },
    ],
    implementation: [
      "Designed a custom PCB in Cadence Allegro pairing a PIC18 for local control with an ESP32 for connectivity.",
      "Published telemetry over MQTT to a local broker.",
    ],
    debugging: [],
    validation: [],
    measurements: [],
    outcomes: [],
    limitations: [],
    nextSteps: [],
    media: [],
    artifacts: [
      {
        label: "Project documentation",
        href: "https://egr314-team-305.github.io/Team305.github.io",
        external: true,
      },
    ],
  },
  {
    slug: "support-forecasting",
    index: "07",
    title: "Support Forecasting & Automation",
    result: "Deployed in production, not a demo.",
    summary:
      "Automated reporting pipeline and case-complexity prediction for a production support system.",
    role: "Automation & Analysis",
    context: "PROFESSIONAL",
    status: "DEPLOYED",
    year: "2024",
    confidential: false,
    featured: false,
    disciplines: ["automation", "ai"],
    category: "Automation / ML",
    platform: "Python · Salesforce API · scikit-learn",
    technologies: ["Python", "scikit-learn", "Salesforce API"],
    hardware: [],
    protocols: ["HTTPS / REST"],
    platforms: ["Salesforce"],
    constraints: [],
    problem: [],
    decisions: [],
    implementation: [
      "Built an automated reporting pipeline and a case-complexity prediction model against production support data.",
    ],
    debugging: [],
    validation: [],
    measurements: [],
    outcomes: [],
    limitations: [],
    nextSteps: [],
    media: [],
    artifacts: [],
  },
  {
    slug: "scara-drawing-arm",
    index: "08",
    title: "SCARA Two-Link Drawing Arm",
    result: "Inverse kinematics solved on-chip in C, driving two servo joints.",
    summary:
      "Two-link SCARA arm with the kinematics resolved in firmware rather than in a host-side planner.",
    role: "Embedded Design",
    context: "ACADEMIC",
    status: "BUILDING",
    stage: "PROTOTYPE",
    year: "2023",
    confidential: false,
    featured: false,
    disciplines: ["robotics", "firmware"],
    category: "Robotics / Kinematics",
    platform: "Servo Actuators · Embedded C",
    technologies: ["Embedded C", "Servo control"],
    hardware: ["Two servo actuators", "SCARA link assembly"],
    protocols: ["PWM"],
    platforms: [],
    constraints: [],
    problem: [],
    decisions: [
      {
        title: "Resolve the kinematics on the controller.",
        body: "The inverse kinematics runs on-chip in C so joint angles are produced directly rather than streaming coordinates from a host.",
      },
    ],
    implementation: ["Solved two-link inverse kinematics on-chip in C to drive the arm's servo joints."],
    debugging: [],
    validation: [],
    measurements: [],
    outcomes: [],
    limitations: [],
    nextSteps: [],
    media: [],
    artifacts: [
      {
        label: "M.S. portfolio (PDF)",
        href: "/media/uriah-villa-ms-portfolio.pdf",
        external: false,
      },
    ],
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

/** Stable ordering: flagships first, then supporting work by year descending. */
export function projectDirectory(): Project[] {
  return [...projects].sort((a, b) => {
    if (a.featured !== b.featured) return a.featured ? -1 : 1;
    return Number(b.year) - Number(a.year);
  });
}

export const directoryCounts = {
  total: projects.length,
  disciplines: new Set(projects.flatMap((p) => p.disciplines)).size,
  featured: projects.filter((p) => p.featured).length,
  building: projects.filter((p) => p.status === "BUILDING").length,
  validated: projects.filter((p) => p.status === "VALIDATED").length,
  active: projects.filter((p) => p.status === "ACTIVE").length,
  deployed: projects.filter((p) => p.status === "DEPLOYED").length,
};

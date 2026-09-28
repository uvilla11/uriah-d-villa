import type {
  CoverageGroup,
  Principle,
  ScopeStage,
  SiliconFamily,
  ValidationRow,
} from "@/lib/types";

/**
 * Technical coverage (§28) organised by function rather than by tool logo.
 * Each item carries a short note describing how it is actually used, so the
 * section reads as engineering evidence instead of a keyword list.
 */
export const coverage: CoverageGroup[] = [
  {
    id: "firmware",
    title: "Embedded Firmware",
    description:
      "Bare-metal and RTOS firmware in embedded C/C++, written against the peripheral set rather than a framework.",
    items: [
      { label: "Embedded C / C++", note: "Bare-metal, register-level" },
      { label: "PIC18", note: "8-bit Harvard, bring-up and low-power" },
      { label: "PIC32", note: "32-bit MIPS, USB-CDC and Ethernet" },
      { label: "dsPIC33", note: "16-bit DSC, motor control DSP" },
      { label: "PSoC 4 / 6", note: "Cortex-M0+ / M4, programmable digital" },
      { label: "ESP32", note: "Xtensa dual-core, Wi-Fi and BLE" },
    ],
  },
  {
    id: "peripherals",
    title: "Peripherals & Silicon",
    description:
      "The specific hardware blocks behind the firmware: how data gets moved, conditioned, and converted.",
    items: [
      { label: "DMA", note: "Offload transfers from the CPU" },
      { label: "ECCP / PWM", note: "Motor and dimming waveforms" },
      { label: "12-bit ADC", note: "Sensor front-end sampling" },
      { label: "Op-Amps", note: "Hall conditioning and hysteresis" },
      { label: "Hall Effect", note: "Contactless position sensing" },
      { label: "Optocouplers", note: "Isolation on driven loads" },
      { label: "MOSFET Gate Drivers", note: "Peak-current switching stages" },
    ],
  },
  {
    id: "connectivity",
    title: "Protocols & Buses",
    description:
      "Bus-level work where framing, timing, and signal integrity actually decide whether the system works.",
    items: [
      { label: "UART / RS-232", note: "Serial bring-up and logging" },
      { label: "SPI", note: "Controller-to-controller transport" },
      { label: "I²C", note: "Sensor and EEPROM buses" },
      { label: "CAN", note: "Automotive and industrial buses" },
      { label: "BLE", note: "Low-power device links" },
      { label: "MQTT", note: "Publish/subscribe telemetry" },
      { label: "Wi-Fi (802.11)", note: "Station and SoftAP operation" },
    ],
  },
  {
    id: "debugging",
    title: "Debugging & Validation",
    description:
      "Instrumented diagnosis: the discipline of reading a real trace before changing code.",
    items: [
      { label: "Oscilloscopes", note: "4-channel, timing and noise" },
      { label: "Logic Analyzers", note: "Bus decode and protocol capture" },
      { label: "Current Probes", note: "Commutation ripple measurement" },
      { label: "Programmable PSUs", note: "Swept supply conditions" },
      { label: "Function Generators", note: "Stimulus injection" },
      { label: "SMD Soldering", note: "Hand rework and rework pads" },
    ],
  },
  {
    id: "eda",
    title: "Hardware & EDA",
    description:
      "Schematic capture through multi-layer layout, including the revision loop that follows bench findings.",
    items: [
      { label: "KiCad", note: "Schematic capture and PCB layout" },
      { label: "Cadence Allegro", note: "Constraint-driven PCB layout" },
      { label: "Multi-Layer PCB", note: "Power planes and thermal pours" },
      { label: "Sensor Conditioning", note: "Front-end signal integrity" },
      { label: "Board Bring-Up", note: "First-power fault isolation" },
    ],
  },
  {
    id: "software",
    title: "Software & Modeling",
    description:
      "Host-side tooling, on-device inference, and the simulation work used to test decisions before hardware exists.",
    items: [
      { label: "Edge Impulse", note: "TinyML dataset and deployment" },
      { label: "Python", note: "Test automation and pipelines" },
      { label: "Simulink", note: "Dynamic system modelling" },
      { label: "XENDEE", note: "Techno-economic microgrid study" },
      { label: "MPLAB X", note: "PIC and dsPIC toolchain" },
      { label: "ModusToolbox", note: "PSoC development environment" },
      { label: "ESP-IDF", note: "ESP32 firmware platform" },
    ],
  },
];

/** Engineering scope path (§27). */
export const scopeStages: ScopeStage[] = [
  { index: "01", label: "Hardware", detail: "Schematic, layout, first power" },
  { index: "02", label: "Firmware", detail: "Bring-up, clocks, interrupts" },
  { index: "03", label: "Protocols", detail: "Buses, framing, timing" },
  { index: "04", label: "Debugging", detail: "Probe, isolate, read the trace" },
  { index: "05", label: "Applications", detail: "Reference code and collateral" },
  { index: "06", label: "Validation", detail: "Criteria, conditions, verdicts" },
];

export const principles: Principle[] = [
  {
    index: "01",
    title: "Understand the constraint first.",
    body: "Architecture should follow the real limits of the hardware, platform, protocol, user, and schedule. Power budgets, thermal dissipation, pin multiplexing, and bus bandwidth outrank ideal models.",
  },
  {
    index: "02",
    title: "Prefer observable systems.",
    body: "If a state, bus transaction, or timing margin cannot be measured with a probe or logic analyzer, the system is not yet under control. Errors, assumptions, and uncertainty should be visible.",
  },
  {
    index: "03",
    title: "Build the smallest reliable abstraction.",
    body: "Complexity must earn its place. A clean, direct register configuration is usually preferable to an opaque framework layer that hides the timing you need to inspect.",
  },
  {
    index: "04",
    title: "Document tradeoffs.",
    body: "Every technical decision has a cost. A design is stronger when its failure modes, limitations, and operational boundaries are explicitly acknowledged rather than discovered later.",
  },
];

/** Silicon family and bus interface matrix (workspace). */
export const siliconMatrix: SiliconFamily[] = [
  {
    family: "PIC18F",
    architecture: "8-bit Harvard",
    coreClock: "16–64 MHz",
    interfaces: "SPI, I²C, UART, PWM, ADC",
    benchTools: "MPLAB ICD4, Logic Analyzer, DMM",
  },
  {
    family: "dsPIC33EP",
    architecture: "16-bit DSC",
    coreClock: "70 MIPS",
    interfaces: "Motor PWM, QEI, SPI, DMA",
    benchTools: "Current Probes, 4-Ch Scope, High-V PSU",
  },
  {
    family: "PIC32MZ",
    architecture: "32-bit MIPS M5150",
    coreClock: "200 MHz",
    interfaces: "USB-CDC, Ethernet, CAN, SPI",
    benchTools: "Logic Analyzer, Protocol Decoder",
  },
  {
    family: "PSoC 4 / 6",
    architecture: "ARM Cortex-M0+ / M4",
    coreClock: "48–150 MHz",
    interfaces: "CapSense, Programmable Digital (UDB)",
    benchTools: "ModusToolbox, Logic Analyzer",
  },
  {
    family: "ESP32-WROOM",
    architecture: "Xtensa Dual-Core",
    coreClock: "240 MHz",
    interfaces: "Wi-Fi, BLE, I²S, SPI, ADC",
    benchTools: "ESP-IDF, Wireshark, Serial Monitor",
  },
];

/**
 * Physical validation criteria and results. Every row is a measured outcome
 * with the instrument and condition that produced it (§52).
 */
export const validationMatrix: ValidationRow[] = [
  {
    target: "Hephaestus Rover Positioning",
    criterion: "Accuracy within ±5° across all exits",
    tool: "Hall effect + optical reference",
    result: "±2° repeatable across 500+ runs",
    verdict: "PASS",
  },
  {
    target: "Hephaestus Chassis Tilt",
    criterion: "Mechanical stability beyond 20° slope",
    tool: "Adjustable tilt test fixture",
    result: "36° physical incline achieved",
    verdict: "PASS",
  },
  {
    target: "SolarSENSE Edge Inference",
    criterion: "On-device latency under 200 ms",
    tool: "Internal hardware timer",
    result: "~42 ms inference on ESP32",
    verdict: "PASS",
  },
  {
    target: "dsPIC33 Motor Commutation",
    criterion: "Current ripple below 8% at rated load",
    tool: "Tektronix current clamp + scope",
    result: "5.4% measured ripple",
    verdict: "PASS",
  },
  {
    target: "ShadeShift Strobe Transmittance",
    criterion: "Square-wave contrast ratio above 80%",
    tool: "Photodiode + oscilloscope",
    result: "PDLC film verified at 10 Hz",
    verdict: "PASS",
  },
];

/**
 * Bench instruments named in the engineering record. The workspace reads
 * these as an equipment list rather than a skills claim.
 */
export const benchEquipment: { label: string; use: string }[] = [
  { label: "4-Channel Oscilloscope", use: "Timing, noise, commutation ripple" },
  { label: "Logic Analyzer", use: "Bus decode, protocol capture" },
  { label: "Current Probe", use: "Motor phase current measurement" },
  { label: "Programmable PSU", use: "Swept supply conditions" },
  { label: "Function Generator", use: "Stimulus injection" },
  { label: "Photodiode + Scope", use: "Optical transmittance" },
];

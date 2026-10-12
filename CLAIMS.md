# Portfolio Claim Ledger

Updated October 5, 2026. This ledger supports local content review of `FINAL`, not approval to push, merge, or deploy. "High traceability" means the cited source contains the statement. It does not mean an independent experiment verified it.

## Source and Ownership Key

| Key | Source | Ownership and access boundary |
| --- | --- | --- |
| L | [Public Microchip four-lab repository at `923d09a2`](https://github.com/microchip-pic-avr-examples/pic32cm6408pl10048-low-power-design-vscode/tree/923d09a2c8734836e1b76f547201aaaaa9bd7021), README and lab instructions | Microchip-owned public source. Link only; no code or capture images mirrored. |
| T | [Microchip TB3388 / DS90003388A](https://ww1.microchip.com/downloads/aemDocuments/documents/MCU32/ProductDocuments/SupportingCollateral/SleepWalking-Reducing-Power-Consumption-in-Arm-Cortex-M-based-MCUs-DS90003388.pdf), Table 3-1 and measurement sections | Microchip-owned public brief. Linked, not copied to the site. Uriah confirmed authorship in the October 5 review. |
| P | Supplied `Uriah Villa Portfolio MS in Engineering.pdf`, 17 pages | Personal academic reporting, including team work. Retained legacy bytes remain unreviewed and unlinked from the UI. Page numbers below are physical PDF pages, starting at 1. |
| A | Supplied `Appendix for Portfolio_ MS in Engineering.pdf`, 98 pages | Course and team reports, code excerpts, and individual reflections. Retained legacy bytes remain unreviewed and unlinked from the UI. |
| H | [Official Psyche Student Collaborations listing](https://psyche.ssl.berkeley.edu/landing-system-for-hypothesized-surfaces-asu-a/) | Public team affiliation source. Its disclaimer does not confer NASA or ASU endorsement or certify test figures. |
| HP | Retained `psyche-poster.png` and `Capstone_ASU-A_01_Hephaestus_Lander.png` | Team poster and CAD artifact. Individual designer, photographer, and reuse clearance are not established by Git tracking; owner review remains required. |
| S | [SolarSENSE repository at `7f8be3e`](https://github.com/JPisors/SolarSENSE/tree/7f8be3efcb12f0eed4d8791c0f279c70ba3ed698), README, `LilyTHiGrow.ino`, `configuration.h` | Public team repository under Jacob Pisors' account. Repository ownership and commit author do not prove who trained or integrated every model stage. |
| SP | Retained `EGR 598 SolarSPELL.jpeg` | Team showcase photo. Demonstration setting, not authorship or model validation evidence. Reuse clearance remains an owner-review item. |
| R | Supplied `ShadeShift_ Smart Modular Eyewear for Neurological Recovery and Visual Stress Alleviation.pdf`, 5 pages; also A pp. 69-74 | Five-author academic paper with Uriah named team leader. Paper terminology conflicts remain unresolved. Retained legacy bytes remain unreviewed and unlinked from the UI. |
| RP | Retained `ShadeShift-prototype.jpg` | Team prototype photograph, matching R Fig. 6. Appearance alone cannot identify film chemistry, prove speed, or establish assembled external electronics. Reuse clearance remains an owner-review item. |
| V | [ShadeShift demo](https://youtu.be/Cl6hf7lQr3M) | Public video under Uriah Villa's account. Title/uploader confirmed; no timing measurement or transcript-derived performance conclusion. |
| W | [Room Weather Control team documentation](https://egr314-team-305.github.io/Team305.github.io/), especially [Component and Microcontroller Selection](https://egr314-team-305.github.io/Team305.github.io/CMS.html) | Public course-team source. The component-selection page names PIC18F27J53-I/SO. Team membership and integration context, not sole personal ownership. |
| U | User-approved facts in the saved consolidation plan and the existing `FINAL` resume-reference content | Personal facts and estimates. Private resumes were not accessed or copied in this pass. Inherited resume-only details require owner confirmation, not independent-verification language. |

## PIC32CM

| Wording and surface | Source | Conditions or window | Confidence | Qualification and review disposition |
| --- | --- | --- | --- | --- |
| 82% lower Ch4 average current, hero and case | L, README Summary table and Lab 4 summary | Curiosity Nano Explorer/PAC1944, MCP2221A, Data Visualizer cursor-selected captures. Lab 2 active reference without CPU scaling, 8 MHz. | High published-statement traceability; not an independent measurement. | Keep the repository's published 82%, not a recalculation of rounded readings and not a TB3388 result. |
| About 3.02 mA active and 559 µA SleepWalking, case and homepage illustration | L, lab capture/readings | Same repository Ch4 setup; averaged capture regions, not instrument-independent MCU current minima. | Approximate source readings. | Tilde labels and caption identify source/setup/states. Illustration is not an independent capture. |
| Four firmware labs, documentation, and Lab 4 revision attributed to Uriah | L: [Jan. 22 Lab 1 project](https://github.com/microchip-pic-avr-examples/pic32cm6408pl10048-low-power-design-vscode/commit/a518ff6b90b6d0a1d42c2ee8fd1dbd743682b9d4), [Feb. 10 Labs 2-4](https://github.com/microchip-pic-avr-examples/pic32cm6408pl10048-low-power-design-vscode/commit/e5826b3ff741ee67b5bc9b7aab53fe14b9e20c58), [Mar. 25 revision](https://github.com/microchip-pic-avr-examples/pic32cm6408pl10048-low-power-design-vscode/commit/d01c8a457743358d36f4e71afa14f156f77c6fa8), all 2026 | Git commit author and changed paths, not inferred from chronology alone. | High public-history traceability; commits are unsigned, not a sole-authorship guarantee. | Microchip publication and colleague scaffold remain separate. Jan. 21 [CI/scaffold commit](https://github.com/microchip-pic-avr-examples/pic32cm6408pl10048-low-power-design-vscode/commit/d263974febf9f3567fde8c6edf91d6f5544851e6) names Akashkumar Natavarlal Jivani. |
| Follow-up TB3388 authored by Uriah | T and U, October 5 authorship confirmation | Owner-supplied later light-sensing chronology. T section 6 links L but has no named individual author byline. | Owner-confirmed authorship, not independently proven by a byline. | Preserve confirmation without inventing public authorship evidence or an exact brief release date. |
| About 9.91 µA below-threshold application average | T section 3.3, Fig. 3-7 p. 17; Table 3-1 pp. 18-19 | Atmel Power Debugger / Data Visualizer, PIC32CM PL10 Curiosity Nano, VDDIO = AVDD = 3.3 V. Whole below-threshold capture includes sampling bursts, no UART. | High published-reading traceability. | An application average, not a between-wake minimum. The capture window duration is not established by prose. |
| About 2.39 µA in an isolated 78.7 ms interval | T section 3.3, Fig. 3-9 p. 18; notes p. 19 | Same Atmel/3.3 V setup; interval isolated between successive CPU wake transitions. | High published-reading/window traceability. | Never promote this as continuous application current. |
| About 159 µA above threshold with UART; about 6.18 mA active reference | T Fig. 3-8 p. 17 and Fig. 3-2/section 3.1 pp. 11-12; Table 3-1 | Same Atmel/3.3 V setup; UART period and continuous 24 MHz active reference are distinct capture averages. | High published-reading traceability. | Each has its own caption/source/setup/state. The brief's 82.5% Standby comparison is not L's 82% SleepWalking headline. |
| Repository and brief results are not a controlled instrument swap | L and T | Different clocks, firmware/setup conditions, and capture windows. | High confidence in comparison limit. | Neither publication isolates how much the instrument change contributed. No causal reduction claim. |
| Peripheral autonomy is the design aim, not proof of exact CPU wake cadence | L Lab 4 Overview/Application Flow/Why Most Efficient; T section 3.3 steps vs. Fig. 3-7 description | L/T include ADC RESRDY to TC2 wake language as well as threshold-only assertions. | High source-conflict traceability; bench cadence not independently checked. | Case notes the conflict. Do not assert every below-threshold sample avoids waking the CPU. The brief conclusion also substitutes 895 µA for its table's 1.08 mA Standby result; the site does not reuse that conflicting Standby figure. |

## Hephaestus

| Wording and surface | Source | Conditions or window | Confidence | Qualification and review disposition |
| --- | --- | --- | --- | --- |
| ASU capstone through Psyche Student Collaborations, 2024 | H, Student Team/Project Description; P p. 3 | Academic prototype, not flight hardware. | High affiliation traceability. | Official listing supports membership and project scope, not certified subsystem performance. |
| Uriah led electronics/firmware, PIC/PSoC PCB and Hall positioning | P p. 3; HP PCB imagery | Uriah's reported subsystem role within a four-student lander team. | Traceable personal reporting; not a commit-by-commit attribution. | Separate personal integration from team lander design, fabrication, ramp tests, and simulations. |
| Six exit positions on the rotating rover platform | P p. 3; HP Our Approach | Six-door geometry; Hall feedback for rotary indexing. | High geometry traceability. | No inference of six separate Hall sensors or a specific magnet topology. |
| Board revision for motor-driver and Hall-conditioning issues | U/older project account; P p. 3 supports circuitry, HP supports PCB work | No supplied failure logs, current-rating test, or revision chronology. | Limited personal reporting. | Case labels the account as project-reported. The stronger under-rated-driver causal claim is removed pending source review. |
| Project-reported ±2° rotation accuracy | P p. 3 | Instrument, load, acceptance rule, and raw records not supplied. | High statement traceability; limited performance verification. | Caption states missing conditions. Not certified by H or established for every cycle. |
| 500+ automated positioning cycles | P p. 3 | No logs establishing accuracy or reliability for all cycles. | High statement traceability; limited validation. | Retain project-reported; do not assert 100% reliability or flight qualification. |
| Physical incline evaluation distinct from structural simulation | HP ramp photo and structural plots | Team mechanical evaluation; simulation is not a physical result. | High artifact distinction. | No new slope, load, impact, or speed headline. Team artifact caption preserves disclaimer and ownership boundary. |

## SolarSENSE

| Wording and surface | Source | Conditions or window | Confidence | Qualification and review disposition |
| --- | --- | --- | --- | --- |
| ESP32, Edge Impulse, and ESP DASH integration by Uriah | P pp. 5-7; A pp. 63-64, II.A My Contribution | Team proof of concept at ASU, 2025. | Traceable individual reflection; not independent commit attribution. | Firmware/dashboard role is separate from model training and public repository ownership. |
| Teammate-trained model; repository under Jacob Pisors | S; A pp. 63 and 66 | Training stages and contributors vary in supplied reports. | Team contribution traceable; exact trainer ownership unresolved. | Keep teammate credit. A names Ragde for initial preparation/training leadership; Jacob's publishing account does not establish sole training. |
| Moisture and salinity-related readings, not direct NPK | S active soil/salt inputs; A p. 21, 4.6 Showcase | T-Higrow analog inputs; neither calibrated EC units nor nutrient concentrations established. | High input-boundary confidence. | Metadata and captions use salinity-related, not direct nutrient analysis or guaranteed soil recommendations. |
| Offline dashboard over the ESP32's local Wi-Fi | S `SOFTAP_MODE`; A pp. 21-22, 4.4 and Fig. 5 | Phone/laptop joins local AP; no internet/router required for demonstration. | High implementation traceability. | Offline does not mean Wi-Fi-free or that model training occurred offline. |
| Potted-sample showcase validation, no single accuracy headline | A pp. 20-22, 4.3-4.6; SP | Controlled demonstration, arbitrary thresholds and multiple datasets/model iterations. | High evidence-limit confidence. | A reports 94.4% while its embedded image reads 92.73%, separately over 92% and 9/10. Do not combine them into field accuracy. |
| Showcase photograph is team evidence, not deployment | SP; A p. 25, Moving Forward | Four potted samples, sensor hardware, laptop, and group. Outdoor field study is future work. | High visual-context confidence. | No farm deployment, direct NPK sensing, calibrated salinity, or personal photo authorship claim. |

## ShadeShift

| Wording and surface | Source | Conditions or window | Confidence | Qualification and review disposition |
| --- | --- | --- | --- | --- |
| Team lead in a five-author ASU project, 2025 | R p. 1 authors/title; V metadata; P pp. 8-9 | Academic prototype, not a clinical study. | High leader/byline traceability. | Other authors remain team contributors; video-account ownership does not imply solo build or measured success. |
| This case covers the PNLC phase and unresolved latency | R p. 1 Abstract; p. 4 VII; P pp. 8-9 | Temperature/voltage-dependent switching response. | High traceability of the limitation; material chronology unresolved. | R pp. 3-4 also use PDLC and VIII uses both. Record conflict; no claim of a separately validated later improvement. |
| Tethered external-electronics design because temple arms lacked space | R pp. 2-3 IV/Fig. 2; p. 4 VII Weight and Component Placement; P p. 8 | Frame space/load tradeoff with cable-management constraints. | High design traceability; completed box assembly unverified. | Fig. 2 is enclosure CAD. Retained photo does not show an assembled external box. |
| Four explored modes: tint, hue, strobe, binasal occlusion | R pp. 2-4 | Prototype exploration includes ESP32 tint and a distinct external strobe controller. | High concept traceability; no therapeutic validation. | No implication that one ESP32 controlled every mode or that all four passed efficacy testing. |
| Printed frames, wiring, modular inserts | RP, matching R p. 4 Fig. 6 | Still photo of frame parts and colored/binasal attachments. | High visible-artifact confidence. | Photo cannot distinguish PNLC/PDLC, show switching speed, or establish a clinical device. |
| No validated later PDLC/10 Hz result asserted | R p. 4 VII-VIII continuing onto p. 5 | No project-specific 10 Hz test. Related-work PLATO timings are not ShadeShift results. | High omission confidence. | Hold a later material/switching success until a dated supporting source is supplied and approved. |
| Clinical efficacy, electrical safety, long-term wearability, trials not established by supplied sources | R VIII future work | No supplied clinical study or safety validation. | High source-limit confidence. | This describes the evidence boundary, not a claim that no testing ever occurred. |

## Employment, Education, and Supporting Work

| Wording and surface | Source | Conditions or window | Confidence | Qualification and review disposition |
| --- | --- | --- | --- | --- |
| Engineer II Jan 2026-present; MCU Applications Intern May 2025-Jan 2026 | U, saved plan/current recorded chronology | Microchip, Chandler, AZ. | User-recorded facts. | Labels retained; current project link stays visible. Specific PIC18/evaluation-board description inherited from resume reference. |
| Support Engagement Engineer Intern Aug 2024-May 2025; Corporate Applications Engineer Intern Aug 2023-Aug 2024 | U | Microchip internship progression. | User-recorded dates. | Distinct roles, not an undated three-role string. |
| More than 10 hours weekly reporting time saved | U | Personal estimate for internal reporting/engagement tools, not a controlled productivity measurement. | Personal estimate. | Estimate label is visible in the job; no tool source, customer record, or private bench data published. |
| Estimated 100+ support cases | U | Personal estimate for the corporate applications internship. | Personal estimate. | Estimate label; no claim of verified case counts or individual resolution of every case. |
| ASU Student Services Coordinator Senior Feb 2023-Dec 2025 | U | Concurrent with Microchip roles and graduate study, Mesa, AZ. | User-recorded chronology. | Full-width concurrent row. No unsupported percentage improvement from the dirty reference. |
| M.S. December 2025, 4.0 GPA, With Distinction; B.S.E. Robotics 2024 cum laude | U | Education, not an employment or firmware metric. | User-recorded credential facts. | Keep credentials in education panels. Accelerated 4+1 description is inherited resume-reference content, not independently rechecked here. |
| BLDC, PIC18/ESP32 Room Weather Control, support automation | U and W | Supporting work, not a new flagship. W's Microcontroller section identifies PIC18F27J53-I/SO, not PIC16F18877. | Public team context or owner reporting, not independent performance validation. | Keep the verified PIC18 family. No added motor performance, installation, financial savings, or percentage headline. |
| SCARA and critical-facility microgrid | U, supplied academic work | Kinematics/control study and modeled critical-facility analysis. | Owner-recorded scope. | Other systems; microgrid is not an installed system. No new measured or commercial result. |
| Chinle repair background and technical focus | U | Personal history tied to fault isolation, hardware assumptions, and bench work. | Owner-recorded account. | No employer/customer details, availability badge, or active-job-search assertion. |
| Contact at `uriah.villa2023@gmail.com` | U | Mailto handoff occurs in visitor's email app; page stores no submitted form data. | Verified local composer behavior; no delivery claim. | No third-party POST or "message sent" confirmation. |

## Approval Checklist

- Confirm the four case drafts and their qualified personal/team attribution.
- Confirm the project-reported Hephaestus figures and board-revision account, or replace them with narrower approved text.
- Confirm reuse of the existing team poster, CAD, photos, and their display derivatives. Public hosting alone does not establish permission.
- Confirm the inherited resume-reference job descriptions and accelerated-program label if they are retained.
- Keep the complete academic/research PDFs unreviewed and unlinked until a separate publication review passes.
- Obtain explicit clearance before publishing this local diff to the public repository. Merge/deploy authorization remains separate.

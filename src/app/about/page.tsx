import type { Metadata } from "next";
import Link from "next/link";

import { Contact } from "@/components/home/Contact";
import { Section, SectionHeader, StatusTag, TagList } from "@/components/ui";
import { background, profile } from "@/data/profile";
import { principles, scopeStages } from "@/data/technical";

import styles from "@/components/page/page.module.css";
import home from "@/components/home/home.module.css";

export const metadata: Metadata = {
  title: "About",
  description:
    "Background, method, and engineering principles: from component-level repair to silicon bring-up, motor control, and edge AI.",
  alternates: { canonical: "/about/" },
};

const method = [
  {
    index: "01",
    title: "Read the constraint before the solution.",
    body: "Power budget, thermal limits, pin multiplexing, bus bandwidth, and schedule. The design that ignores these is a diagram, not a build.",
  },
  {
    index: "02",
    title: "One subsystem at a time.",
    body: "First power, then clocks, then the simplest peripheral that proves the board is alive. Composite bring-up hides the fault you are looking for.",
  },
  {
    index: "03",
    title: "Measure before changing code.",
    body: "A scope trace or a logic analyzer capture settles an argument that a week of code review will not. Guessing at firmware is slower and less reliable.",
  },
  {
    index: "04",
    title: "Re-spin rather than work around.",
    body: "If the hardware is out of spec, the firmware should not have to compensate for it forever. Fix the board, then simplify the code back down.",
  },
];

export default function AboutPage() {
  return (
    <>
      <header className={styles.header}>
        <div className="container">
          <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
            <ol>
              <li>
                <Link href="/">Portfolio</Link>
              </li>
              <li aria-current="page">About</li>
            </ol>
          </nav>

          <h1 className={styles.title}>
            Started at sixteen repairing what other people gave up on.
          </h1>
          <p className={styles.lead}>
            {profile.positioning}
          </p>
        </div>
      </header>

      <Section aria-labelledby="background-title">
        <div className="container">
          <div className={styles.bodyGrid}>
            <div>
              <p className="meta">Background</p>
            </div>
            <div className={styles.prose}>
              {background.map((paragraph, index) => (
                <p
                  key={paragraph.slice(0, 32)}
                  className={index === 0 ? styles.lede : undefined}
                >
                  {paragraph}
                </p>
              ))}

              <p>
                The through-line is that embedded engineering is mostly about
                finding out what is actually true. Datasheets are optimistic,
                hardware has parasitics, and the fault that looks like firmware
                is often a signal integrity problem. Measuring first is not a
                formality — it is the fastest path to the actual defect.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section aria-labelledby="now-title">
        <div className="container">
          <div className={styles.bodyGrid}>
            <div>
              <p className="meta">Currently</p>
            </div>
            <div className={styles.prose}>
              <h2 id="now-title" style={{ marginTop: 0 }}>
                {profile.title}
              </h2>
              <p>
                {profile.statusContext}, based in {profile.location}. Authoring
                firmware application examples and reference designs across 8-bit,
                16-bit, and 32-bit PIC microcontroller families, and the
                technical collateral that goes with them.
              </p>
              <p style={{ marginTop: "var(--space-4)" }}>
                <StatusTag status={profile.status} />{" "}
                <span style={{ color: "var(--ink-tertiary)" }}>
                  — open to technical conversations
                </span>
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section aria-labelledby="method-title">
        <div className="container">
          <SectionHeader
            id="method-title"
            eyebrow="Method"
            title="How the work gets done"
            lead="Four habits that decide whether a system ships or stalls."
          />
          <div className={home.capabilityGrid}>
            {method.map((item) => (
              <div key={item.index} className={home.capability}>
                <span className={home.capabilityNumber}>{item.index}</span>
                <h3 className={home.capabilityTitle}>{item.title}</h3>
                <p className={home.capabilityText}>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section aria-labelledby="principles-title">
        <div className="container">
          <SectionHeader
            id="principles-title"
            eyebrow="Principles"
            title="What I hold to"
          />
          <div className={home.principles}>
            {principles.map((principle) => (
              <div key={principle.index} className={home.principle}>
                <span className={home.principleNumber}>{principle.index}</span>
                <h3 className={home.principleTitle}>{principle.title}</h3>
                <p className={home.principleBody}>{principle.body}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section aria-labelledby="path-title">
        <div className="container">
          <SectionHeader
            id="path-title"
            eyebrow="Scope"
            title="The path a system takes"
            lead="Where most of the hard problems actually sit."
          />
          <ol className={home.scope}>
            {scopeStages.map((stage) => (
              <li key={stage.index} className={home.scopeStep}>
                <span className={home.scopeIndex}>{stage.index}</span>
                <span className={home.scopeLabel}>{stage.label}</span>
                <span className={home.scopeDetail}>{stage.detail}</span>
              </li>
            ))}
          </ol>

          <div style={{ marginTop: "var(--space-6)" }}>
            <TagList
              items={[
                "Embedded C/C++",
                "PIC18",
                "PIC32",
                "dsPIC33",
                "PSoC 4/6",
                "ESP32",
                "KiCad",
                "Cadence Allegro",
                "Edge Impulse",
                "XENDEE",
              ]}
              accent={["Embedded C/C++"]}
            />
          </div>
        </div>
      </Section>

      <Contact
        eyebrow="Get in touch"
        heading="Have a technical problem worth solving?"
        lead="Embedded firmware, microcontroller applications, motor control, or bringing up hardware under hard constraints."
      />
    </>
  );
}

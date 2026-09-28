import Link from "next/link";

import { Reveal } from "@/components/ui/Reveal";
import {
  MetricBlock,
  Section,
  SectionHeader,
  StatusTag,
  TagList,
  TextAction,
} from "@/components/ui";
import { buildLog } from "@/data/buildLog";
import { background, education, experience } from "@/data/profile";
import { directoryCounts, projects } from "@/data/projects";
import { coverage, principles, scopeStages } from "@/data/technical";
import { profile } from "@/data/profile";

import styles from "./home.module.css";

/* -------------------------------------------------------------------------
   04 Numbered capabilities (§26)
   ------------------------------------------------------------------------- */

const capabilities = [
  {
    index: "01",
    title: "Embedded systems & silicon bring-up",
    body: "Bare-metal and RTOS firmware in embedded C/C++ on PIC18, PIC32, dsPIC33, and PSoC. Low-power optimization, clock management, interrupt service routines, and hardware DMA.",
  },
  {
    index: "02",
    title: "Application engineering & collateral",
    body: "Authoring and maintaining production application examples, reference code, and application notes — turning silicon features into designs other engineers can actually adopt.",
  },
  {
    index: "03",
    title: "Robotics, motion & motor control",
    body: "Closed-loop BLDC control, commutation, servo kinematics, and positional feedback using Hall-effect sensing and quadrature encoders, validated under dynamic load.",
  },
  {
    index: "04",
    title: "Connected systems & edge AI",
    body: "TinyML models deployed with Edge Impulse, local ESP32 telemetry dashboards, MQTT, and Python test automation across laboratory benches.",
  },
];

export function Capabilities() {
  return (
    <Section id="what-i-do" aria-labelledby="capabilities-title">
      <div className="container">
        <SectionHeader
          id="capabilities-title"
          eyebrow="Core disciplines"
          title="Engineering across silicon and motion."
          lead="Four areas of practice, each grounded in physical test rather than in theory alone."
        />
        <div className={styles.capabilityGrid}>
          {capabilities.map((capability, index) => (
            <Reveal key={capability.index} delay={index * 40} className={styles.capability}>
              <span className={styles.capabilityNumber}>{capability.index}</span>
              <h3 className={styles.capabilityTitle}>{capability.title}</h3>
              <p className={styles.capabilityText}>{capability.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* -------------------------------------------------------------------------
   05 Engineering scope (§27)
   ------------------------------------------------------------------------- */

export function Scope() {
  return (
    <Section aria-labelledby="scope-title">
      <div className="container">
        <SectionHeader
          id="scope-title"
          eyebrow="System path"
          title="From discrete electronics to validated behavior."
          lead="Most of the interesting problems sit between two of these stages, not inside one."
        />
        <ol className={styles.scope}>
          {scopeStages.map((stage) => (
            <li key={stage.index} className={styles.scopeStep}>
              <span className={styles.scopeIndex}>{stage.index}</span>
              <span className={styles.scopeLabel}>{stage.label}</span>
              <span className={styles.scopeDetail}>{stage.detail}</span>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}

/* -------------------------------------------------------------------------
   06 Technical coverage (§28)
   ------------------------------------------------------------------------- */

export function Coverage() {
  return (
    <Section id="coverage" aria-labelledby="coverage-title">
      <div className="container">
        <SectionHeader
          id="coverage-title"
          eyebrow="Technical matrix"
          title="Silicon, buses, instruments, and the software around them."
          action={
            <TextAction href="/workspace">Full coverage in the workspace</TextAction>
          }
        />
        <div className={styles.coverage}>
          {coverage.map((group) => (
            <div key={group.id} className={styles.coverageGroup}>
              <h3 className={styles.coverageTitle}>{group.title}</h3>
              <p className={styles.coverageDescription}>{group.description}</p>
              <TagList items={group.items.map((item) => item.label)} />
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* -------------------------------------------------------------------------
   07 Engineering metrics (§29, §30)
   ------------------------------------------------------------------------- */

export function Metrics() {
  const metrics = [
    { value: `${directoryCounts.total}`, label: "Systems indexed" },
    { value: "8→32", label: "MCU architecture range", tabular: false },
    { value: "10+", label: "MCU application examples" },
    { value: "500+", label: "Automated test cycles" },
    { value: "5", label: "MCU families in the matrix" },
    { value: "4.0", label: "M.S. Engineering GPA" },
  ];

  return (
    <Section aria-label="Engineering metrics">
      <div className="container">
        <div className={styles.metricsStrip}>
          {metrics.map((metric) => (
            <div key={metric.label} className={styles.metricsCell}>
              <MetricBlock
                value={metric.value}
                label={metric.label}
                tabular={metric.tabular !== false}
              />
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* -------------------------------------------------------------------------
   08 Experience (§31)
   ------------------------------------------------------------------------- */

export function Experience() {
  return (
    <Section id="experience" aria-labelledby="experience-title">
      <div className="container">
        <SectionHeader
          id="experience-title"
          eyebrow="Career & study"
          title="Professional tenure, study, and automation."
          action={<TextAction href="/experience">Full history and education</TextAction>}
        />

        <div className={styles.rows}>
          {experience.map((role) => (
            <article key={role.company} className={styles.row}>
              <div className={styles.rowAside}>
                <h3 className={styles.rowCompany}>{role.company}</h3>
                <p className={`${styles.rowDate} meta`}>
                  {role.start} — {role.end}
                </p>
                <p className={`${styles.rowDate} meta`}>{role.location}</p>
              </div>
              <div className={styles.rowBody}>
                <p className={styles.rowRole}>{role.role}</p>
                <p className={styles.rowSummary}>{role.summary}</p>
                <ul className={styles.rowBullets}>
                  {role.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
                {role.progression ? (
                  <p className={`${styles.rowDate} meta`}>
                    {role.progression}
                  </p>
                ) : null}
              </div>
            </article>
          ))}
        </div>

        <div className={styles.educationGrid}>
          {education.map((entry) => (
            <article key={entry.degree} className={styles.educationCard}>
              <p className="meta">{entry.institution}</p>
              <h3 className={styles.educationDegree}>{entry.degree}</h3>
              <p className={styles.educationMeta}>
                {entry.field} · {entry.date}
              </p>
              <p className={styles.rowSummary}>{entry.detail}</p>
              <div className={styles.educationHonors}>
                {entry.honors.map((honor) => (
                  <span key={honor} className={styles.honor}>
                    {honor}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* -------------------------------------------------------------------------
   09 Build log preview (§32)
   ------------------------------------------------------------------------- */

export function BuildLogPreview() {
  const recent = buildLog.slice(0, 3);

  return (
    <Section id="build-log" aria-labelledby="build-log-title">
      <div className="container">
        <SectionHeader
          id="build-log-title"
          eyebrow="Chronological activity"
          title="Engineering log and milestones."
          lead="Dated entries only. Nothing is logged that did not happen."
          action={<TextAction href="/workspace">Full build log in the workspace</TextAction>}
        />
        <div className={styles.logFeed}>
          {recent.map((entry) => (
            <article key={entry.id} className={styles.logEntry}>
              <div className={styles.logAside}>
                <span className={styles.logDate}>{entry.date}</span>
                <StatusTag status={entry.status} />
              </div>
              <div className={styles.logBody}>
                <h3 className={styles.logTitle}>{entry.title}</h3>
                <p className={styles.logSummary}>{entry.summary}</p>
              </div>
              <div>
                <p className="meta">{entry.project}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* -------------------------------------------------------------------------
   10 Principles (§34)
   ------------------------------------------------------------------------- */

export function Principles() {
  return (
    <Section id="principles" aria-labelledby="principles-title">
      <div className="container">
        <SectionHeader
          id="principles-title"
          eyebrow="Operational philosophy"
          title="How the work gets done."
        />
        <div className={styles.principles}>
          {principles.map((principle) => (
            <div key={principle.index} className={styles.principle}>
              <span className={styles.principleNumber}>{principle.index}</span>
              <h3 className={styles.principleTitle}>{principle.title}</h3>
              <p className={styles.principleBody}>{principle.body}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* -------------------------------------------------------------------------
   11 About (§35)
   ------------------------------------------------------------------------- */

export function About() {
  const competencies = [
    "Bare-metal embedded C/C++ firmware",
    "Custom PCB design in KiCad and Cadence Allegro",
    "Oscilloscope and logic analyzer validation",
    "Closed-loop BLDC and stepper control",
    "Sensor conditioning and on-device TinyML",
  ];
  const distinctions = [
    "M.S. in Engineering, ASU — 4.0 GPA, with distinction",
    "B.S.E. in Robotics, ASU — cum laude",
    "Capstone design lead, NASA Psyche / ASU",
  ];

  return (
    <Section id="about" aria-labelledby="about-title">
      <div className="container">
        <SectionHeader
          id="about-title"
          eyebrow="Background"
          title="Learned electronics by repairing what failed."
        />
        <div className={styles.aboutGrid}>
          <div className={styles.aboutBody}>
            {background.map((paragraph) => (
              <p key={paragraph.slice(0, 32)}>{paragraph}</p>
            ))}
          </div>
          <div className={styles.aboutAside}>
            <div className={styles.aboutBlock}>
              <h3 className={`${styles.aboutBlockTitle} meta`}>Core competencies</h3>
              <ul className={styles.aboutList}>
                {competencies.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className={styles.aboutBlock}>
              <h3 className={`${styles.aboutBlockTitle} meta`}>Distinctions</h3>
              <ul className={styles.aboutList}>
                {distinctions.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className={styles.aboutBlock}>
              <h3 className={`${styles.aboutBlockTitle} meta`}>Currently</h3>
              <ul className={styles.aboutList}>
                <li>
                  {profile.title}, {profile.location}.{" "}
                  <Link href="/contact">Get in touch →</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

/** Directory teaser used by the /work page header. */
export const directorySummary = {
  total: projects.length,
  disciplines: directoryCounts.disciplines,
};

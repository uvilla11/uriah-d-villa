import { ButtonPrimary, TextAction } from "@/components/ui";
import { profile } from "@/data/profile";
import { directoryCounts } from "@/data/projects";
import { scopeStages } from "@/data/technical";

import styles from "./home.module.css";

/**
 * Hero (§18).
 *
 * Editorial statement on the left, and a technical figure on the right that
 * is real readable text rather than decoration: the stage path an embedded
 * system actually walks, from hardware to validation. It answers "what does
 * this person do" before a visitor reads a single project.
 */
export function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={`container ${styles.heroGrid}`}>
        <div>
          <p className={`${styles.heroEyebrow} meta`}>
            <span className={styles.pulseDot} aria-hidden="true" />
            <span>
              Microchip Technology · New Product Development
            </span>
          </p>

          <h1 className={styles.heroTitle} id="hero-title">
            Embedded systems,
            <br />
            from <span className={styles.heroTitleAccent}>silicon</span> to motion.
          </h1>

          <p className={styles.heroLead}>
            I design circuit boards, bring up bare-metal firmware, and close the
            loop on physical systems — spanning 8-bit to 32-bit PIC
            microcontrollers, motor drives, robotics, and edge AI.
          </p>

          <div className={styles.heroActions}>
            <ButtonPrimary href="/work">
              View selected work
              <span aria-hidden="true">↓</span>
            </ButtonPrimary>
            <TextAction href="/workspace">Engineering workspace</TextAction>
          </div>
        </div>

        <div className={styles.instrument}>
          <div className={`${styles.instrumentHead} meta`}>
            <span>Signal path</span>
            <span>{profile.title}</span>
          </div>

          <ol className={styles.instrumentList}>
            {scopeStages.map((stage) => (
              <li key={stage.index} className={styles.instrumentRow}>
                <span className={styles.instrumentIndex}>{stage.index}</span>
                <span className={styles.instrumentLabel}>{stage.label}</span>
                <span className={styles.instrumentDetail}>{stage.detail}</span>
              </li>
            ))}
          </ol>

          <div className={styles.instrumentFoot}>
            {/* Instrument trace: an indexed position signal, drawn as the
                hardware would present it. Decorative detail — the stage list
                above carries the meaning, so this is hidden from assistive
                technology and static under Reduced Motion. */}
            <svg
              className={styles.trace}
              viewBox="0 0 300 34"
              preserveAspectRatio="none"
              aria-hidden="true"
              focusable="false"
            >
              <path
                className={styles.tracePath}
                d="M0 17H40L44 8H96L100 17l4 4 4-8 4 6 4-2h54l4-7h26l4 7 4 3h92"
              />
              <path
                className={`${styles.tracePath} ${styles.traceActive}`}
                d="M44 8H96"
              />
              <line
                className={styles.traceSweep}
                x1="0"
                y1="2"
                x2="0"
                y2="32"
                stroke="var(--accent)"
                strokeWidth="1"
                opacity="0.35"
                data-ambient-motion
              />
            </svg>

            <p className="meta">
              {directoryCounts.total} systems indexed ·{" "}
              {directoryCounts.featured} flagship case studies
            </p>
          </div>
        </div>
      </div>

      <div className={`container ${styles.heroRule}`} aria-hidden="true" />
    </section>
  );
}

/** Current signals (§19). Information rows, not cards. */
export function Signals() {
  const signals = [
    {
      label: "Current role",
      value: `${profile.title}`,
      context: profile.statusContext,
    },
    {
      label: "System focus",
      value: "Embedded · Firmware · Motor control",
      context: "Silicon to motion systems",
    },
    {
      label: "Systems indexed",
      value: `${directoryCounts.total} projects`,
      context: `${directoryCounts.featured} flagship case studies`,
    },
    {
      label: "Status",
      value: profile.status,
      context: `${profile.location} · Bench validation`,
    },
  ];

  return (
    <aside className={styles.signals} aria-label="Current operational status">
      <div className={`container ${styles.signalsGrid}`}>
        {signals.map((signal) => (
          <div key={signal.label} className={styles.signal}>
            <p className="meta">{signal.label}</p>
            <p className={styles.signalValue}>{signal.value}</p>
            <p className={styles.signalContext}>{signal.context}</p>
          </div>
        ))}
      </div>
    </aside>
  );
}

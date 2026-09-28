import type { Metadata } from "next";

import { ButtonPrimary, Section, StatusTag, TextAction } from "@/components/ui";
import { projects } from "@/data/projects";

import styles from "./not-found.module.css";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

/** 404 (§86). Clear message, useful exits, a restrained signal motif. */
export default function NotFound() {
  return (
    <Section flush>
      <div className={`container ${styles.inner}`}>
        <div>
          <p className="meta">Error 404 · No route</p>
          <h1 className={styles.title}>
            That path is not
            <br />
            in the directory.
          </h1>
          <p className={styles.lead}>
            The page you asked for does not exist. Nothing has been removed
            silently — the project registry has {projects.length} systems, and
            all of them are reachable from the work index.
          </p>

          <div className={styles.actions}>
            <ButtonPrimary href="/">Back to home</ButtonPrimary>
            <TextAction href="/work">Browse the project directory</TextAction>
            <TextAction href="/workspace">Open the workspace</TextAction>
          </div>
        </div>

        {/* Signal motif: a flat trace that breaks off, and a status line. */}
        <div className={styles.figure} aria-hidden="true">
          <svg
            className={styles.trace}
            viewBox="0 0 320 60"
            preserveAspectRatio="none"
            focusable="false"
          >
            <path className={styles.tracePath} d="M0 30H180" />
            <path className={styles.traceGap} d="M180 30h12" />
            <path className={styles.tracePath} d="M192 30h60" />
          </svg>
          <p className={`${styles.figureStatus} meta`}>
            <StatusTag status="WATCH" />
            <span>Signal lost — no carrier</span>
          </p>
        </div>
      </div>
    </Section>
  );
}

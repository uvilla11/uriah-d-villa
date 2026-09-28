import type { ReactNode } from "react";

import styles from "../panels.module.css";

/**
 * Workspace panel (§41).
 *
 * A bordered, flat container with a quiet header. Panels are only added where
 * they carry information that appears nowhere else on the site — this is the
 * one place on the site that is allowed to feel like a tool.
 */
export function Panel({
  id,
  title,
  description,
  aside,
  children,
  labelledBy,
}: {
  id: string;
  title: string;
  description?: string;
  aside?: ReactNode;
  children: ReactNode;
  /** Set when the visible heading is provided by the caller. */
  labelledBy?: string;
}) {
  const headingId = `${id}-title`;

  return (
    <section
      className={styles.panel}
      id={id}
      aria-labelledby={labelledBy ?? headingId}
    >
      <header className={styles.panelHead}>
        <div>
          <h2 className={styles.panelTitle} id={headingId}>
            {title}
          </h2>
          {description ? (
            <p className={styles.panelDescription}>{description}</p>
          ) : null}
        </div>
        {aside ? <div className={styles.panelAside}>{aside}</div> : null}
      </header>
      <div className={styles.panelBody}>{children}</div>
    </section>
  );
}

/** Small labelled figure used inside panels (§40). */
export function PanelStat({
  label,
  value,
  note,
}: {
  label: string;
  value: string;
  note?: string;
}) {
  return (
    <div className={styles.stat}>
      <p className={`${styles.statLabel} meta`}>{label}</p>
      <p className={styles.statValue}>{value}</p>
      {note ? <p className={styles.statNote}>{note}</p> : null}
    </div>
  );
}

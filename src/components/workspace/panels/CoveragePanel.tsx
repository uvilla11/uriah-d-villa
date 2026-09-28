import { coverage } from "@/data/technical";

import { Panel } from "./Panel";
import styles from "../panels.module.css";

/**
 * Technical coverage with a usage note per item (§28).
 *
 * The note is the point: "DMA" alone says nothing, "Offload transfers from the
 * CPU" says what it was actually used for.
 */
export function CoveragePanel() {
  return (
    <div id="coverage">
      <Panel
        id="coverage-panel"
        title="Technical coverage"
        description="Grouped by function, with how each capability was applied."
      >
        <div className={styles.coverageGrid}>
          {coverage.map((group) => (
            <section key={group.id} className={styles.coverageGroup}>
              <h3 className={styles.coverageTitle}>{group.title}</h3>
              <p className={styles.coverageDescription}>{group.description}</p>
              <dl className={styles.coverageList}>
                {group.items.map((item) => (
                  <div key={item.label} className={styles.coverageItem}>
                    <dt className="mono">{item.label}</dt>
                    <dd>{item.note}</dd>
                  </div>
                ))}
              </dl>
            </section>
          ))}
        </div>
      </Panel>
    </div>
  );
}

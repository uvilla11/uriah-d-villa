import Link from "next/link";

import { StatusTag } from "@/components/ui";
import { buildLog } from "@/data/buildLog";

import { Panel } from "./Panel";
import styles from "../panels.module.css";

/** Full chronological build log (§32). */
export function BuildLogPanel() {
  return (
    <div id="build-log">
      <Panel
        id="build-log-panel"
        title="Build log"
        description="Dated engineering activity. Entries exist only where the date and event are known."
        aside={
          <p className="meta">
            {buildLog.length} entries · {buildLog[buildLog.length - 1].date} to{" "}
            {buildLog[0].date}
          </p>
        }
      >
        <ol className={styles.log}>
          {buildLog.map((entry) => (
            <li key={entry.id} className={styles.logEntry}>
              <div className={styles.logAside}>
                <span className={styles.logDate}>{entry.date}</span>
                <StatusTag status={entry.status} />
              </div>

              <div className={styles.logBody}>
                <h3 className={styles.logTitle}>{entry.title}</h3>
                <p className={styles.logSummary}>{entry.summary}</p>
                {entry.changes.length > 0 ? (
                  <ul className={styles.logChanges}>
                    {entry.changes.map((change) => (
                      <li key={change}>{change}</li>
                    ))}
                  </ul>
                ) : null}
              </div>

              <div className={styles.logMeta}>
                <p className="meta">{entry.project}</p>
                {entry.projectSlug ? (
                  <Link
                    className={styles.logLink}
                    href={`/work/${entry.projectSlug}`}
                  >
                    Case →
                  </Link>
                ) : null}
              </div>
            </li>
          ))}
        </ol>
      </Panel>
    </div>
  );
}

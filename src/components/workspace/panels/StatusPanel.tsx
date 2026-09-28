import { StatusTag } from "@/components/ui";
import { buildLog } from "@/data/buildLog";
import { profile } from "@/data/profile";
import { directoryCounts } from "@/data/projects";

import { Panel, PanelStat } from "./Panel";
import styles from "../panels.module.css";

/** Project state summary (§41). Counts derived from the registry, not typed. */
export function StatusPanel() {
  const latest = buildLog[0];
  const buckets = [
    { label: "Validated", value: directoryCounts.validated },
    { label: "Building", value: directoryCounts.building },
    { label: "Deployed", value: directoryCounts.deployed },
    { label: "Active", value: directoryCounts.active },
  ];

  return (
    <div id="overview">
      <Panel
        id="state"
        title="Project state"
        description="Lifecycle counts, derived from the project registry at build time."
        aside={<StatusTag status={profile.status} />}
      >
        <div className={styles.statGrid}>
          <PanelStat
            label="Systems indexed"
            value={`${directoryCounts.total}`}
            note="Across the project registry"
          />
          <PanelStat
            label="Disciplines"
            value={`${directoryCounts.disciplines}`}
            note="Embedded, firmware, robotics, AI, power, automation"
          />
          <PanelStat
            label="Current role"
            value="Engineer II"
            note="MCU Applications · New Product Development"
          />
          <PanelStat
            label="Last activity"
            value={latest.date}
            note={latest.project}
          />
        </div>

        {/*
          Proportional bars. No axis, no legend, no gradient — the number is
          already stated, so the bar is a secondary cue only. The track is
          filled proportional to the total project count rather than to the
          largest bucket, so the widths stay comparable and do not read as a
          ranking.
        */}
        <ul className={styles.bars}>
          {buckets.map((bucket) => (
            <li key={bucket.label} className={styles.barRow}>
              <span className={styles.barLabel}>{bucket.label}</span>
              <span className={styles.barTrack} aria-hidden="true">
                <span
                  className={styles.barFill}
                  style={{
                    width: `${Math.max(
                      (bucket.value / directoryCounts.total) * 100,
                      bucket.value > 0 ? 2 : 0,
                    )}%`,
                  }}
                />
              </span>
              <span className={`${styles.barValue} tabular`}>{bucket.value}</span>
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}

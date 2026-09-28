import type { Metadata } from "next";
import Link from "next/link";

import { StatusTag } from "@/components/ui";
import { WorkspaceSidebar } from "@/components/workspace/WorkspaceSidebar";
import { BuildLogPanel } from "@/components/workspace/panels/BuildLogPanel";
import { CoveragePanel } from "@/components/workspace/panels/CoveragePanel";
import { DirectoryPanel } from "@/components/workspace/panels/DirectoryPanel";
import { EquipmentPanel } from "@/components/workspace/panels/EquipmentPanel";
import { SiliconPanel } from "@/components/workspace/panels/SiliconPanel";
import { StatusPanel } from "@/components/workspace/panels/StatusPanel";
import { ValidationPanel } from "@/components/workspace/panels/ValidationPanel";
import { buildLog } from "@/data/buildLog";
import { profile } from "@/data/profile";
import { directoryCounts } from "@/data/projects";

import styles from "@/components/workspace/workspace.module.css";

export const metadata: Metadata = {
  title: "Engineering Workspace",
  description:
    "Project directory, silicon and bus matrix, validation results, bench equipment, and the engineering build log in one operational view.",
  alternates: { canonical: "/workspace/" },
};

export default function WorkspacePage() {
  // The most recent build-log entry drives the "current" summary: a visitor
  // landing here wants to know what was last worked on, not just a date.
  const latest = buildLog[0];

  return (
    <div className={styles.shell}>
      <WorkspaceSidebar />

      <div className={styles.main}>
        <header className={styles.header}>
          <div className="container">
            <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
              <ol>
                <li>
                  <Link href="/">Portfolio</Link>
                </li>
                <li aria-current="page">Workspace</li>
              </ol>
            </nav>

            <h1 className={styles.title}>Engineering work, in context.</h1>
            <p className={styles.lead}>
              The same systems as the portfolio, reorganised as an operational
              view: current state, silicon coverage, validation results, and the
              dated build log.
            </p>

            <dl className={styles.summary}>
              <SummaryItem
                label="Last activity"
                value={latest.project}
                note={`${latest.date} · ${latest.title}`}
              />
              <SummaryItem
                label="Primary role"
                value={profile.title}
                note="New Product Development"
              />
              <SummaryItem
                label="Systems"
                value={`${directoryCounts.total}`}
                note={`${directoryCounts.featured} flagship · ${directoryCounts.building} building`}
              />
              <SummaryItem
                label="Status"
                value={profile.status}
                note={profile.location}
                status
              />
            </dl>
          </div>
        </header>

        <div className="container">
          <StatusPanel />
          <DirectoryPanel />
          <SiliconPanel />
          <ValidationPanel />
          <CoveragePanel />
          <EquipmentPanel />
          <BuildLogPanel />
        </div>
      </div>
    </div>
  );
}

function SummaryItem({
  label,
  value,
  note,
  status,
}: {
  label: string;
  value: string;
  note: string;
  status?: boolean;
}) {
  return (
    <div className={styles.summaryItem}>
      <dt className={`${styles.summaryLabel} meta`}>{label}</dt>
      <dd className={styles.summaryValue}>
        {status ? <StatusTag status={profile.status} /> : value}
      </dd>
      <p className={styles.summaryNote}>{note}</p>
    </div>
  );
}

import Link from "next/link";

import {
  Media,
  Section,
  SectionHeader,
  StatusTag,
  TagList,
  TextAction,
} from "@/components/ui";
import { featuredProjects } from "@/data/projects";
import type { Project } from "@/lib/types";

import styles from "./home.module.css";

/** Three headline numbers, drawn only from documented measurements. */
function inlineMetrics(project: Project) {
  return project.measurements.slice(0, 3).map((measurement) => (
    <div key={measurement.label}>
      <p className={styles.inlineMetricValue}>
        {measurement.value}
        {measurement.unit ? (
          <span style={{ fontSize: "0.6em", marginLeft: "0.15em" }}>
            {measurement.unit}
          </span>
        ) : null}
      </p>
      <p className={`${styles.inlineMetricLabel} meta`}>{measurement.label}</p>
    </div>
  ));
}

function Topline({ project }: { project: Project }) {
  return (
    <div className={`${styles.featuredTopline} meta`}>
      <span>
        {project.category}
        {project.confidential ? " · Confidential" : ""}
      </span>
      <StatusTag status={project.status} stage={project.stage} />
    </div>
  );
}

/**
 * Flagship case studies (§21).
 *
 * The first project gets the full split treatment, two get a two-up grid, and
 * the modelling study gets a wide text row — because it has no imagery to
 * carry it and does not need any.
 */
export function SelectedWork() {
  const [flagship, second, third, fourth] = featuredProjects;

  return (
    <Section id="work" aria-labelledby="work-title">
      <div className="container">
        <SectionHeader
          id="work-title"
          eyebrow="Selected evidence"
          title="Systems built, measured, and taken apart again."
          lead="Physical proof-of-concepts and a modelling study, each documented down to the constraints that forced the design decisions."
        />

        {/* Flagship: full split with imagery */}
        <article className={`${styles.featured} ${styles.featuredSplit}`}>
          <Media
            className={styles.featuredMedia}
            src={flagship.media[0].src}
            alt={flagship.media[0].alt}
            sizes="(min-width: 1000px) 58vw, 100vw"
            priority
            zoom
          />
          <div className={styles.featuredBody}>
            <div>
              <Topline project={flagship} />
              <h3 className={styles.featuredTitle}>
                <Link href={`/work/${flagship.slug}`}>{flagship.title}</Link>
              </h3>
              <p className={styles.featuredSummary}>{flagship.summary}</p>
            </div>
            <div>
              <div className={styles.inlineMetrics}>{inlineMetrics(flagship)}</div>
              <p style={{ marginTop: "var(--space-4)" }}>
                <TextAction
                  href={`/work/${flagship.slug}`}
                  className={styles.cta}
                >
                  Read case study
                </TextAction>
              </p>
            </div>
          </div>
        </article>

        {/* Two-up */}
        <div className={styles.featuredGrid}>
          {[second, third].map((project) => (
            <article key={project.slug} className={styles.featured}>
              <Media
                className={styles.featuredMedia}
                src={project.media[0].src}
                alt={project.media[0].alt}
                sizes="(min-width: 800px) 46vw, 100vw"
                zoom
              />
              <div className={styles.featuredBody}>
                <div>
                  <Topline project={project} />
                  <h3 className={styles.featuredTitle}>
                    <Link href={`/work/${project.slug}`}>{project.title}</Link>
                  </h3>
                  <p className={styles.featuredSummary}>{project.summary}</p>
                </div>
                <TagList items={project.technologies.slice(0, 4)} />
                <TextAction
                  href={`/work/${project.slug}`}
                  className={styles.cta}
                >
                  View case study
                </TextAction>
              </div>
            </article>
          ))}
        </div>

        {/* Wide text row: no media, so the text gets the full measure */}
        <article className={`${styles.featured} ${styles.featuredWide}`}>
          <div className={styles.featuredBody}>
            <div>
              <Topline project={fourth} />
              <h3 className={styles.featuredTitle}>
                <Link href={`/work/${fourth.slug}`}>{fourth.title}</Link>
              </h3>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
              <p className={styles.featuredSummary} style={{ maxWidth: "64ch" }}>
                {fourth.summary}
              </p>
              <div className={styles.inlineMetrics}>{inlineMetrics(fourth)}</div>
              <TextAction
                href={`/work/${fourth.slug}`}
                className={styles.cta}
              >
                View simulation study
              </TextAction>
            </div>
          </div>
        </article>
      </div>
    </Section>
  );
}

"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { StatusTag } from "@/components/ui";
import { directoryCounts, projectDirectory } from "@/data/projects";
import { resourceHref } from "@/lib/resource";
import type { Discipline, Project } from "@/lib/types";

import styles from "./work.module.css";

/**
 * Searchable, filterable project directory (§23–§25).
 *
 * Rendered server-side as a complete list so the directory is readable with
 * JavaScript disabled; search and filters are layered on top. Counts are
 * announced politely rather than by changing the list silently.
 */
export function ProjectDirectory() {
  const all = projectDirectory();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Discipline | "all">("all");

  const disciplines = useMemo(() => {
    const found = new Set<Discipline>();
    for (const project of all) {
      for (const discipline of project.disciplines) found.add(discipline);
    }
    return [...found].sort();
  }, [all]);

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return all.filter((project) => {
      const matchesFilter =
        filter === "all" || project.disciplines.includes(filter);
      if (!matchesFilter) return false;
      if (!needle) return true;
      return [
        project.title,
        project.summary,
        project.category,
        project.platform,
        project.role,
        ...project.technologies,
        ...project.protocols,
        ...project.platforms,
      ]
        .join(" ")
        .toLowerCase()
        .includes(needle);
    });
  }, [all, filter, query]);

  return (
    <section
      className={styles.directory}
      aria-labelledby="directory-title"
    >
      <div className="container">
        <div className={styles.directoryHead}>
          <h2 className={styles.directoryTitle} id="directory-title">
            Project directory
          </h2>
          <p className={styles.directoryCount} role="status" aria-live="polite">
            {visible.length} of {all.length} shown
          </p>
        </div>

        <div className={styles.controls}>
          <div className={styles.searchField}>
            <svg
              className={styles.searchIcon}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.9-3.9" />
            </svg>
            <label className="sr-only" htmlFor="project-search">
              Search projects by name, technology, or protocol
            </label>
            <input
              id="project-search"
              className={styles.search}
              type="search"
              /* Stated explicitly as well as via the visually hidden label:
                 a placeholder is not an accessible name. */
              aria-label="Search projects by name, technology, or protocol"
              placeholder="Search projects, silicon, protocols…"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>

          <div
            className={styles.filters}
            role="group"
            aria-label="Filter projects by discipline"
          >
            <FilterPill
              label="All"
              selected={filter === "all"}
              onSelect={() => setFilter("all")}
            />
            {disciplines.map((discipline) => (
              <FilterPill
                key={discipline}
                label={discipline}
                selected={filter === discipline}
                onSelect={() => setFilter(discipline)}
              />
            ))}
          </div>
        </div>

        {visible.length > 0 ? (
          <ul className={styles.rows}>
            {visible.map((project) => (
              <ProjectRow key={project.slug} project={project} />
            ))}
          </ul>
        ) : (
          <div className={styles.empty}>
            <p className={styles.emptyTitle}>
              No projects match those filters.
            </p>
            <p className={styles.emptyBody}>
              Clear the search box or choose a different discipline to see the
              remaining {all.length} systems.
            </p>
            <button
              type="button"
              className={styles.emptyReset}
              onClick={() => {
                setQuery("");
                setFilter("all");
              }}
            >
              Reset filters
            </button>
          </div>
        )}

        <dl className={styles.tallies}>
          <Tally value={directoryCounts.total} label="Systems" />
          <Tally value={directoryCounts.featured} label="Flagship" />
          <Tally value={directoryCounts.building} label="Building" />
          <Tally value={directoryCounts.validated} label="Validated" />
          <Tally value={directoryCounts.deployed} label="Deployed" />
          <Tally value={directoryCounts.active} label="Active" />
        </dl>
      </div>
    </section>
  );
}

function FilterPill({
  label,
  selected,
  onSelect,
}: {
  label: string;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      className={styles.pill}
      aria-pressed={selected}
      onClick={onSelect}
    >
      {label}
    </button>
  );
}

/** A directory row (§24). Text-first, tabular index, 52–64px target. */
function ProjectRow({ project }: { project: Project }) {
  const hasCaseStudy = project.featured;

  const content = (
    <>
      <span className={`${styles.rowIndex} tabular`}>{project.index}</span>

      <span className={styles.rowName}>
        <span className={styles.rowTitle}>{project.title}</span>
        <span className={styles.rowSummary}>{project.summary}</span>
      </span>

      <span className={styles.rowCategory}>{project.category}</span>

      <span className={styles.rowPlatform}>
        <span className={styles.rowCellLabel}>Platform</span>
        {project.platform}
      </span>

      <span className={styles.rowStatus}>
        <span className={styles.rowCellLabel}>Status</span>
        <StatusTag status={project.status} stage={project.stage} />
      </span>

      <span className={`${styles.rowYear} tabular`}>
        <span className={styles.rowCellLabel}>Year</span>
        {project.year}
      </span>

      <span className={styles.rowAction}>
        {hasCaseStudy ? (
          <span className={styles.rowArrow} aria-hidden="true">
            →
          </span>
        ) : project.artifacts[0] ? (
          <span className={styles.rowArtifact}>
            {project.artifacts[0].external ? "↗" : "↓"}
          </span>
        ) : null}
        <span className="sr-only">
          {hasCaseStudy
            ? `Read the ${project.title} case study`
            : project.artifacts[0]
              ? `Open artifact: ${project.artifacts[0].label}`
              : ""}
        </span>
      </span>
    </>
  );

  const className = styles.row;

  if (hasCaseStudy) {
    return (
      <li>
        <Link className={className} href={`/work/${project.slug}`}>
          {content}
        </Link>
      </li>
    );
  }

  const artifact = project.artifacts[0];
  if (!artifact) {
    return (
      <li>
        <div className={styles.rowStatic}>{content}</div>
      </li>
    );
  }

  return (
    <li>
      <a
        className={className}
        href={resourceHref(artifact.href, artifact.external)}
        {...(artifact.external
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        {content}
      </a>
    </li>
  );
}

/**
 * A `dt` needs a `dd`, so the tally is a definition list with the count
 * carried in the value slot.
 */
function Tally({ value, label }: { value: number; label: string }) {
  return (
    <div className={styles.tally}>
      <dt className={styles.tallyLabel}>{label}</dt>
      <dd className={`${styles.tallyValue} tabular`}>{value}</dd>
    </div>
  );
}

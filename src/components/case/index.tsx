import Link from "next/link";

import { StatusTag, TechnicalTable, VerdictTag } from "@/components/ui";
import { resourceHref } from "@/lib/resource";
import type { Project } from "@/lib/types";

import styles from "./case.module.css";

/* -------------------------------------------------------------------------
   Case header (§45)
   ------------------------------------------------------------------------- */

export function CaseHeader({ project }: { project: Project }) {
  const facts: { label: string; value: string }[] = [
    { label: "Role", value: project.role },
    { label: "Context", value: project.context },
    { label: "Platform", value: project.platform },
    { label: "Status", value: `${project.stage ? `${project.stage} · ` : ""}${project.status}` },
    { label: "Year", value: project.year },
  ];

  return (
    <header className={styles.header}>
      <div className="container">
        <Link className={styles.backLink} href="/work">
          <span aria-hidden="true">←</span> All work
        </Link>

        <div className={styles.headerEyebrow}>
          <span className="meta">{project.category}</span>
          {project.confidential ? (
            <span className="meta" style={{ color: "var(--attention)" }}>
              Confidential · Technical details limited
            </span>
          ) : null}
        </div>

        <h1 className={styles.headerTitle}>{project.title}</h1>
        <p className={styles.headerResult}>{project.result}</p>

        <dl className={styles.metaStrip}>
          {facts.map((fact) => (
            <div key={fact.label} className={styles.metaItem}>
              <dt className={`${styles.metaLabel} meta`}>{fact.label}</dt>
              <dd className={styles.metaValue}>
                {fact.label === "Status" ? (
                  <StatusTag status={project.status} stage={project.stage} />
                ) : (
                  fact.value
                )}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </header>
  );
}

/* -------------------------------------------------------------------------
   Measurement cards (§53)
   ------------------------------------------------------------------------- */

export function CaseMeasurements({ project }: { project: Project }) {
  if (project.measurements.length === 0) return null;

  return (
    <section className="container" aria-label="Measured results">
      <div className={styles.measureStrip}>
        {project.measurements.map((measurement) => (
          <div key={measurement.label} className={styles.measure}>
            <p className={styles.measureValue}>
              {measurement.value}
              {measurement.unit ? (
                <span className={styles.measureUnit}>{measurement.unit}</span>
              ) : null}
            </p>
            <p className={`${styles.measureLabel} meta`}>{measurement.label}</p>
            <p className={styles.measureCondition}>{measurement.condition}</p>
            <p className={styles.measureInterpretation}>
              {measurement.interpretation}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------
   Facts rail
   ------------------------------------------------------------------------- */

export function FactsAside({ project }: { project: Project }) {
  const facts: { label: string; items: string[] }[] = [
    { label: "Silicon", items: project.platforms },
    { label: "Protocols", items: project.protocols },
    { label: "Hardware", items: project.hardware },
    { label: "Tooling", items: project.technologies },
  ].filter((fact) => fact.items.length > 0);

  return (
    <aside className={styles.facts} aria-label="Project specification">
      {facts.map((fact) => (
        <div key={fact.label} className={styles.fact}>
          <p className={`${styles.factLabel} meta`}>{fact.label}</p>
          <ul className={styles.factValue}>
            {fact.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </aside>
  );
}

/* -------------------------------------------------------------------------
   Narrative + decisions + limitations
   ------------------------------------------------------------------------- */

export function Prose({
  project,
  hasNarrative,
}: {
  project: Project;
  hasNarrative: boolean;
}) {
  if (!hasNarrative) {
    return (
      <div className={styles.split}>
        <div className={styles.caseSection} style={{ marginTop: 0 }}>
          <h2 className={styles.caseSectionTitle}>Scope</h2>
          {project.implementation.map((line) => (
            <p key={line} className={styles.caseSectionLead}>
              {line}
            </p>
          ))}
        </div>
        <div className={styles.caseSection} style={{ marginTop: 0 }}>
          <h2 className={styles.caseSectionTitle}>Result</h2>
          {project.outcomes.length > 0 ? (
            <ul>
              {project.outcomes.map((outcome) => (
                <li key={outcome}>{outcome}</li>
              ))}
            </ul>
          ) : (
            <p className={styles.caseSectionLead}>
              A supporting build in the directory. Full detail is not published
              here; see the linked artifacts.
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div>
      <section className={styles.caseSection}>
        <h2 className={styles.caseSectionTitle}>The problem</h2>
        {project.problem.map((paragraph) => (
          <p key={paragraph.slice(0, 32)} className={styles.caseSectionLead}>
            {paragraph}
          </p>
        ))}
      </section>

      {project.constraints.length > 0 ? (
        <section className={styles.caseSection}>
          <h2 className={styles.caseSectionTitle}>Constraints</h2>
          <ul className="proseList">
            {project.constraints.map((constraint) => (
              <li key={constraint}>{constraint}</li>
            ))}
          </ul>
        </section>
      ) : null}

      {project.decisions.length > 0 ? (
        <section className={styles.caseSection}>
          <h2 className={styles.caseSectionTitle}>
            Key engineering decisions
          </h2>
          <DecisionList decisions={project.decisions} />
        </section>
      ) : null}

      <div className={styles.split}>
        {project.implementation.length > 0 ? (
          <div className={styles.caseSection}>
            <h2 className={styles.caseSectionTitle}>Implementation</h2>
            <ul className="proseList">
              {project.implementation.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
        ) : null}

        {project.debugging.length > 0 ? (
          <div className={styles.caseSection}>
            <h2 className={styles.caseSectionTitle}>
              Debugging and what changed
            </h2>
            <ul className="proseList">
              {project.debugging.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>

      {project.outcomes.length > 0 ? (
        <section className={styles.caseSection}>
          <h2 className={styles.caseSectionTitle}>Results</h2>
          <ul className="proseList">
            {project.outcomes.map((outcome) => (
              <li key={outcome}>{outcome}</li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}

export function DecisionList({
  decisions,
}: {
  decisions: { title: string; body: string }[];
}) {
  return (
    <div className={styles.decisions}>
      {decisions.map((decision, index) => (
        <div key={decision.title} className={styles.decision}>
          <div>
            <span className={styles.decisionIndex}>
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className={styles.decisionTitle}>{decision.title}</h3>
          </div>
          <p className={styles.decisionBody}>{decision.body}</p>
        </div>
      ))}
    </div>
  );
}

export function Limitations({ project }: { project: Project }) {
  if (project.limitations.length === 0) return null;
  return (
    <div className={styles.limitations}>
      <p className={`${styles.limitationsTitle} meta`}>
        Current limitations
      </p>
      <ul className={styles.limitationsList}>
        {project.limitations.map((limitation) => (
          <li key={limitation}>{limitation}</li>
        ))}
      </ul>
    </div>
  );
}

/* -------------------------------------------------------------------------
   Validation matrix (§52)
   ------------------------------------------------------------------------- */

export function ValidationTable({
  rows,
  title = "Validation",
}: {
  rows: Project["validation"];
  title?: string;
}) {
  if (rows.length === 0) return null;

  return (
    <section className={`container ${styles.validation}`} aria-label={title}>
      <div className={styles.validationHeader}>
        <h2 className={styles.caseSectionTitle} style={{ margin: 0 }}>
          {title}
        </h2>
        <p className={styles.validationNote}>
          Criteria, instrument, and condition for every result. Verdicts are
          stated in text, not by color.
        </p>
      </div>
      <TechnicalTable
        columns={[
          { label: "Target", short: "Target" },
          { label: "Criterion", short: "Criterion" },
          { label: "Test instrument", short: "Tool" },
          { label: "Measured result", short: "Result" },
          { label: "Verdict", short: "Verdict" },
        ]}
        rows={rows.map((row) => [
          row.target,
          row.criterion,
          row.tool,
          <span key="result" className="tabular">
            {row.result}
          </span>,
          <VerdictTag key="verdict" verdict={row.verdict} />,
        ])}
      />
    </section>
  );
}

/* -------------------------------------------------------------------------
   Code slots (§51, §84)
   ------------------------------------------------------------------------- */

export function CodeSlots({ project }: { project: Project }) {
  if (!project.codeSlots || project.codeSlots.length === 0) return null;

  return (
    <section className={`container ${styles.codeSlots}`} aria-label="Code excerpts">
      <div className={styles.codeSlotsHeader}>
        <h2 className={styles.caseSectionTitle} style={{ margin: 0 }}>
          Code
        </h2>
        <p className={styles.validationNote}>
          Excerpts are reserved, not fabricated. These slots stay empty until
          real source is supplied.
        </p>
      </div>

      <div className={styles.split}>
        {project.codeSlots.map((slot) => (
          <div key={slot.id} className={styles.codeSlot}>
            <div className={styles.codeSlotTitle}>
              <span className={styles.codeSlotId}>{slot.id}</span>
              <strong style={{ fontSize: "0.9375rem" }}>{slot.label}</strong>
            </div>
            <p className={styles.codeSlotNote}>{slot.note}</p>
            <p className={`${styles.codeSlotPending} meta`}>
              <span
                aria-hidden="true"
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: 999,
                  background: "currentColor",
                  display: "inline-block",
                }}
              />
              Awaiting source
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------
   Artifacts + next project
   ------------------------------------------------------------------------- */

export function ArtifactList({ project }: { project: Project }) {
  if (project.artifacts.length === 0) return null;

  return (
    <section className={`container ${styles.artifacts}`} aria-label="Related artifacts">
      <p className="meta">Related artifacts</p>
      <div className={styles.artifactList}>
        {project.artifacts.map((artifact) => (
          <a
            key={artifact.href}
            className={styles.artifactLink}
            href={resourceHref(artifact.href, artifact.external)}
            {...(artifact.external
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
          >
            {artifact.label}
            <span aria-hidden="true">
              {artifact.href.endsWith(".pdf") ? "↓" : artifact.external ? "↗" : "→"}
            </span>
          </a>
        ))}
      </div>

      {project.limitations.length > 0 ? (
        <div style={{ marginTop: "var(--space-6)" }}>
          <Limitations project={project} />
        </div>
      ) : null}
    </section>
  );
}

export function CaseNav({
  project,
  next,
}: {
  project: Project;
  next?: Project;
}) {
  return (
    <nav className={styles.caseNav} aria-label="Case study navigation">
      <div className={`container ${styles.caseNavInner}`}>
        <Link className={styles.caseNavLink} href="/work">
          <span className="meta">← Back</span>
          <span className={styles.caseNavTitle}>All work</span>
        </Link>

        <p className={styles.caseNavCurrent}>
          <span className="meta">Currently reading</span>
          <span>{project.title}</span>
        </p>

        {next ? (
          <Link className={styles.caseNavLink} href={`/work/${next.slug}`}>
            <span className="meta">Next →</span>
            <span className={styles.caseNavTitle}>{next.title}</span>
          </Link>
        ) : (
          <p className={styles.caseNavEnd}>
            End of case studies.{" "}
            <Link href="/work" style={{ textDecoration: "underline" }}>
              See the full directory
            </Link>
            .
          </p>
        )}
      </div>
    </nav>
  );
}

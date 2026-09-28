import type { Metadata } from "next";
import Link from "next/link";

import { Contact } from "@/components/home/Contact";
import { Section, SectionHeader } from "@/components/ui";
import { buildLog, notes } from "@/data/buildLog";
import { getProject } from "@/data/projects";

import styles from "@/components/page/page.module.css";
import home from "@/components/home/home.module.css";

export const metadata: Metadata = {
  title: "Notes",
  description:
    "Engineering decision records and the dated build log: what was decided, what was rejected, and what the change cost.",
  alternates: { canonical: "/notes/" },
};

export default function NotesPage() {
  return (
    <>
      <header className={styles.header}>
        <div className="container">
          <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
            <ol>
              <li>
                <Link href="/">Portfolio</Link>
              </li>
              <li aria-current="page">Notes</li>
            </ol>
          </nav>

          <h1 className={styles.title}>
            Decisions worth writing down.
          </h1>
          <p className={styles.lead}>
            Not blog posts — engineering records. Each entry captures a change
            that actually happened, the alternative that was rejected, and what
            the change cost. Nothing here is written for engagement.
          </p>
        </div>
      </header>

      <Section aria-labelledby="decisions-title">
        <div className="container">
          <SectionHeader
            id="decisions-title"
            eyebrow={`${notes.length} records`}
            title="Decision log"
            lead="Each record names the situation, the rejected alternative, and the measured outcome."
          />

          <ul className={styles.notes}>
            {notes.map((note) => {
              const project = note.projectSlug
                ? getProject(note.projectSlug)
                : undefined;

              const body = (
                <>
                  <span className={styles.noteDate}>{note.date}</span>

                  <span className={styles.noteBody}>
                    <span className={styles.noteTitle}>{note.title}</span>
                    <span className={styles.noteSummary}>{note.summary}</span>
                  </span>

                  <span className={styles.noteMeta}>
                    <span className={styles.noteCategory}>{note.category}</span>
                    {project ? (
                      <span className={styles.noteCategory}>
                        {project.title}
                      </span>
                    ) : null}
                  </span>

                  <span className={styles.noteArrow} aria-hidden="true">
                    →
                  </span>
                </>
              );

              return (
                <li key={note.id}>
                  {project ? (
                    <Link
                      className={styles.note}
                      href={`/work/${project.slug}`}
                    >
                      {body}
                    </Link>
                  ) : (
                    <div className={styles.note}>{body}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </Section>

      <Section aria-labelledby="log-title">
        <div className="container">
          <SectionHeader
            id="log-title"
            eyebrow={`${buildLog.length} entries`}
            title="Build log"
            lead="Dated engineering activity, newest first. An entry exists only where the date and the event are both on record."
            action={
              <Link className={styles.link} href="/workspace/#build-log">
                Open in the workspace →
              </Link>
            }
          />

          <div className={home.logFeed}>
            {buildLog.map((entry) => (
              <article key={entry.id} className={home.logEntry}>
                <div className={home.logAside}>
                  <span className={home.logDate}>{entry.date}</span>
                </div>
                <div className={home.logBody}>
                  <h3 className={home.logTitle}>{entry.title}</h3>
                  <p className={home.logSummary}>{entry.summary}</p>
                  {entry.changes.length > 0 ? (
                    <ul className={home.logChanges}>
                      {entry.changes.map((change) => (
                        <li key={change}>{change}</li>
                      ))}
                    </ul>
                  ) : null}
                </div>
                <div>
                  <p className="meta">{entry.project}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Section>

      <Section aria-labelledby="empty-title">
        <div className="container">
          <SectionHeader
            id="empty-title"
            eyebrow="Long-form"
            title="No published essays yet"
          />
          <div className={styles.empty}>
            <p className={styles.emptyTitle}>
              Technical writing is on the list, not on the site.
            </p>
            <p className={styles.emptyBody}>
              There are no long-form posts published here yet. The case studies
              and decision records above are where the depth currently lives —
              they carry the constraints, the tradeoffs, and the measured
              results rather than a summary of them.
            </p>
          </div>
        </div>
      </Section>

      <Contact
        eyebrow="Discussion"
        heading="Want to go deeper on any of this?"
        lead="The reasoning behind a decision is usually more interesting than the decision."
      />
    </>
  );
}

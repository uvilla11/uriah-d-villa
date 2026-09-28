import type { Metadata } from "next";
import Link from "next/link";

import { Contact } from "@/components/home/Contact";
import { Section, SectionHeader } from "@/components/ui";
import { credentials, education, experience } from "@/data/profile";
import { getProject } from "@/data/projects";

import styles from "@/components/page/page.module.css";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Professional roles at Microchip Technology, concurrent university work, and engineering education at Arizona State University.",
  alternates: { canonical: "/experience/" },
};

/** Projects most relevant to a given role, resolved from the registry. */
const roleProjects: Record<string, string[]> = {
  "Microchip Technology": ["bldc-motor-control", "room-weather-controller", "scara-drawing-arm"],
  "Arizona State University": [
    "hephaestus-lander",
    "solarsense",
    "shadeshift",
    "critical-facility-microgrid",
  ],
};

export default function ExperiencePage() {
  return (
    <>
      <header className={styles.header}>
        <div className="container">
          <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
            <ol>
              <li>
                <Link href="/">Portfolio</Link>
              </li>
              <li aria-current="page">Experience</li>
            </ol>
          </nav>

          <h1 className={styles.title}>Roles, study, and what each one produced.</h1>
          <p className={styles.lead}>
            Two concurrent tracks: a full-time applications engineering role and
            an accelerated M.S. Both fed the same body of hardware work.
          </p>
        </div>
      </header>

      <Section aria-labelledby="roles-title">
        <div className="container">
          <SectionHeader
            id="roles-title"
            eyebrow="Professional history"
            title="Where the work happened"
          />

          <div className={styles.timeline}>
            {experience.map((role) => {
              const related = (roleProjects[role.company] ?? [])
                .map((slug) => getProject(slug))
                .filter((project): project is NonNullable<typeof project> =>
                  Boolean(project),
                );

              return (
                <article key={role.company} className={styles.timelineItem}>
                  <div className={styles.timelineAside}>
                    <h3 className={styles.timelineCompany}>{role.company}</h3>
                    <p className={styles.timelineDates}>
                      {role.start} — {role.end}
                    </p>
                    <p className={styles.timelineLocation}>{role.location}</p>
                    {role.concurrent ? (
                      <p className={styles.concurrent}>
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
                        Concurrent with graduate study
                      </p>
                    ) : null}
                  </div>

                  <div className={styles.timelineBody}>
                    <p className={styles.timelineRole}>{role.role}</p>
                    <p className={styles.timelineSummary}>{role.summary}</p>

                    <ul className={styles.bullets}>
                      {role.bullets.map((bullet) => (
                        <li key={bullet} className={styles.bullet}>
                          {bullet}
                        </li>
                      ))}
                    </ul>

                    {role.progression ? (
                      <p className={styles.progression}>{role.progression}</p>
                    ) : null}

                    {related.length > 0 ? (
                  <div>
                    <p className="meta" style={{ marginBottom: "var(--space-3)" }}>
                      Related work
                    </p>
                    <ul className={styles.relatedList}>
                      {related.map((project) => (
                        <li key={project.slug}>
                          <Link href={`/work/${project.slug}`}>{project.title} →</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </Section>

      <Section aria-labelledby="education-title">
        <div className="container">
          <SectionHeader
            id="education-title"
            eyebrow="Education"
            title="Arizona State University"
            lead="An accelerated 4+1: a robotics B.S.E. followed straight into the M.S."
          />

          <div className={styles.degreeGrid}>
            {education.map((entry) => (
              <article key={entry.degree} className={styles.degree}>
                <p className="meta">{entry.institution}</p>
                <h3 className={styles.degreeTitle}>{entry.degree}</h3>
                <p className={styles.degreeMeta}>
                  {entry.field} · {entry.date}
                </p>
                <p className={styles.degreeDetail}>{entry.detail}</p>
                <div className={styles.honors}>
                  {entry.honors.map((honor) => (
                    <span key={honor} className={styles.honor}>
                      {honor}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </Section>

      <Section aria-labelledby="credentials-title">
        <div className="container">
          <SectionHeader
            id="credentials-title"
            eyebrow="Training"
            title="Certifications and badges"
            lead="Names only. Issuing body, issue date, and credential IDs are not published here because they are not on record."
          />
          <div className={styles.credentialGrid}>
            {credentials.map((credential) => (
              <div key={credential.name} className={styles.credential}>
                <span className={styles.credentialDot} aria-hidden="true" />
                {credential.name}
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Contact
        eyebrow="Next step"
        heading="Want the detail on any of this?"
        lead="Ask about a specific system, a constraint you are working against, or what I would do differently."
      />
    </>
  );
}

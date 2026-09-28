import type { Metadata } from "next";
import Link from "next/link";

import { Contact } from "@/components/home/Contact";
import {
  Section,
  SectionHeader,
  StatusTag,
  TagList,
  TechnicalTable,
} from "@/components/ui";
import { credentials, education, experience, profile } from "@/data/profile";
import { directoryCounts, projectDirectory } from "@/data/projects";
import { benchEquipment, coverage } from "@/data/technical";
import { resourceHref } from "@/lib/resource";

import styles from "@/components/page/page.module.css";

export const metadata: Metadata = {
  title: "Résumé",
  description:
    "Credentials, education, technical coverage, and downloadable documents for Uriah Villa, MCU Applications Engineer II at Microchip Technology.",
  alternates: { canonical: "/resume/" },
};

const documents = [
  {
    label: "M.S. Engineering portfolio",
    href: "/media/uriah-villa-ms-portfolio.pdf",
    note: "Technical portfolio across systems, mechatronics, and power",
  },
  {
    label: "M.S. evidence appendix",
    href: "/media/uriah-villa-ms-portfolio-appendix.pdf",
    note: "Full appendix: KiCad layouts, SolidWorks FEA, simulation records",
    large: true,
  },
  {
    label: "ShadeShift research paper",
    href: "/media/shadeshift-research-paper.pdf",
    note: "Peer-reviewed write-up of the therapeutic eyewear work",
  },
];

export default function ResumePage() {
  return (
    <>
      <header className={styles.header}>
        <div className="container">
          <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
            <ol>
              <li>
                <Link href="/">Portfolio</Link>
              </li>
              <li aria-current="page">Résumé</li>
            </ol>
          </nav>

          <h1 className={styles.title}>Uriah D. Villa</h1>
          <p className={styles.lead}>{profile.positioning}</p>
        </div>
      </header>

      <Section aria-labelledby="summary-title">
        <div className="container">
          <div className={styles.bodyGrid}>
            <div>
              <p className="meta">Summary</p>
            </div>
            <div className={styles.prose}>
              <h2 id="summary-title" style={{ marginTop: 0 }}>
                {profile.title}
              </h2>
              <p>
                {profile.statusContext} · {profile.location}
              </p>
              <p>
                Embedded systems engineer working across bare-metal firmware,
                custom PCB design, closed-loop motor control, robotics, and edge
                AI. Currently authoring firmware application examples and
                technical collateral for 8-bit, 16-bit, and 32-bit PIC
                microcontroller families.
              </p>
              <p>
                <StatusTag status={profile.status} />
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section aria-labelledby="roles-title">
        <div className="container">
          <SectionHeader id="roles-title" eyebrow="Experience" title="Roles" />
          <div className={styles.timeline}>
            {experience.map((role) => (
              <article key={role.company} className={styles.timelineItem}>
                <div className={styles.timelineAside}>
                  <h3 className={styles.timelineCompany}>{role.company}</h3>
                  <p className={styles.timelineDates}>
                    {role.start} — {role.end}
                  </p>
                  <p className={styles.timelineLocation}>{role.location}</p>
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
                </div>
              </article>
            ))}
          </div>
        </div>
      </Section>

      <Section aria-labelledby="education-title">
        <div className="container">
          <SectionHeader id="education-title" eyebrow="Education" title="Degrees" />
          <div className={styles.degreeGrid}>
            {education.map((entry) => (
              <article key={entry.degree} className={styles.degree}>
                <p className="meta">{entry.institution}</p>
                <h3 className={styles.degreeTitle}>{entry.degree}</h3>
                <p className={styles.degreeMeta}>
                  {entry.field} · {entry.date}
                </p>
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

      <Section aria-labelledby="skills-title">
        <div className="container">
          <SectionHeader
            id="skills-title"
            eyebrow="Technical coverage"
            title="Capabilities, grouped by function"
          />

          <div className={styles.coverageGrid}>
            {coverage.map((group) => (
              <div key={group.id} className={styles.coverageGroup}>
                <h3 className={styles.coverageTitle}>{group.title}</h3>
                <p className={styles.coverageDescription}>{group.description}</p>
                <TagList items={group.items.map((item) => item.label)} />
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section aria-labelledby="equipment-title">
        <div className="container">
          <SectionHeader
            id="equipment-title"
            eyebrow="Lab"
            title="Instrumentation"
          />
          <TechnicalTable
            columns={[
              { label: "Instrument", short: "Instrument" },
              { label: "Used for", short: "Used for" },
            ]}
            rows={benchEquipment.map((item) => [
              <strong key="label">{item.label}</strong>,
              item.use,
            ])}
          />
        </div>
      </Section>

      <Section aria-labelledby="projects-title">
        <div className="container">
          <SectionHeader
            id="projects-title"
            eyebrow={`${directoryCounts.total} systems`}
            title="Project index"
            action={
              <Link className={styles.link} href="/work">
                Full case studies →
              </Link>
            }
          />
          <TechnicalTable
            columns={[
              { label: "#", short: "#" },
              { label: "Project", short: "Project" },
              { label: "Platform", short: "Platform" },
              { label: "Status", short: "Status" },
              { label: "Year", short: "Year" },
            ]}
            rows={projectDirectory().map((project) => [
              <span key="index" className="tabular">
                {project.index}
              </span>,
              project.title,
              <span key="platform" className="mono" style={{ fontSize: "0.8em" }}>
                {project.platform}
              </span>,
              <StatusTag key="status" status={project.status} stage={project.stage} />,
              <span key="year" className="tabular">
                {project.year}
              </span>,
            ])}
          />
        </div>
      </Section>

      <Section aria-labelledby="documents-title">
        <div className="container">
          <SectionHeader
            id="documents-title"
            eyebrow="Documents"
            title="Downloadable records"
            lead="Original documents, published as-is. The appendix is large by nature — expect a slow download."
          />
          <ul className={styles.documents}>
            {documents.map((document) => (
              <li key={document.href} className={styles.document}>
                <div>
                  <p className={styles.documentLabel}>{document.label}</p>
                  <p className={styles.documentNote}>{document.note}</p>
                  {document.large ? (
                    <p className={styles.documentSize}>Large file · 30 MB</p>
                  ) : null}
                </div>
                <a
                  className={styles.documentLink}
                  href={resourceHref(document.href, false)}
                >
                  Download ↓
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section aria-labelledby="credentials-title">
        <div className="container">
          <SectionHeader
            id="credentials-title"
            eyebrow="Training"
            title="Certifications"
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
        eyebrow="Contact"
        heading="Questions about any of this?"
        lead="Ask directly — email is the fastest route to a specific answer."
      />
    </>
  );
}

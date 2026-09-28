import type { Metadata } from "next";

import { Contact } from "@/components/home/Contact";
import { Section, SectionHeader } from "@/components/ui";
import { FeaturedGrid } from "@/components/work/FeaturedGrid";
import { ProjectDirectory } from "@/components/work/ProjectDirectory";
import { directoryCounts } from "@/data/projects";

import styles from "./work.module.css";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Flagship case studies and the full project directory: embedded systems, firmware, robotics, edge AI, and power modelling.",
  alternates: { canonical: "/work/" },
};

export default function WorkPage() {
  return (
    <>
      <header className={styles.header}>
        <div className="container">
          <p className="meta">
            {directoryCounts.total} systems · {directoryCounts.disciplines}{" "}
            disciplines
          </p>
          <h1 className={styles.title}>
            Flagship work and
            <br />
            the full directory.
          </h1>
          <p className={styles.lead}>
            Four case studies carry the engineering in detail — the constraints
            that forced each decision, what broke on the bench, how it was
            validated, and what is still open. The directory below covers every
            system, including builds still in progress.
          </p>
        </div>
      </header>

      <Section aria-labelledby="flagship-title">
        <div className="container">
          <SectionHeader
            id="flagship-title"
            eyebrow="Case studies"
            title="Four systems, documented end to end."
            lead="Each one states its own limits. Nothing here is presented as finished unless it is."
          />
        </div>
        <FeaturedGrid />
      </Section>

      <ProjectDirectory />
      <Contact showForm={false} eyebrow="Work enquiries" heading="Need something like this built?" />
    </>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  ArtifactList,
  CaseHeader,
  CaseMeasurements,
  CaseNav,
  CodeSlots,
  FactsAside,
  Prose,
  ValidationTable,
} from "@/components/case";
import { ArchitectureFigure, SolarSenseFigure } from "@/components/case/Figures";
import { projects, getProject } from "@/data/projects";
import { SITE_URL } from "@/lib/site";

/** Static params: every project in the registry gets a real route (§14). */
export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project not found" };

  return {
    title: project.title,
    description: project.result,
    alternates: { canonical: `/work/${project.slug}/` },
    openGraph: {
      type: "article",
      title: project.title,
      description: project.result,
      url: `${SITE_URL}/work/${project.slug}/`,
      images: project.media[0]
        ? [
            {
              url: project.media[0].src,
              alt: project.media[0].alt,
            },
          ]
        : undefined,
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const hasNarrative = project.problem.length > 0;
  const next = project.nextSlug ? getProject(project.nextSlug) : undefined;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.result,
    dateCreated: project.year,
    author: { "@type": "Person", name: "Uriah Villa" },
    keywords: project.technologies.join(", "),
  };

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <CaseHeader project={project} />
      <CaseMeasurements project={project} />

      <div className="container">
        {project.diagram === "hephaestus-architecture" ? (
          <ArchitectureFigure />
        ) : null}
        {project.diagram === "solarsense-pipeline" ? (
          <SolarSenseFigure />
        ) : null}

        <div className="caseGrid">
          <FactsAside project={project} />
          <Prose project={project} hasNarrative={hasNarrative} />
        </div>

        {project.validation.length > 0 ? (
          <ValidationTable rows={project.validation} />
        ) : null}

        <CodeSlots project={project} />
        <ArtifactList project={project} />
      </div>

      <CaseNav project={project} next={next} />
    </article>
  );
}

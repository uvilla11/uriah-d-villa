import type { MetadataRoute } from "next";

import { projects } from "@/data/projects";
import { SITE_URL } from "@/lib/site";

/** Required for metadata routes under `output: "export"`. */
export const dynamic = "force-static";

/**
 * Sitemap (§88).
 *
 * Static export renders this to out/sitemap.xml at build time. Every route is
 * enumerated from the project registry, so a new case study appears here
 * automatically when it is added to src/data/projects.ts.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const built = new Date();

  const staticRoutes = [
    "/",
    "/work/",
    "/workspace/",
    "/experience/",
    "/about/",
    "/notes/",
    "/contact/",
    "/resume/",
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: `${SITE_URL}${route}`,
      lastModified: built,
      changeFrequency: "monthly" as const,
      priority: route === "/" ? 1 : 0.7,
    })),
    ...projects.map((project) => ({
      url: `${SITE_URL}/work/${project.slug}/`,
      lastModified: built,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}

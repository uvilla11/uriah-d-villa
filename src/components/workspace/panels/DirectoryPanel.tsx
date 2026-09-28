import Link from "next/link";

import { StatusTag, TagList } from "@/components/ui";
import { projectDirectory } from "@/data/projects";
import { resourceHref } from "@/lib/resource";

import { Panel } from "./Panel";
import styles from "../panels.module.css";

/**
 * The full project directory as a technical table (§43).
 *
 * Presented as a table because every row shares the same six fields, and the
 * reader is comparing across them. It recomposes into stacked rows on mobile
 * rather than scrolling sideways.
 */
export function DirectoryPanel() {
  const rows = projectDirectory();

  return (
    <div id="projects">
      <Panel
        id="directory"
        title="Project directory"
        description={`${rows.length} systems, sorted with flagships first. Every row links to its case study or its primary artifact.`}
      >
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <caption className="sr-only">
              All indexed projects with category, platform, status, and year
            </caption>
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">System</th>
                <th scope="col">Category</th>
                <th scope="col">Silicon / platform</th>
                <th scope="col">Status</th>
                <th scope="col">Year</th>
                <th scope="col">
                  <span className="sr-only">Open</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((project) => {
                const target = project.featured
                  ? `/work/${project.slug}`
                  : project.artifacts[0]?.href;
                if (!target) return null;
                const external = !project.featured && Boolean(project.artifacts[0]?.external);
                const href = project.featured
                  ? undefined
                  : resourceHref(target, external);

                return (
                  <tr key={project.slug}>
                    <td data-label="#" className={styles.cellIndex}>
                      <span className="tabular">{project.index}</span>
                    </td>
                    <td data-label="System" className={styles.cellName}>
                      <span className={styles.cellTitle}>{project.title}</span>
                      <span className={styles.cellContext}>{project.role}</span>
                    </td>
                    <td data-label="Category">{project.category}</td>
                    <td data-label="Platform" className={styles.cellTech}>
                      {project.platform}
                    </td>
                    <td data-label="Status">
                      <StatusTag status={project.status} stage={project.stage} />
                    </td>
                    <td data-label="Year" className="tabular">
                      {project.year}
                    </td>
                    <td data-label="Open" className={styles.cellOpen}>
                      {href ? (
                        <a
                          href={href}
                          {...(external
                            ? { target: "_blank", rel: "noopener noreferrer" }
                            : {})}
                        >
                          {external ? "Artifact ↗" : "Case →"}
                          <span className="sr-only"> for {project.title}</span>
                        </a>
                      ) : (
                        <Link href="/contact">
                          Enquire →
                          <span className="sr-only"> about {project.title}</span>
                        </Link>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className={styles.panelFoot}>
          <TagList items={["PIC18", "PIC32", "dsPIC33", "PSoC 4/6", "ESP32"]} />
        </div>
      </Panel>
    </div>
  );
}

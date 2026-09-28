import Link from "next/link";

import { Media, StatusTag, TagList, TextAction } from "@/components/ui";
import { featuredProjects } from "@/data/projects";

import styles from "./work.module.css";

/**
 * Flagship case study cards (§22).
 *
 * Restrained radius, 1px border, no shadow. Hover darkens the border, lifts
 * the card 1px, scales the image at most 1.02, and shifts the arrow 2px —
 * nothing more.
 */
export function FeaturedGrid() {
  return (
    <div className="container">
      <ul className={styles.grid}>
        {featuredProjects.map((project) => (
          <li key={project.slug}>
            <article className={styles.card}>
              {project.media[0] ? (
                <Media
                  className={styles.cardMedia}
                  src={project.media[0].src}
                  alt={project.media[0].alt}
                  sizes="(min-width: 900px) 50vw, 100vw"
                  zoom
                />
              ) : null}

              <div className={styles.cardBody}>
                <div className={styles.cardTopline}>
                  <span className="meta">{project.category}</span>
                  <StatusTag status={project.status} stage={project.stage} />
                </div>

                <h3 className={styles.cardTitle}>
                  <Link href={`/work/${project.slug}`}>{project.title}</Link>
                </h3>

                <p className={styles.cardResult}>{project.result}</p>

                {project.measurements.length > 0 ? (
                  <dl className={styles.cardMetrics}>
                    {project.measurements.slice(0, 3).map((measurement) => (
                      <div key={measurement.label}>
                        <dt className={`${styles.cardMetricLabel} meta`}>
                          {measurement.label}
                        </dt>
                        <dd className={styles.cardMetricValue}>
                          {measurement.value}
                          {measurement.unit ? (
                            <span className={styles.cardMetricUnit}>
                              {measurement.unit}
                            </span>
                          ) : null}
                        </dd>
                      </div>
                    ))}
                  </dl>
                ) : null}

                <TagList items={project.technologies.slice(0, 4)} />

                <TextAction
                  href={`/work/${project.slug}`}
                  className={styles.cardCta}
                >
                  Read case study
                </TextAction>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
}

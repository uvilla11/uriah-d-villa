import Link from "next/link";
import type { ReactNode } from "react";

import manifest from "@/data/media-manifest.json";
import { asset } from "@/lib/site";
import { statusTone, verdictTone } from "@/lib/status";
import type { Status, Verdict } from "@/lib/types";

import styles from "./ui.module.css";

/* -------------------------------------------------------------------------
   Section framing
   ------------------------------------------------------------------------- */

export function Section({
  children,
  className,
  flush,
  ...rest
}: React.ComponentPropsWithoutRef<"section"> & { flush?: boolean }) {
  const classes = [styles.section, flush ? styles["section--flush"] : "", className]
    .filter(Boolean)
    .join(" ");
  return (
    <section className={classes} {...rest}>
      {children}
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  lead,
  action,
  id,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  action?: ReactNode;
  id?: string;
  children?: ReactNode;
}) {
  return (
    <div className={styles.sectionHeader}>
      <p className={`${styles.sectionEyebrow} meta`}>
        <span>{eyebrow}</span>
      </p>
      <div className={styles.sectionTitleWrap}>
        <h2 className={styles.sectionTitle} id={id}>
          {title}
        </h2>
        {lead ? <p className={styles.sectionLead}>{lead}</p> : null}
        {action ? <div className={styles.sectionAction}>{action}</div> : null}
        {children}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------
   Status
   ------------------------------------------------------------------------- */

export function StatusTag({
  status,
  stage,
  className,
}: {
  status: Status;
  /** Domain qualifier rendered before the status verb, e.g. "PROTOTYPE · BUILDING". */
  stage?: string;
  className?: string;
}) {
  return (
    <span className={[styles.status, styles[`status--${statusTone(status)}`], className]
      .filter(Boolean)
      .join(" ")}>
      <span className={styles.statusDot} aria-hidden="true" />
      {stage ? <span>{stage} ·</span> : null}
      <span>{status}</span>
    </span>
  );
}

export function VerdictTag({ verdict }: { verdict: Verdict }) {
  return (
    <span
      className={[styles.status, styles[`status--${verdictTone(verdict)}`]]
        .join(" ")}
    >
      <span className={styles.statusDot} aria-hidden="true" />
      <span>{verdict}</span>
    </span>
  );
}

/* -------------------------------------------------------------------------
   Actions
   ------------------------------------------------------------------------- */

export function ButtonPrimary({
  href,
  children,
  external,
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
}) {
  const className = styles.buttonPrimary;
  if (external) {
    return (
      <a className={className} href={asset(href)} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }
  return (
    <Link className={className} href={href}>
      {children}
    </Link>
  );
}

export function TextAction({
  href,
  children,
  external,
  quiet,
  className,
  arrow = "→",
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
  quiet?: boolean;
  className?: string;
  arrow?: string;
}) {
  // A raw <a> bypasses next/link, so the base path has to be applied here.
  const target = external || href.startsWith("mailto:") ? asset(href) : href;
  const classes = [
    styles.textAction,
    quiet ? styles["textAction--quiet"] : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");
  const content = (
    <>
      {children}
      {arrow ? (
        <span className={styles.arrow} aria-hidden="true">
          {arrow}
        </span>
      ) : null}
    </>
  );
  if (external) {
    return (
      <a className={classes} href={target} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }
  if (href.startsWith("mailto:") || href.startsWith("#")) {
    return (
      <a className={classes} href={target}>
        {content}
      </a>
    );
  }
  return (
    <Link className={classes} href={href}>
      {content}
    </Link>
  );
}

/* -------------------------------------------------------------------------
   Metrics (§29)
   ------------------------------------------------------------------------- */

export function MetricBlock({
  value,
  label,
  note,
  tabular = true,
}: {
  value: string;
  label: string;
  note?: string;
  tabular?: boolean;
}) {
  return (
    <div className={styles.metric}>
      <span
        className={`${styles.metricValue} ${tabular ? "tabular" : ""}`}
      >
        {value}
      </span>
      <span className={`${styles.metricLabel} meta`}>{label}</span>
      {note ? <p className={styles.metricNote}>{note}</p> : null}
    </div>
  );
}

/* -------------------------------------------------------------------------
   Tags, callouts
   ------------------------------------------------------------------------- */

export function TagList({
  items,
  accent,
}: {
  items: string[];
  accent?: string[];
}) {
  return (
    <ul className={styles.tagList}>
      {items.map((item) => (
        <li
          key={item}
          className={`${styles.tag} ${accent?.includes(item) ? styles["tag--accent"] : ""}`}
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

export function Callout({ children }: { children: ReactNode }) {
  return (
    <p className={styles.callout}>
      <span className="sr-only">Note. </span>
      {children}
    </p>
  );
}

/* -------------------------------------------------------------------------
   Media (§64, §65, §72)
   ------------------------------------------------------------------------- */

/** Intrinsic dimensions, so every image box is reserved and CLS stays at 0. */
const DIMENSIONS: Record<string, { width: number; height: number }> = {
  "hephaestus-lander": { width: 640, height: 690 },
  "hephaestus-poster": { width: 1400, height: 919 },
  "shadeshift-prototype": { width: 1600, height: 1200 },
  "solarsense-showcase": { width: 2048, height: 1536 },
};

const srcSet = (name: string, extension: string) => {
  const widths = manifest[name as keyof typeof manifest];
  if (!widths) return undefined;
  return widths
    .map((w) => `${asset(`/media/generated/${name}-${w}.${extension}`)} ${w}w`)
    .join(", ");
};

export function Media({
  src,
  alt,
  sizes = "100vw",
  priority,
  zoom,
  caption,
  className,
}: {
  /** Path to the original file, e.g. /media/hephaestus-poster.png */
  src: string;
  alt: string;
  sizes?: string;
  /** Above the fold: eager, high fetch priority, no lazy loading. */
  priority?: boolean;
  zoom?: boolean;
  caption?: ReactNode;
  className?: string;
}) {
  const name = src.split("/").pop()!.replace(/\.[^.]+$/, "");
  const dimensions = DIMENSIONS[name];
  const loading = priority ? ("eager" as const) : ("lazy" as const);

  return (
    <figure className={className}>
      <div
        className={[styles.media, zoom ? styles["media--zoom"] : ""]
          .filter(Boolean)
          .join(" ")}
      >
        <picture>
          {srcSet(name, "avif") ? (
            <source type="image/avif" srcSet={srcSet(name, "avif")} sizes={sizes} />
          ) : null}
          {srcSet(name, "webp") ? (
            <source type="image/webp" srcSet={srcSet(name, "webp")} sizes={sizes} />
          ) : null}
          <img
            src={asset(src)}
            alt={alt}
            width={dimensions?.width}
            height={dimensions?.height}
            loading={loading}
            decoding={priority ? "sync" : "async"}
            fetchPriority={priority ? "high" : "auto"}
          />
        </picture>
      </div>
      {caption ? (
        <figcaption className={`${styles.mediaCaption} meta`}>
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

/* -------------------------------------------------------------------------
   Technical table (§43, §70)
   ------------------------------------------------------------------------- */

export interface TableColumn {
  label: string;
  /** Mobile label prefix. Defaults to the column label. */
  short?: string;
}

export function TechnicalTable({
  columns,
  rows,
  caption,
}: {
  columns: TableColumn[];
  rows: ReactNode[][];
  caption?: string;
}) {
  return (
    <div className={styles.tableWrap}>
      <table className={styles.table}>
        {caption ? <caption className="meta">{caption}</caption> : null}
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.label} scope="col">
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} data-label={columns[cellIndex].short ?? columns[cellIndex].label}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

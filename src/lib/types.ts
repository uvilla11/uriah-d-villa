/**
 * Precision Signal — content types.
 *
 * Mirrors the specification's data model (§80) as TypeScript so every claim
 * on the site is type-checked and single-sourced. Nothing here is inferred:
 * fields stay empty rather than being filled with plausible-looking values.
 */

/** Controlled status vocabulary (§20). */
export type Status =
  | "ACTIVE"
  | "SHIPPED"
  | "BUILDING"
  | "EXPERIMENT"
  | "RESEARCH"
  | "PLANNED"
  | "ARCHIVED"
  | "LEARNING"
  | "AVAILABLE"
  | "DEPLOYED"
  | "VALIDATED"
  | "WATCH";

/** Domain qualifier that sits alongside the status verb, e.g. PROTOTYPE. */
export type Stage =
  | "PROTOTYPE"
  | "SIMULATED"
  | "PUBLISHED"
  | "SHIPPED"
  | "FIELDED"
  | "REFERENCE";

/** Validation verdicts (§52). Never encoded by color alone. */
export type Verdict = "PASS" | "WATCH" | "FAIL" | "NOT TESTED";

export type Discipline =
  | "embedded"
  | "firmware"
  | "robotics"
  | "ai"
  | "power"
  | "hardware"
  | "automation";

export interface Profile {
  name: string;
  monogram: string;
  title: string;
  positioning: string;
  location: string;
  status: Status;
  statusContext: string;
  email: string;
  links: {
    label: string;
    href: string;
    external: boolean;
  }[];
}

export interface ExperienceRole {
  company: string;
  role: string;
  start: string;
  /** "PRESENT" for an ongoing role. */
  end: string;
  location: string;
  summary: string;
  bullets: string[];
  progression?: string;
  concurrent?: boolean;
}

export interface Education {
  institution: string;
  degree: string;
  field: string;
  date: string;
  honors: string[];
  detail: string;
}

export interface Credential {
  name: string;
  /** Only present when the issuing body is confirmed. */
  issuer?: string;
}

export interface Measurement {
  label: string;
  value: string;
  unit?: string;
  condition: string;
  interpretation: string;
}

export interface ValidationRow {
  target: string;
  criterion: string;
  tool: string;
  result: string;
  verdict: Verdict;
}

export interface Project {
  slug: string;
  index: string;
  title: string;
  summary: string;
  /** One-sentence result, shown in the case-study header (§45). */
  result: string;
  role: string;
  context: "PERSONAL" | "ACADEMIC" | "PROFESSIONAL";
  status: Status;
  stage?: Stage;
  year: string;
  confidential: boolean;
  featured: boolean;
  disciplines: Discipline[];
  /** Directory row fields (§24). */
  category: string;
  platform: string;
  technologies: string[];
  hardware: string[];
  protocols: string[];
  /** Concrete silicon or platform targets, separate from the row's short label. */
  platforms: string[];
  /** Full case-study body (§44, §46). */
  problem: string[];
  constraints: string[];
  decisions: { title: string; body: string }[];
  implementation: string[];
  debugging: string[];
  validation: ValidationRow[];
  measurements: Measurement[];
  outcomes: string[];
  limitations: string[];
  nextSteps: string[];
  media: { src: string; alt: string; caption: string }[];
  artifacts: { label: string; href: string; external: boolean }[];
  /** Next project in the sequence (§44 item 20). */
  nextSlug?: string;
  /** Rendered for flagship case studies only. */
  diagram?: "hephaestus-architecture" | "solarsense-pipeline" | null;
  /** Slots awaiting real source (§51). Empty means the module is omitted. */
  codeSlots?: { id: string; label: string; note: string }[];
}

export interface BuildLogEntry {
  id: string;
  date: string;
  project: string;
  /** Links the entry to its case study when one exists. */
  projectSlug?: string;
  category: Discipline | "milestone" | "education";
  title: string;
  summary: string;
  changes: string[];
  status: Status;
}

export interface NoteEntry {
  id: string;
  date: string;
  title: string;
  category: string;
  summary: string;
  /** What the decision was, what it replaced, and what it cost. */
  context: string;
  alternatives: string;
  outcome: string;
  projectSlug?: string;
}

export interface SiliconFamily {
  family: string;
  architecture: string;
  coreClock: string;
  interfaces: string;
  benchTools: string;
}

export interface CoverageGroup {
  id: string;
  title: string;
  description: string;
  items: { label: string; note: string }[];
}

export interface Principle {
  index: string;
  title: string;
  body: string;
}

export interface ScopeStage {
  index: string;
  label: string;
  detail: string;
}

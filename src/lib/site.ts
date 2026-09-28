/**
 * Site-level constants.
 *
 * SITE_URL carries the GitHub Pages base path so canonical URLs, Open Graph
 * tags, and structured data all point at the deployed location. It is
 * duplicated in next.config.ts as `basePath`; keep the two in sync.
 */
export const SITE_URL = "https://uvilla11.github.io/uriah-d-villa";

/**
 * Prefixes a root-relative asset path with the deployment base path.
 *
 * `next/link` applies `basePath` automatically, but raw <img> src, <source>
 * srcset, and plain <a href> do not — so every non-Link reference has to go
 * through here or it will 404 in production.
 */
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function asset(path: string): string {
  if (!path.startsWith("/")) return path;
  return `${BASE_PATH}${path}`;
}

export const SITE_NAME = "Uriah Villa";

export const SITE_TITLE = "Uriah D. Villa — MCU Applications & Embedded Systems Engineer";

export const SITE_DESCRIPTION =
  "Embedded systems engineering from silicon to motion: bare-metal firmware across 8-bit to 32-bit PIC microcontrollers, custom PCB design, closed-loop motor control, robotics, and edge AI.";

export interface NavItem {
  label: string;
  href: string;
  /** Marks the entry that opens the engineering workspace (§16). */
  workspace?: boolean;
}

export const primaryNav: NavItem[] = [
  { label: "Work", href: "/work" },
  { label: "Workspace", href: "/workspace", workspace: true },
  { label: "Experience", href: "/experience" },
  { label: "Notes", href: "/notes" },
  { label: "About", href: "/about" },
];

/** Command palette targets (§74). */
export interface Command {
  label: string;
  hint?: string;
  href: string;
  keywords?: string;
}

export const commands: Command[] = [
  { label: "Home", hint: "Editorial overview", href: "/", keywords: "index home start" },
  { label: "Work", hint: "Flagships and project directory", href: "/work", keywords: "projects case studies" },
  { label: "Engineering Workspace", hint: "Directory, matrices, build log", href: "/workspace", keywords: "dashboard tables log" },
  { label: "Experience", hint: "Roles and education", href: "/experience", keywords: "career job history degree" },
  { label: "Notes", hint: "Engineering decision records", href: "/notes", keywords: "writing decisions" },
  { label: "About", hint: "Background and method", href: "/about", keywords: "background bio" },
  { label: "Contact", hint: "Get in touch", href: "/contact", keywords: "email message hire" },
  { label: "Résumé", hint: "Credentials and links", href: "/resume", keywords: "cv pdf" },
];

/** Footer actions. */
export const footerNav: NavItem[] = [
  { label: "Work", href: "/work" },
  { label: "Workspace", href: "/workspace", workspace: true },
  { label: "Notes", href: "/notes" },
  { label: "Contact", href: "/contact" },
];

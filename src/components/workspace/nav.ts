/**
 * Workspace sidebar navigation (§38).
 *
 * Grouped the way an engineer would look things up — by system, then by log —
 * rather than by page. In-page entries are plain fragment anchors, so the
 * sidebar works with JavaScript disabled.
 */
export interface WorkspaceNavItem {
  label: string;
  href: string;
}

export interface WorkspaceNavGroup {
  title: string;
  items: WorkspaceNavItem[];
}

export const workspaceNav: WorkspaceNavGroup[] = [
  {
    title: "Work",
    items: [
      { label: "Overview", href: "/workspace/#overview" },
      { label: "Projects", href: "/workspace/#projects" },
      { label: "Experience", href: "/experience" },
    ],
  },
  {
    title: "Systems",
    items: [
      { label: "Project state", href: "/workspace/#state" },
      { label: "Silicon & buses", href: "/workspace/#silicon" },
      { label: "Technical coverage", href: "/workspace/#coverage" },
      { label: "Bench equipment", href: "/workspace/#equipment" },
    ],
  },
  {
    title: "Log",
    items: [
      { label: "Validation", href: "/workspace/#validation" },
      { label: "Build log", href: "/workspace/#build-log" },
      { label: "Notes", href: "/notes" },
    ],
  },
  {
    title: "Other",
    items: [
      { label: "All work", href: "/work" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

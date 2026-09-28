"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { profile } from "@/data/profile";
import { primaryNav } from "@/lib/site";

import { CommandPalette } from "./CommandPalette";
import { MobileNav } from "./MobileNav";
import { ThemeToggle } from "./ThemeToggle";
import styles from "./shell.module.css";

/** Highlights the nav entry matching the current route. */
function useActiveRoute() {
  const pathname = usePathname();
  return (href: string) => {
    if (href === "/") return pathname === "/";
    // basePath is stripped by usePathname, so compare on the bare route.
    return pathname === href || pathname.startsWith(`${href}/`);
  };
}

export function SiteHeader() {
  const isActive = useActiveRoute();
  const [paletteOpen, setPaletteOpen] = useState(false);

  // The palette is unmounted when closed, so its trigger and its keyboard
  // shortcuts both live here rather than inside the palette itself.
  useEffect(() => {
    const isTypingTarget = (element: EventTarget | null) =>
      element instanceof HTMLElement &&
      (element.tagName === "INPUT" ||
        element.tagName === "TEXTAREA" ||
        element.isContentEditable);

    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setPaletteOpen((open) => !open);
        return;
      }
      if (
        event.key === "/" &&
        !event.metaKey &&
        !event.ctrlKey &&
        !event.altKey &&
        !isTypingTarget(event.target)
      ) {
        event.preventDefault();
        setPaletteOpen(true);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className={styles.header}>
      <div className={`container ${styles.headerInner}`}>
        <Link className={styles.brand} href="/">
          <span className={styles.brandMonogram} aria-hidden="true">
            {profile.monogram}
          </span>
          <span className={styles.brandText}>
            <span className={styles.brandName}>{profile.name}</span>
            <span className={styles.brandMeta}>{profile.title}</span>
          </span>
          <span className="sr-only">Home</span>
        </Link>

        <nav className={styles.nav} aria-label="Primary">
          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={[
                styles.navLink,
                isActive(item.href) ? styles.navLinkActive : "",
              ]
                .filter(Boolean)
                .join(" ")}
              aria-current={isActive(item.href) ? "page" : undefined}
            >
              {item.workspace ? (
                <span className={styles.navMark} aria-hidden="true" />
              ) : null}
              {item.label}
            </Link>
          ))}
        </nav>

        <div className={styles.headerActions}>
          <button
            type="button"
            className={styles.iconButton}
            onClick={() => setPaletteOpen(true)}
            aria-label="Open command palette"
            aria-pressed={paletteOpen}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.9-3.9" />
            </svg>
          </button>

          <Link className={styles.resumeButton} href="/resume">
            Résumé
          </Link>

          <ThemeToggle />
          <MobileNav />
        </div>
      </div>

      {paletteOpen ? <CommandPalette /> : null}
    </header>
  );
}

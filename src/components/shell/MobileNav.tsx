"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

import { primaryNav } from "@/lib/site";

import styles from "./shell.module.css";

/**
 * Mobile navigation sheet (§17).
 *
 * A full-screen sheet rather than a drawer, so the targets are large and no
 * desktop link set is squeezed into a narrow column. Escape closes it, focus
 * returns to the toggle, and body scroll is locked while it is open.
 */
export function MobileNav() {
  const [openFor, setOpenFor] = useState<string | null>(null);
  const pathname = usePathname();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);

  // The sheet is open only for the route it was opened on, so any navigation
  // — including browser back/forward — closes it without an effect.
  const open = openFor === pathname;

  const close = useCallback(() => {
    setOpenFor(null);
    toggleRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpenFor(null);
        previouslyFocused?.focus();
        return;
      }
      if (event.key !== "Tab") return;

      // Keep focus inside the sheet while it is open.
      const focusables = sheetRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      );
      if (!focusables || focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    sheetRef.current?.querySelector<HTMLElement>("a[href]")?.focus();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        ref={toggleRef}
        type="button"
        className={`${styles.iconButton} ${styles.menuButton}`}
        aria-label="Open menu"
        aria-expanded={open}
        aria-controls="mobile-nav"
        onClick={() => setOpenFor(pathname)}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <path d="M3 6h18M3 12h18M3 18h18" />
        </svg>
      </button>

      {open ? (
        <>
          <div
            className={styles.sheetBackdrop}
            onClick={close}
            aria-hidden="true"
          />
          <div
            ref={sheetRef}
            id="mobile-nav"
            className={styles.sheet}
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
          >
            <nav aria-label="Primary">
              <ul className={styles.sheetList}>
                {primaryNav.map((item) => (
                  <li key={item.href}>
                    <Link
                      className={styles.sheetLink}
                      href={item.href}
                      onClick={close}
                    >
                      {item.label}
                      <span className="meta" aria-hidden="true">
                        →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className={styles.sheetFooter}>
              <p className="meta">Contact</p>
              <Link className={styles.sheetLink} href="/contact" onClick={close}>
                Get in touch
                <span className="meta" aria-hidden="true">
                  →
                </span>
              </Link>
              <a
                className={styles.sheetLink}
                href="mailto:uvilla11@gmail.com"
                onClick={close}
              >
                Email
                <span className="meta" aria-hidden="true">
                  ↗
                </span>
              </a>
            </div>

            <button
              type="button"
              className={styles.iconButton}
              onClick={close}
              style={{ alignSelf: "flex-start" }}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
              <span className="sr-only">Close menu</span>
            </button>
          </div>
        </>
      ) : null}
    </>
  );
}

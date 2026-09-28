"use client";

import { useSyncExternalStore } from "react";

import {
  getResolvedSnapshot,
  getServerResolved,
  getServerSnapshot,
  getPreferenceSnapshot,
  setTheme,
  subscribe,
} from "@/lib/theme";

import styles from "./shell.module.css";

/**
 * Two-state appearance toggle.
 *
 * It flips between light and dark based on what is currently resolved, so it
 * always reads as "switch to the other theme". The three-way System / Light /
 * Dark control lives in the command palette, where it does not crowd the
 * header (§67).
 */
export function ThemeToggle() {
  const resolved = useSyncExternalStore(
    subscribe,
    getResolvedSnapshot,
    getServerResolved,
  );

  const next = resolved === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      className={styles.iconButton}
      aria-label={`Switch to ${next} theme`}
      onClick={() => setTheme(next)}
    >
      <svg
        className={styles.themeMoon}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M20.5 14.8A8.5 8.5 0 1 1 9.2 3.5a6.8 6.8 0 0 0 11.3 11.3Z" />
      </svg>
      <svg
        className={styles.themeSun}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
    </button>
  );
}

const OPTIONS = [
  { value: "system", label: "System" },
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
] as const;

/** Three-way appearance control used inside the command palette. */
export function ThemeSelector() {
  const preference = useSyncExternalStore(
    subscribe,
    getPreferenceSnapshot,
    getServerSnapshot,
  );

  return (
    <div className={styles.paletteThemeRow} role="group" aria-label="Appearance">
      {OPTIONS.map((option) => (
        <button
          key={option.value}
          type="button"
          aria-pressed={preference === option.value}
          onClick={() => setTheme(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

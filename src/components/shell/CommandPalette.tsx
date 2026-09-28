"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { commands } from "@/lib/site";

import { ThemeSelector } from "./ThemeToggle";
import styles from "./shell.module.css";

/**
 * Command palette (§74).
 *
 * Navigation and appearance only — the things that are genuinely faster from
 * a keyboard. It is a progressive enhancement: every destination it lists is
 * already reachable from the header and the footer, so nothing here is load
 * bearing.
 *
 * The ⌘K and "/" shortcuts are owned by SiteHeader, which decides whether to
 * mount this component. Only in-dialog key handling lives here, so the
 * shortcut cannot fire twice.
 */
export function CommandPalette() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [highlight, setHighlight] = useState({ query: "", index: 0 });
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const restoreRef = useRef<HTMLElement | null>(null);

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return commands;
    return commands.filter((command) =>
      `${command.label} ${command.hint ?? ""} ${command.keywords ?? ""}`
        .toLowerCase()
        .includes(needle),
    );
  }, [query]);

  const closePalette = useCallback(() => {
    restoreRef.current?.focus();
  }, []);

  useEffect(() => {
    inputRef.current?.focus();
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflow;
    };
  }, []);

  // A changed query invalidates the highlight, so it is reset during render
  // rather than in an effect. Storing the query alongside the index is what
  // makes the reset detectable without a second effect pass.
  let active = highlight.index;
  if (highlight.query !== query) {
    active = 0;
    setHighlight({ query, index: 0 });
  }
  if (active >= results.length) {
    active = 0;
    setHighlight({ query, index: 0 });
  }

  const go = useCallback(
    (href: string) => {
      router.push(href);
      restoreRef.current?.focus();
    },
    [router],
  );

  const onListKeyDown = (event: React.KeyboardEvent) => {
    const count = Math.max(results.length, 1);
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setHighlight({ query, index: (active + 1) % count });
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setHighlight({ query, index: (active - 1 + count) % count });
    } else if (event.key === "Enter") {
      event.preventDefault();
      const target = results[active];
      if (target) go(target.href);
    } else if (event.key === "Escape") {
      event.preventDefault();
      closePalette();
    }
  };

  useEffect(() => {
    listRef.current
      ?.querySelector('[aria-selected="true"]')
      ?.scrollIntoView({ block: "nearest" });
  }, [active]);

  return (
    <div
      className={styles.paletteBackdrop}
      onClick={(event) => {
        if (event.target === event.currentTarget) closePalette();
      }}
    >
      <div
        className={styles.palette}
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        onKeyDown={onListKeyDown}
      >
        <div className={styles.paletteField}>
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
          <input
            ref={inputRef}
            className={styles.paletteInput}
            type="text"
            role="combobox"
            aria-expanded="true"
            aria-controls="palette-list"
            aria-activedescendant={
              results[active] ? `palette-option-${active}` : undefined
            }
            aria-autocomplete="list"
            placeholder="Jump to a page…"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>

        {results.length > 0 ? (
          <ul className={styles.paletteList} id="palette-list" role="listbox" ref={listRef}>
            {results.map((command, index) => (
              <li key={command.href} role="none">
                <button
                  type="button"
                  id={`palette-option-${index}`}
                  role="option"
                  aria-selected={index === active}
                  className={styles.paletteOption}
                  onMouseEnter={() => setHighlight({ query, index })}
                  onClick={() => go(command.href)}
                >
                  <span className={styles.paletteOptionLabel}>{command.label}</span>
                  {command.hint ? (
                    <span className={styles.paletteOptionHint}>{command.hint}</span>
                  ) : null}
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className={styles.paletteEmpty}>
            No pages match “{query}”.
          </p>
        )}

        <div className={styles.paletteFooter}>
          <span>
            <kbd>↑</kbd> <kbd>↓</kbd> move
          </span>
          <span>
            <kbd>↵</kbd> open
          </span>
          <span>
            <kbd>esc</kbd> close
          </span>
          <span style={{ marginLeft: "auto" }}>
            <ThemeSelector />
          </span>
        </div>
      </div>
    </div>
  );
}

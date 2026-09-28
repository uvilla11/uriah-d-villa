"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

/**
 * Shared observer.
 *
 * One IntersectionObserver serves every reveal on the page. A per-component
 * observer would mean dozens of them, which is measurable on a long page and
 * buys nothing.
 */
let observer: IntersectionObserver | null = null;

function getObserver() {
  if (observer || typeof window === "undefined") return observer;
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("is-visible");
        // Reveal once, then stop watching: no ongoing per-frame work.
        observer?.unobserve(entry.target);
      }
    },
    // Trigger slightly before the element reaches the fold so content is
    // already settled by the time it is read.
    { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
  );
  return observer;
}

/**
 * Scroll entrance (§54, §57).
 *
 * Opacity 0 → 1 with a 10px lift, 500ms, staggered by `delay`. Under Reduced
 * Motion the lift is dropped and only a short opacity fade remains, so the
 * content still arrives rather than popping in (§59).
 */
export function Reveal({
  children,
  delay = 0,
  className,
  style,
}: {
  children: ReactNode;
  /** Stagger in milliseconds. §57 suggests 30–50ms between siblings. */
  delay?: number;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches || !("IntersectionObserver" in window)) {
      element.classList.add("is-visible");
      return;
    }

    const instance = getObserver();
    if (!instance) {
      element.classList.add("is-visible");
      return;
    }
    instance.observe(element);
    return () => instance.unobserve(element);
  }, []);

  return (
    <div
      ref={ref}
      className={["reveal", className].filter(Boolean).join(" ")}
      style={{ ...style, "--reveal-delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </div>
  );
}

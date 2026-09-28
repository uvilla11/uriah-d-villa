"use client";

import { useEffect, useRef } from "react";

import styles from "./shell.module.css";

/**
 * Thin scroll progress indicator.
 *
 * Scroll-linked, transform-only, and driven from a rAF-throttled passive
 * listener so it never competes with interaction work (§72). Hidden entirely
 * under Reduced Motion, where a progress bar is noise rather than feedback.
 */
export function ScrollProgress() {
  const barRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let ticking = false;
    const update = () => {
      ticking = false;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const ratio =
        scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0;
      bar.style.transform = `scaleX(${ratio})`;
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className={styles.progress} aria-hidden="true">
      <span ref={barRef} className={styles.progressBar} />
    </div>
  );
}

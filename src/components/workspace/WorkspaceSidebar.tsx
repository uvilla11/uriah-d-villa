"use client";

import { useEffect, useState } from "react";

import { workspaceNav } from "./nav";
import styles from "./workspace.module.css";

/**
 * Workspace sidebar (§38).
 *
 * Text navigation only — no icon overload. On narrow screens it becomes a
 * horizontal scroller rather than a drawer, because the list is short and a
 * drawer would cost an extra interaction for no gain (§69).
 *
 * The current section is tracked with IntersectionObserver so the active
 * entry reflects where the reader actually is.
 */
export function WorkspaceSidebar() {
  const [active, setActive] = useState<string>("#overview");

  useEffect(() => {
    const sections = workspaceNav
      .flatMap((group) => group.items)
      .map((item) => item.href.split("#")[1])
      .filter((id): id is string => Boolean(id))
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);

    if (sections.length === 0 || !("IntersectionObserver" in window)) return;

    const visible = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.set(entry.target.id, 1);
          else visible.delete(entry.target.id);
        }
        // Topmost visible section wins.
        const first = sections.find((section) => visible.has(section.id));
        if (first) setActive(`#${first.id}`);
      },
      { rootMargin: "-72px 0px -55% 0px", threshold: 0 },
    );

    for (const section of sections) observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <aside className={styles.sidebar} aria-label="Workspace navigation">
      <div className={styles.sidebarInner}>
        <div>
          <p className={styles.sidebarBrand}>Uriah Villa</p>
          <p className={`${styles.sidebarTitle} meta`}>
            Engineering workspace
          </p>
        </div>

        <nav aria-label="Workspace sections" className={styles.nav}>
          {workspaceNav.map((group) => (
            <div key={group.title} className={styles.navGroup}>
              <p className={`${styles.navGroupTitle} meta`}>{group.title}</p>
              <ul className={styles.navList}>
                {group.items.map((item) => {
                  const isAnchor = item.href.includes("#");
                  const isActive = isAnchor && item.href.endsWith(active);
                  return (
                    <li key={item.href}>
                      <a
                        className={styles.navItem}
                        href={item.href}
                        aria-current={isActive ? "true" : undefined}
                      >
                        {item.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      </div>
    </aside>
  );
}

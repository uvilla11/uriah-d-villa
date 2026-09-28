import Link from "next/link";

import { profile } from "@/data/profile";
import { footerNav } from "@/lib/site";

import styles from "./shell.module.css";

/** Understated footer (§87): a top border, generous padding, no CTA panel. */
export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerGrid}>
          <div>
            <p className={styles.footerName}>{profile.name}</p>
            <p className={styles.footerRole}>
              {profile.title} · {profile.location}
            </p>
          </div>

          <nav aria-label="Footer">
            <p className={`${styles.footerColTitle} meta`}>Site</p>
            <ul className={styles.footerList}>
              {footerNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className={`${styles.footerColTitle} meta`}>Elsewhere</p>
            <ul className={styles.footerList}>
              {profile.links
                .filter((link) => link.external)
                .map((link) => (
                  <li key={link.href}>
                    <a href={link.href} target="_blank" rel="noopener noreferrer">
                      {link.label} ↗
                    </a>
                  </li>
                ))}
              <li>
                <a href={`mailto:${profile.email}`}>Email</a>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.footerBase}>
          <span className="meta">
            © {year} {profile.name}
          </span>
          <span className="meta">
            Built with accessibility and performance in mind
          </span>
        </div>
      </div>
    </footer>
  );
}

import type { Metadata } from "next";
import Link from "next/link";

import { Contact } from "@/components/home/Contact";

import styles from "@/components/page/page.module.css";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch about embedded firmware, microcontroller applications, motor control, or hardware bring-up under hard constraints.",
  alternates: { canonical: "/contact/" },
};

export default function ContactPage() {
  return (
    <>
      <header className={styles.header}>
        <div className="container">
          <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
            <ol>
              <li>
                <Link href="/">Portfolio</Link>
              </li>
              <li aria-current="page">Contact</li>
            </ol>
          </nav>

          <h1 className={styles.title}>Let’s talk about the system.</h1>
          <p className={styles.lead}>
            A specific problem beats a generic introduction. If you describe the
            hardware, the constraint, and what you have already ruled out, the
            first reply will be useful.
          </p>
        </div>
      </header>

      <Contact
        eyebrow="Direct"
        heading="Email, or use the form"
        lead="Messages go to a real inbox. If a technical question needs a measurement or a schematic to answer properly, say so and I will ask for it."
      />
    </>
  );
}

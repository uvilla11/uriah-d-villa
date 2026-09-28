import { Section, SectionHeader, TextAction } from "@/components/ui";
import { profile } from "@/data/profile";

import { ContactForm } from "./ContactForm";
import styles from "./home.module.css";

/**
 * Contact (§36). Restrained by design: a headline, a direct address, and
 * working channels. No gradient panel, no urgency language, no fake
 * availability claim.
 */
export function Contact({
  showForm = true,
  heading = "Have a technical problem worth solving?",
  eyebrow = "Contact",
  lead = "Embedded firmware, microcontroller applications, motor control, or bringing up physical hardware under hard constraints — that is the conversation.",
}: {
  showForm?: boolean;
  heading?: string;
  eyebrow?: string;
  lead?: string;
}) {
  const externalLinks = profile.links.filter((link) => link.external);

  return (
    <Section id="contact" aria-labelledby="contact-title">
      <div className="container">
        <SectionHeader
          id="contact-title"
          eyebrow={eyebrow}
          title={heading}
          lead={lead}
        />

        <div className={styles.contactGrid}>
          <div className={styles.contactIntro}>
            <div>
              <p className={`${styles.contactEmailLabel} meta`}>Direct email</p>
              <TextAction
                href={`mailto:${profile.email}`}
                arrow="↗"
                className={styles.contactEmail}
              >
                {profile.email}
              </TextAction>
            </div>

            <div>
              <p className={`${styles.contactEmailLabel} meta`}>Elsewhere</p>
              <div className={styles.contactLinks}>
                {externalLinks.map((link) => (
                  <TextAction key={link.href} href={link.href} external quiet>
                    {link.label}
                  </TextAction>
                ))}
                <TextAction href="/resume" quiet>
                  Résumé
                </TextAction>
                <TextAction href="/work" quiet>
                  Full project directory
                </TextAction>
              </div>
            </div>
          </div>

          {showForm ? <ContactForm /> : null}
        </div>
      </div>
    </Section>
  );
}

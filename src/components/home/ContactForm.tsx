"use client";

import { useState, type FormEvent } from "react";

import ui from "@/components/ui/ui.module.css";

import styles from "./home.module.css";

/**
 * Contact form.
 *
 * States implemented: default, submitting, success, error (§82). The form
 * posts to a real endpoint and degrades honestly: on failure the message
 * tells the visitor to email directly rather than leaving a dead control
 * (§85).
 */
const ENDPOINT = "https://formspree.io/f/xpzvwdav";

type State = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [state, setState] = useState<State>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setState("submitting");
    setMessage("");

    try {
      const response = await fetch(ENDPOINT, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (!response.ok) throw new Error("Request failed");
      form.reset();
      setState("success");
      setMessage("Message sent. I will reply to your technical inquiry by email.");
    } catch {
      setState("error");
      setMessage(
        "That did not go through. Please email uvilla11@gmail.com directly.",
      );
    }
  }

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate={false}>
      <div className={styles.field}>
        {/* The requirement hint is visual only: it is aria-hidden so the
            accessible name stays "Name" rather than "Name Required". */}
        <label className={styles.fieldLabel} htmlFor="contact-name">
          <span id="contact-name-label">Name</span>
          <span className="meta" aria-hidden="true">
            Required
          </span>
        </label>
        <input
          className={styles.input}
          id="contact-name"
          aria-labelledby="contact-name-label"
          name="name"
          type="text"
          autoComplete="name"
          required
          placeholder="Your name"
        />
      </div>

      <div className={styles.field}>
        <label className={styles.fieldLabel} htmlFor="contact-email">
          <span id="contact-email-label">Email</span>
          <span className="meta" aria-hidden="true">
            Required
          </span>
        </label>
        <input
          className={styles.input}
          id="contact-email"
          aria-labelledby="contact-email-label"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="you@company.com"
        />
      </div>

      <div className={styles.field}>
        <label className={styles.fieldLabel} htmlFor="contact-message">
          <span id="contact-message-label">Message</span>
          <span className="meta" aria-hidden="true">
            Required
          </span>
        </label>
        <textarea
          className={styles.textarea}
          id="contact-message"
          aria-labelledby="contact-message-label"
          name="message"
          required
          placeholder="What are you building, and what is the constraint you are working against?"
        />
      </div>

      <div className={styles.formFooter}>
        <button
          className={ui.buttonPrimary}
          type="submit"
          disabled={state === "submitting"}
        >
          {state === "submitting" ? "Sending…" : "Send message"}
          <span aria-hidden="true">→</span>
        </button>
        <p
          className={styles.formStatus}
          data-state={state === "idle" || state === "submitting" ? "" : state}
          role="status"
          aria-live="polite"
        >
          {message}
        </p>
      </div>
    </form>
  );
}

import type { Status, Verdict } from "@/lib/types";

/**
 * Status presentation.
 *
 * Color is a secondary cue only: every status renders its literal text label
 * alongside the dot, so the vocabulary survives grayscale and high-contrast
 * modes (§52, §68 "color-independent status").
 *
 * Accent red is deliberately absent from this map. It is reserved for
 * critical status and interface emphasis (§7.2), so a routine ACTIVE tag
 * does not dilute it.
 */
export type Tone = "healthy" | "attention" | "critical" | "neutral";

const statusTones: Record<Status, Tone> = {
  ACTIVE: "healthy",
  SHIPPED: "healthy",
  DEPLOYED: "healthy",
  VALIDATED: "healthy",
  AVAILABLE: "healthy",
  BUILDING: "attention",
  EXPERIMENT: "attention",
  RESEARCH: "attention",
  LEARNING: "attention",
  WATCH: "attention",
  PLANNED: "neutral",
  ARCHIVED: "neutral",
};

const verdictTones: Record<Verdict, Tone> = {
  PASS: "healthy",
  WATCH: "attention",
  FAIL: "critical",
  "NOT TESTED": "neutral",
};

export function statusTone(status: Status): Tone {
  return statusTones[status] ?? "neutral";
}

export function verdictTone(verdict: Verdict): Tone {
  return verdictTones[verdict] ?? "neutral";
}

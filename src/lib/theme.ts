/**
 * Theme preference (§67). System is the default; an explicit choice persists.
 *
 * Modelled as an external store so React can subscribe to it with
 * `useSyncExternalStore`. That keeps the snapshot consistent between server
 * and client without a setState-in-effect, and means one subscriber updates
 * every consumer when the OS preference changes.
 *
 * This module is imported by client components only. The pre-paint inline
 * script in ThemeScript.tsx mirrors the same resolution and must be kept in
 * sync with it, because that script is what prevents a flash of the wrong
 * theme before hydration.
 */

export type ThemePreference = "system" | "light" | "dark";
export type ResolvedTheme = "light" | "dark";

const STORAGE_KEY = "ps-theme";

const listeners = new Set<() => void>();
let preference: ThemePreference = "system";
let resolved: ResolvedTheme = "light";
let initialised = false;

const systemQuery = () =>
  typeof window === "undefined" ? null : window.matchMedia("(prefers-color-scheme: dark)");

function readStored(): ThemePreference {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "light" || stored === "dark") return stored;
  } catch {
    // Storage can be blocked by privacy settings; system remains the default.
  }
  return "system";
}

function resolve(preference: ThemePreference): ResolvedTheme {
  if (preference !== "system") return preference;
  return systemQuery()?.matches ? "dark" : "light";
}

/** Apply the preference to the document and notify subscribers. */
function commit(next: ThemePreference) {
  preference = next;
  resolved = resolve(next);

  try {
    if (next === "system") localStorage.removeItem(STORAGE_KEY);
    else localStorage.setItem(STORAGE_KEY, next);
  } catch {
    // Non-fatal: the theme still applies for this page view.
  }

  if (typeof document !== "undefined") {
    document.documentElement.dataset.theme = resolved;
  }
  for (const listener of listeners) listener();
}

/** Read the initial value once, on the client, before first render commits. */
function init() {
  if (initialised || typeof window === "undefined") return;
  initialised = true;
  preference = readStored();
  resolved = resolve(preference);
  systemQuery()?.addEventListener("change", onSystemChange);
}

function onSystemChange() {
  // Only follow the OS when the user has not made an explicit choice.
  if (preference === "system") commit("system");
}

export function getPreferenceSnapshot(): ThemePreference {
  init();
  return preference;
}

export function getResolvedSnapshot(): ResolvedTheme {
  init();
  return resolved;
}

/** The server has no access to localStorage, so it assumes the default. */
export function getServerSnapshot(): ThemePreference {
  return "system";
}

export function getServerResolved(): ResolvedTheme {
  return "light";
}

export function subscribe(listener: () => void): () => void {
  init();
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function setTheme(next: ThemePreference): void {
  init();
  commit(next);
}

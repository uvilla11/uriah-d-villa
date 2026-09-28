import { asset } from "@/lib/site";

/**
 * Resolves an artifact href to something a raw <a> can follow.
 *
 * Internal paths (/media/...pdf, /resume) need the deployment base path that
 * next/link would normally add; absolute URLs must be left alone.
 */
export function resourceHref(href: string, external: boolean): string {
  if (external || href.startsWith("http") || href.startsWith("mailto:")) {
    return href;
  }
  return asset(href);
}

/** True when the link leaves the site and needs external link affordances. */
export function isExternalHref(href: string): boolean {
  return href.startsWith("http") || href.startsWith("mailto:");
}

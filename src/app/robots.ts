import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/site";

/** Required for metadata routes under `output: "export"`. */
export const dynamic = "force-static";

/** robots.txt (§88, §89). Index everything; there is nothing to hide. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}

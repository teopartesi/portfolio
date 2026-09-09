import type { MetadataRoute } from "next";

import { siteMetadata } from "@/lib/data";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: new URL("/sitemap.xml", siteMetadata.url).toString(),
  };
}

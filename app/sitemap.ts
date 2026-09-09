import type { MetadataRoute } from "next";

import { siteMetadata } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteMetadata.url,
    },
  ];
}

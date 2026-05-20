import type { MetadataRoute } from "next";

import { siteConfig } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url.replace(/\/$/, "");
  const sections = ["", "#about", "#skills", "#experience", "#projects", "#resume", "#contact"];
  return sections.map((s) => ({
    url: `${base}/${s}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: s === "" ? 1 : 0.7,
  }));
}

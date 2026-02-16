import type { MetadataRoute } from "next";

import { siteContent } from "@/content/siteContent";

const routes = [
  "",
  "/how-it-works",
  "/pricing",
  "/faq",
  "/contact",
  "/apply",
  "/privacy-policy",
  "/terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteContent.seo.siteUrl.replace(/\/$/, "");

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}

import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/site-data";

const routes = [
  "",
  "/how-it-works",
  "/memberships",
  "/vehicles",
  "/join",
  "/join/confirmation",
  "/faq",
  "/contact",
  "/service-area",
  "/privacy",
  "/terms",
  "/member-portal",
  "/dashboard",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.siteUrl.replace(/\/$/, "");

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}

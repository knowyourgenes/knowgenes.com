import type { MetadataRoute } from "next";
import { siteConfig } from "../lib/siteConfig";
import { getCategories, getFaqSlugs } from "../sanity/fetch";

const BASE = siteConfig.siteUrl;

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/glossary`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/myths`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
  ];

  // CMS-driven routes. Wrapped so the static routes still emit if Sanity is down.
  let topicRoutes: MetadataRoute.Sitemap = [];
  let questionRoutes: MetadataRoute.Sitemap = [];
  try {
    const [slugs, categories] = await Promise.all([getFaqSlugs(), getCategories()]);

    topicRoutes = categories
      .filter((c) => c.key !== "myths")
      .map((c) => ({
        url: `${BASE}/topics/${c.key}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.7,
      }));

    questionRoutes = slugs.map((slug) => ({
      url: `${BASE}/questions/${slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    }));
  } catch (err) {
    console.warn("[sitemap] CMS fetch failed, emitting static routes only:", err);
  }

  // Dedupe by URL.
  const seen = new Set<string>();
  return [...staticRoutes, ...topicRoutes, ...questionRoutes].filter((entry) => {
    if (seen.has(entry.url)) return false;
    seen.add(entry.url);
    return true;
  });
}

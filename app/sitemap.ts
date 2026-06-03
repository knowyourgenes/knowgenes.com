import type { MetadataRoute } from "next";
import { getCategories, getFaqSlugs } from "../sanity/fetch";

const BASE = "https://knowgenes.com";

export const revalidate = 60;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [slugs, categories] = await Promise.all([getFaqSlugs(), getCategories()]);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/glossary`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/myths`, changeFrequency: "monthly", priority: 0.8 },
  ];

  const topicRoutes: MetadataRoute.Sitemap = categories
    .filter((c) => c.key !== "myths")
    .map((c) => ({
      url: `${BASE}/topics/${c.key}`,
      changeFrequency: "monthly",
      priority: 0.7,
    }));

  const questionRoutes: MetadataRoute.Sitemap = slugs.map((slug) => ({
    url: `${BASE}/questions/${slug}`,
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  return [...staticRoutes, ...topicRoutes, ...questionRoutes];
}

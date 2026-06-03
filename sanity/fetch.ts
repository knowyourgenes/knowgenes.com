import { getClient } from "./client";
import { isSanityConfigured } from "./env";
import {
  categoriesQuery,
  categoryByKeyQuery,
  faqByCategoryQuery,
  faqBySlugQuery,
  faqListQuery,
  faqSlugsQuery,
  glossaryByCategoryQuery,
  glossaryQuery,
  homepageQuery,
  mythsQuery,
  starterFaqQuery,
} from "./queries";
import {
  categories as fallbackCategories,
  faqItems as fallbackFaq,
  geneMyths as fallbackMyths,
  glossaryTerms as fallbackGlossary,
  homepageContent as fallbackHomepage,
  type Category,
  type CategoryKey,
  type GeneMyth,
  type GlossaryTerm,
  type HomepageContent,
} from "./seed-data";

export type { Category, CategoryKey, GeneMyth, GlossaryTerm, HomepageContent };

export type FaqSummary = {
  slug: string;
  question: string;
  shortAnswer: string;
  category: string;
  order?: number;
};

export type FaqItem = FaqSummary & {
  explanation: string[];
  starter: boolean;
  lastReviewed: string | null;
  related: FaqSummary[];
};

type SanityBlock = { _type?: string; style?: string; children?: { text?: string }[] };
function flattenBlocks(blocks: unknown): string[] {
  if (!Array.isArray(blocks)) return [];
  return blocks
    .filter(
      (b): b is SanityBlock => !!b && typeof b === "object" && (b as SanityBlock)._type === "block",
    )
    .map((b) => (b.children ?? []).map((c) => c.text ?? "").join(""))
    .filter((t) => t.trim().length > 0);
}

const toSummary = (f: {
  slug: string;
  question: string;
  shortAnswer: string;
  category: string;
}): FaqSummary => ({
  slug: f.slug,
  question: f.question,
  shortAnswer: f.shortAnswer,
  category: f.category,
});

// ---------- Homepage ----------

export async function getHomepage(): Promise<HomepageContent> {
  const client = getClient();
  if (!isSanityConfigured || !client) return fallbackHomepage;
  try {
    const data = await client.fetch<HomepageContent | null>(homepageQuery);
    return data ?? fallbackHomepage;
  } catch (err) {
    console.warn("[sanity] getHomepage fell back to seed data:", err);
    return fallbackHomepage;
  }
}

// ---------- Categories ----------

export async function getCategories(): Promise<Category[]> {
  const client = getClient();
  if (!isSanityConfigured || !client) return fallbackCategories;
  try {
    const rows = (await client.fetch<Category[]>(categoriesQuery)) ?? [];
    return rows.length ? rows : fallbackCategories;
  } catch {
    return fallbackCategories;
  }
}

export async function getCategoryByKey(key: string): Promise<Category | null> {
  const client = getClient();
  if (!isSanityConfigured || !client) {
    return fallbackCategories.find((c) => c.key === key) ?? null;
  }
  try {
    const row = await client.fetch<Category | null>(categoryByKeyQuery, { key });
    return row ?? fallbackCategories.find((c) => c.key === key) ?? null;
  } catch {
    return fallbackCategories.find((c) => c.key === key) ?? null;
  }
}

// ---------- FAQ ----------

export async function getStarterFaq(): Promise<FaqSummary[]> {
  const client = getClient();
  if (!isSanityConfigured || !client) {
    return fallbackFaq.filter((f) => f.starter).map(toSummary);
  }
  try {
    const rows = (await client.fetch<FaqSummary[]>(starterFaqQuery)) ?? [];
    return rows.length ? rows : fallbackFaq.filter((f) => f.starter).map(toSummary);
  } catch {
    return fallbackFaq.filter((f) => f.starter).map(toSummary);
  }
}

export async function getAllFaq(): Promise<FaqSummary[]> {
  const client = getClient();
  if (!isSanityConfigured || !client) return fallbackFaq.map(toSummary);
  try {
    const rows = (await client.fetch<FaqSummary[]>(faqListQuery)) ?? [];
    return rows.length ? rows : fallbackFaq.map(toSummary);
  } catch {
    return fallbackFaq.map(toSummary);
  }
}

export async function getFaqByCategory(key: string): Promise<FaqSummary[]> {
  const client = getClient();
  if (!isSanityConfigured || !client) {
    return fallbackFaq.filter((f) => f.category === key).map(toSummary);
  }
  try {
    const rows = (await client.fetch<FaqSummary[]>(faqByCategoryQuery, { key })) ?? [];
    return rows.length ? rows : fallbackFaq.filter((f) => f.category === key).map(toSummary);
  } catch {
    return fallbackFaq.filter((f) => f.category === key).map(toSummary);
  }
}

export async function getFaqSlugs(): Promise<string[]> {
  const client = getClient();
  if (!isSanityConfigured || !client) return fallbackFaq.map((f) => f.slug);
  try {
    const slugs = (await client.fetch<string[]>(faqSlugsQuery)) ?? [];
    return slugs.length ? slugs : fallbackFaq.map((f) => f.slug);
  } catch {
    return fallbackFaq.map((f) => f.slug);
  }
}

function fallbackFaqBySlug(slug: string): FaqItem | null {
  const f = fallbackFaq.find((x) => x.slug === slug);
  if (!f) return null;
  const related = fallbackFaq
    .filter((x) => x.category === f.category && x.slug !== f.slug)
    .slice(0, 4)
    .map(toSummary);
  return {
    ...toSummary(f),
    explanation: f.explanation,
    starter: f.starter,
    lastReviewed: f.lastReviewed,
    related,
  };
}

export async function getFaqBySlug(slug: string): Promise<FaqItem | null> {
  const client = getClient();
  if (!isSanityConfigured || !client) return fallbackFaqBySlug(slug);
  try {
    const raw = await client.fetch<
      (Omit<FaqItem, "explanation"> & { explanation?: unknown }) | null
    >(faqBySlugQuery, { slug });
    if (!raw) return fallbackFaqBySlug(slug);
    return {
      ...raw,
      explanation: flattenBlocks(raw.explanation),
      related: raw.related ?? [],
    };
  } catch {
    return fallbackFaqBySlug(slug);
  }
}

// ---------- Glossary ----------

export async function getGlossary(): Promise<GlossaryTerm[]> {
  const client = getClient();
  if (!isSanityConfigured || !client) return fallbackGlossary;
  try {
    const rows = (await client.fetch<GlossaryTerm[]>(glossaryQuery)) ?? [];
    return rows.length ? rows : fallbackGlossary;
  } catch {
    return fallbackGlossary;
  }
}

export async function getGlossaryByCategory(key: string): Promise<GlossaryTerm[]> {
  const client = getClient();
  if (!isSanityConfigured || !client) {
    return fallbackGlossary.filter((g) => g.category === key);
  }
  try {
    const rows = (await client.fetch<GlossaryTerm[]>(glossaryByCategoryQuery, { key })) ?? [];
    return rows.length ? rows : fallbackGlossary.filter((g) => g.category === key);
  } catch {
    return fallbackGlossary.filter((g) => g.category === key);
  }
}

// ---------- Myths ----------

export async function getMyths(): Promise<GeneMyth[]> {
  const client = getClient();
  if (!isSanityConfigured || !client) return fallbackMyths;
  try {
    const rows = (await client.fetch<GeneMyth[]>(mythsQuery)) ?? [];
    return rows.length ? rows : fallbackMyths;
  } catch {
    return fallbackMyths;
  }
}

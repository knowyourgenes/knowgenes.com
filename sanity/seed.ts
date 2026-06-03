/**
 * Push seed-data.ts into the configured Sanity dataset.
 *
 * Required env vars (in .env.local or .env):
 *   NEXT_PUBLIC_SANITY_PROJECT_ID
 *   NEXT_PUBLIC_SANITY_DATASET
 *   SANITY_API_TOKEN     (Editor permissions)
 *
 * Run:  pnpm seed
 */

import { createClient } from "@sanity/client";
import { categories, faqItems, geneMyths, glossaryTerms, homepageContent } from "./seed-data";

function loadDotEnv() {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const fs = require("fs");
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const path = require("path");
    const candidates = [".env.local", ".env"];
    for (const file of candidates) {
      const p = path.join(process.cwd(), file);
      if (!fs.existsSync(p)) continue;
      const lines = fs.readFileSync(p, "utf8").split(/\r?\n/);
      for (const raw of lines) {
        const line = raw.trim();
        if (!line || line.startsWith("#")) continue;
        const eq = line.indexOf("=");
        if (eq === -1) continue;
        const key = line.slice(0, eq).trim();
        let val = line.slice(eq + 1).trim();
        if (
          (val.startsWith('"') && val.endsWith('"')) ||
          (val.startsWith("'") && val.endsWith("'"))
        ) {
          val = val.slice(1, -1);
        }
        if (!process.env[key]) process.env[key] = val;
      }
    }
  } catch {
    // best-effort
  }
}

loadDotEnv();

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_TOKEN;

if (!projectId || !dataset || !token) {
  console.error(
    "Missing env vars. Set NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_API_TOKEN in .env.local",
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2024-10-01",
  useCdn: false,
});

function paragraphsToBlocks(paragraphs: string[]) {
  return paragraphs.map((text, i) => ({
    _type: "block",
    _key: `b${i}`,
    style: "normal",
    markDefs: [],
    children: [{ _type: "span", _key: `s${i}`, text, marks: [] }],
  }));
}

async function run() {
  console.log(`Seeding project=${projectId} dataset=${dataset}`);

  // Drop existing content docs so renamed slugs don't linger.
  const types = ["category", "faqItem", "glossaryTerm", "geneMyth"];
  const tx = client.transaction();
  for (const type of types) {
    const ids = await client.fetch<string[]>(`*[_type == $type]._id`, { type });
    if (ids.length > 0) console.log(`Deleting ${ids.length} existing ${type} docs.`);
    for (const id of ids) tx.delete(id);
  }

  // Homepage singleton
  tx.createOrReplace({
    _id: "homepage.singleton",
    _type: "homepage",
    ...homepageContent,
  });

  // Categories
  for (const c of categories) {
    tx.createOrReplace({
      _id: `category.${c.key}`,
      _type: "category",
      title: c.title,
      key: c.key,
      slug: { _type: "slug", current: c.slug },
      blurb: c.blurb,
      order: c.order,
    });
  }

  // FAQ items
  for (const f of faqItems) {
    tx.createOrReplace({
      _id: `faqItem.${f.slug}`,
      _type: "faqItem",
      question: f.question,
      slug: { _type: "slug", current: f.slug },
      shortAnswer: f.shortAnswer,
      explanation: paragraphsToBlocks(f.explanation),
      category: f.category,
      starter: f.starter,
      order: f.order,
      lastReviewed: f.lastReviewed,
    });
  }

  // Glossary terms
  for (const g of glossaryTerms) {
    tx.createOrReplace({
      _id: `glossaryTerm.${g.slug}`,
      _type: "glossaryTerm",
      term: g.term,
      slug: { _type: "slug", current: g.slug },
      definition: g.definition,
      example: g.example,
      category: g.category,
      order: g.order,
    });
  }

  // Gene myths
  for (const m of geneMyths) {
    tx.createOrReplace({
      _id: `geneMyth.${m.slug}`,
      _type: "geneMyth",
      myth: m.myth,
      slug: { _type: "slug", current: m.slug },
      verdict: m.verdict,
      truth: m.truth,
      order: m.order,
    });
  }

  const result = await tx.commit();
  console.log(`Seeded ${result.results.length} documents.`);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});

// Shared generators for /llms.txt and /llms-full.txt (see https://llmstxt.org).
//
// buildLlmsTxt()      -> concise markdown index of the whole site.
// buildLlmsFullTxt()  -> same structure but with full answer bodies inlined.
//
// Both build absolute URLs from siteConfig.siteUrl and pull content from the
// existing Sanity-backed fetch layer (which falls back to seed data offline).

import { siteConfig } from "./siteConfig";
import { categoryLabel, formatReviewDate } from "./format";
import {
  getAllFaq,
  getCategories,
  getFaqBySlug,
  getGlossary,
  getHomepage,
  getMyths,
} from "../sanity/fetch";

// ---------- URL + text helpers ----------

/** Absolute URL from a site-root path. */
function abs(path: string): string {
  const base = siteConfig.siteUrl.replace(/\/$/, "");
  return path.startsWith("/") ? `${base}${path}` : `${base}/${path}`;
}

/** Strip a trailing " | Brand" / " - Brand" / " · Brand" suffix off meta titles. */
export function cleanTitle(title: string): string {
  return title.replace(/\s+[|·\-–—]\s+[^|·\-–—]*$/, "").trim() || title.trim();
}

// ---------- Portable Text -> markdown ----------
// Generic serializer for Sanity Portable Text. Handles headings, lists,
// blockquotes and paragraphs with bold/italic marks; images and embeds are
// skipped. `headingOffset` demotes body headings so they nest under the
// article title (pass 2 to push h1->h3, h2->h4, ...).

type PTSpan = { _type?: string; text?: string; marks?: string[] };
type PTBlock = {
  _type?: string;
  style?: string;
  listItem?: string;
  level?: number;
  children?: PTSpan[];
};

function serializeSpans(children: PTSpan[] | undefined): string {
  if (!Array.isArray(children)) return "";
  return children
    .map((span) => {
      let text = span?.text ?? "";
      if (!text) return "";
      const marks = span.marks ?? [];
      if (marks.includes("strong")) text = `**${text}**`;
      if (marks.includes("em")) text = `*${text}*`;
      return text;
    })
    .join("");
}

export function portableTextToMarkdown(blocks: unknown, headingOffset = 0): string {
  if (!Array.isArray(blocks)) return "";
  const out: string[] = [];

  for (const block of blocks as PTBlock[]) {
    if (!block || block._type !== "block") continue; // skip images/embeds/etc.
    const text = serializeSpans(block.children).trim();
    if (!text) continue;

    const style = block.style ?? "normal";

    if (/^h[1-6]$/.test(style)) {
      const level = Math.min(6, parseInt(style.slice(1), 10) + headingOffset);
      out.push(`${"#".repeat(level)} ${text}`);
    } else if (style === "blockquote") {
      out.push(`> ${text}`);
    } else if (block.listItem === "bullet") {
      out.push(`- ${text}`);
    } else if (block.listItem === "number") {
      out.push(`1. ${text}`);
    } else {
      out.push(text);
    }
  }

  return out.join("\n\n");
}

// ---------- llms.txt (concise index) ----------

export async function buildLlmsTxt(): Promise<string> {
  const [homepage, categories, faq, glossary, myths] = await Promise.all([
    getHomepage(),
    getCategories(),
    getAllFaq(),
    getGlossary(),
    getMyths(),
  ]);

  const summary =
    homepage?.footerMission?.trim() || homepage?.heroSubhead?.trim() || siteConfig.description;

  const lines: string[] = [];
  lines.push(`# ${siteConfig.siteName}`);
  lines.push("");
  lines.push(`> ${summary}`);
  lines.push("");

  lines.push("## Key Pages");
  lines.push(`- [Home](${abs("/")}): The starting point for genetics, explained from zero.`);
  lines.push(`- [Glossary](${abs("/glossary")}): Plain-language definitions of genetics terms.`);
  lines.push(`- [Myths](${abs("/myths")}): Honest verdicts on common genetics myths.`);
  lines.push("");

  const topics = categories.filter((c) => c.key !== "myths");
  if (topics.length) {
    lines.push("## Topics");
    for (const c of topics) {
      lines.push(`- [${c.title}](${abs(`/topics/${c.key}`)}): ${c.blurb}`);
    }
    lines.push("");
  }

  if (faq.length) {
    lines.push("## Questions");
    for (const f of faq) {
      lines.push(`- [${f.question}](${abs(`/questions/${f.slug}`)}): ${f.shortAnswer}`);
    }
    lines.push("");
  }

  if (glossary.length) {
    lines.push("## Glossary");
    for (const g of glossary) {
      lines.push(`- **${g.term}**: ${g.definition}`);
    }
    lines.push("");
  }

  if (myths.length) {
    lines.push("## Myths");
    for (const m of myths) {
      lines.push(`- [${m.myth}](${abs("/myths")}): ${m.verdict} — ${m.truth}`);
    }
    lines.push("");
  }

  return lines.join("\n").trim() + "\n";
}

// ---------- llms-full.txt (full content inlined) ----------

export async function buildLlmsFullTxt(): Promise<string> {
  const [homepage, categories, faq, glossary, myths] = await Promise.all([
    getHomepage(),
    getCategories(),
    getAllFaq(),
    getGlossary(),
    getMyths(),
  ]);

  const summary =
    homepage?.footerMission?.trim() || homepage?.heroSubhead?.trim() || siteConfig.description;

  const lines: string[] = [];
  lines.push(`# ${siteConfig.siteName}`);
  lines.push("");
  lines.push(`> ${summary}`);
  lines.push("");

  lines.push("## Key Pages");
  lines.push(`- [Home](${abs("/")})`);
  lines.push(`- [Glossary](${abs("/glossary")})`);
  lines.push(`- [Myths](${abs("/myths")})`);
  lines.push("");

  const topics = categories.filter((c) => c.key !== "myths");
  if (topics.length) {
    lines.push("## Topics");
    for (const c of topics) {
      lines.push(`### ${c.title}`);
      lines.push(`URL: ${abs(`/topics/${c.key}`)}`);
      lines.push("");
      lines.push(c.blurb);
      lines.push("");
    }
  }

  // Full FAQ bodies. getFaqBySlug returns the explanation already flattened
  // into paragraphs; fetched in parallel and kept in list order.
  if (faq.length) {
    lines.push("## Questions");
    lines.push("");
    const full = await Promise.all(faq.map((f) => getFaqBySlug(f.slug)));
    for (const item of full) {
      if (!item) continue;
      lines.push(`### ${item.question}`);
      lines.push(`URL: ${abs(`/questions/${item.slug}`)}`);
      lines.push(`Category: ${categoryLabel(item.category)}`);
      const reviewed = formatReviewDate(item.lastReviewed);
      if (reviewed) lines.push(`Last reviewed: ${reviewed}`);
      lines.push("");
      if (item.shortAnswer) {
        lines.push(item.shortAnswer);
        lines.push("");
      }
      if (item.explanation.length) {
        lines.push(item.explanation.join("\n\n"));
        lines.push("");
      }
    }
  }

  if (glossary.length) {
    lines.push("## Glossary");
    lines.push("");
    for (const g of glossary) {
      lines.push(`### ${g.term}`);
      lines.push(g.definition);
      if (g.example) {
        lines.push("");
        lines.push(`> Example: ${g.example}`);
      }
      lines.push("");
    }
  }

  if (myths.length) {
    lines.push("## Myths");
    lines.push("");
    for (const m of myths) {
      lines.push(`### ${m.myth}`);
      lines.push(`Verdict: ${m.verdict}`);
      lines.push("");
      lines.push(m.truth);
      lines.push("");
    }
  }

  return lines.join("\n").trim() + "\n";
}

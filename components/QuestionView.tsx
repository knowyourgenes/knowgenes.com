import Link from "next/link";
import SiteNav from "./SiteNav";
import SiteFooter from "./SiteFooter";
import { categoryHref, categoryLabel, formatReviewDate } from "../lib/format";
import type { FaqItem, HomepageContent } from "../sanity/fetch";

export default function QuestionView({
  item,
  homepage,
}: {
  item: FaqItem;
  homepage: HomepageContent;
}) {
  const reviewed = formatReviewDate(item.lastReviewed);

  return (
    <>
      <SiteNav />

      <main className="flex-1">
        <article className="mx-auto w-full max-w-[1350px] px-4 sm:px-7 pt-12 pb-16 sm:pt-16">
          {/* Breadcrumb */}
          <nav className="flex flex-wrap items-center gap-2 text-[12.5px] text-ink-4">
            <Link href="/" className="transition-colors hover:text-accent">
              Home
            </Link>
            <span aria-hidden>/</span>
            <Link
              href={categoryHref(item.category)}
              className="transition-colors hover:text-accent"
            >
              {categoryLabel(item.category)}
            </Link>
          </nav>

          <h1 className="mt-5 font-serif text-[32px] leading-[1.12] tracking-tight text-ink sm:text-[42px]">
            {item.question}
          </h1>

          {/* The snippet line */}
          <p className="mt-6 rounded-2xl border-l-4 border-accent bg-accent-soft/60 px-6 py-5 font-serif text-[20px] leading-[1.5] text-ink sm:text-[22px]">
            {item.shortAnswer}
          </p>

          {/* Explanation */}
          <div className="mt-7 space-y-5">
            {item.explanation.map((para, i) => (
              <p key={i} className="text-[17px] leading-8 text-ink-2">
                {para}
              </p>
            ))}
          </div>

          {reviewed && (
            <p className="mt-8 border-t border-rule pt-5 font-mono text-[11.5px] uppercase tracking-[0.14em] text-ink-4">
              Last reviewed {reviewed} · reviewed by someone with genetics training
            </p>
          )}

          {/* Related */}
          {item.related.length > 0 && (
            <section className="mt-12">
              <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
                Keep going · {categoryLabel(item.category)}
              </h2>
              <ul className="mt-4 divide-y divide-rule border-y border-rule">
                {item.related.map((r) => (
                  <li key={r.slug}>
                    <Link
                      href={`/questions/${r.slug}`}
                      className="group flex items-center justify-between gap-4 py-4 transition-colors"
                    >
                      <span className="font-serif text-[18px] leading-snug text-ink transition-colors group-hover:text-accent">
                        {r.question}
                      </span>
                      <span
                        aria-hidden
                        className="shrink-0 text-accent transition-transform group-hover:translate-x-1"
                      >
                        →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href={categoryHref(item.category)}
              className="inline-flex items-center gap-2 rounded-full border border-rule-strong px-5 py-2.5 text-[13.5px] font-medium text-ink-2 transition-colors hover:border-accent hover:text-accent"
            >
              ← All {categoryLabel(item.category).toLowerCase()}
            </Link>
            <Link
              href="/glossary"
              className="inline-flex items-center gap-2 rounded-full border border-rule-strong px-5 py-2.5 text-[13.5px] font-medium text-ink-2 transition-colors hover:border-accent hover:text-accent"
            >
              Glossary
            </Link>
          </div>
        </article>
      </main>

      <SiteFooter homepage={homepage} />
    </>
  );
}

import Link from "next/link";
import SmartLink from "./SmartLink";
import SiteNav from "./SiteNav";
import SiteFooter from "./SiteFooter";
import type { Category, FaqSummary, GlossaryTerm, HomepageContent } from "../sanity/fetch";

export default function TopicView({
  category,
  questions,
  terms,
  homepage,
}: {
  category: Category;
  questions: FaqSummary[];
  terms: GlossaryTerm[];
  homepage: HomepageContent;
}) {
  return (
    <>
      <SiteNav />

      <main className="flex-1">
        <header className="border-b border-rule bg-paper-2/50">
          <div className="mx-auto w-full max-w-[1350px] px-4 sm:px-7 pt-12 pb-12 sm:pt-16">
            <nav className="flex flex-wrap items-center gap-2 text-[12.5px] text-ink-4">
              <Link href="/" className="transition-colors hover:text-accent">
                Home
              </Link>
              <span aria-hidden>/</span>
              <SmartLink href="/#topics" className="transition-colors hover:text-accent">
                Topics
              </SmartLink>
            </nav>
            <h1 className="mt-5 font-serif text-[34px] leading-tight tracking-tight text-ink sm:text-[44px]">
              {category.title}
            </h1>
            <p className="mt-3 max-w-2xl text-[16.5px] leading-8 text-ink-3">{category.blurb}</p>
          </div>
        </header>

        <div className="mx-auto w-full max-w-[1350px] px-4 sm:px-7 py-14">
          {/* Questions */}
          <section>
            <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
              Questions
            </h2>
            {questions.length === 0 ? (
              <p className="mt-4 text-[15px] leading-7 text-ink-3">
                More questions on this topic are on the way. In the meantime, the key terms below
                cover the foundations.
              </p>
            ) : (
              <ul className="mt-5 grid gap-4">
                {questions.map((q) => (
                  <li key={q.slug}>
                    <Link
                      href={`/questions/${q.slug}`}
                      className="group block rounded-2xl border border-rule bg-paper p-6 transition-all hover:border-accent hover:shadow-md"
                    >
                      <h3 className="font-serif text-[20px] leading-snug text-ink transition-colors group-hover:text-accent">
                        {q.question}
                      </h3>
                      <p className="mt-2 text-[14.5px] leading-7 text-ink-3">{q.shortAnswer}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </section>

          {/* Key terms in this topic */}
          {terms.length > 0 && (
            <section className="mt-14">
              <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
                Key terms
              </h2>
              <dl className="mt-5 divide-y divide-rule border-y border-rule">
                {terms.map((t) => (
                  <div key={t.slug} className="flex flex-col gap-1 py-4 sm:flex-row sm:gap-6">
                    <dt className="font-serif text-[17px] text-ink sm:w-48 sm:shrink-0">
                      <SmartLink
                        href={`/glossary#${t.slug}`}
                        className="transition-colors hover:text-accent"
                      >
                        {t.term}
                      </SmartLink>
                    </dt>
                    <dd className="text-[14.5px] leading-7 text-ink-3">{t.definition}</dd>
                  </div>
                ))}
              </dl>
            </section>
          )}

          <div className="mt-12">
            <SmartLink
              href="/#topics"
              className="inline-flex items-center gap-2 rounded-full border border-rule-strong px-5 py-2.5 text-[13.5px] font-medium text-ink-2 transition-colors hover:border-accent hover:text-accent"
            >
              ← All topics
            </SmartLink>
          </div>
        </div>
      </main>

      <SiteFooter homepage={homepage} />
    </>
  );
}

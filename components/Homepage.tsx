import Link from "next/link";
import SmartLink from "./SmartLink";
import SiteNav from "./SiteNav";
import SiteFooter from "./SiteFooter";
import SearchBox, { type SearchEntry } from "./SearchBox";
import { categoryHref } from "../lib/format";
import type {
  Category,
  FaqSummary,
  GeneMyth,
  GlossaryTerm,
  HomepageContent,
} from "../sanity/fetch";

const VERDICT_STYLES: Record<string, string> = {
  Trash: "bg-accent-soft text-accent-deep",
  "Mostly trash": "bg-accent-soft text-accent-deep",
  "Half true": "bg-paper-3 text-ink-2",
  True: "bg-paper-3 text-ink-2",
};

export default function Homepage({
  homepage,
  categories,
  starterFaq,
  glossary,
  myths,
  searchEntries,
}: {
  homepage: HomepageContent;
  categories: Category[];
  starterFaq: FaqSummary[];
  glossary: GlossaryTerm[];
  myths: GeneMyth[];
  searchEntries: SearchEntry[];
}) {
  const placeholders = homepage.searchPlaceholders?.length
    ? homepage.searchPlaceholders
    : ["What is a gene?", "What is DNA made of?", "Can genes change?"];

  return (
    <>
      <SiteNav />

      <main className="flex-1">
        {/* ---------- Hero ---------- */}
        <section className="relative border-b border-rule">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.55]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 18% 0%, var(--color-accent-soft), transparent 42%), radial-gradient(circle at 90% 30%, var(--color-paper-2), transparent 55%)",
            }}
          />
          <div className="relative mx-auto flex w-full max-w-[1350px] flex-col items-center px-4 sm:px-7 pt-16 pb-14 text-center sm:pt-24 sm:pb-20">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
              {homepage.heroEyebrow}
            </p>
            <h1 className="mt-5 max-w-3xl font-serif text-[40px] leading-[1.05] tracking-tight text-ink sm:text-[58px]">
              {homepage.heroHeadline}
            </h1>
            <p className="mt-6 max-w-2xl text-[16.5px] leading-8 text-ink-3 sm:text-[18px]">
              {homepage.heroSubhead}
            </p>

            <div className="mt-8 w-full max-w-2xl">
              <SearchBox entries={searchEntries} placeholders={placeholders} />
            </div>

            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <SmartLink
                href="/#start-here"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-[14px] font-medium text-paper transition-colors hover:bg-accent-deep"
              >
                {homepage.heroPrimaryCta} <span aria-hidden>→</span>
              </SmartLink>
              <Link
                href="/glossary"
                className="inline-flex items-center gap-2 rounded-full border border-rule-strong px-5 py-3 text-[14px] font-medium text-ink-2 transition-colors hover:border-accent hover:text-accent"
              >
                {homepage.heroSecondaryCta}
              </Link>
            </div>
          </div>
        </section>

        {/* ---------- Topics / doors in ---------- */}
        <section id="topics" className="mx-auto w-full max-w-[1350px] px-4 sm:px-7 py-16 sm:py-20">
          <div className="flex flex-col items-center text-center">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
              Browse by topic
            </p>
            <h2 className="mt-3 font-serif text-[28px] leading-tight text-ink sm:text-[34px]">
              Five plain doors in
            </h2>
            <p className="mt-2 max-w-xl text-[15px] leading-7 text-ink-3">
              Ordered by what beginners ask first. Each door leads to a filtered list of questions
              and the key terms behind them.
            </p>
          </div>

          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((c, i) => (
              <Link
                key={c.key}
                href={categoryHref(c.key)}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-rule bg-paper p-6 transition-all hover:-translate-y-0.5 hover:border-accent hover:shadow-md"
              >
                <div>
                  <span className="font-mono text-[12px] text-ink-4">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-2 font-serif text-[21px] leading-snug text-ink">{c.title}</h3>
                  <p className="mt-2 text-[14.5px] leading-7 text-ink-3">{c.blurb}</p>
                </div>
                <span className="mt-6 inline-flex items-center gap-1.5 text-[13.5px] font-medium text-accent">
                  Open
                  <span aria-hidden className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* ---------- Start here: the 7 most-asked ---------- */}
        <section id="start-here" className="border-y border-rule bg-paper-2/50">
          <div className="mx-auto w-full max-w-[1350px] px-4 sm:px-7 py-16 sm:py-20">
            <div className="flex flex-col items-center text-center">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
                Start here
              </p>
              <h2 className="mt-3 font-serif text-[28px] leading-tight text-ink sm:text-[34px]">
                The {starterFaq.length} most-asked questions about genes
              </h2>
              <p className="mt-2 max-w-2xl text-[15px] leading-7 text-ink-3">
                If you read nothing else, read these. They cover the foundations everything else
                builds on. Each answer starts with one plain sentence - the whole truth in brief.
              </p>
            </div>

            <ol className="mt-9 grid gap-4 md:grid-cols-2">
              {starterFaq.map((f, i) => (
                <li key={f.slug}>
                  <Link
                    href={`/questions/${f.slug}`}
                    className="group flex h-full gap-4 rounded-2xl border border-rule bg-paper p-6 transition-all hover:border-accent hover:shadow-md"
                  >
                    <span className="font-serif text-[22px] leading-none text-accent/70">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="font-serif text-[19px] leading-snug text-ink transition-colors group-hover:text-accent">
                        {f.question}
                      </h3>
                      <p className="mt-2 text-[14.5px] leading-7 text-ink-3 line-clamp-3">
                        {f.shortAnswer}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ---------- Glossary preview ---------- */}
        <section className="mx-auto w-full max-w-[1350px] px-4 sm:px-7 py-16 sm:py-20">
          <div className="flex flex-col items-center text-center">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
              The vocabulary
            </p>
            <h2 className="mt-3 font-serif text-[28px] leading-tight text-ink sm:text-[34px]">
              {glossary.length} key terms, each in one plain line
            </h2>
            <p className="mt-2 max-w-xl text-[15px] leading-7 text-ink-3">
              The words that come up again and again - defined plainly, with an everyday example.
            </p>
            <Link
              href="/glossary"
              className="mt-4 inline-flex items-center gap-1.5 text-[14px] font-medium text-accent transition-colors hover:text-accent-deep"
            >
              See the full glossary <span aria-hidden>→</span>
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-2.5">
            {glossary.slice(0, 14).map((g) => (
              <SmartLink
                key={g.slug}
                href={`/glossary#${g.slug}`}
                className="rounded-full border border-rule bg-paper px-4 py-2 text-[13.5px] text-ink-2 transition-colors hover:border-accent hover:text-accent"
              >
                {g.term}
              </SmartLink>
            ))}
          </div>
        </section>

        {/* ---------- Myths preview ---------- */}
        <section className="border-y border-rule bg-paper-2/50">
          <div className="mx-auto w-full max-w-[1350px] px-4 sm:px-7 py-16 sm:py-20">
            <div className="flex flex-col items-center text-center">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
                Truth or trash
              </p>
              <h2 className="mt-3 font-serif text-[28px] leading-tight text-ink sm:text-[34px]">
                {myths.length} common gene myths
              </h2>
              <p className="mt-2 max-w-xl text-[15px] leading-7 text-ink-3">
                Genetics attracts more confident nonsense than almost any field. Each myth gets a
                plain verdict and the actual truth.
              </p>
              <Link
                href="/myths"
                className="mt-4 inline-flex items-center gap-1.5 text-[14px] font-medium text-accent transition-colors hover:text-accent-deep"
              >
                Read the myth-buster <span aria-hidden>→</span>
              </Link>
            </div>

            <ul className="mt-8 grid gap-3 md:grid-cols-2">
              {myths.slice(0, 4).map((m) => (
                <li
                  key={m.slug}
                  className="flex items-center gap-4 rounded-xl border border-rule bg-paper px-5 py-4"
                >
                  <span
                    className={`shrink-0 rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] ${
                      VERDICT_STYLES[m.verdict] ?? "bg-paper-3 text-ink-2"
                    }`}
                  >
                    {m.verdict}
                  </span>
                  <span className="text-[14.5px] leading-6 text-ink-2">{m.myth}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ---------- Editorial standards ---------- */}
        <section
          id="editorial-standards"
          className="mx-auto w-full max-w-[1350px] px-4 sm:px-7 py-16 sm:py-20"
        >
          <div className="mx-auto flex max-w-3xl flex-col items-center rounded-3xl border border-rule bg-paper p-8 text-center sm:p-12">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
              Why you can trust this
            </p>
            <h2 className="mt-3 font-serif text-[26px] leading-tight text-ink sm:text-[30px]">
              {homepage.editorialTitle}
            </h2>
            <p className="mt-5 text-[16px] leading-8 text-ink-2">{homepage.editorialBody}</p>
            <ul className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-[13.5px] text-ink-3">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" /> Researched against trusted
                sources
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" /> Reviewed before publishing
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" /> Updated when the science
                updates
              </li>
            </ul>
          </div>
        </section>

        {/* ---------- Newsletter ---------- */}
        <section id="newsletter" className="border-t border-rule bg-accent">
          <div className="mx-auto w-full max-w-[1350px] px-4 sm:px-7 py-16 sm:py-20">
            <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
              <h2 className="font-serif text-[28px] leading-tight text-paper sm:text-[34px]">
                {homepage.newsletterTitle}
              </h2>
              <p className="mt-3 text-[16px] leading-8 text-paper/85">{homepage.newsletterBody}</p>
              <form
                className="mt-7 flex w-full flex-col justify-center gap-3 sm:flex-row"
                aria-label="Newsletter signup"
              >
                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  aria-label="Email address"
                  className="w-full rounded-full border border-paper/30 bg-paper/10 px-5 py-3 text-[15px] text-paper placeholder:text-paper/60 focus:border-paper focus:outline-none sm:max-w-sm"
                />
                <button
                  type="submit"
                  className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-paper px-6 py-3 text-[14px] font-semibold text-accent-deep transition-colors hover:bg-paper-2"
                >
                  Subscribe
                </button>
              </form>
              <p className="mt-3 text-[12.5px] text-paper/70">{homepage.newsletterSmallprint}</p>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter homepage={homepage} />
    </>
  );
}

import Link from "next/link";
import SiteNav from "./SiteNav";
import SiteFooter from "./SiteFooter";
import { categoryLabel } from "../lib/format";
import type { GlossaryTerm, HomepageContent } from "../sanity/fetch";

export default function GlossaryView({
  terms,
  homepage,
}: {
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
              <span className="text-ink-3">Glossary</span>
            </nav>
            <h1 className="mt-5 font-serif text-[34px] leading-tight tracking-tight text-ink sm:text-[46px]">
              Glossary of {terms.length} key terms
            </h1>
            <p className="mt-3 max-w-2xl text-[16.5px] leading-8 text-ink-3">
              The words that come up again and again, each defined in one plain line with an
              everyday example. Every term has its own link - search any single term and land
              directly here.
            </p>

            {/* Jump chips */}
            <div className="mt-7 flex flex-wrap gap-2">
              {terms.map((t) => (
                <a
                  key={t.slug}
                  href={`#${t.slug}`}
                  className="rounded-full border border-rule bg-paper px-3 py-1.5 text-[12.5px] text-ink-2 transition-colors hover:border-accent hover:text-accent"
                >
                  {t.term}
                </a>
              ))}
            </div>
          </div>
        </header>

        <div className="mx-auto w-full max-w-[1350px] px-4 sm:px-7 py-12">
          <dl className="overflow-hidden rounded-2xl border border-rule">
            {terms.map((t, i) => (
              <div
                key={t.slug}
                id={t.slug}
                className={`grid gap-2 px-6 py-6 sm:grid-cols-[200px_1fr_1fr] sm:gap-8 ${
                  i % 2 === 1 ? "bg-paper-2/40" : "bg-paper"
                }`}
              >
                <dt className="flex flex-col gap-1.5">
                  <span className="font-serif text-[20px] leading-tight text-ink">{t.term}</span>
                  {t.category && (
                    <span className="w-fit font-mono text-[10px] uppercase tracking-[0.12em] text-ink-4">
                      {categoryLabel(t.category)}
                    </span>
                  )}
                </dt>
                <dd className="text-[15px] leading-7 text-ink-2">{t.definition}</dd>
                <dd className="text-[14.5px] leading-7 text-ink-3">
                  <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-4">
                    e.g.
                  </span>{" "}
                  {t.example}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </main>

      <SiteFooter homepage={homepage} />
    </>
  );
}

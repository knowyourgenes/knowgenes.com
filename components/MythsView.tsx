import Link from "next/link";
import SiteNav from "./SiteNav";
import SiteFooter from "./SiteFooter";
import type { GeneMyth, HomepageContent } from "../sanity/fetch";

const VERDICT_STYLES: Record<string, string> = {
  Trash: "bg-accent text-paper",
  "Mostly trash": "bg-accent-deep text-paper",
  "Half true": "bg-marker text-ink",
  True: "bg-paper-3 text-ink",
};

export default function MythsView({
  myths,
  homepage,
}: {
  myths: GeneMyth[];
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
              <span className="text-ink-3">Myths &amp; misunderstandings</span>
            </nav>
            <h1 className="mt-5 font-serif text-[34px] leading-tight tracking-tight text-ink sm:text-[46px]">
              Truth or trash: {myths.length} common gene myths
            </h1>
            <p className="mt-3 max-w-2xl text-[16.5px] leading-8 text-ink-3">
              Genetics attracts more confident nonsense than almost any field. Here are the ones we
              hear most, each with a plain verdict and the actual truth.
            </p>
          </div>
        </header>

        <div className="mx-auto w-full max-w-[1350px] px-4 sm:px-7 py-12">
          <ul className="space-y-5">
            {myths.map((m) => (
              <li
                key={m.slug}
                id={m.slug}
                className="rounded-2xl border border-rule bg-paper p-6 sm:p-7"
              >
                <div className="flex flex-wrap items-center gap-3">
                  <span
                    className={`rounded-full px-3 py-1 font-mono text-[10.5px] uppercase tracking-[0.14em] ${
                      VERDICT_STYLES[m.verdict] ?? "bg-paper-3 text-ink"
                    }`}
                  >
                    {m.verdict}
                  </span>
                  <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink-4">
                    Myth
                  </span>
                </div>
                <p className="mt-3 font-serif text-[21px] leading-snug text-ink">{m.myth}</p>
                <p className="mt-3 text-[16px] leading-8 text-ink-2">{m.truth}</p>
              </li>
            ))}
          </ul>

          <div className="mt-10 rounded-2xl border border-dashed border-rule-strong bg-paper-2/40 p-6 sm:p-7">
            <h2 className="font-serif text-[19px] text-ink">Spot a myth we missed?</h2>
            <p className="mt-2 text-[15px] leading-7 text-ink-3">
              The best beginner questions come from real confusion. Send us the gene
              &lsquo;fact&rsquo; you keep hearing and aren&rsquo;t sure about - we turn the good
              ones into new answers.
            </p>
          </div>
        </div>
      </main>

      <SiteFooter homepage={homepage} />
    </>
  );
}

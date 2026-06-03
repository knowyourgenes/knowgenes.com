import SmartLink from "./SmartLink";
import type { HomepageContent } from "../sanity/fetch";

export default function SiteFooter({ homepage }: { homepage: HomepageContent }) {
  return (
    <footer className="border-t border-rule bg-paper-2/60">
      <div className="mx-auto w-full max-w-page px-4 sm:px-7 pb-10 pt-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3">
              <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-md bg-accent">
                <span className="font-serif text-lg font-semibold text-paper">k</span>
                <span className="absolute -right-1 -top-1 inline-flex h-3 w-3 items-center justify-center rounded-full bg-ink" />
              </span>
              <span className="font-serif text-[20px] text-ink">knowgenes.com</span>
            </div>
            <p className="mt-4 max-w-md text-[14.5px] leading-7 text-ink-3">
              {homepage.footerMission}
            </p>
            <p className="mt-4 max-w-md text-[13px] leading-6 text-ink-4">
              For an Indian wellness brand built around this science, see{" "}
              <a
                href="https://kyg.co.in"
                className="text-ink-3 underline decoration-rule-strong underline-offset-2 transition-colors hover:text-accent"
                rel="noopener noreferrer"
              >
                kyg.co.in
              </a>
              .
            </p>
          </div>

          <div>
            <div className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-ink-4">
              Browse
            </div>
            <ul className="mt-4 space-y-2.5 text-[14px] text-ink-2">
              <li>
                <SmartLink href="/#start-here" className="transition-colors hover:text-accent">
                  Start here
                </SmartLink>
              </li>
              <li>
                <SmartLink href="/#topics" className="transition-colors hover:text-accent">
                  Browse topics
                </SmartLink>
              </li>
              <li>
                <SmartLink href="/glossary" className="transition-colors hover:text-accent">
                  Glossary
                </SmartLink>
              </li>
              <li>
                <SmartLink href="/myths" className="transition-colors hover:text-accent">
                  Myths &amp; misunderstandings
                </SmartLink>
              </li>
            </ul>
          </div>

          <div>
            <div className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-ink-4">
              About
            </div>
            <ul className="mt-4 space-y-2.5 text-[14px] text-ink-2">
              <li>
                <SmartLink
                  href="/#editorial-standards"
                  className="transition-colors hover:text-accent"
                >
                  Editorial standards
                </SmartLink>
              </li>
              <li>
                <SmartLink href="/#newsletter" className="transition-colors hover:text-accent">
                  Newsletter
                </SmartLink>
              </li>
              <li>
                <SmartLink href="/studio" className="transition-colors hover:text-accent">
                  Studio
                </SmartLink>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-rule pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-[12px] text-ink-4">
            © {new Date().getFullYear()} knowgenes.com · Free, ad-free, reviewed.
          </div>
          <div className="text-[12px] text-ink-4">
            We say &lsquo;we don&rsquo;t know yet&rsquo; when that is the honest answer.
          </div>
        </div>
      </div>
    </footer>
  );
}

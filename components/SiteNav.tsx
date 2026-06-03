import Link from "next/link";
import SmartLink from "./SmartLink";

const NAV_LINKS: { label: string; href: string }[] = [
  { label: "Start here", href: "/#start-here" },
  { label: "Browse topics", href: "/#topics" },
  { label: "Glossary", href: "/glossary" },
  { label: "Myths", href: "/myths" },
];

export default function SiteNav() {
  return (
    <header className="sticky top-0 z-40 border-b border-rule bg-paper/85 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-page items-center justify-between gap-3 px-4 py-4 sm:gap-6 sm:px-7">
        <Link href="/" aria-label="knowgenes.com" className="flex items-center gap-3">
          <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-md bg-accent">
            <span className="font-serif text-lg font-semibold text-paper">k</span>
            <span className="absolute -right-1 -top-1 inline-flex h-3 w-3 items-center justify-center rounded-full bg-ink" />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-serif text-[18px] tracking-tight text-ink">knowgenes</span>
            <span className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
              .com
            </span>
          </span>
        </Link>
        <nav className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((l) => (
            <SmartLink
              key={l.href}
              href={l.href}
              className="text-[13.5px] font-medium text-ink-2 transition-colors hover:text-accent"
            >
              {l.label}
            </SmartLink>
          ))}
        </nav>
        <SmartLink
          href="/#newsletter"
          className="inline-flex shrink-0 items-center gap-2 rounded-full bg-accent px-3.5 py-2 text-[13px] font-medium text-paper transition-colors hover:bg-accent-deep sm:px-4"
        >
          Subscribe
          <span aria-hidden className="hidden sm:inline">
            →
          </span>
        </SmartLink>
      </div>
    </header>
  );
}

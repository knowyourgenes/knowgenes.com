"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

export type SearchEntry = {
  label: string;
  kind: "Question" | "Term";
  href: string;
};

export default function SearchBox({
  entries,
  placeholders,
}: {
  entries: SearchEntry[];
  placeholders: string[];
}) {
  const [query, setQuery] = useState("");
  const placeholder = placeholders[0] ? `Try: ${placeholders.join("  ·  ")}` : "Search…";

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return entries.filter((e) => e.label.toLowerCase().includes(q)).slice(0, 8);
  }, [entries, query]);

  return (
    <div className="relative w-full">
      <div className="flex items-center gap-3 rounded-2xl border border-rule-strong bg-paper px-4 py-3.5 shadow-sm transition-colors focus-within:border-accent">
        <svg
          aria-hidden
          viewBox="0 0 24 24"
          className="h-5 w-5 shrink-0 text-ink-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          aria-label="Search questions and glossary terms"
          className="w-full bg-transparent text-[15px] text-ink placeholder:text-ink-4 focus:outline-none"
        />
      </div>

      {query.trim() && (
        <div className="absolute z-30 mt-2 w-full overflow-hidden rounded-2xl border border-rule bg-paper shadow-lg">
          {results.length === 0 ? (
            <p className="px-4 py-4 text-[14px] text-ink-3">
              No match yet - try the topics below, or the glossary.
            </p>
          ) : (
            <ul className="max-h-80 overflow-auto py-1">
              {results.map((r) => (
                <li key={r.href}>
                  <Link
                    href={r.href}
                    className="flex items-center justify-between gap-3 px-4 py-2.5 text-[14.5px] text-ink-2 transition-colors hover:bg-paper-2 hover:text-accent"
                  >
                    <span>{r.label}</span>
                    <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.15em] text-ink-4">
                      {r.kind}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

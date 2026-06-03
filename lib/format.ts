const monthLongFmt = new Intl.DateTimeFormat("en-GB", { month: "long" });

export function formatReviewDate(iso: string | null | undefined): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return `${d.getDate()} ${monthLongFmt.format(d)} ${d.getFullYear()}`;
}

export const CATEGORY_LABELS: Record<string, string> = {
  basics: "The absolute basics",
  inheritance: "How inheritance works",
  testing: "Genetic testing 101",
  "traits-health": "Traits & health",
  myths: "Myths & misunderstandings",
};

export function categoryLabel(key: string): string {
  return CATEGORY_LABELS[key] ?? key;
}

// Map a category key to the route a reader follows from a "door".
export function categoryHref(key: string): string {
  if (key === "myths") return "/myths";
  return `/topics/${key}`;
}

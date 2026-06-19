// Canonical site identity. Reused by sitemap, robots, and the llms.txt routes
// so the production URL/name live in exactly one place.
export const siteConfig = {
  siteUrl: "https://knowgenes.com",
  siteName: "knowgenes.com",
  description:
    "The clearest starting point on the internet for understanding your genes. " +
    "Plain-language answers to the most-asked questions about genes, DNA, inheritance, " +
    "and genetic testing - a beginner's FAQ, a searchable glossary, and an honest myth-buster.",
} as const;

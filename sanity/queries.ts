import { groq } from "next-sanity";

export const homepageQuery = groq`*[_type == "homepage"] | order(_updatedAt desc)[0] {
  heroEyebrow,
  heroHeadline,
  heroSubhead,
  heroPrimaryCta,
  heroSecondaryCta,
  searchPlaceholders,
  editorialTitle,
  editorialBody,
  newsletterTitle,
  newsletterBody,
  newsletterSmallprint,
  footerMission
}`;

export const categoriesQuery = groq`*[_type == "category"] | order(order asc) {
  title,
  "key": key,
  "slug": slug.current,
  blurb,
  order
}`;

export const categoryByKeyQuery = groq`*[_type == "category" && key == $key][0] {
  title,
  "key": key,
  "slug": slug.current,
  blurb,
  order
}`;

// Lightweight FAQ projection used for lists, search and "start here".
export const faqListQuery = groq`*[_type == "faqItem"] | order(order asc) {
  "slug": slug.current,
  question,
  shortAnswer,
  category,
  starter,
  order
}`;

export const starterFaqQuery = groq`*[_type == "faqItem" && starter == true] | order(order asc) {
  "slug": slug.current,
  question,
  shortAnswer,
  category,
  order
}`;

export const faqByCategoryQuery = groq`*[_type == "faqItem" && category == $key] | order(order asc) {
  "slug": slug.current,
  question,
  shortAnswer,
  category,
  order
}`;

export const faqBySlugQuery = groq`*[_type == "faqItem" && slug.current == $slug][0] {
  "slug": slug.current,
  question,
  shortAnswer,
  explanation,
  category,
  starter,
  order,
  lastReviewed,
  "related": *[_type == "faqItem" && slug.current != ^.slug.current && category == ^.category] | order(order asc)[0...4] {
    "slug": slug.current,
    question,
    shortAnswer,
    category
  }
}`;

export const faqSlugsQuery = groq`*[_type == "faqItem" && defined(slug.current)][].slug.current`;

export const glossaryQuery = groq`*[_type == "glossaryTerm"] | order(order asc) {
  "slug": slug.current,
  term,
  definition,
  example,
  category,
  order
}`;

export const glossaryByCategoryQuery = groq`*[_type == "glossaryTerm" && category == $key] | order(order asc) {
  "slug": slug.current,
  term,
  definition,
  example,
  category,
  order
}`;

export const mythsQuery = groq`*[_type == "geneMyth"] | order(order asc) {
  "slug": slug.current,
  myth,
  verdict,
  truth,
  order
}`;

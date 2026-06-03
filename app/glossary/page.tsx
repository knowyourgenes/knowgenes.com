import type { Metadata } from "next";
import GlossaryView from "../../components/GlossaryView";
import { getGlossary, getHomepage } from "../../sanity/fetch";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Glossary of key genetics terms",
  description:
    "The words that come up again and again in genetics, each defined in one plain line with an everyday example. DNA, gene, genome, variant, allele, epigenetics and more.",
};

export default async function GlossaryPage() {
  const [terms, homepage] = await Promise.all([getGlossary(), getHomepage()]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    name: "knowgenes.com glossary",
    hasDefinedTerm: terms.map((t) => ({
      "@type": "DefinedTerm",
      name: t.term,
      description: t.definition,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <GlossaryView terms={terms} homepage={homepage} />
    </>
  );
}

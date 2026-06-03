import type { Metadata } from "next";
import { notFound } from "next/navigation";
import QuestionView from "../../../components/QuestionView";
import { getFaqBySlug, getFaqSlugs, getHomepage } from "../../../sanity/fetch";

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getFaqSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata(props: PageProps<"/questions/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const item = await getFaqBySlug(slug);
  if (!item) return { title: "Not found" };
  return {
    title: item.question,
    description: item.shortAnswer,
    openGraph: { title: item.question, description: item.shortAnswer, type: "article" },
  };
}

export default async function QuestionPage(props: PageProps<"/questions/[slug]">) {
  const { slug } = await props.params;
  const [item, homepage] = await Promise.all([getFaqBySlug(slug), getHomepage()]);
  if (!item) notFound();

  // Q&A structured data - written so AI search and rich results can lift the answer.
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "QAPage",
    mainEntity: {
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: [item.shortAnswer, ...item.explanation].join(" "),
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <QuestionView item={item} homepage={homepage} />
    </>
  );
}

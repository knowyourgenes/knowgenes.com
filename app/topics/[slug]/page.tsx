import type { Metadata } from "next";
import { notFound } from "next/navigation";
import TopicView from "../../../components/TopicView";
import {
  getCategories,
  getCategoryByKey,
  getFaqByCategory,
  getGlossaryByCategory,
  getHomepage,
} from "../../../sanity/fetch";

export const revalidate = 60;

export async function generateStaticParams() {
  const categories = await getCategories();
  // "myths" has its own dedicated page.
  return categories.filter((c) => c.key !== "myths").map((c) => ({ slug: c.key }));
}

export async function generateMetadata(props: PageProps<"/topics/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const category = await getCategoryByKey(slug);
  if (!category) return { title: "Not found" };
  return {
    title: category.title,
    description: category.blurb,
  };
}

export default async function TopicPage(props: PageProps<"/topics/[slug]">) {
  const { slug } = await props.params;
  const category = await getCategoryByKey(slug);
  if (!category || category.key === "myths") notFound();

  const [questions, terms, homepage] = await Promise.all([
    getFaqByCategory(slug),
    getGlossaryByCategory(slug),
    getHomepage(),
  ]);

  return <TopicView category={category} questions={questions} terms={terms} homepage={homepage} />;
}

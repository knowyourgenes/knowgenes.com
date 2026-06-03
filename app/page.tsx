import Homepage from "../components/Homepage";
import type { SearchEntry } from "../components/SearchBox";
import {
  getAllFaq,
  getCategories,
  getGlossary,
  getHomepage,
  getMyths,
  getStarterFaq,
} from "../sanity/fetch";

export const revalidate = 60;

export default async function Page() {
  const [homepage, categories, starterFaq, allFaq, glossary, myths] = await Promise.all([
    getHomepage(),
    getCategories(),
    getStarterFaq(),
    getAllFaq(),
    getGlossary(),
    getMyths(),
  ]);

  const searchEntries: SearchEntry[] = [
    ...allFaq.map(
      (f): SearchEntry => ({
        label: f.question,
        kind: "Question",
        href: `/questions/${f.slug}`,
      }),
    ),
    ...glossary.map(
      (g): SearchEntry => ({
        label: g.term,
        kind: "Term",
        href: `/glossary#${g.slug}`,
      }),
    ),
  ];

  return (
    <Homepage
      homepage={homepage}
      categories={categories}
      starterFaq={starterFaq}
      glossary={glossary}
      myths={myths}
      searchEntries={searchEntries}
    />
  );
}

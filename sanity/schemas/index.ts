import type { SchemaTypeDefinition } from "sanity";
import { category } from "./category";
import { faqItem } from "./faqItem";
import { geneMyth } from "./geneMyth";
import { glossaryTerm } from "./glossaryTerm";
import { homepage } from "./homepage";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [homepage, category, faqItem, glossaryTerm, geneMyth],
};

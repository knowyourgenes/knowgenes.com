import { defineField, defineType } from "sanity";
import { CATEGORY_OPTIONS } from "./category";

export const glossaryTerm = defineType({
  name: "glossaryTerm",
  title: "Glossary term",
  type: "document",
  fields: [
    defineField({
      name: "term",
      title: "Term",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "term", maxLength: 48 },
      description: "Becomes the anchor link on the glossary page.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "definition",
      title: "Plain-language definition",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required().min(10).max(400),
    }),
    defineField({
      name: "example",
      title: "Everyday example",
      type: "text",
      rows: 2,
      validation: (Rule) => Rule.required().min(5).max(300),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: CATEGORY_OPTIONS.map((value) => ({ title: value, value })),
        layout: "dropdown",
      },
    }),
    defineField({ name: "order", type: "number", initialValue: 0 }),
  ],
  orderings: [
    {
      title: "Display order",
      name: "displayOrder",
      by: [{ field: "order", direction: "asc" }],
    },
    {
      title: "Alphabetical",
      name: "alpha",
      by: [{ field: "term", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "term", subtitle: "definition" },
  },
});

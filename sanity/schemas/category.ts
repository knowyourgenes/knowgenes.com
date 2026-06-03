import { defineField, defineType } from "sanity";

// The five "doors in", ordered by what a beginner asks first.
export const CATEGORY_OPTIONS = [
  "basics",
  "inheritance",
  "testing",
  "traits-health",
  "myths",
] as const;

export type CategoryKey = (typeof CATEGORY_OPTIONS)[number];

export const category = defineType({
  name: "category",
  title: "Category (door in)",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "key",
      title: "Category key",
      type: "string",
      description: "Internal key used to group questions and glossary terms.",
      options: {
        list: CATEGORY_OPTIONS.map((value) => ({ title: value, value })),
        layout: "dropdown",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title", maxLength: 48 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "blurb",
      title: "Blurb",
      type: "text",
      rows: 2,
      description: "One short line describing what this door covers.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "order", type: "number", initialValue: 0 }),
  ],
  orderings: [
    {
      title: "Display order",
      name: "displayOrder",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "blurb" },
  },
});

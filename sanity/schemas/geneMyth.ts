import { defineField, defineType } from "sanity";

export const VERDICT_OPTIONS = ["Trash", "Mostly trash", "Half true", "True"] as const;

export const geneMyth = defineType({
  name: "geneMyth",
  title: "Gene myth",
  type: "document",
  fields: [
    defineField({
      name: "myth",
      title: "The myth (as people state it)",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "myth", maxLength: 64 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "verdict",
      title: "Verdict",
      type: "string",
      options: {
        list: VERDICT_OPTIONS.map((value) => ({ title: value, value })),
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "truth",
      title: "The actual truth",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required().min(30).max(800),
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
    select: { title: "myth", subtitle: "verdict" },
  },
});

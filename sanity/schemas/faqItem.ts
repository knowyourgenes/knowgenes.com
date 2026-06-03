import { defineArrayMember, defineField, defineType } from "sanity";
import { CATEGORY_OPTIONS } from "./category";

export const faqItem = defineType({
  name: "faqItem",
  title: "Question & answer",
  type: "document",
  fields: [
    defineField({
      name: "question",
      title: "Question",
      type: "string",
      description: "Question-shaped, the way people actually ask. e.g. 'What is a gene?'",
      validation: (Rule) => Rule.required().min(5).max(160),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "question", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "shortAnswer",
      title: "Short answer (the snippet line)",
      type: "text",
      rows: 3,
      description:
        "A single, self-contained sentence that fully answers the question. Written to be the exact text a featured snippet or AI assistant lifts directly.",
      validation: (Rule) => Rule.required().min(20).max(400),
    }),
    defineField({
      name: "explanation",
      title: "Explanation",
      type: "array",
      description: "Short, jargon-free elaboration. Analogies before mechanisms.",
      of: [
        defineArrayMember({
          type: "block",
          styles: [{ title: "Normal", value: "normal" }],
          lists: [{ title: "Bullet", value: "bullet" }],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [{ name: "href", type: "url", title: "URL" }],
              },
            ],
          },
        }),
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: CATEGORY_OPTIONS.map((value) => ({ title: value, value })),
        layout: "dropdown",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "starter",
      title: "Show in 'Start here'",
      type: "boolean",
      description: "One of the foundational, most-asked questions featured on the homepage.",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      initialValue: 0,
    }),
    defineField({
      name: "lastReviewed",
      title: "Last reviewed",
      type: "date",
      description: "Shown under the answer as a trust signal.",
      initialValue: () => new Date().toISOString().slice(0, 10),
    }),
  ],
  orderings: [
    {
      title: "Display order",
      name: "displayOrder",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "question", category: "category", starter: "starter" },
    prepare: ({ title, category, starter }) => ({
      title,
      subtitle: [starter ? "★ Start here" : null, category].filter(Boolean).join(" · "),
    }),
  },
});

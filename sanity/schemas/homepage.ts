import { defineField, defineType } from "sanity";

export const homepage = defineType({
  name: "homepage",
  title: "Homepage content",
  type: "document",
  fields: [
    defineField({
      name: "heroEyebrow",
      title: "Hero · Eyebrow",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heroHeadline",
      title: "Hero · Headline",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heroSubhead",
      title: "Hero · Subhead",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heroPrimaryCta",
      title: "Hero · Primary CTA label",
      type: "string",
      initialValue: "Browse the basics",
    }),
    defineField({
      name: "heroSecondaryCta",
      title: "Hero · Secondary CTA label",
      type: "string",
      initialValue: "Jump to the glossary",
    }),
    defineField({
      name: "searchPlaceholders",
      title: "Search · example questions",
      type: "array",
      of: [{ type: "string" }],
      description: "Rotating placeholder questions shown in the search box.",
    }),
    defineField({
      name: "editorialTitle",
      title: "Editorial standards · Title",
      type: "string",
      initialValue: "Editorial standards",
    }),
    defineField({
      name: "editorialBody",
      title: "Editorial standards · Body",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "newsletterTitle",
      title: "Newsletter · Title",
      type: "string",
    }),
    defineField({
      name: "newsletterBody",
      title: "Newsletter · Body",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "newsletterSmallprint",
      title: "Newsletter · Smallprint",
      type: "string",
      initialValue: "No ads. No selling. Unsubscribe anytime.",
    }),
    defineField({
      name: "footerMission",
      title: "Footer · Mission line",
      type: "text",
      rows: 3,
    }),
  ],
  preview: { prepare: () => ({ title: "Homepage content" }) },
});

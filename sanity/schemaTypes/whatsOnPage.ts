import { defineField, defineType } from "sanity";

export const whatsOnPage = defineType({
  name: "whatsOnPage",
  title: "What's On Page",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Hero Title",
      type: "string",
      initialValue: "What's On in Delahouse",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Hero Description",
      type: "text",
      rows: 2,
      initialValue: "Discover our curated events, promos, and drops.",
    }),
    defineField({
      name: "heroImages",
      title: "Hero Background Images",
      type: "array",
      of: [
        {
          type: "image",
          options: {
            hotspot: true,
          },
          fields: [
            defineField({
              name: "alt",
              title: "Alternative Text",
              type: "string",
            }),
          ],
        },
      ],
      validation: (Rule) => Rule.min(1),
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "heroImages.0",
    },
  },
});

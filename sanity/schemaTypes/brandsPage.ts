import { defineField, defineType } from "sanity";

export const brandsPage = defineType({
  name: "brandsPage",
  title: "Brands Page",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Hero Title",
      type: "string",
      initialValue: "Brands",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Hero Description",
      type: "text",
      rows: 2,
      initialValue:
        "Explore the Delahouse Indonesia ecosystem — from dining and drinks to coffee, streetwear, and culture-led spaces across Jakarta.",
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

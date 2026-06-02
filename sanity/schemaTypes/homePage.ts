import { defineField, defineType } from "sanity";

export const homePage = defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Page Title",
      type: "string",
      initialValue: "Delahouse Indonesia",
    }),
    defineField({
      name: "heroTitle",
      title: "Hero Title",
      type: "string",
      initialValue: "Food, drinks, coffee, fashion, and neighborhood culture.",
    }),
    defineField({
      name: "heroDescription",
      title: "Hero Description",
      type: "text",
      rows: 4,
      initialValue:
        "Delahouse Indonesia brings together hospitality and lifestyle brands shaped by Jakarta’s appetite, nightlife, streetwear, and culture.",
    }),
    defineField({
      name: "heroLogo",
      title: "Hero Logo",
      type: "image",
      description:
        "Logo displayed in the center of the homepage hero. Usually use white/light logo for video background.",
      options: {
        hotspot: false,
      },
      fields: [
        defineField({
          name: "alt",
          title: "Alternative Text",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "heroImage",
      title: "Hero Image",
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
    }),
    defineField({
      name: "heroVideo",
      title: "Hero Video",
      type: "file",
      options: {
        accept: "video/*",
      },
    }),
    defineField({
      name: "featuredBrands",
      title: "Featured Brands",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "brand" }],
        },
      ],
    }),
    defineField({
      name: "featuredWhatsOn",
      title: "Featured What's On",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "whatsOn" }],
        },
      ],
    }),
    defineField({
      name: "brandSectionTitle",
      title: "Brand Section Title",
      type: "string",
      initialValue: "A house of food, drinks, fashion, and culture.",
    }),
    defineField({
      name: "brandSectionDescription",
      title: "Brand Section Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "aboutTitle",
      title: "About Section Title",
      type: "string",
      initialValue: "Built around Jakarta’s everyday culture.",
    }),
    defineField({
      name: "aboutDescription",
      title: "About Section Description",
      type: "text",
      rows: 4,
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "heroEyebrow",
      media: "heroImage",
    },
  },
});

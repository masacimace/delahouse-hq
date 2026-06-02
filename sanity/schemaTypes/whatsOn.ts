import { defineField, defineType } from "sanity";

export const whatsOn = defineType({
  name: "whatsOn",
  title: "What's On Content",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Event / Update Name",
      type: "string",
      description: "Example: Tequila Rush Hour, New Drop, Weekend Promo",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "type",
      title: "Type",
      type: "string",
      options: {
        layout: "radio",
        list: [
          { title: "Event", value: "event" },
          { title: "Promo", value: "promo" },
          { title: "Drop", value: "drop" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "relatedBrand",
      title: "Related Brand",
      type: "reference",
      to: [{ type: "brand" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "scheduleLabel",
      title: "Schedule Label",
      type: "string",
      description:
        "Display text for schedule. Example: Every Day, 5–8 PM / This Weekend / 29 June 2026",
    }),
    defineField({
      name: "dateStart",
      title: "Start Date",
      type: "datetime",
      description:
        "Optional. Used for sorting and fallback display if Schedule Label is empty.",
    }),
    defineField({
      name: "dateEnd",
      title: "End Date",
      type: "datetime",
      description: "Optional. Used when the update has an end date.",
    }),
    defineField({
      name: "image",
      title: "Main Image",
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
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Short Description",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.max(180),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "ctaLabel",
      title: "CTA Label",
      type: "string",
      description: "Example: View Details, Open Instagram, Shop Drop",
      initialValue: "View Details",
    }),
    defineField({
      name: "ctaUrl",
      title: "Instagram / Event URL",
      type: "url",
      description:
        "Required for What's On page. Cards will link directly to this URL.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "sortOrder",
      title: "Sort Order",
      type: "number",
      description: "Lower number appears first.",
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: "title",
      type: "type",
      brand: "relatedBrand.name",
      media: "image",
    },
    prepare({ title, type, brand, media }) {
      return {
        title,
        subtitle: [brand, type].filter(Boolean).join(" / "),
        media,
      };
    },
  },
});

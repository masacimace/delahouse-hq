import { defineField, defineType } from "sanity";

export const outlet = defineType({
  name: "outlet",
  title: "Outlet",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Outlet Name",
      type: "string",
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
      name: "area",
      title: "Area",
      type: "string",
      description: "Example: Kemang, Central Jakarta, North Jakarta",
    }),
    defineField({
      name: "image",
      title: "Outlet Image",
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
      name: "address",
      title: "Address",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "googleMapsUrl",
      title: "Google Maps URL",
      type: "url",
      description: "Used for the SEE MAP button.",
    }),
    defineField({
      name: "openingHours",
      title: "Opening Hours",
      type: "string",
      description: "Example: Monday - Sunday 11.00 AM - 12.00 AM",
    }),
    defineField({
      name: "menuUrl",
      title: "Menu URL",
      type: "url",
      description: "External PDF/menu URL. Used for the VIEW MENU button.",
    }),
    defineField({
      name: "menuFile",
      title: "Menu PDF File",
      type: "file",
      description:
        "Optional. Upload PDF menu here if you prefer storing the menu file in Sanity.",
      options: {
        accept: "application/pdf",
      },
    }),
    defineField({
      name: "reservationUrl",
      title: "Reservation / WhatsApp URL",
      type: "url",
      description:
        "Direct WhatsApp reservation link for this outlet. Example: https://wa.me/628xxxx",
    }),
    defineField({
      name: "sortOrder",
      title: "Sort Order",
      type: "number",
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: "name",
      brand: "relatedBrand.name",
      area: "area",
      media: "image",
    },
    prepare({ title, brand, area, media }) {
      return {
        title,
        subtitle: [brand, area].filter(Boolean).join(" / "),
        media,
      };
    },
  },
});

import { defineField, defineType } from "sanity";

export const aboutPage = defineType({
  name: "aboutPage",
  title: "About Page",
  type: "document",
  fields: [
    defineField({
      name: "description",
      title: "About Description",
      type: "text",
      rows: 5,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "backgroundVideo",
      title: "Background Video",
      type: "file",
      description: "Fullscreen background video for About page. Use MP4/WebM.",
      options: {
        accept: "video/*",
      },
    }),
    defineField({
      name: "backgroundImage",
      title: "Background Image",
      type: "image",
      description: "Fallback image if background video is empty.",
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
      name: "email",
      title: "Email",
      type: "string",
      description: "Optional. If empty, it will use Site Settings email.",
    }),
    defineField({
      name: "instagramUrl",
      title: "Instagram URL",
      type: "url",
      description: "Optional. If empty, it will use Site Settings Instagram.",
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "About Page",
      };
    },
  },
});

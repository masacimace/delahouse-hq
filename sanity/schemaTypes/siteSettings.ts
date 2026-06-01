import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "siteName",
      title: "Site Name",
      type: "string",
      initialValue: "Delahouse Indonesia",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "enableSplashScreen",
      title: "Enable Splash Screen",
      type: "boolean",
      description: "Turn on/off the route transition splash screen.",
      initialValue: true,
    }),
    defineField({
      name: "siteDescription",
      title: "Site Description",
      type: "text",
      rows: 3,
      initialValue:
        "A Jakarta-based hospitality and lifestyle house for food, drinks, coffee, fashion, and culture.",
    }),
    defineField({
      name: "logo",
      title: "Main Logo",
      type: "image",
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
      name: "navbarLogoLight",
      title: "Navbar Logo - Light Version",
      type: "image",
      description:
        "Logo version for light mode. Usually dark/black logo on transparent background.",
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
      name: "navbarLogoDark",
      title: "Navbar Logo - Dark Version",
      type: "image",
      description:
        "Logo version for dark mode. Usually white/light logo on transparent background.",
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
      name: "footerLogo",
      title: "Footer Logo",
      type: "image",
      description:
        "Logo displayed in the fullscreen footer. Use white/light transparent PNG if the footer video is dark.",
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
      name: "footerVideo",
      title: "Footer Background Video",
      type: "file",
      description:
        "Fullscreen background video for the footer. Use MP4 or WebM.",
      options: {
        accept: "video/*",
      },
    }),
    defineField({
      name: "footerImage",
      title: "Footer Background Image",
      type: "image",
      description: "Fallback image if footer video is empty.",
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
      name: "footerDescription",
      title: "Footer Description",
      type: "text",
      rows: 3,
      initialValue:
        "A Jakarta-based hospitality and lifestyle house for food, drinks, coffee, fashion, and culture.",
    }),
    defineField({
      name: "favicon",
      title: "Favicon",
      type: "image",
      options: {
        hotspot: false,
      },
    }),
    defineField({
      name: "instagramUrl",
      title: "Instagram URL",
      type: "url",
    }),
    defineField({
      name: "tiktokUrl",
      title: "TikTok URL",
      type: "url",
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
    }),
    defineField({
      name: "whatsappNumber",
      title: "WhatsApp Number",
      type: "string",
      description: "Example: 6281234567890",
    }),
    defineField({
      name: "address",
      title: "Office / HQ Address",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "seoTitle",
      title: "Default SEO Title",
      type: "string",
      initialValue: "Delahouse Indonesia",
    }),
    defineField({
      name: "seoDescription",
      title: "Default SEO Description",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.max(160),
    }),
    defineField({
      name: "ogImage",
      title: "Default Open Graph Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
  ],
  preview: {
    select: {
      title: "siteName",
      subtitle: "siteDescription",
      media: "logo",
    },
  },
});

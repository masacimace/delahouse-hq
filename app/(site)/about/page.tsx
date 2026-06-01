import Image from "next/image";

import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { ABOUT_PAGE_QUERY, SITE_SETTINGS_QUERY } from "@/sanity/lib/queries";
import type { SiteSettings } from "@/types/sanity";
import type { SanityImageSource } from "@sanity/image-url";
import { AboutNoiseOverlay } from "@/components/about/AboutNoiseOverlay";

type AboutPageData = {
  description?: string;
  backgroundVideoUrl?: string | null;
  backgroundImage?: SanityImageSource | null;
  email?: string;
  instagramUrl?: string;
};

export const revalidate = 60;

export const metadata = {
  title: "About",
  description:
    "About Delahouse Indonesia — a hospitality and lifestyle house for food, drinks, coffee, fashion, and culture.",
  alternates: {
    canonical: "/about",
  },
};

export default async function AboutPage() {
  const [aboutPage, siteSettings] = await Promise.all([
    client.fetch<AboutPageData | null>(ABOUT_PAGE_QUERY),
    client.fetch<SiteSettings | null>(SITE_SETTINGS_QUERY),
  ]);

  const backgroundImageUrl = aboutPage?.backgroundImage
    ? urlFor(aboutPage.backgroundImage)
        .width(1800)
        .height(2400)
        .fit("crop")
        .url()
    : null;

  const description =
    aboutPage?.description ||
    "Delahouse Indonesia brings together hospitality and lifestyle brands shaped by Jakarta’s appetite, nightlife, streetwear, and culture.";

  const email = aboutPage?.email || siteSettings?.email;
  const instagramUrl = aboutPage?.instagramUrl || siteSettings?.instagramUrl;

  return (
    <main className="site-main">
      <section
        data-navbar-contrast="light"
        className="relative min-h-screen overflow-hidden bg-black text-white"
      >
        {aboutPage?.backgroundVideoUrl ? (
          <video
            src={aboutPage.backgroundVideoUrl}
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />
        ) : backgroundImageUrl ? (
          <Image
            src={backgroundImageUrl}
            alt="About Delahouse Indonesia"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        ) : (
          <div className="absolute inset-0 bg-neutral-950" />
        )}

        <div className="absolute inset-0 bg-black/15" />
        <div className="absolute inset-0 bg-linear-to-b from-black/10 via-black/15 to-black/55" />

        <AboutNoiseOverlay />

        <div className="relative z-10 flex min-h-screen items-center justify-center px-6 py-24 text-center">
          <div className="max-w-xl text-white mix-blend-difference">
            <p className="whitespace-pre-line mt-6 text-sm font-base leading-[1.1] tracking-none md:text-sm">
              {description}
            </p>

            {email ? (
              <a
                href={`mailto:${email}`}
                className="mt-8 block text-xs font-base tracking-none underline underline-offset-4 transition hover:opacity-70 md:text-sm"
              >
                {email}
              </a>
            ) : null}

            {instagramUrl ? (
              <a
                href={instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-2 block text-xs font-base tracking-none underline underline-offset-4 transition hover:opacity-70 md:text-sm"
              >
                Follow by Delahouse
              </a>
            ) : null}
          </div>
        </div>
      </section>
    </main>
  );
}

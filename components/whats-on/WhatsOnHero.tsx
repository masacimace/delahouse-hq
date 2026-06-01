"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { SanityImageSource } from "@sanity/image-url";

import { urlFor } from "@/sanity/lib/image";

const HERO_SLIDESHOW_DURATION = 5000;

export type WhatsOnPageItem = {
  _id: string;
  title: string;
  slug: string;
  type?: "event" | "promo" | "drop";
  image?: SanityImageSource | null;
  excerpt?: string;
  scheduleLabel?: string;
  dateStart?: string;
  dateEnd?: string;
  ctaUrl?: string;
  featuredColor?: string;
  relatedBrand?: {
    name?: string;
    slug?: string;
  };
  featured?: boolean;
  sortOrder?: number;
};

export type WhatsOnPageHero = {
  title?: string;
  description?: string;
  heroImages?: SanityImageSource[] | null;
};

type WhatsOnHeroProps = {
  page?: WhatsOnPageHero | null;
};

export function WhatsOnHero({ page }: WhatsOnHeroProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const images = useMemo(() => {
    return page?.heroImages?.filter(Boolean) || [];
  }, [page?.heroImages]);

  useEffect(() => {
    if (images.length <= 1) return;

    const interval = window.setInterval(() => {
      setActiveIndex((current) =>
        current >= images.length - 1 ? 0 : current + 1,
      );
    }, HERO_SLIDESHOW_DURATION);

    return () => {
      window.clearInterval(interval);
    };
  }, [images.length]);

  const activeImage = images[activeIndex];

  const imageUrl = activeImage
    ? urlFor(activeImage).width(2400).height(1400).fit("crop").url()
    : null;

  return (
    <section
      data-navbar-contrast="light"
      className="relative min-h-[52vh] overflow-hidden bg-black text-white md:min-h-[64vh]"
    >
      {imageUrl ? (
        <Image
          key={activeIndex}
          src={imageUrl}
          alt={page?.title || "What's On"}
          fill
          priority
          className="object-cover transition-opacity duration-700"
          sizes="100vw"
        />
      ) : (
        <div className="absolute inset-0 bg-neutral-950" />
      )}

      <div className="absolute inset-0 bg-black/45" />
      <div className="absolute inset-0 bg-linear-to-b from-black/25 via-black/20 to-black/70" />

      <div className="relative z-10 flex min-h-[52vh] flex-col justify-center px-6 py-24 md:min-h-[64vh] md:px-10">
        <div className="mx-auto w-full max-w-6xl">
          <div className="mb-28 flex items-center gap-1 text-xs font-semibold uppercase text-white/80 md:mb-24">
            <Link href="/" className="transition hover:text-white">
              Home
            </Link>
            <span>/</span>
            <span>What&apos;s On</span>
          </div>

          <div className="text-center">
            <h1 className="mx-auto max-w-5xl text-4xl font-semibold leading-tight md:text-6xl">
              {page?.title || "What’s On in Delahouse"}
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-6 text-white/80 md:text-base">
              {page?.description ||
                "Discover our curated events, promos, and drops."}
            </p>
          </div>
        </div>
      </div>

      {images.length > 1 ? (
        <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={[
                "h-1.5 rounded-full transition",
                index === activeIndex ? "w-8 bg-white" : "w-1.5 bg-white/45",
              ].join(" ")}
              aria-label={`Show hero image ${index + 1}`}
            />
          ))}
        </div>
      ) : null}
    </section>
  );
}

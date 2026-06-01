"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import type { SanityImageSource } from "@sanity/image-url";

import { brandCategoryLabels } from "@/lib/navigation";
import { urlFor } from "@/sanity/lib/image";

const SLIDESHOW_DURATION = 8000;

type CarouselBrand = {
  _id: string;
  name: string;
  slug: string;
  category: string;
  subcategory?: string;
  shortDescription?: string;
  logo?: SanityImageSource | null;
  heroImage?: SanityImageSource | null;
  heroVideoUrl?: string | null;
};

type BrandDirectoryCarouselProps = {
  brands: CarouselBrand[];
};

export function BrandDirectoryCarousel({
  brands,
}: BrandDirectoryCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const sectionRef = useRef<HTMLElement | null>(null);

  const visibleBrands = useMemo(
    () => brands.filter((brand) => Boolean(brand.slug)),
    [brands],
  );

  const activeBrand = visibleBrands[activeIndex];

  useEffect(() => {
    if (visibleBrands.length <= 1) return;

    const interval = window.setInterval(() => {
      setActiveIndex((currentIndex) =>
        currentIndex >= visibleBrands.length - 1 ? 0 : currentIndex + 1,
      );
    }, SLIDESHOW_DURATION);

    return () => {
      window.clearInterval(interval);
    };
  }, [visibleBrands.length]);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const rect = section.getBoundingClientRect();
    const isSectionVisible = rect.top < window.innerHeight && rect.bottom > 0;

    if (!isSectionVisible) return;

    itemRefs.current[activeIndex]?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [activeIndex]);

  if (!activeBrand) return null;

  const backgroundImageUrl = activeBrand.heroImage
    ? urlFor(activeBrand.heroImage).width(2400).height(1400).fit("crop").url()
    : null;

  const cardImageUrl = activeBrand.heroImage
    ? urlFor(activeBrand.heroImage).width(900).height(700).fit("crop").url()
    : null;

  const logoUrl = activeBrand.logo
    ? urlFor(activeBrand.logo).width(360).fit("max").url()
    : null;

  const categoryLabel =
    activeBrand.category in brandCategoryLabels
      ? brandCategoryLabels[
          activeBrand.category as keyof typeof brandCategoryLabels
        ]
      : activeBrand.category;

  return (
    <section className="bg-(--background) text-(--foreground)">
      <div className="site-container flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between md:py-14">
        <h2 className="max-w-3xl text-xl font-semibold leading-tight md:text-5xl">
          Explore our food, drinks, fashion and culture houses
        </h2>

        <Link
          href="/brands"
          className="inline-flex w-fit items-center gap-2 text-sm font-semibold transition hover:text-(--accent)"
        >
          Find More
          <span aria-hidden="true">›</span>
        </Link>
      </div>

      <section
        ref={sectionRef}
        data-navbar-contrast="light"
        className="relative min-h-screen overflow-hidden bg-black text-white"
      >
        {backgroundImageUrl ? (
          <Image
            key={activeBrand._id}
            src={backgroundImageUrl}
            alt={activeBrand.name}
            fill
            className="object-cover transition-opacity duration-700"
            sizes="100vw"
          />
        ) : (
          <div className="absolute inset-0 bg-neutral-950" />
        )}

        <div className="absolute inset-0 bg-black/35" />
        <div className="absolute inset-0 bg-linear-to-b from-black/5 via-black/15 to-black/35" />

        <div className="relative z-10 flex min-h-screen items-center justify-center px-6 pb-36 pt-28 md:px-10">
          <div className="w-[84vw] max-w-[20rem] rounded-xs border border-white/20 bg-white/90 p-3 text-center text-black shadow-2xl backdrop-blur-sm md:w-full md:max-w-lg md:p-5">
            <div className="flex min-h-12 items-center justify-center px-4 py-4 md:min-h-16 md:px-5 md:py-5">
              {logoUrl ? (
                <Image
                  src={logoUrl}
                  alt={activeBrand.name}
                  width={260}
                  height={90}
                  priority
                  className="max-h-8 w-auto object-contain invert md:max-h-12"
                />
              ) : (
                <p className="text-xl font-semibold">{activeBrand.name}</p>
              )}
            </div>

            <div className="relative aspect-4/3 overflow-hidden bg-neutral-100">
              {activeBrand.heroVideoUrl ? (
                <video
                  key={activeBrand.heroVideoUrl}
                  src={activeBrand.heroVideoUrl}
                  className="h-full w-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                />
              ) : cardImageUrl ? (
                <Image
                  key={cardImageUrl}
                  src={cardImageUrl}
                  alt={activeBrand.name}
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 32rem, 100vw"
                />
              ) : (
                <div className="flex h-full items-center justify-center p-8 text-center text-2xl font-semibold">
                  {activeBrand.name}
                </div>
              )}
            </div>

            <div className="px-3 py-4 md:px-8 md:py-6">
              <p className="mb-3 text-sm text-black/55">
                {categoryLabel}
                {activeBrand.subcategory ? ` / ${activeBrand.subcategory}` : ""}
              </p>

              <p className="mx-auto max-w-md text-sm leading-6 text-black/70 md:text-base md:leading-7">
                {activeBrand.shortDescription ||
                  "A Delahouse Indonesia brand shaped by Jakarta’s food, drinks, fashion, and culture."}
              </p>
            </div>

            <Link
              href={`/brands/${activeBrand.slug}`}
              className="block bg-black px-4 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
            >
              VIEW BRAND
            </Link>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-20 border-y border-white/20 bg-black/35 backdrop-blur-md">
          <div
            className="flex overflow-x-auto overscroll-x-contain scroll-smooth [-ms-overflow-style:none] scrollbar-none [&::-webkit-scrollbar]:hidden"
            aria-label="Brand selector"
          >
            {visibleBrands.map((brand, index) => {
              const isActive = index === activeIndex;
              const brandLogoUrl = brand.logo
                ? urlFor(brand.logo).width(220).fit("max").url()
                : null;

              return (
                <button
                  key={brand._id}
                  ref={(element) => {
                    itemRefs.current[index] = element;
                  }}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={[
                    "relative flex h-16 min-w-28 shrink-0 items-center justify-center border-r border-white/5 px-1 transition md:h-24 md:min-w-48 lg:min-w-56",
                    isActive ? "bg-white/5" : "hover:bg-white/5",
                  ].join(" ")}
                  aria-label={`View ${brand.name}`}
                  aria-current={isActive ? "true" : undefined}
                >
                  {isActive ? (
                    <span className="absolute left-0 top-0 h-0.5 w-full overflow-hidden bg-white/20">
                      <span
                        key={activeIndex}
                        className="block h-full origin-left bg-white"
                        style={{
                          animation: `brandProgress ${SLIDESHOW_DURATION}ms linear forwards`,
                        }}
                      />
                    </span>
                  ) : null}

                  {brandLogoUrl ? (
                    <Image
                      src={brandLogoUrl}
                      alt={brand.name}
                      width={220}
                      height={80}
                      className="max-h-8 w-auto object-contain brightness-0 invert md:max-h-8"
                    />
                  ) : (
                    <span className="text-sm font-semibold text-white">
                      {brand.name}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </section>
    </section>
  );
}

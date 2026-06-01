import Image from "next/image";
import Link from "next/link";

import { brandCategoryLabels } from "@/lib/navigation";
import { urlFor } from "@/sanity/lib/image";
import type { Brand } from "@/types/sanity";

type FeaturedBrandShowcaseProps = {
  brands: Brand[];
};

export function FeaturedBrandShowcase({ brands }: FeaturedBrandShowcaseProps) {
  const featuredBrands = brands.slice(0, 4);

  if (!featuredBrands.length) return null;

  return (
    <section
      id="brands"
      className="site-section bg-(--background) pb-5! md:pb-5!"
    >
      <div className="site-container-fluid">
        <div className="space-y-8 md:space-y-10">
          {featuredBrands.map((brand, index) => (
            <FeaturedBrandCard key={brand._id} brand={brand} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

type FeaturedBrandCardProps = {
  brand: Brand;
  index: number;
};

function FeaturedBrandCard({ brand, index }: FeaturedBrandCardProps) {
  const imageUrl = brand.heroImage
    ? urlFor(brand.heroImage).width(1400).height(1000).fit("crop").url()
    : null;

  const categoryLabel =
    brand.category in brandCategoryLabels
      ? brandCategoryLabels[brand.category]
      : brand.category;

  return (
    <article className="grid gap-6 pb-2 md:min-h-[72vh] md:grid-cols-[55%_45%] md:gap-0 md:pb-0">
      <Link
        href={`/brands/${brand.slug}`}
        className="group relative block aspect-video overflow-hidden bg-(--surface-muted) md:aspect-auto md:min-h-[72vh]"
      >
        {brand.heroVideoUrl ? (
          <video
            src={brand.heroVideoUrl}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.01]"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />
        ) : imageUrl ? (
          <Image
            src={imageUrl}
            alt={brand.name}
            fill
            className="object-cover transition duration-700 group-hover:scale-[1.01]"
            sizes="(min-width: 768px) 55vw, 100vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center p-8 text-center text-3xl font-semibold">
            {brand.name}
          </div>
        )}
      </Link>

      <div className="flex flex-col md:min-h-[72vh] md:border-l md:border-(--border) md:px-8 md:py-6">
        <div className="mb-5 flex items-center gap-3">
          <span className="h-3 w-3 rounded-full bg-(--foreground)" />
          <p className="text-sm md:text-base font-medium">{brand.name}</p>
        </div>

        <div className="mt-2 md:mt-auto">
          {brand.shortDescription ? (
            <p className="max-w-3xl text-sm font-medium leading-snug md:text-3xl">
              {brand.shortDescription}
            </p>
          ) : (
            <p className="max-w-3xl text-xl font-medium leading-snug md:text-3xl">
              A Delahouse Indonesia brand shaped by Jakarta&apos;s food,
              lifestyle, and culture.
            </p>
          )}

          <div className="mt-8 divide-y divide-(--border) border-y border-(--border) text-sm">
            <div className="grid grid-cols-[0.4fr_0.6fr] gap-4 py-4">
              <p className="text-(--muted)">House</p>
              <p>{categoryLabel}</p>
            </div>

            <div className="grid grid-cols-[0.4fr_0.6fr] gap-4 py-4">
              <p className="text-(--muted)">Type</p>
              <p>{brand.subcategory || "Delahouse Brand"}</p>
            </div>

            <div className="grid grid-cols-[0.4fr_0.6fr] gap-4 py-4">
              <p className="text-(--muted)">Action</p>
              <Link
                href={`/brands/${brand.slug}`}
                className="w-fit underline underline-offset-4 transition hover:text-(--accent)"
              >
                Find More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

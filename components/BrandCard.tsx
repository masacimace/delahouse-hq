import Image from "next/image";
import Link from "next/link";

import { urlFor } from "@/sanity/lib/image";
import type { SanityImageSource } from "@sanity/image-url";

type BrandCardProps = {
  brand: {
    _id: string;
    name: string;
    slug: string;
    category: string;
    subcategory?: string;
    shortDescription?: string;
    heroImage?: SanityImageSource | null;
    logo?: SanityImageSource | null;
  };
};

export function BrandCard({ brand }: BrandCardProps) {
  const imageUrl = brand.heroImage
    ? urlFor(brand.heroImage).width(900).height(1100).fit("crop").url()
    : null;

  return (
    <Link
      href={`/brands/${brand.slug}`}
      className="group block overflow-hidden border border-black/10 bg-white transition hover:border-black dark:border-white/15 dark:bg-neutral-950 dark:hover:border-white"
    >
      <div className="relative aspect-4/5 overflow-hidden bg-neutral-200 dark:bg-neutral-900">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={brand.name}
            fill
            className="object-cover grayscale transition duration-700 group-hover:scale-105 group-hover:grayscale-0"
            sizes="(min-width: 1024px) 33vw, 100vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center px-6 text-center text-sm uppercase text-neutral-500">
            {brand.name}
          </div>
        )}
      </div>

      <div className="p-5 md:p-6">
        <p className="mb-3 text-xs uppercase text-neutral-500 dark:text-neutral-400">
          {brand.subcategory}
        </p>

        <h3 className="text-2xl font-semibold text-black dark:text-white">
          {brand.name}
        </h3>

        {brand.shortDescription ? (
          <p className="mt-4 line-clamp-3 text-sm leading-6 text-neutral-600 dark:text-neutral-300">
            {brand.shortDescription}
          </p>
        ) : null}

        <p className="mt-6 text-xs uppercase text-black underline underline-offset-4 dark:text-white">
          View Brand
        </p>
      </div>
    </Link>
  );
}

"use client";

import type { SanityImageSource } from "@sanity/image-url";

import { SanityImage } from "@/components/SanityImage";

type BrandDetailGalleryProps = {
  name: string;
  gallery?: SanityImageSource[] | null;
};

export function BrandDetailGallery({ name, gallery }: BrandDetailGalleryProps) {
  const images = gallery?.filter(Boolean) || [];

  if (!images.length) return null;

  return (
    <section className="relative bg-(--background) pb-20 text-(--foreground)">
      <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-0 [-ms-overflow-style:none] scrollbar-none [&::-webkit-scrollbar]:hidden">
        {images.map((image, index) => {
          return (
            <div
              key={index}
              className="relative aspect-16/10 min-w-[82vw] snap-center overflow-hidden bg-(--surface-muted) md:min-w-[46vw]"
            >
              <SanityImage
                source={image}
                aspectRatio={16 / 10}
                alt={`${name} gallery ${index + 1}`}
                fill
                className="object-cover"
                sizes="(min-width: 768px) 46vw, 82vw"
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}

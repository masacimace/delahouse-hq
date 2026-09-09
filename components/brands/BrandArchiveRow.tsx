"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import type { PointerEvent, WheelEvent } from "react";
import type { SanityImageSource } from "@sanity/image-url";

import { SanityImage } from "@/components/SanityImage";
import { brandCategoryLabels } from "@/lib/navigation";

export type BrandArchiveBrand = {
  _id: string;
  name: string;
  slug: string;
  category: string;
  subcategory?: string;
  shortDescription?: string;
  logo?: SanityImageSource | null;
  heroImage?: SanityImageSource | null;
  gallery?: SanityImageSource[] | null;
};

type BrandArchiveRowProps = {
  brand: BrandArchiveBrand;
  index: number;
};

type BrandSlide = {
  image: SanityImageSource;
  isCover: boolean;
};

const POINTER_SWIPE_THRESHOLD = 40;
const WHEEL_SWIPE_THRESHOLD = 70;
const WHEEL_GESTURE_RESET_MS = 180;
const WHEEL_SLIDE_COOLDOWN_MS = 450;

export function BrandArchiveRow({ brand, index }: BrandArchiveRowProps) {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const pointerStartX = useRef<number | null>(null);
  const wheelDeltaX = useRef(0);
  const lastWheelEventAt = useRef(0);
  const lastWheelSlideAt = useRef(0);

  const slides = useMemo<BrandSlide[]>(() => {
    const items: BrandSlide[] = [];

    if (brand.heroImage) {
      items.push({
        image: brand.heroImage,
        isCover: true,
      });
    }

    if (brand.gallery?.length) {
      brand.gallery.forEach((image) => {
        if (image) {
          items.push({
            image,
            isCover: false,
          });
        }
      });
    }

    return items;
  }, [brand.heroImage, brand.gallery]);

  const currentSlide = slides[activeSlideIndex];
  const categoryLabel =
    brand.category in brandCategoryLabels
      ? brandCategoryLabels[brand.category as keyof typeof brandCategoryLabels]
      : brand.category;

  function goToPreviousSlide() {
    if (slides.length <= 1) return;

    setActiveSlideIndex((current) =>
      current === 0 ? slides.length - 1 : current - 1,
    );
  }

  function goToNextSlide() {
    if (slides.length <= 1) return;

    setActiveSlideIndex((current) =>
      current === slides.length - 1 ? 0 : current + 1,
    );
  }

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    pointerStartX.current = event.clientX;
  }

  function handlePointerUp(event: PointerEvent<HTMLDivElement>) {
    if (pointerStartX.current === null) return;

    const distance = event.clientX - pointerStartX.current;

    if (Math.abs(distance) > POINTER_SWIPE_THRESHOLD) {
      if (distance < 0) {
        goToNextSlide();
      } else {
        goToPreviousSlide();
      }
    }

    pointerStartX.current = null;
  }

  function handleWheel(event: WheelEvent<HTMLDivElement>) {
    if (slides.length <= 1 || event.deltaX === 0) return;

    const isHorizontalSwipe = Math.abs(event.deltaX) > Math.abs(event.deltaY);
    if (!isHorizontalSwipe) return;

    event.preventDefault();

    const now = performance.now();
    if (now - lastWheelEventAt.current > WHEEL_GESTURE_RESET_MS) {
      wheelDeltaX.current = 0;
    }

    lastWheelEventAt.current = now;
    wheelDeltaX.current += event.deltaX;

    if (
      Math.abs(wheelDeltaX.current) < WHEEL_SWIPE_THRESHOLD ||
      now - lastWheelSlideAt.current < WHEEL_SLIDE_COOLDOWN_MS
    ) {
      return;
    }

    if (wheelDeltaX.current > 0) {
      goToNextSlide();
    } else {
      goToPreviousSlide();
    }

    wheelDeltaX.current = 0;
    lastWheelSlideAt.current = now;
  }

  return (
    <article className="grid gap-6 pb-8 md:min-h-[72vh] md:grid-cols-[55%_45%] md:gap-0 md:pb-0">
      <div
        className="group relative aspect-square touch-pan-y overflow-hidden bg-(--surface-muted) md:aspect-auto md:min-h-[72vh]"
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onWheel={handleWheel}
        onPointerCancel={() => {
          pointerStartX.current = null;
        }}
        onPointerLeave={() => {
          pointerStartX.current = null;
        }}
      >
        {currentSlide ? (
          <SanityImage
            key={`${brand._id}-${activeSlideIndex}`}
            source={currentSlide.image}
            aspectRatio={15 / 11}
            alt={brand.name}
            fill
            className="object-cover transition duration-700 group-hover:scale-[1.01]"
            sizes="(min-width: 768px) 55vw, 100vw"
            fetchPriority={index === 0 ? "high" : "auto"}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center p-8 text-center text-3xl font-semibold">
            {brand.name}
          </div>
        )}

        {currentSlide?.isCover ? (
          <>
            <div className="absolute inset-0 bg-black/25" />

            <div className="absolute inset-0 flex items-center justify-center px-10">
              {brand.logo ? (
                <SanityImage
                  source={brand.logo}
                  alt={brand.name}
                  width={420}
                  height={160}
                  className="max-h-20 w-auto object-contain md:max-h-28"
                />
              ) : (
                <p className="text-center text-4xl font-semibold text-white md:text-6xl">
                  {brand.name}
                </p>
              )}
            </div>
          </>
        ) : null}

        {slides.length > 1 ? (
          <div className="absolute bottom-4 right-4 flex items-center gap-2 text-white">
            <span className="min-w-14 rounded-full bg-black/30 px-3 py-2 text-center text-xs">
              {String(activeSlideIndex + 1).padStart(2, "0")} /{" "}
              {String(slides.length).padStart(2, "0")}
            </span>
          </div>
        ) : null}
      </div>

      <div className="flex flex-col md:min-h-[72vh] md:border-l md:border-(--border) md:px-8 md:py-6">
        <div className="mb-5 flex items-center gap-3">
          <span className="h-3 w-3 rounded-full bg-(--foreground)" />
          <p className="text-sm font-medium md:text-base">{brand.name}</p>
        </div>

        <div className="mt-2 md:mt-auto">
          {brand.shortDescription ? (
            <p className="max-w-3xl text-sm font-reguler leading-snug md:text-2xl">
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
                View Brand
              </Link>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

import { formatDateRange } from "@/lib/format";
import { urlFor } from "@/sanity/lib/image";
import type { WhatsOnPageItem } from "./WhatsOnHero";

type WhatsOnHorizontalGalleryProps = {
  items: WhatsOnPageItem[];
};

export function WhatsOnHorizontalGallery({
  items,
}: WhatsOnHorizontalGalleryProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;

    if (!section || !track) return;

    function handleWheel(event: WheelEvent) {
      if (window.innerWidth < 768) return;

      const track = trackRef.current;
      if (!track) return;

      const delta =
        Math.abs(event.deltaY) >= Math.abs(event.deltaX)
          ? event.deltaY
          : event.deltaX;

      if (delta === 0) return;

      const atStart = track.scrollLeft <= 1;
      const atEnd =
        Math.ceil(track.scrollLeft + track.clientWidth) >=
        track.scrollWidth - 1;

      const scrollingDown = delta > 0;
      const scrollingUp = delta < 0;

      const canScrollHorizontally =
        (scrollingDown && !atEnd) || (scrollingUp && !atStart);

      if (!canScrollHorizontally) return;

      event.preventDefault();
      track.scrollLeft += delta;
    }

    section.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      section.removeEventListener("wheel", handleWheel);
    };
  }, []);

  if (!items.length) return null;

  return (
    <section
      ref={sectionRef}
      className="bg-(--background) py-10 text-(--foreground) md:min-h-screen md:py-12"
    >
      <div className="mb-6 px-4 md:px-6">
        <h2 className="text-2xl font-medium md:text-3xl">
          More What&apos;s On
        </h2>
      </div>

      <div
        ref={trackRef}
        className="grid auto-cols-[78vw] grid-flow-col gap-4 overflow-x-auto overscroll-x-contain px-4 pb-6 scroll-smooth [-ms-overflow-style:none] scrollbar-none md:auto-cols-[28.5vw] md:gap-6 md:px-6 md:pb-8 [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item) => (
          <WhatsOnGalleryCard key={item._id} item={item} />
        ))}
      </div>
    </section>
  );
}

type WhatsOnGalleryCardProps = {
  item: WhatsOnPageItem;
};

function WhatsOnGalleryCard({ item }: WhatsOnGalleryCardProps) {
  const imageUrl = item.image
    ? urlFor(item.image).width(1000).height(1350).fit("crop").url()
    : null;

  const schedule =
    item.scheduleLabel || formatDateRange(item.dateStart, item.dateEnd);

  const cardContent = (
    <>
      <div className="relative aspect-3/4 overflow-hidden bg-(--surface-muted)">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={item.title}
            fill
            className="object-cover transition duration-700 group-hover:scale-[1.02]"
            sizes="(min-width: 768px) 28.5vw, 78vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center p-8 text-center text-2xl font-semibold">
            {item.title}
          </div>
        )}
      </div>

      <div className="pt-5">
        <p className="mb-3 text-xs font-medium text-(--accent)">
          {item.relatedBrand?.name || "Delahouse Indonesia"}
        </p>

        <h3 className="text-sm font-medium leading-tight transition group-hover:text-(--accent) md:text-3xl">
          {item.title}
        </h3>

        {schedule ? (
          <p className="mt-3 text-sm leading-6 text-(--muted)">{schedule}</p>
        ) : null}
      </div>
    </>
  );

  if (!item.ctaUrl) {
    return <article className="group">{cardContent}</article>;
  }

  return (
    <a
      href={item.ctaUrl}
      target="_blank"
      rel="noreferrer"
      className="group block"
      aria-label={`Open ${item.title}`}
    >
      {cardContent}
    </a>
  );
}

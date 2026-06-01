import Image from "next/image";
import Link from "next/link";
import type { SanityImageSource } from "@sanity/image-url";

import { formatDateRange } from "@/lib/format";
import { urlFor } from "@/sanity/lib/image";

type HomeWhatsOnItem = {
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
  relatedBrand?: {
    name?: string;
    slug?: string;
  };
};

type HomeWhatsOnProps = {
  items: HomeWhatsOnItem[];
};

export function HomeWhatsOn({ items }: HomeWhatsOnProps) {
  const latestItems = items.slice(0, 6);

  if (!latestItems.length) return null;

  return (
    <section
      id="whats-on"
      className="site-section bg-(--background) text-(--foreground)"
    >
      <div className="site-container">
        <div className="mb-10 flex items-start justify-between gap-6">
          <div>
            <h2 className="text-4xl font-semibold leading-none md:text-5xl">
              What&apos;s On
            </h2>

            <div className="mt-8 inline-flex bg-(--foreground) px-6 py-2 text-xs font-semibold text-(--background)">
              Latest Events
            </div>
          </div>

          <Link
            href="/whats-on"
            className="inline-flex items-center gap-2 text-sm font-semibold transition hover:text-(--accent)"
          >
            View All
            <span aria-hidden="true">›</span>
          </Link>
        </div>

        <div className="flex gap-5 overflow-x-auto overscroll-x-contain pb-2 scroll-smooth md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:pb-0">
          {latestItems.map((item) => (
            <HomeWhatsOnCard key={item._id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

type HomeWhatsOnCardProps = {
  item: HomeWhatsOnItem;
};

function HomeWhatsOnCard({ item }: HomeWhatsOnCardProps) {
  const imageUrl = item.image
    ? urlFor(item.image).width(900).height(1200).fit("crop").url()
    : null;

  const schedule =
    item.scheduleLabel || formatDateRange(item.dateStart, item.dateEnd);

  const href = item.ctaUrl || "/whats-on";
  const isExternal = Boolean(item.ctaUrl);

  return (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noreferrer" : undefined}
      className="group block min-w-[78vw] shrink-0 md:min-w-0"
      aria-label={`Open ${item.title}`}
    >
      <div className="relative aspect-3/4 overflow-hidden bg-(--surface-muted)">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={item.title}
            fill
            className="object-cover transition duration-700 group-hover:scale-[1.01]"
            sizes="(min-width: 768px) 25vw, 78vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center p-6 text-center text-xs font-semibold">
            {item.title}
          </div>
        )}
      </div>

      <div className="pt-5">
        <p className="mb-3 text-sm font-semibold text-(--muted)">
          {item.relatedBrand?.name || "Delahouse Indonesia"}
        </p>

        <h3 className="text-sm font-semibold leading-snug transition group-hover:text-(--accent)">
          {item.title}
        </h3>

        {schedule ? (
          <p className="mt-3 text-sm italic leading-6 text-(--muted)">
            {schedule}
          </p>
        ) : null}
      </div>
    </a>
  );
}

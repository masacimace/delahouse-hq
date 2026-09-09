import Link from "next/link";
import type { SanityImageSource } from "@sanity/image-url";

import { SanityImage } from "@/components/SanityImage";
import { formatDateRange } from "@/lib/format";

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

        <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain pb-2 scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden md:grid md:grid-cols-3 md:gap-x-6 md:gap-y-10 md:overflow-visible md:pb-0">
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
  const schedule =
    item.scheduleLabel || formatDateRange(item.dateStart, item.dateEnd);

  const href = item.ctaUrl || "/whats-on";
  const isExternal = Boolean(item.ctaUrl);

  return (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noreferrer" : undefined}
      className="group flex w-[78vw] shrink-0 snap-start flex-col md:w-auto md:min-w-0"
      aria-label={`Open ${item.title}`}
    >
      <div className="relative aspect-3/4 overflow-hidden bg-(--surface-muted)">
        {item.image ? (
          <SanityImage
            source={item.image}
            aspectRatio={3 / 4}
            alt={item.title}
            fill
            className="object-cover transition duration-700 group-hover:scale-[1.01]"
            sizes="(min-width: 768px) 33vw, 78vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center p-6 text-center text-xs font-semibold">
            {item.title}
          </div>
        )}
      </div>

      <div className="pt-5">
        <p className="mb-3 text-[11px] md:text-sm font-semibold text-(--muted)">
          {item.relatedBrand?.name || "Delahouse Indonesia"}
        </p>

        <h3 className="text-sm md:text-sm font-semibold leading-snug transition group-hover:text-(--accent)">
          {item.title}
        </h3>

        {schedule ? (
          <p className="mt-3 text-[12px] md:text-sm italic leading-6 text-(--muted)">
            {schedule}
          </p>
        ) : null}
      </div>
    </a>
  );
}

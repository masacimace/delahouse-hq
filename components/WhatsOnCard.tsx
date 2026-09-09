import Link from "next/link";
import type { SanityImageSource } from "@sanity/image-url";

import { SanityImage } from "@/components/SanityImage";

type WhatsOnCardProps = {
  item: {
    _id: string;
    title: string;
    slug: string;
    type?: string;
    image?: SanityImageSource | null;
    excerpt?: string;
    dateStart?: string;
    dateEnd?: string;
    relatedBrand?: {
      name?: string;
      slug?: string;
    };
  };
};

function formatDate(date?: string) {
  if (!date) return null;

  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

export function WhatsOnCard({ item }: WhatsOnCardProps) {
  const startDate = formatDate(item.dateStart);
  const endDate = formatDate(item.dateEnd);

  const dateLabel =
    startDate && endDate && startDate !== endDate
      ? `${startDate} — ${endDate}`
      : startDate;

  return (
    <Link
      href={`/whats-on/${item.slug}`}
      className="group block overflow-hidden border border-black/10 bg-white transition hover:border-black dark:border-white/15 dark:bg-neutral-950 dark:hover:border-white"
    >
      <div className="relative aspect-4/5 overflow-hidden bg-neutral-200 dark:bg-neutral-900">
        {item.image ? (
          <SanityImage
            source={item.image}
            aspectRatio={4 / 5}
            alt={item.title}
            fill
            className="object-cover grayscale transition duration-700 group-hover:scale-105 group-hover:grayscale-0"
            sizes="(min-width: 1024px) 33vw, 100vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center px-6 text-center text-sm uppercase text-neutral-500">
            What&apos;s On
          </div>
        )}
      </div>

      <div className="p-5 md:p-6">
        <div className="mb-4 flex flex-wrap gap-2 text-xs uppercase text-neutral-500 dark:text-neutral-400">
          {item.type ? <span>{item.type}</span> : null}
          {item.relatedBrand?.name ? (
            <span>/ {item.relatedBrand.name}</span>
          ) : null}
        </div>

        <h3 className="text-2xl font-semibold text-black dark:text-white">
          {item.title}
        </h3>

        {dateLabel ? (
          <p className="mt-3 text-xs uppercase text-[#7A1F1F] dark:text-[#9B2C2C]">
            {dateLabel}
          </p>
        ) : null}

        {item.excerpt ? (
          <p className="mt-4 line-clamp-3 text-sm leading-6 text-neutral-600 dark:text-neutral-300">
            {item.excerpt}
          </p>
        ) : null}

        <p className="mt-6 text-xs uppercase text-black underline underline-offset-4 dark:text-white">
          View Details
        </p>
      </div>
    </Link>
  );
}

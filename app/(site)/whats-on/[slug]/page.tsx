import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { SanityImageSource } from "@sanity/image-url";
import { JsonLd } from "@/components/JsonLd";
import { articleJsonLd, eventJsonLd } from "@/lib/jsonLd";

import { RichText } from "@/components/RichText";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import {
  WHATS_ON_BY_SLUG_QUERY,
  WHATS_ON_SLUGS_QUERY,
} from "@/sanity/lib/queries";

type WhatsOnItem = {
  _id: string;
  title: string;
  slug: string;
  type?: string;
  image?: SanityImageSource | null;
  excerpt?: string;
  description?: any[];
  dateStart?: string;
  dateEnd?: string;
  ctaLabel?: string;
  ctaUrl?: string;
  featured?: boolean;
  sortOrder?: number;
  relatedBrand?: {
    _id?: string;
    name?: string;
    slug?: string;
    category?: string;
    subcategory?: string;
  };
};

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function formatDate(date?: string) {
  if (!date) return null;

  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

export async function generateStaticParams() {
  const slugs = await client.fetch<{ slug: string }[]>(WHATS_ON_SLUGS_QUERY);

  return slugs.map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = await client.fetch<WhatsOnItem | null>(WHATS_ON_BY_SLUG_QUERY, {
    slug,
  });

  if (!item) {
    return {
      title: "What's On Not Found",
    };
  }

  const title = item.title;
  const description =
    item.excerpt || `Latest update from Delahouse Indonesia: ${item.title}.`;

  const imageUrl = item.image
    ? urlFor(item.image).width(1200).height(630).fit("crop").url()
    : "/og-default.jpg";

  return {
    title,
    description,
    alternates: {
      canonical: `/whats-on/${item.slug}`,
    },
    openGraph: {
      type: "article",
      title,
      description,
      url: `/whats-on/${item.slug}`,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: item.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

export default async function WhatsOnDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const item = await client.fetch<WhatsOnItem | null>(WHATS_ON_BY_SLUG_QUERY, {
    slug,
  });

  if (!item) {
    notFound();
  }

  const imageUrl = item.image
    ? urlFor(item.image).width(1800).height(1200).fit("crop").url()
    : null;

  const articleStructuredData = articleJsonLd({
    title: item.title,
    slug: item.slug,
    excerpt: item.excerpt,
    imageUrl: imageUrl || undefined,
    dateStart: item.dateStart,
    dateEnd: item.dateEnd,
    relatedBrandName: item.relatedBrand?.name,
  });

  const eventStructuredData =
    item.type === "event"
      ? eventJsonLd({
          title: item.title,
          slug: item.slug,
          excerpt: item.excerpt,
          imageUrl: imageUrl || undefined,
          dateStart: item.dateStart,
          dateEnd: item.dateEnd,
          relatedBrandName: item.relatedBrand?.name,
        })
      : null;

  const whatsOnStructuredData = [
    articleStructuredData,
    eventStructuredData,
  ].filter(Boolean) as Record<string, unknown>[];

  const startDate = formatDate(item.dateStart);
  const endDate = formatDate(item.dateEnd);

  const dateLabel =
    startDate && endDate && startDate !== endDate
      ? `${startDate} — ${endDate}`
      : startDate;

  return (
    <main className="min-h-screen bg-[#F7F5F0] text-black dark:bg-[#050505] dark:text-[#F7F5F0]">
      <JsonLd data={whatsOnStructuredData} />
      <section className="mx-auto grid min-h-screen max-w-7xl gap-10 px-6 py-24 md:grid-cols-[0.9fr_1.1fr] md:px-10">
        <div className="flex flex-col justify-center">
          <Link
            href="/whats-on"
            className="mb-10 text-xs uppercase tracking-[0.28em] text-neutral-500 transition hover:text-black dark:text-neutral-400 dark:hover:text-white"
          >
            ← Back to What&apos;s On
          </Link>

          <div className="mb-6 flex flex-wrap gap-3 text-xs uppercase tracking-[0.28em] text-[#7A1F1F] dark:text-[#9B2C2C]">
            {item.type ? <span>{item.type}</span> : null}
            {item.relatedBrand?.name ? (
              <span>/ {item.relatedBrand.name}</span>
            ) : null}
          </div>

          <h1 className="text-6xl font-semibold tracking-[-0.07em] md:text-7xl lg:text-8xl">
            {item.title}
          </h1>

          {dateLabel ? (
            <p className="mt-8 text-xs uppercase tracking-[0.24em] text-neutral-500 dark:text-neutral-400">
              {dateLabel}
            </p>
          ) : null}

          {item.excerpt ? (
            <p className="mt-8 max-w-2xl text-xl leading-8 text-neutral-700 dark:text-neutral-300">
              {item.excerpt}
            </p>
          ) : null}

          <div className="mt-10 flex flex-wrap gap-3">
            {item.ctaUrl ? (
              <a
                href={item.ctaUrl}
                target="_blank"
                rel="noreferrer"
                className="border border-black bg-black px-5 py-3 text-xs uppercase tracking-[0.24em] text-white transition hover:bg-transparent hover:text-black dark:border-white dark:bg-white dark:text-black dark:hover:bg-transparent dark:hover:text-white"
              >
                {item.ctaLabel || "Open Link"}
              </a>
            ) : null}

            {item.relatedBrand?.slug ? (
              <Link
                href={`/brands/${item.relatedBrand.slug}`}
                className="border border-black/20 px-5 py-3 text-xs uppercase tracking-[0.24em] transition hover:border-black dark:border-white/20 dark:hover:border-white"
              >
                View Brand
              </Link>
            ) : null}
          </div>
        </div>

        <div className="relative min-h-130 overflow-hidden bg-neutral-200 dark:bg-neutral-900">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={item.title}
              fill
              priority
              className="object-cover grayscale"
              sizes="(min-width: 768px) 50vw, 100vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center px-8 text-center text-sm uppercase tracking-[0.35em] text-neutral-500">
              What&apos;s On
            </div>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-7xl border-t border-black/10 px-6 py-24 dark:border-white/10 md:px-10">
        <div className="grid gap-12 md:grid-cols-[0.7fr_1.3fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-neutral-500 dark:text-neutral-400">
              Details
            </p>
          </div>

          <div>
            {item.description?.length ? (
              <RichText value={item.description} />
            ) : (
              <p className="max-w-2xl text-lg leading-8 text-neutral-600 dark:text-neutral-400">
                Details have not been added yet.
              </p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

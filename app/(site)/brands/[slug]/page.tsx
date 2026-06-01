import { notFound } from "next/navigation";
import type { SanityImageSource } from "@sanity/image-url";

import { BrandDetailGallery } from "@/components/brands/BrandDetailGallery";
import { BrandDetailHero } from "@/components/brands/BrandDetailHero";
import { BrandDetailIntro } from "@/components/brands/BrandDetailIntro";
import { BrandLocations } from "@/components/brands/BrandLocations";
import type { BrandOutlet } from "@/components/brands/BrandLocations";
import { client } from "@/sanity/lib/client";
import {
  BRAND_BY_SLUG_QUERY,
  BRAND_OUTLETS_QUERY,
  BRANDS_QUERY,
} from "@/sanity/lib/queries";

type BrandDetail = {
  _id: string;
  name: string;
  slug: string;
  category?: string;
  subcategory?: string;
  shortDescription?: string;
  description?: string;
  logo?: SanityImageSource | null;
  heroImage?: SanityImageSource | null;
  gallery?: SanityImageSource[] | null;
  heroVideoUrl?: string | null;
  instagramUrl?: string;
  menuUrl?: string;
  storeUrl?: string;
};

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const brands = await client.fetch<Array<{ slug: string }>>(BRANDS_QUERY);

  return brands
    .filter((brand) => brand.slug)
    .map((brand) => ({
      slug: brand.slug,
    }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;

  const brand = await client.fetch<BrandDetail | null>(BRAND_BY_SLUG_QUERY, {
    slug,
  });

  if (!brand) {
    return {
      title: "Brand Not Found",
    };
  }

  return {
    title: brand.name,
    description:
      brand.shortDescription ||
      brand.description ||
      `${brand.name} by Delahouse Indonesia.`,
    alternates: {
      canonical: `/brands/${brand.slug}`,
    },
  };
}

export default async function BrandDetailPage({ params }: PageProps) {
  const { slug } = await params;

  const [brand, outlets] = await Promise.all([
    client.fetch<BrandDetail | null>(BRAND_BY_SLUG_QUERY, { slug }),
    client.fetch<BrandOutlet[]>(BRAND_OUTLETS_QUERY, { slug }),
  ]);

  if (!brand) {
    notFound();
  }

  return (
    <main className="site-main">
      <BrandDetailHero
        name={brand.name}
        shortDescription={brand.shortDescription}
        logo={brand.logo}
        heroImage={brand.heroImage}
        heroVideoUrl={brand.heroVideoUrl}
      />

      <BrandDetailIntro
        description={brand.description}
        instagramUrl={brand.instagramUrl}
      />

      <BrandDetailGallery name={brand.name} gallery={brand.gallery} />

      <BrandLocations outlets={outlets} />
    </main>
  );
}

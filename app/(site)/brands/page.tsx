import { BrandArchiveShowcase } from "@/components/brands/BrandArchiveShowcase";
import { BrandsHero } from "@/components/brands/BrandsHero";
import type { BrandsPageHero } from "@/components/brands/BrandsHero";
import type { BrandArchiveBrand } from "@/components/brands/BrandArchiveRow";
import { client } from "@/sanity/lib/client";
import { BRANDS_PAGE_QUERY, BRANDS_QUERY } from "@/sanity/lib/queries";

export const revalidate = 60;

export const metadata = {
  title: "Brands",
  description:
    "Explore food, drinks, coffee, fashion, and culture-led brands from Delahouse Indonesia.",
  alternates: {
    canonical: "/brands",
  },
};

export default async function BrandsPage() {
  const [page, brands] = await Promise.all([
    client.fetch<BrandsPageHero | null>(BRANDS_PAGE_QUERY),
    client.fetch<BrandArchiveBrand[]>(BRANDS_QUERY),
  ]);

  return (
    <main className="site-main">
      <BrandsHero page={page} />
      <BrandArchiveShowcase brands={brands} />
    </main>
  );
}

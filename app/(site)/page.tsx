import { HomeHero } from "@/components/home/HomeHero";
import { client } from "@/sanity/lib/client";
import {
  BRANDS_QUERY,
  HOME_PAGE_QUERY,
  SITE_SETTINGS_QUERY,
  WHATS_ON_QUERY,
} from "@/sanity/lib/queries";
import type { SanityImageSource } from "@sanity/image-url";
import { urlFor } from "@/sanity/lib/image";
import { JsonLd } from "@/components/JsonLd";
import { organizationJsonLd, websiteJsonLd } from "@/lib/jsonLd";
import { FeaturedBrandShowcase } from "@/components/home/FeaturedBrandShowcase";
import { BrandDirectoryCarousel } from "@/components/home/BrandDirectoryCarousel";
import { HomeWhatsOn } from "@/components/home/HomeWhatsOn";

type Brand = {
  _id: string;
  name: string;
  slug: string;
  category: string;
  subcategory?: string;
  shortDescription?: string;
  heroImage?: SanityImageSource | null;
  logo?: SanityImageSource | null;
  instagramUrl?: string;
  tiktokUrl?: string;
  email?: string;
  featured?: boolean;
  sortOrder?: number;
};

export default async function Home() {
  const [siteSettings, homePage, brands, whatsOnItems] = await Promise.all([
    client.fetch(SITE_SETTINGS_QUERY),
    client.fetch(HOME_PAGE_QUERY),
    client.fetch<Brand[]>(BRANDS_QUERY),
    client.fetch(WHATS_ON_QUERY),
  ]);

  const logoUrl = siteSettings?.logo
    ? urlFor(siteSettings.logo).width(512).height(512).fit("max").url()
    : undefined;

  const homepageJsonLd = [
    organizationJsonLd({
      name: siteSettings?.siteName,
      description: siteSettings?.siteDescription,
      logoUrl,
      instagramUrl: siteSettings?.instagramUrl,
      tiktokUrl: siteSettings?.tiktokUrl,
      email: siteSettings?.email,
    }),
    websiteJsonLd(),
  ];

  const eatAndDrinkBrands = brands.filter(
    (brand) => brand.category === "eat-drink",
  );

  const wearAndCultureBrands = brands.filter(
    (brand) => brand.category === "wear-culture",
  );

  const featuredBrands =
    homePage?.featuredBrands?.length > 0
      ? homePage.featuredBrands
      : brands.filter((brand) => brand.featured);

  const homepageFeaturedBrands = featuredBrands.slice(0, 3);

  return (
    <main className="min-h-screen bg-[#F7F5F0] text-black dark:bg-[#050505] dark:text-[#F7F5F0]">
      <JsonLd data={homepageJsonLd} />
      <HomeHero
        title={homePage?.heroTitle || "Welcome"}
        eyebrow={homePage?.heroEyebrow}
        description={homePage?.heroDescription}
        heroLogo={homePage?.heroLogo}
        image={homePage?.heroImage}
        videoUrl={homePage?.heroVideoUrl}
      />

      <FeaturedBrandShowcase brands={homepageFeaturedBrands} />

      <BrandDirectoryCarousel brands={brands} />

      <HomeWhatsOn items={whatsOnItems} />
    </main>
  );
}

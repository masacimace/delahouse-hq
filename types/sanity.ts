import type { SanityImageSource } from "@sanity/image-url";
import type { PortableTextBlock } from "@portabletext/types";

export type BrandCategory = "eat-drink" | "wear-culture";

export type SiteSettings = {
  siteName?: string;
  siteDescription?: string;
  logo?: SanityImageSource | null;
  navbarLogoLight?: SanityImageSource | null;
  navbarLogoDark?: SanityImageSource | null;
  footerLogo?: SanityImageSource | null;
  footerVideoUrl?: string | null;
  footerImage?: SanityImageSource | null;
  footerDescription?: string;
  favicon?: SanityImageSource | null;
  instagramUrl?: string;
  tiktokUrl?: string;
  email?: string;
  whatsappNumber?: string;
  address?: string;
  seoTitle?: string;
  seoDescription?: string;
  ogImage?: SanityImageSource | null;
};

export type HomePage = {
  title?: string;
  heroEyebrow?: string;
  heroTitle?: string;
  heroDescription?: string;
  heroLogo?: SanityImageSource | null;
  heroImage?: SanityImageSource | null;
  heroVideoUrl?: string | null;
  brandSectionTitle?: string;
  brandSectionDescription?: string;
  aboutTitle?: string;
  aboutDescription?: string;
  featuredBrands?: Brand[];
  featuredWhatsOn?: WhatsOnItem[];
};

export type Brand = {
  _id: string;
  name: string;
  slug: string;
  category: BrandCategory;
  subcategory?: string;
  shortDescription?: string;
  description?: PortableTextBlock[];
  logo?: SanityImageSource | null;
  heroImage?: SanityImageSource | null;
  heroVideoUrl?: string | null;
  gallery?: SanityImageSource[] | null;
  instagramUrl?: string;
  tiktokUrl?: string;
  websiteUrl?: string;
  menuUrl?: string;
  storeUrl?: string;
  whatsappNumber?: string;
  featured?: boolean;
  sortOrder?: number;
  seoTitle?: string;
  seoDescription?: string;
  outlets?: Outlet[];
};

export type Outlet = {
  _id: string;
  name: string;
  area?: string;
  address?: string;
  googleMapsUrl?: string;
  phoneNumber?: string;
  whatsappNumber?: string;
  openingHours?: OpeningHour[];
  featured?: boolean;
  sortOrder?: number;
};

export type OpeningHour = {
  day?: string;
  hours?: string;
};

export type WhatsOnItem = {
  _id: string;
  title: string;
  slug: string;
  type?: "event" | "promo" | "drop";
  image?: SanityImageSource | null;
  excerpt?: string;
  description?: PortableTextBlock[];
  scheduleLabel?: string;
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
    category?: BrandCategory;
    subcategory?: string;
  };
};

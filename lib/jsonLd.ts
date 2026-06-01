import { absoluteUrl, siteConfig } from "./site";

type OrganizationJsonLdParams = {
  name?: string;
  description?: string;
  logoUrl?: string;
  instagramUrl?: string;
  tiktokUrl?: string;
  email?: string;
};

export function organizationJsonLd({
  name = siteConfig.name,
  description = siteConfig.description,
  logoUrl,
  instagramUrl,
  tiktokUrl,
  email,
}: OrganizationJsonLdParams) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name,
    url: absoluteUrl("/"),
    description,
    ...(logoUrl ? { logo: logoUrl } : {}),
    ...(email ? { email } : {}),
    sameAs: [instagramUrl, tiktokUrl].filter(Boolean),
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: absoluteUrl("/"),
    description: siteConfig.description,
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
    },
  };
}

type BrandJsonLdParams = {
  name: string;
  slug: string;
  category?: string;
  subcategory?: string;
  description?: string;
  imageUrl?: string;
  instagramUrl?: string;
  tiktokUrl?: string;
  websiteUrl?: string;
};

export function brandJsonLd({
  name,
  slug,
  category,
  subcategory,
  description,
  imageUrl,
  instagramUrl,
  tiktokUrl,
  websiteUrl,
}: BrandJsonLdParams) {
  const brandUrl = absoluteUrl(`/brands/${slug}`);

  return {
    "@context": "https://schema.org",
    "@type": "Brand",
    name,
    url: brandUrl,
    description,
    category: subcategory || category,
    ...(imageUrl ? { image: imageUrl } : {}),
    sameAs: [instagramUrl, tiktokUrl, websiteUrl].filter(Boolean),
  };
}

export function localBusinessJsonLd({
  name,
  slug,
  category,
  subcategory,
  description,
  imageUrl,
  instagramUrl,
  tiktokUrl,
  websiteUrl,
}: BrandJsonLdParams) {
  const businessUrl = absoluteUrl(`/brands/${slug}`);

  const businessType =
    category === "wear-culture"
      ? "Store"
      : subcategory?.toLowerCase().includes("bar")
        ? "BarOrPub"
        : subcategory?.toLowerCase().includes("coffee")
          ? "CafeOrCoffeeShop"
          : "Restaurant";

  return {
    "@context": "https://schema.org",
    "@type": businessType,
    name,
    url: businessUrl,
    description,
    ...(imageUrl ? { image: imageUrl } : {}),
    sameAs: [instagramUrl, tiktokUrl, websiteUrl].filter(Boolean),
  };
}

type ArticleJsonLdParams = {
  title: string;
  slug: string;
  excerpt?: string;
  imageUrl?: string;
  dateStart?: string;
  dateEnd?: string;
  relatedBrandName?: string;
};

export function articleJsonLd({
  title,
  slug,
  excerpt,
  imageUrl,
  dateStart,
  relatedBrandName,
}: ArticleJsonLdParams) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    url: absoluteUrl(`/whats-on/${slug}`),
    description: excerpt,
    ...(imageUrl ? { image: imageUrl } : {}),
    ...(dateStart ? { datePublished: dateStart } : {}),
    ...(dateStart ? { dateModified: dateStart } : {}),
    author: {
      "@type": "Organization",
      name: relatedBrandName || siteConfig.name,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
    },
  };
}

export function eventJsonLd({
  title,
  slug,
  excerpt,
  imageUrl,
  dateStart,
  dateEnd,
  relatedBrandName,
}: ArticleJsonLdParams) {
  if (!dateStart) return null;

  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: title,
    url: absoluteUrl(`/whats-on/${slug}`),
    description: excerpt,
    startDate: dateStart,
    ...(dateEnd ? { endDate: dateEnd } : {}),
    ...(imageUrl ? { image: imageUrl } : {}),
    organizer: {
      "@type": "Organization",
      name: relatedBrandName || siteConfig.name,
      url: absoluteUrl("/"),
    },
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  };
}

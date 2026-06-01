import { defineQuery } from "next-sanity";

export const SITE_SETTINGS_QUERY = defineQuery(`
  *[_type == "siteSettings"][0] {
    siteName,
    siteDescription,
    enableSplashScreen,
    logo,
    navbarLogoLight,
    navbarLogoDark,
    footerLogo,
    "footerVideoUrl": footerVideo.asset->url,
    footerImage,
    footerDescription,
    instagramUrl,
    tiktokUrl,
    email,
    whatsappNumber,
    address,
    seoTitle,
    seoDescription,
    ogImage
  }
`);

export const HOME_PAGE_QUERY = defineQuery(`
  *[_type == "homePage"][0] {
    title,
    heroEyebrow,
    heroTitle,
    heroDescription,
    heroLogo,
    heroImage,
    "heroVideoUrl": heroVideo.asset->url,
    brandSectionTitle,
    brandSectionDescription,
    aboutTitle,
    aboutDescription,
    featuredBrands[]-> {
      _id,
      name,
      "slug": slug.current,
      category,
      subcategory,
      shortDescription,
      logo,
      heroImage,
      "heroVideoUrl": heroVideo.asset->url,
      featured,
      sortOrder
    },
    featuredWhatsOn[]-> {
      _id,
      title,
      "slug": slug.current,
      type,
      image,
      excerpt,
      dateStart,
      dateEnd,
      ctaLabel,
      ctaUrl
    }
  }
`);

export const BRANDS_QUERY = defineQuery(`
  *[_type == "brand"] | order(sortOrder asc, name asc) {
    _id,
    name,
    "slug": slug.current,
    category,
    subcategory,
    shortDescription,
    logo,
    heroImage,
    gallery,
    "heroVideoUrl": heroVideo.asset->url,
    instagramUrl,
    menuUrl,
    storeUrl,
    featured,
    sortOrder
  }
`);

export const FEATURED_BRANDS_QUERY = defineQuery(`
  *[_type == "brand" && featured == true] | order(sortOrder asc, name asc) {
    _id,
    name,
    "slug": slug.current,
    category,
    subcategory,
    shortDescription,
    logo,
    heroImage,
    instagramUrl,
    menuUrl,
    storeUrl,
    featured,
    sortOrder
  }
`);

export const WHATS_ON_QUERY = defineQuery(`
  *[_type == "whatsOn"] | order(sortOrder asc, dateStart desc) {
    _id,
    title,
    "slug": slug.current,
    type,
    image,
    excerpt,
    scheduleLabel,
    dateStart,
    dateEnd,
    ctaLabel,
    ctaUrl,
    featuredColor,
    relatedBrand-> {
      name,
      "slug": slug.current
    },
    featured,
    sortOrder
  }
`);

export const BRANDS_PAGE_QUERY = defineQuery(`
  *[_type == "brandsPage"][0] {
    title,
    description,
    heroImages
  }
`);

export const WHATS_ON_PAGE_QUERY = defineQuery(`
  *[_type == "whatsOnPage"][0] {
    title,
    description,
    heroImages
  }
`);

export const BRAND_SLUGS_QUERY = defineQuery(`
  *[_type == "brand" && defined(slug.current)] {
    "slug": slug.current
  }
`);

export const BRAND_BY_SLUG_QUERY = defineQuery(`
  *[_type == "brand" && slug.current == $slug][0] {
    _id,
    name,
    "slug": slug.current,
    category,
    subcategory,
    shortDescription,
    description,
    logo,
    heroImage,
    gallery,
    "heroVideoUrl": heroVideo.asset->url,
    instagramUrl,
    menuUrl,
    storeUrl,
    featured,
    sortOrder
  }
`);

export const BRAND_OUTLETS_QUERY = defineQuery(`
  *[_type == "outlet" && relatedBrand->slug.current == $slug] | order(sortOrder asc, name asc) {
    _id,
    name,
    area,
    image,
    address,
    googleMapsUrl,
    openingHours,
    menuUrl,
    "menuFileUrl": menuFile.asset->url,
    reservationUrl,
    sortOrder
  }
`);

export const WHATS_ON_SLUGS_QUERY = defineQuery(`
  *[_type == "whatsOn" && defined(slug.current)] {
    "slug": slug.current
  }
`);

export const WHATS_ON_BY_SLUG_QUERY = defineQuery(`
  *[_type == "whatsOn" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    type,
    image,
    excerpt,
    description,
    scheduleLabel,
    dateStart,
    dateEnd,
    ctaLabel,
    ctaUrl,
    featured,
    sortOrder,
    relatedBrand-> {
      _id,
      name,
      "slug": slug.current,
      category,
      subcategory
    }
  }
`);

export const ABOUT_PAGE_QUERY = defineQuery(`
  *[_type == "aboutPage"][0] {
    description,
    "backgroundVideoUrl": backgroundVideo.asset->url,
    backgroundImage,
    email,
    instagramUrl
  }
`);

export const BRAND_SITEMAP_QUERY = defineQuery(`
  *[_type == "brand" && defined(slug.current)] {
    "slug": slug.current,
    _updatedAt
  }
`);

export const WHATS_ON_SITEMAP_QUERY = defineQuery(`
  *[_type == "whatsOn" && defined(slug.current)] {
    "slug": slug.current,
    _updatedAt
  }
`);

import type { MetadataRoute } from "next";

import { absoluteUrl } from "@/lib/site";
import { client } from "@/sanity/lib/client";
import {
  BRAND_SITEMAP_QUERY,
  WHATS_ON_SITEMAP_QUERY,
} from "@/sanity/lib/queries";

type SitemapItem = {
  slug: string;
  _updatedAt?: string;
};

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [brands, whatsOnItems] = await Promise.all([
    client.fetch<SitemapItem[]>(BRAND_SITEMAP_QUERY),
    client.fetch<SitemapItem[]>(WHATS_ON_SITEMAP_QUERY),
  ]);

  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl("/"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: absoluteUrl("/brands"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/whats-on"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/about"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: absoluteUrl("/contact"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  const brandRoutes: MetadataRoute.Sitemap = brands.map((brand) => ({
    url: absoluteUrl(`/brands/${brand.slug}`),
    lastModified: brand._updatedAt ? new Date(brand._updatedAt) : now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const whatsOnRoutes: MetadataRoute.Sitemap = whatsOnItems.map((item) => ({
    url: absoluteUrl(`/whats-on/${item.slug}`),
    lastModified: item._updatedAt ? new Date(item._updatedAt) : now,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...brandRoutes, ...whatsOnRoutes];
}

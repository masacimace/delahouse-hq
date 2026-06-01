export const siteConfig = {
  name: "Delahouse Indonesia",
  description:
    "A Jakarta-based hospitality and lifestyle house for food, drinks, coffee, fashion, and culture.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ogImage: "/og-default.jpg",
};

export function absoluteUrl(path = "/") {
  const baseUrl = siteConfig.url.replace(/\/$/, "");
  const cleanPath = path.startsWith("/") ? path : `/${path}`;

  return `${baseUrl}${cleanPath}`;
}

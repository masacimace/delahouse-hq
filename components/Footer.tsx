import Image from "next/image";
import Link from "next/link";
import { Mail } from "lucide-react";
import { FaInstagram, FaWhatsapp, FaTiktok } from "react-icons/fa6";
import type { SanityImageSource } from "@sanity/image-url";

import { FooterBrandLogoSlider } from "@/components/FooterBrandLogoSlider";
import { getWhatsAppUrl } from "@/lib/format";
import { mainNavigation } from "@/lib/navigation";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { BRANDS_QUERY, SITE_SETTINGS_QUERY } from "@/sanity/lib/queries";
import type { SiteSettings } from "@/types/sanity";

type FooterBrand = {
  _id: string;
  name: string;
  slug: string;
  logo?: SanityImageSource | null;
};

export async function Footer() {
  const [siteSettings, brands] = await Promise.all([
    client.fetch<SiteSettings | null>(SITE_SETTINGS_QUERY),
    client.fetch<FooterBrand[]>(BRANDS_QUERY),
  ]);

  const whatsappUrl = getWhatsAppUrl(siteSettings?.whatsappNumber);

  const footerLogoUrl = siteSettings?.footerLogo
    ? urlFor(siteSettings.footerLogo).width(720).fit("max").url()
    : siteSettings?.logo
      ? urlFor(siteSettings.logo).width(720).fit("max").url()
      : null;

  const footerBrandLogos = brands
    .filter((brand) => brand.logo && brand.slug)
    .map((brand) => ({
      _id: brand._id,
      name: brand.name,
      slug: brand.slug,
      logoUrl: urlFor(brand.logo!).width(720).fit("max").url(),
    }));

  const footerImageUrl = siteSettings?.footerImage
    ? urlFor(siteSettings.footerImage)
        .width(2400)
        .height(1400)
        .fit("crop")
        .url()
    : null;

  const footerDescription =
    siteSettings?.footerDescription ||
    siteSettings?.siteDescription ||
    "A Jakarta-based hospitality and lifestyle house for food, drinks, coffee, fashion, and culture.";

  return (
    <footer
      id="site-footer"
      data-navbar-contrast="light"
      className="film-grain relative min-h-screen overflow-hidden bg-black text-white"
    >
      {siteSettings?.footerVideoUrl ? (
        <video
          src={siteSettings.footerVideoUrl}
          className="absolute inset-0 h-full w-full scale-100 object-cover blur-md"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
      ) : footerImageUrl ? (
        <Image
          src={footerImageUrl}
          alt={siteSettings?.siteName || "Delahouse Indonesia"}
          fill
          className="scale-110 object-cover blur-[6px]"
          sizes="100vw"
        />
      ) : (
        <div className="absolute inset-0 bg-neutral-950" />
      )}

      <div className="absolute inset-0 bg-black/75" />
      <div className="absolute inset-0 bg-linear-to-b from-black/30 via-black/45 to-black/85" />

      <div className="relative z-10 flex min-h-screen flex-col">
        <div className="site-container flex flex-1 flex-col items-center justify-center py-28 text-center">
          <FooterBrandLogoSlider
            brands={footerBrandLogos}
            fallbackLogoUrl={footerLogoUrl}
            siteName={siteSettings?.siteName || "Delahouse Indonesia"}
          />

          <p className="mt-10 max-w-2xl text-base leading-7 text-white/75 md:text-lg">
            {footerDescription}
          </p>

          <nav className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            {mainNavigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-white/75 transition hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {siteSettings?.instagramUrl ? (
              <a
                href={siteSettings.instagramUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="flex h-11 w-11 items-center justify-center rounded-full text-white/75 transition hover:border-white hover:text-white"
              >
                <FaInstagram className="h-5 w-5" />
              </a>
            ) : null}

            {siteSettings?.tiktokUrl ? (
              <a
                href={siteSettings.tiktokUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="TikTok"
                className="flex h-11 w-11 items-center justify-center rounded-full text-white/75 transition hover:border-white hover:text-white"
              >
                <FaTiktok className="h-4 w-4" />
              </a>
            ) : null}

            {siteSettings?.email ? (
              <a
                href={`mailto:${siteSettings.email}`}
                aria-label="Email"
                className="flex h-11 w-11 items-center justify-center rounded-full text-white/75 transition hover:border-white hover:text-white"
              >
                <Mail className="h-5 w-5" strokeWidth={1.7} />
              </a>
            ) : null}

            {whatsappUrl ? (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                className="flex h-11 w-11 items-center justify-center rounded-full text-white/75 transition hover:border-white hover:text-white"
              >
                <FaWhatsapp className="h-5 w-5" />
              </a>
            ) : null}
          </div>
        </div>

        <div className="site-container flex justify-center border-t border-white/15 py-6 text-center text-xs text-white/55 md:justify-center">
          <p>
            © {new Date().getFullYear()} Delahouse Indonesia. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

import { RouteSplashScreen } from "@/components/RouteSplashScreen";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { SITE_SETTINGS_QUERY } from "@/sanity/lib/queries";
import type { SiteSettings } from "@/types/sanity";

export async function RouteSplash() {
  const siteSettings = await client.fetch<SiteSettings | null>(
    SITE_SETTINGS_QUERY,
  );

  const logoUrl = siteSettings?.footerLogo
    ? urlFor(siteSettings.footerLogo).width(720).fit("max").url()
    : siteSettings?.logo
      ? urlFor(siteSettings.logo).width(720).fit("max").url()
      : null;

  return (
    <RouteSplashScreen
      logoUrl={logoUrl}
      siteName={siteSettings?.siteName || "Delahouse Indonesia"}
    />
  );
}

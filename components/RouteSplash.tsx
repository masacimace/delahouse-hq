import { RouteSplashScreen } from "@/components/RouteSplashScreen";
import { client } from "@/sanity/lib/client";
import { SITE_SETTINGS_QUERY } from "@/sanity/lib/queries";
import type { SiteSettings } from "@/types/sanity";

export async function RouteSplash() {
  const siteSettings = await client.fetch<SiteSettings | null>(
    SITE_SETTINGS_QUERY,
  );

  if (siteSettings?.enableSplashScreen === false) {
    return null;
  }

  return (
    <RouteSplashScreen
      logo={siteSettings?.footerLogo || siteSettings?.logo}
      siteName={siteSettings?.siteName || "Delahouse Indonesia"}
    />
  );
}

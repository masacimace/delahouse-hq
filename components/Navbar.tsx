import Image from "next/image";
import Link from "next/link";

import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { SITE_SETTINGS_QUERY } from "@/sanity/lib/queries";
import type { SiteSettings } from "@/types/sanity";

import { MenuButton } from "./MenuButton";
import { ThemeToggle } from "./ThemeToggle";
import { NavbarLogo } from "./NavbarLogo";

export async function Navbar() {
  const siteSettings = await client.fetch<SiteSettings | null>(
    SITE_SETTINGS_QUERY,
  );

  const lightLogoUrl = siteSettings?.navbarLogoLight
    ? urlFor(siteSettings.navbarLogoLight).height(96).fit("max").url()
    : null;

  const darkLogoUrl = siteSettings?.navbarLogoDark
    ? urlFor(siteSettings.navbarLogoDark).height(96).fit("max").url()
    : null;

  return (
    <header className="sticky top-2 z-50 -mb-16 h-16 bg-transparent">
      <div className="site-container-fluid relative flex h-16 items-center justify-between">
        <div className="z-10 flex flex-1 items-center justify-start">
          <MenuButton
            instagramUrl={siteSettings?.instagramUrl}
            tiktokUrl={siteSettings?.tiktokUrl}
            email={siteSettings?.email}
            whatsappNumber={siteSettings?.whatsappNumber}
          />
        </div>

        <div className="pointer-events-none absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 justify-center">
          <div className="pointer-events-auto">
            <NavbarLogo
              siteName={siteSettings?.siteName || "Delahouse Indonesia"}
              lightLogoUrl={lightLogoUrl}
              darkLogoUrl={darkLogoUrl}
            />
          </div>
        </div>

        <div className="z-10 flex flex-1 items-center justify-end">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

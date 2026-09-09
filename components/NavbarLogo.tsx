"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { SanityImageSource } from "@sanity/image-url";

import { SanityImage } from "@/components/SanityImage";

import { useHeroNavMode } from "@/hooks/useHeroNavMode";
import { useNavbarContrastMode } from "@/hooks/useNavbarContrastMode";

type NavbarLogoProps = {
  siteName: string;
  lightLogo?: SanityImageSource | null;
  darkLogo?: SanityImageSource | null;
};

export function NavbarLogo({
  siteName,
  lightLogo,
  darkLogo,
}: NavbarLogoProps) {
  const isHeroMode = useHeroNavMode();
  const useLightNav = useNavbarContrastMode();
  const [isFooterVisible, setIsFooterVisible] = useState(false);

  useEffect(() => {
    const footer = document.getElementById("site-footer");

    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsFooterVisible(entry.isIntersecting);
      },
      {
        threshold: 0.7, // Adjust this threshold as needed
      },
    );

    observer.observe(footer);

    return () => {
      observer.disconnect();
    };
  }, []);

  const showLogo = !isHeroMode && !isFooterVisible;

  return (
    <div
      className={[
        "transition duration-500 ease-out",
        showLogo
          ? "translate-y-0 opacity-100"
          : "-translate-y-1 opacity-0 pointer-events-none",
      ].join(" ")}
    >
      <Link href="/" className="block">
        {lightLogo || darkLogo ? (
          <>
            {useLightNav ? (
              darkLogo ? (
                <SanityImage
                  source={darkLogo}
                  alt={siteName}
                  width={280}
                  height={60}
                  fetchPriority="high"
                  className="h-19 md-h-24 w-auto object-contain"
                />
              ) : lightLogo ? (
                <SanityImage
                  source={lightLogo}
                  alt={siteName}
                  width={280}
                  height={60}
                  fetchPriority="high"
                  className="h-19 md-h-24 w-auto object-contain brightness-0 invert"
                />
              ) : null
            ) : (
              <>
                {lightLogo ? (
                  <SanityImage
                    source={lightLogo}
                    alt={siteName}
                    width={280}
                    height={60}
                    fetchPriority="high"
                    className="h-19 md-h-24 w-auto object-contain dark:hidden"
                  />
                ) : null}

                {darkLogo ? (
                  <SanityImage
                    source={darkLogo}
                    alt={siteName}
                    width={280}
                    height={60}
                    fetchPriority="high"
                    className="hidden h-19 md-h-24 w-auto object-contain dark:block"
                  />
                ) : null}

                {!lightLogo && darkLogo ? (
                  <SanityImage
                    source={darkLogo}
                    alt={siteName}
                    width={280}
                    height={60}
                    fetchPriority="high"
                    className="h-19 md-h-24 w-auto object-contain dark:hidden"
                  />
                ) : null}
              </>
            )}
          </>
        ) : (
          <span
            className={[
              "text-sm font-semibold",
              useLightNav ? "text-white" : "text-(--foreground)",
            ].join(" ")}
          >
            {siteName}
          </span>
        )}
      </Link>
    </div>
  );
}

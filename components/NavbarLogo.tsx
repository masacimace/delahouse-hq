"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { useHeroNavMode } from "@/hooks/useHeroNavMode";
import { useNavbarContrastMode } from "@/hooks/useNavbarContrastMode";

type NavbarLogoProps = {
  siteName: string;
  lightLogoUrl?: string | null;
  darkLogoUrl?: string | null;
};

export function NavbarLogo({
  siteName,
  lightLogoUrl,
  darkLogoUrl,
}: NavbarLogoProps) {
  const isHeroMode = useHeroNavMode();
  const useLightNav = useNavbarContrastMode();
  const [isFooterVisible, setIsFooterVisible] = useState(false);

  useEffect(() => {
    const footer = document.getElementById("site-footer");

    if (!footer) {
      setIsFooterVisible(false);
      return;
    }

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
        {lightLogoUrl || darkLogoUrl ? (
          <>
            {useLightNav ? (
              darkLogoUrl ? (
                <Image
                  src={darkLogoUrl}
                  alt={siteName}
                  width={180}
                  height={60}
                  priority
                  className="h-14 md-h-24 w-auto object-contain"
                />
              ) : lightLogoUrl ? (
                <Image
                  src={lightLogoUrl}
                  alt={siteName}
                  width={180}
                  height={60}
                  priority
                  className="h-14 md-h-24 w-auto object-contain brightness-0 invert"
                />
              ) : null
            ) : (
              <>
                {lightLogoUrl ? (
                  <Image
                    src={lightLogoUrl}
                    alt={siteName}
                    width={180}
                    height={60}
                    priority
                    className="h-14 md-h-24 w-auto object-contain dark:hidden"
                  />
                ) : null}

                {darkLogoUrl ? (
                  <Image
                    src={darkLogoUrl}
                    alt={siteName}
                    width={180}
                    height={60}
                    priority
                    className="hidden h-14 md-h-24 w-auto object-contain dark:block"
                  />
                ) : null}

                {!lightLogoUrl && darkLogoUrl ? (
                  <Image
                    src={darkLogoUrl}
                    alt={siteName}
                    width={180}
                    height={60}
                    priority
                    className="h-16 md-h-24 w-auto object-contain dark:hidden"
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

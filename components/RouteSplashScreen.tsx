"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { SanityImageSource } from "@sanity/image-url";

import { SanityImage } from "@/components/SanityImage";

import Noise from "@/components/ui/Noise";

type RouteSplashScreenProps = {
  logo?: SanityImageSource | null;
  siteName?: string;
};

export function RouteSplashScreen({
  logo,
  siteName = "Delahouse Indonesia",
}: RouteSplashScreenProps) {
  const pathname = usePathname();
  const isFirstRender = useRef(true);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    setIsVisible(true);

    const timeout = window.setTimeout(() => {
      setIsVisible(false);
    }, 1800);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [pathname]);

  return (
    <div
      className={[
        "fixed inset-0 z-9999 flex items-center justify-center overflow-hidden bg-black/95 backdrop-blur-md text-white transition duration-100",
        isVisible
          ? "pointer-events-auto opacity-100"
          : "pointer-events-none opacity-0",
      ].join(" ")}
      aria-hidden={!isVisible}
    >
      <div className="absolute inset-0 mix-blend-screen">
        <Noise
          patternSize={250}
          patternScaleX={1}
          patternScaleY={1}
          patternRefreshInterval={2}
          patternAlpha={50}
        />
      </div>

      <div className="relative z-10 flex items-center justify-center">
        {logo ? (
          <SanityImage
            source={logo}
            alt={siteName}
            width={520}
            height={220}
            fetchPriority="high"
            className="h-auto w-42 animated-pulse object-contain md:w-[320px]"
          />
        ) : (
          <p className="animate-pulse text-xl font-semibold uppercase tracking-wide md:text-3xl">
            {siteName}
          </p>
        )}
      </div>
    </div>
  );
}

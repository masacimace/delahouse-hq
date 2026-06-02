"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import Noise from "@/components/ui/Noise";

type RouteSplashScreenProps = {
  logoUrl?: string | null;
  siteName?: string;
};

export function RouteSplashScreen({
  logoUrl,
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
        {logoUrl ? (
          <Image
            src={logoUrl}
            alt={siteName}
            width={520}
            height={220}
            priority
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

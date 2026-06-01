"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useNavbarContrastMode } from "@/hooks/useNavbarContrastMode";
import { getWhatsAppUrl } from "@/lib/format";
import { mainNavigation } from "@/lib/navigation";

type MenuButtonProps = {
  instagramUrl?: string;
  tiktokUrl?: string;
  email?: string;
  whatsappNumber?: string;
};

export function MenuButton({
  instagramUrl,
  tiktokUrl,
  email,
  whatsappNumber,
}: MenuButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const useLightNav = useNavbarContrastMode();
  const whatsappUrl = getWhatsAppUrl(whatsappNumber);

  useEffect(() => {
    if (!isOpen) return;

    const startY = window.scrollY;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    function handleScroll() {
      const distance = Math.abs(window.scrollY - startY);

      if (distance > 500) {
        setIsOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isOpen]);

  const resourceLinks = [
    instagramUrl
      ? {
          label: "Instagram",
          href: instagramUrl,
          external: true,
        }
      : null,
    tiktokUrl
      ? {
          label: "TikTok",
          href: tiktokUrl,
          external: true,
        }
      : null,
    email
      ? {
          label: "Email",
          href: `mailto:${email}`,
          external: false,
        }
      : null,
    whatsappUrl
      ? {
          label: "WhatsApp",
          href: whatsappUrl,
          external: true,
        }
      : null,
  ].filter(Boolean) as Array<{
    label: string;
    href: string;
    external: boolean;
  }>;

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={[
          "inline-flex items-center gap-3 text-sm font-medium transition hover:opacity-60",
          useLightNav ? "text-white" : "text-(--foreground)",
        ].join(" ")}
        aria-label="Open menu"
        aria-expanded={isOpen}
      >
        <span className="flex h-4 w-5 flex-col justify-center gap-1">
          <span className="block h-px w-5 bg-current" />
          <span className="block h-px w-5 bg-current" />
        </span>

        <span className="hidden md:inline">Menu</span>
      </button>

      {isOpen ? (
        <div className="fixed inset-0 z-999" onClick={() => setIsOpen(false)}>
          <div
            className="pointer-events-auto fixed left-4 top-4 w-[min(18rem,calc(100vw-2rem))] rounded-md bg-black/90 backdrop-blur-md p-5 text-white shadow-2xl md:left-6 md:top-6 md:w-88 md:p-6"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-7 flex items-start justify-between gap-6">
              <p className="text-xs font-medium text-white/45">Menu</p>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="flex h-8 w-8 items-center justify-center text-white/70 transition hover:text-white"
                aria-label="Close menu"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>

            <nav className="flex flex-col gap-2">
              {mainNavigation.map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={[
                    "w-fit text-2xl font-semibold leading-none transition hover:text-white md:text-3xl",
                    index === 0 ? "text-white" : "text-white",
                  ].join(" ")}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {resourceLinks.length ? (
              <div className="mt-7 border-t border-white/10 pt-5">
                <p className="mb-3 text-xs font-semibold text-white/35">
                  Resources
                </p>

                <div className="flex flex-col gap-1.5">
                  {resourceLinks.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      target={item.external ? "_blank" : undefined}
                      rel={item.external ? "noreferrer" : undefined}
                      onClick={() => setIsOpen(false)}
                      className="w-fit text-sm font-medium text-white transition hover:text-white/60"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
}

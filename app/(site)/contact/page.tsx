import { client } from "@/sanity/lib/client";
import { SITE_SETTINGS_QUERY } from "@/sanity/lib/queries";

type SiteSettings = {
  siteName?: string;
  siteDescription?: string;
  instagramUrl?: string;
  tiktokUrl?: string;
  email?: string;
  whatsappNumber?: string;
  address?: string;
};

export const metadata = {
  title: "Contact",
  description:
    "Contact Delahouse Indonesia for partnership, career, collaboration, and general inquiries.",
  alternates: {
    canonical: "/contact",
  },
};

export default async function ContactPage() {
  const siteSettings = await client.fetch<SiteSettings | null>(
    SITE_SETTINGS_QUERY,
  );

  const whatsappUrl = siteSettings?.whatsappNumber
    ? `https://wa.me/${siteSettings.whatsappNumber}`
    : null;

  return (
    <main className="min-h-screen bg-[#F7F5F0] text-black dark:bg-[#050505] dark:text-[#F7F5F0]">
      <section className="mx-auto max-w-7xl px-6 py-24 md:px-10">
        <p className="mb-6 text-xs uppercase tracking-[0.4em] text-neutral-500 dark:text-neutral-400">
          Contact
        </p>

        <h1 className="max-w-5xl text-6xl font-semibold tracking-[-0.06em] md:text-8xl">
          Let&apos;s talk about the house.
        </h1>

        <p className="mt-8 max-w-2xl text-lg leading-8 text-neutral-600 dark:text-neutral-400">
          Reach out for general inquiries, brand collaborations, partnerships,
          careers, media, or location-related questions.
        </p>
      </section>

      <section className="mx-auto max-w-7xl border-t border-black/10 px-6 py-20 dark:border-white/10 md:px-10">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="border border-black/10 bg-white p-6 dark:border-white/10 dark:bg-neutral-950">
            <p className="mb-4 text-xs uppercase tracking-[0.3em] text-neutral-500 dark:text-neutral-400">
              Email
            </p>

            {siteSettings?.email ? (
              <a
                href={`mailto:${siteSettings.email}`}
                className="text-lg leading-8 underline underline-offset-4 transition hover:text-[#7A1F1F] dark:hover:text-[#9B2C2C]"
              >
                {siteSettings.email}
              </a>
            ) : (
              <p className="text-neutral-600 dark:text-neutral-400">
                Email has not been added yet.
              </p>
            )}
          </div>

          <div className="border border-black/10 bg-white p-6 dark:border-white/10 dark:bg-neutral-950">
            <p className="mb-4 text-xs uppercase tracking-[0.3em] text-neutral-500 dark:text-neutral-400">
              WhatsApp
            </p>

            {whatsappUrl ? (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="text-lg leading-8 underline underline-offset-4 transition hover:text-[#7A1F1F] dark:hover:text-[#9B2C2C]"
              >
                Open WhatsApp
              </a>
            ) : (
              <p className="text-neutral-600 dark:text-neutral-400">
                WhatsApp number has not been added yet.
              </p>
            )}
          </div>

          <div className="border border-black/10 bg-white p-6 dark:border-white/10 dark:bg-neutral-950">
            <p className="mb-4 text-xs uppercase tracking-[0.3em] text-neutral-500 dark:text-neutral-400">
              Social
            </p>

            <div className="flex flex-col gap-3">
              {siteSettings?.instagramUrl ? (
                <a
                  href={siteSettings.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-lg underline underline-offset-4 transition hover:text-[#7A1F1F] dark:hover:text-[#9B2C2C]"
                >
                  Instagram
                </a>
              ) : null}

              {siteSettings?.tiktokUrl ? (
                <a
                  href={siteSettings.tiktokUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-lg underline underline-offset-4 transition hover:text-[#7A1F1F] dark:hover:text-[#9B2C2C]"
                >
                  TikTok
                </a>
              ) : null}

              {!siteSettings?.instagramUrl && !siteSettings?.tiktokUrl ? (
                <p className="text-neutral-600 dark:text-neutral-400">
                  Social links have not been added yet.
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl border-t border-black/10 px-6 py-20 dark:border-white/10 md:px-10">
        <div className="grid gap-12 md:grid-cols-[0.7fr_1.3fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-neutral-500 dark:text-neutral-400">
              HQ / Office
            </p>
          </div>

          <div>
            {siteSettings?.address ? (
              <p className="max-w-2xl whitespace-pre-line text-lg leading-8 text-neutral-700 dark:text-neutral-300">
                {siteSettings.address}
              </p>
            ) : (
              <p className="max-w-2xl text-lg leading-8 text-neutral-600 dark:text-neutral-400">
                Address has not been added yet.
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl border-t border-black/10 px-6 py-20 dark:border-white/10 md:px-10">
        <div className="grid gap-5 md:grid-cols-3">
          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.3em] text-[#7A1F1F] dark:text-[#9B2C2C]">
              Partnership
            </p>
            <p className="text-sm leading-7 text-neutral-600 dark:text-neutral-400">
              For brand partnerships, pop-ups, collaborations, and campaign
              opportunities.
            </p>
          </div>

          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.3em] text-[#7A1F1F] dark:text-[#9B2C2C]">
              Career
            </p>
            <p className="text-sm leading-7 text-neutral-600 dark:text-neutral-400">
              For career inquiries across Delahouse Indonesia brands and
              outlets.
            </p>
          </div>

          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.3em] text-[#7A1F1F] dark:text-[#9B2C2C]">
              Media
            </p>
            <p className="text-sm leading-7 text-neutral-600 dark:text-neutral-400">
              For press, media, event coverage, and editorial requests.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

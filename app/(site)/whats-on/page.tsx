import { WhatsOnHero } from "@/components/whats-on/WhatsOnHero";
import type { WhatsOnPageHero } from "@/components/whats-on/WhatsOnHero";
import { WhatsOnHorizontalGallery } from "@/components/whats-on/WhatsOnHorizontalGallery";
import type { WhatsOnPageItem } from "@/components/whats-on/WhatsOnHero";
import { client } from "@/sanity/lib/client";
import { WHATS_ON_PAGE_QUERY, WHATS_ON_QUERY } from "@/sanity/lib/queries";

export const metadata = {
  title: "What's On",
  description:
    "Events, promos, drops, and culture notes from Delahouse Indonesia.",
  alternates: {
    canonical: "/whats-on",
  },
};

export default async function WhatsOnPage() {
  const [page, items] = await Promise.all([
    client.fetch<WhatsOnPageHero | null>(WHATS_ON_PAGE_QUERY),
    client.fetch<WhatsOnPageItem[]>(WHATS_ON_QUERY),
  ]);

  return (
    <main className="site-main">
      <WhatsOnHero page={page} />
      <WhatsOnHorizontalGallery items={items} />
    </main>
  );
}

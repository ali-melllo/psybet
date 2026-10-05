import Link from "next/link";
import { LivePacksGrid } from "@/components/sections/live-packs-grid";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { demoPacks } from "@/lib/data/landing-page";

export function FeaturedPacksSection() {
  return (
    <section id="packs" aria-labelledby="packs-title" >
      <div className="container-page">
        <Reveal className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <SectionHeading
          className="gap-2 flex flex-col"
            id="packs-title"
            eyebrow="Featured collections"
            title="Popular NFT Packs"
            description="Each pack contains a unique set of NFTs with different rarities. Collect, trade and be part of the community."
          />
          <Link href="/#packs" className="text-sm font-semibold text-primary hover:underline">
            View All Packs →
          </Link>
        </Reveal>
        <LivePacksGrid fallback={demoPacks} />
      </div>
    </section>
  );
}

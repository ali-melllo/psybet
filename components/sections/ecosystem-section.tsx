import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FeatureItem } from "@/components/ui/feature-item";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { features } from "@/lib/data/landing-page";
import Image from "next/image";

export function EcosystemSection() {
  return (
    <section aria-labelledby="eco-title" className="py-4 my-20">
      <Reveal className="container-page ">
        <div className="relative grid items-center shadow-xl overflow-hidden rounded-3xl border border-border bg-surface md:grid-cols-[1fr_1.1fr]">
          <div aria-hidden="true" className="relative grid min-h-60 place-items-center p-6">
            
            <Image
              width={1000}
              height={1000}
              alt={"Psybet"}
              src={"/images/branding/more-than-nfts.png"}
            />
            
          </div>
          <div className="flex flex-col p-6 md:py-8 md:pl-0 md:pr-10">
            <SectionHeading
              id="eco-title"
              eyebrow="Why Psybet?"
              title="More Than Just NFTs"
              description="We’re building a whole ecosystem around exclusive packs, community, and real utility. Be part of something bigger than just a collection."
            />
            <ul className="my-5 grid gap-4 sm:grid-cols-2">
              {features.map((f) => (
                <FeatureItem key={f.id} feature={f} />
              ))}
            </ul>
            <Button asChild className="text-base mx-auto md:mr-auto md:ml-0 font-semibold mt-5">
              <Link href="/#roadmap">Explore Ecosystem</Link>
            </Button>
          </div>
          {/* <p aria-hidden="true" className="absolute bottom-4 right-6 hidden -rotate-12 text-center font-display text-sm font-bold leading-none text-green lg:block">
            TO THE<br />MOON!
          </p> */}
        </div>
      </Reveal>
    </section>
  );
}

import { Play } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import Image from "next/image";

export function HeroSection() {
  return (
    <section id="games" aria-labelledby="hero-title" className="relative bg-primary overflow-hidden pt-2 md:pt-30 md:py-40">
      <div className="container-page grid items-center gap-6 md:grid-cols-[1.05fr_1fr]">
        <div className="relative z-10 max-w-md">
          <Reveal>
            <p className="mb-4 inline-flex pt-1.5 items-center gap-2 rounded-full border text-black border-background px-3 py-1 text-xs font-semibold uppercase tracking-wide">
              <span className="size-2 rounded-sm bg-background shadow-2xl animate-pulse" aria-hidden="true" />
              The next big NFT collection
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 id="hero-title" className="font-display text-4xl font-extrabold text-white leading-[1.05] sm:text-5xl">
              Let’s make it happen, Try your <span className="text-">luck…</span>
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mb-6 mt-4 max-w-xs text-sm text-muted">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit elementum cursus vitae placerat.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-3xl bg-linear-to-br from-pink-700 to-red-800 hover:scale-105 transition-all duration-200 shadow-xl font-bold">
                <Link href="/#packs">Explore Packs</Link>
              </Button>
              <Button asChild size="lg" className="rounded-full bg-muted">
                {/* Placeholder destination until a trailer exists. */}
                <Link href="/#how-it-works">
                  <Play aria-hidden="true" /> Watch Trailer
                </Link>
              </Button>
            </div>
          </Reveal>
        </div>
        <Reveal delay={0.2} className="relative flex justify-end h-72 md:h-88">
          
          <Image
            width={1000}
            height={1000}
            alt={"Psybet"}
            src={"/images/mascot/mascot.png"}
            className="size-[20em] m-auto md:m-0 md:size-[22em]"
          />
          {/* <p aria-hidden="true" className="absolute left-2 top-0 hidden -rotate-12 text-center text-2xl font-extrabold leading-none text-green sm:block">
            GOOD<br />LUCK!
          </p> */}
        </Reveal>
      </div>
    </section>
  );
}

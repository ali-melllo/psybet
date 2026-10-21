import { Play } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import Image from "next/image";

export function HeroSection() {
  return (
    <section id="games" aria-labelledby="hero-title" className="relative bg-primary overflow-hidden pt-2 md:pt-20 md:py-55">
      <div className="container-page grid items-center gap-6 md:grid-cols-[1.05fr_1fr]">
        <div className="relative z-10 max-w-md">
          <Reveal>
            <p className="mb-4 inline-flex pt-1.5 items-center gap-2 rounded-full border border-white text-white px-3 py-1 text-xs font-semibold uppercase tracking-wide">
              <span className="size-2 rounded-sm bg-white shadow-2xl animate-pulse" aria-hidden="true" />
              Your Digital Lifestyle in one place
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 id="hero-title" className="font-display text-4xl font-extrabold text-white leading-[1.05] sm:text-5xl">
              Buy & Sell Verified Accounts and Gift Cards
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mb-6 mt-4 max-w-xs text-sm font-medium text-muted">
              Buy Your Favorite Account Or Gift Card World Wide using Crypto Currency <Link className=" underline" href={"/"}>Learn more</Link>
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

          {/* <Image
            width={3000}
            height={3000}
            alt={"Psybet"}
            src={"/images/branding/hero.png"}
            className="size-fit m-auto -md:translate-y-10 md:m-0 md:size-fit"
          /> */}

          <div className="grid grid-cols-4 mx-auto gap-x-2 md:gap-3">
            <div className="size-20 md:size-32 p-1 flex justify-center items-center rounded-2xl md:rounded-4xl hover:scale-105 transition-all duration-200 cursor-pointer bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] transform-gpu dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] shadow-2xl z-20">
              <Image
                width={1000}
                height={1000}
                alt={"Psybet"}
                src={"/images/packs/netflix.webp"}
              />
            </div>
            <div className="size-20 md:size-32 p-1 md:-mt-10 flex justify-center items-center rounded-2xl md:rounded-4xl hover:scale-105 transition-all duration-200 cursor-pointer bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] transform-gpu dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] shadow-2xl z-20">
              <Image
                width={1000}
                height={1000}
                alt={"Psybet"}
                src={"/images/packs/youtube-coin.png"}
              />

            </div>
            <div className="size-20 md:size-32 p-2 flex md:translate-y-10 justify-center items-center rounded-2xl md:rounded-4xl hover:scale-105 transition-all duration-200 cursor-pointer bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] transform-gpu dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] shadow-2xl z-20">
              <Image
                width={1000}
                height={1000}
                alt={"Psybet"}
                src={"/images/packs/spotify.webp"}

              />
            </div>
            <div className="size-20 md:size-32 p-2 flex justify-center items-center rounded-2xl md:rounded-4xl hover:scale-105 transition-all duration-200 cursor-pointer bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] transform-gpu dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] shadow-2xl z-20">
              <Image
                width={1000}
                height={1000}
                alt={"Psybet"}
                src={"/images/packs/v-bucks.png"}
              />
            </div>
            <div className="size-20 md:size-32 p-2 flex justify-center items-center rounded-2xl md:rounded-4xl hover:scale-105 transition-all duration-200 cursor-pointer bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] transform-gpu dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] shadow-2xl z-20">
              <Image
                width={1000}
                height={1000}
                alt={"Psybet"}
                src={"/images/packs/gpt.webp"}
              />
            </div>
            <div className="size-20 md:size-32 p-2 md:-mt-10  flex justify-center items-center rounded-2xl md:rounded-4xl hover:scale-105 transition-all duration-200 cursor-pointer bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] transform-gpu dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] shadow-2xl z-20">
              <Image
                width={1000}
                height={1000}
                alt={"Psybet"}
                src={"/images/packs/claude.webp"}
              />
            </div>
            <div className="size-20 md:size-32 p-2 flex md:translate-y-10 justify-center items-center rounded-2xl md:rounded-4xl hover:scale-105 transition-all duration-200 cursor-pointer bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] transform-gpu dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] shadow-2xl z-20">
              <Image
                width={1000}
                height={1000}
                alt={"Psybet"}
                src={"/images/packs/dota-2-logo.gif"}
              />
            </div>
            <div className="size-20 md:size-32 p-4 flex justify-center items-center rounded-2xl md:rounded-4xl hover:scale-105 transition-all duration-200 cursor-pointer bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] transform-gpu dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] shadow-2xl z-20">
              <Image
                width={1000}
                height={1000}
                alt={"Psybet"}
                src={"/images/packs/xsgo.png"}
              />
            </div>
            <div className="size-20 md:size-32 p-1 flex justify-center items-center rounded-2xl md:rounded-4xl hover:scale-105 transition-all duration-200 cursor-pointer bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] transform-gpu dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] shadow-2xl z-20">
              <Image
                width={1000}
                height={1000}
                alt={"Psybet"}
                src={"/images/packs/steam.webp"}
                className="rounded-2xl"
              />
            </div>
            <div className="size-20 md:size-32 md:-mt-10 flex justify-center items-center rounded-2xl md:rounded-4xl hover:scale-105 transition-all duration-200 cursor-pointer bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] transform-gpu dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] shadow-2xl z-20">
              <Image
                width={1000}
                height={1000}
                alt={"Psybet"}
                src={"/images/packs/higgsfield.webp"}
                className="rounded-2xl"
              />
            </div>
            <div className="size-20 md:size-32 p-4 flex md:translate-y-10 justify-center items-center rounded-2xl md:rounded-4xl hover:scale-105 transition-all duration-200 cursor-pointer bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] transform-gpu dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] shadow-2xl z-20">
              <Image
                width={1000}
                height={1000}
                alt={"Psybet"}
                src={"/images/packs/ps5.png"}
                className="rounded-2xl"
              />
            </div>
            <div className="size-20 md:size-32 flex justify-center items-center rounded-2xl md:rounded-4xl hover:scale-105 transition-all duration-200 cursor-pointer bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] transform-gpu dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] shadow-2xl z-20">
              <Image
                width={1000}
                height={1000}
                alt={"Psybet"}
                src={"/images/packs/figma.webp"}
                className="rounded-2xl"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

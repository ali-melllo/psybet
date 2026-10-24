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
          <Reveal className="flex justify-center md:justify-start">
            <p className="mb-4 inline-flex pt-1.5 items-center gap-2 rounded-full border border-white text-white px-3 py-1 text-xs font-semibold uppercase tracking-wide">
              <span className="size-2 rounded-sm bg-white shadow-2xl animate-pulse" aria-hidden="true" />
              Your Digital Lifestyle in one place
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 id="hero-title" className="font-display text-3xl md:text-4xl text-center md:text-left font-extrabold text-white leading-[1.05] sm:text-5xl">
              Buy & Sell Verified Accounts and Gift Cards
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mb-6 mt-4 md:max-w-xs text-sm font-medium text-center md:text-left text-muted">
              Buy Your Favorite Account Or Gift Card World Wide using Crypto Currency <Link className=" underline" href={"/"}>Learn more</Link>
            </p>
            <div className="flex justify-center md:justify-start flex-wrap gap-3">
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

          <div className="grid grid-cols-4 mx-auto md:gap-3">
          <div
              className="relative size-20 md:size-32 md:-translate-y-10 translate-x-3 md:translate-x-6 z-20 cursor-pointer hover:scale-105 "
            >
              <div
                className="w-full h-full flex justify-center items-center bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] transform-gpu dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] shadow-2xl"
                style={{
                  clipPath:
                    "polygon(50% 0%, 93.3% 25%, 93.3% 75%, 50% 100%, 6.7% 75%, 6.7% 25%)",
                }}
              >
                <Image
                  width={1000}
                  height={1000}
                  alt={"adesanya"}
                  src={"/images/packs/netflix.webp"}
                  className="w-[70%] h-[70%] object-contain"
                />
              </div>
            </div>
            <div
              className="relative size-20 md:size-32 translate-x-1 md:-mt-10 z-20 cursor-pointer hover:scale-105 "
            >
              <div
                className="w-full h-full flex justify-center items-center bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] transform-gpu dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] shadow-2xl"
                style={{
                  clipPath:
                    "polygon(50% 0%, 93.3% 25%, 93.3% 75%, 50% 100%, 6.7% 75%, 6.7% 25%)",
                }}
              >
                <Image
                  width={1000}
                  height={1000}
                  alt={"adesanya"}
                  src={"/images/packs/youtube-coin.png"}
                  className="w-[70%] h-[70%] object-contain"
                />
              </div>
            </div>
            <div
              className="relative size-20 md:size-32 -translate-x-1 md:translate-x-0  md:-mt-10 md:-ml-6 z-20 cursor-pointer hover:scale-105 "
            >
              <div
                className="w-full h-full flex justify-center items-center bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] transform-gpu dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] shadow-2xl"
                style={{
                  clipPath:
                    "polygon(50% 0%, 93.3% 25%, 93.3% 75%, 50% 100%, 6.7% 75%, 6.7% 25%)",
                }}
              >
                <Image
                  width={1000}
                  height={1000}
                  alt={"adesanya"}
                  src={"/images/packs/spotify.webp"}
                  className="w-[70%] h-[70%] object-contain"
                />
              </div>
            </div>
            <div
              className="relative size-20 md:size-32 -translate-x-3 md:translate-y-15 md:-translate-x-26.5 z-20 cursor-pointer hover:scale-105 "
            >
              <div
                className="w-full h-full flex justify-center items-center bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] transform-gpu dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] shadow-2xl"
                style={{
                  clipPath:
                    "polygon(50% 0%, 93.3% 25%, 93.3% 75%, 50% 100%, 6.7% 75%, 6.7% 25%)",
                }}
              >
                <Image
                  width={1000}
                  height={1000}
                  alt={"adesanya"}
                  src={"/images/packs/v-bucks.png"}
                  className="w-[70%] h-[70%] object-contain"
                />
              </div>
            </div>
            <div
              className="relative size-20 md:size-32 -translate-y-8.5 md:-translate-y-20 translate-x-12 md:translate-x-20.5 z-20 cursor-pointer hover:scale-105 "
            >
              <div
                className="w-full h-full flex justify-center items-center bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] transform-gpu dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] shadow-2xl"
                style={{
                  clipPath:
                    "polygon(50% 0%, 93.3% 25%, 93.3% 75%, 50% 100%, 6.7% 75%, 6.7% 25%)",
                }}
              >
                <Image
                  width={1000}
                  height={1000}
                  alt={"adesanya"}
                  src={"/images/packs/gpt.webp"}
                  className="w-[70%] h-[70%] object-contain"
                />
              </div>
            </div>
            <div
              className="relative size-20 md:size-32 -translate-y-8.5 md:-translate-y-20 translate-x-10 md:translate-x-14.5 z-20 cursor-pointer hover:scale-105 "
            >
              <div
                className="w-full h-full flex justify-center items-center bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] transform-gpu dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] shadow-2xl"
                style={{
                  clipPath:
                    "polygon(50% 0%, 93.3% 25%, 93.3% 75%, 50% 100%, 6.7% 75%, 6.7% 25%)",
                }}
              >
                <Image
                  width={1000}
                  height={1000}
                  alt={"adesanya"}
                  src={"/images/packs/claude.webp"}
                  className="w-[70%] h-[70%] object-contain"
                />
              </div>
            </div>
            <div
              className="relative size-20 md:size-32 -translate-y-8.5 md:translate-y-5 translate-x-8 md:-translate-x-6 z-20 cursor-pointer hover:scale-105 "
            >
              <div
                className="w-full h-full flex justify-center items-center bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] transform-gpu dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] shadow-2xl"
                style={{
                  clipPath:
                    "polygon(50% 0%, 93.3% 25%, 93.3% 75%, 50% 100%, 6.7% 75%, 6.7% 25%)",
                }}
              >
                <Image
                  width={1000}
                  height={1000}
                  alt={"adesanya"}
                  src={"/images/packs/dota-2-logo.gif"}
                  className="w-[70%] h-[70%] object-contain"
                />
              </div>
            </div>
            <div
              className="relative size-20 md:size-32 -translate-x-3 translate-y-7 md:translate-y-5 md:-translate-x-12 z-20 cursor-pointer hover:scale-105 "
            >
              <div
                className="w-full h-full flex justify-center items-center bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] transform-gpu dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] shadow-2xl"
                style={{
                  clipPath:
                    "polygon(50% 0%, 93.3% 25%, 93.3% 75%, 50% 100%, 6.7% 75%, 6.7% 25%)",
                }}
              >
                <Image
                  width={1000}
                  height={1000}
                  alt={"adesanya"}
                  src={"/images/packs/xsgo.png"}
                  className="w-[60%] h-[60%] object-contain"
                />
              </div>
            </div>
            <div
              className="relative size-20 md:size-32 -translate-y-17 translate-x-3 md:-translate-y-30 md:translate-x-6 z-20 cursor-pointer hover:scale-105 "
            >
              <div
                className="w-full h-full flex justify-center items-center bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] transform-gpu dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] shadow-2xl"
                style={{
                  clipPath:
                    "polygon(50% 0%, 93.3% 25%, 93.3% 75%, 50% 100%, 6.7% 75%, 6.7% 25%)",
                }}
              >
                <Image
                  width={1000}
                  height={1000}
                  alt={"adesanya"}
                  src={"/images/packs/steam.webp"}
                  className="w-[70%] h-[70%] object-contain"
                />
              </div>
            </div>
            <div
              className="relative size-20 md:size-32 translate-x-1 -translate-y-17 md:-translate-y-30 z-20 cursor-pointer hover:scale-105 "
            >
              <div
                className="w-full h-full flex justify-center items-center bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] transform-gpu dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] shadow-2xl"
                style={{
                  clipPath:
                    "polygon(50% 0%, 93.3% 25%, 93.3% 75%, 50% 100%, 6.7% 75%, 6.7% 25%)",
                }}
              >
                <Image
                  width={1000}
                  height={1000}
                  alt={"adesanya"}
                  src={"/images/packs/higgsfield.webp"}
                  className="w-[90%] h-[90%] object-contain"
                />
              </div>
            </div>
            <div
              className="relative size-20 md:size-32 -translate-x-1 -translate-y-17 md:-translate-y-5 md:translate-x-8.5 z-20 cursor-pointer hover:scale-105 "
            >
              <div
                className="w-full h-full flex justify-center items-center bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] transform-gpu dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] shadow-2xl"
                style={{
                  clipPath:
                    "polygon(50% 0%, 93.3% 25%, 93.3% 75%, 50% 100%, 6.7% 75%, 6.7% 25%)",
                }}
              >
                <Image
                  width={1000}
                  height={1000}
                  alt={"adesanya"}
                  src={"/images/packs/ps5.png"}
                  className="w-[60%] h-[60%] object-contain"
                />
              </div>
            </div>
            <div
              className="relative hidden md:block size-20 md:size-32 md:-translate-y-55 md:translate-x-2.5 z-20 cursor-pointer hover:scale-105 "
            >
              <div
                className="w-full h-full flex justify-center items-center bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] transform-gpu dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] shadow-2xl"
                style={{
                  clipPath:
                    "polygon(50% 0%, 93.3% 25%, 93.3% 75%, 50% 100%, 6.7% 75%, 6.7% 25%)",
                }}
              >
                <Image
                  width={1000}
                  height={1000}
                  alt={"adesanya"}
                  src={"/images/packs/figma.webp"}
                  className="w-[70%] h-[70%] object-contain"
                />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

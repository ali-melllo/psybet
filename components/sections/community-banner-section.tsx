import { Reveal } from "@/components/ui/reveal";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";

export function CommunityBannerSection() {
  return (
    <section aria-labelledby="community-title" className="py-4 bg-blue my-10">
      <Reveal className=" flex flex-col md:flex-row container-page" delay={0.25}>
                
                <div className='w-full md:w-6/12 flex flex-col justify-center '>
                    <div className="relative z-10 max-w-md">
                        <Reveal delay={0.08}>
                            <h1 id="hero-title" className="font-display text-center md:text-left text-4xl font-extrabold text-white leading-[1.05] sm:text-5xl">
                                Buy & Sell Verified Accounts and Gift Cards
                            </h1>
                        </Reveal>
                        <Reveal delay={0.16}>
                            <p className="mb-6 mt-4 md:max-w-xs text-sm text-center md:text-left  font-medium text-muted">
                                Buy Your Favorite Account Or Gift Card World Wide using Crypto Currency <Link className=" underline" href={"/"}>Learn more</Link>
                            </p>
                            <div className="flex flex-wrap gap-3">
                                <Button asChild size="lg" className="rounded-3xl mx-auto md:ml-0 bg-linear-to-br from-pink-700 to-red-800 hover:scale-105 transition-all duration-200 shadow-xl font-bold">
                                    <Link href="/#packs">Explore Game Packs</Link>
                                </Button>
                            </div>
                        </Reveal>
                    </div>
                </div>

                <div className='w-full md:w-6/12'>
                    <Image
                        width={3000}
                        height={3000}
                        alt={"Psybet"}
                        src={"/images/branding/banner-2.webp"}
                        className="w-full h-70 md:h-110 object-cover md:-mr-24"
                    />
                </div>
                
            </Reveal>
    </section>
  );
}

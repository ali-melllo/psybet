import React from 'react'
import { Reveal } from '../ui/reveal'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '../ui/button'

export default function PlayDeckSection() {
    return (
        <section aria-label="Play Deck" className="relative flex justify-between items-center bg-primary dark:shadow-2xl z-10 py-5 my-28">
            {/* <div className='absolute w-full h-32 bg-linear-to-b from-background to-transparent top-0 z-20'/>
            <div className='absolute w-full h-32 bg-linear-to-t from-background to-transparent bottom-0 z-20'/> */}

            <Reveal className=" flex flex-col-reverse md:flex-row  container-page" delay={0.25}>
                <div className='w-full md:w-6/12'>
                    <Image
                        width={3000}
                        height={3000}
                        alt={"Psybet"}
                        src={"/images/branding/banner.png"}
                        className="w-full h-60 md:h-110 md:-ml-20"
                    />
                </div>


                <div className='w-full md:w-6/12 flex flex-col justify-center items-center'>
                    <div className="relative z-10 max-w-md">
                        <Reveal delay={0.08}>
                            <h1 id="hero-title" className="font-display text-center md:text-left text-4xl font-extrabold text-white leading-[1.05] sm:text-5xl">
                                Buy & Sell Verified Accounts and Gift Cards
                            </h1>
                        </Reveal>
                        <Reveal delay={0.16}>
                            <p className="mb-6 mt-4 md:max-w-xs text-sm text-center md:text-left font-medium text-muted">
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
            </Reveal>
        </section>
    )
}

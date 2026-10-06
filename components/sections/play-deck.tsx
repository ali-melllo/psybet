import React from 'react'
import { Reveal } from '../ui/reveal'
import Image from 'next/image'

export default function PlayDeckSection() {
    return (
        <section aria-label="Play Deck" className="relative shadow-2xl z-10 my-28">
            <div className='absolute w-full h-48 bg-linear-to-b from-background to-transparent top-0 z-20'></div>
            <div className='absolute w-full h-48 bg-linear-to-t from-background to-transparent bottom-0 z-20'></div>

            <Reveal className=" mt-5" delay={0.25}>
                <Image
                    width={3000}
                    height={3000}
                    alt={"Psybet"}
                    src={"/images/branding/psydeck.jpg"}
                    className="w-full h-80 md:h-auto object-cover"
                />
            </Reveal>
        </section>
    )
}

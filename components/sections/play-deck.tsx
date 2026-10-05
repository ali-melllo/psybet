import React from 'react'
import { Reveal } from '../ui/reveal'
import Image from 'next/image'

export default function PlayDeckSection() {
    return (
        <section aria-label="Play Deck" className="relative shadow-2xl z-10 my-28">
            <Reveal className="container- mt-5" delay={0.25}>
                <Image
                    width={3000}
                    height={3000}
                    alt={"Psybet"}
                    src={"/images/branding/psydeck.jpg"}
                    className="w-full object-cover"
                />
            </Reveal>
        </section>
    )
}

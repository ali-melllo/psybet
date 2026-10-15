import React from 'react'
import { Reveal } from '../ui/reveal'
import Image from 'next/image'

export default function PsyPackSection() {
    return (
        <section aria-label="Psy Pack" className="relative shadow-2xl z-10 my-28">
            <Reveal className="mt-5" delay={0.25}>
                <Image
                    width={3000}
                    height={3000}
                    alt={"PsyPack"}
                    src={"/images/branding/psy-pack.png"}
                    className="w-full h-54 md:h-auto opacity-90 "
                />
            </Reveal>
        </section>
    )
}

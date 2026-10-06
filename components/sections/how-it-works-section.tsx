import { Fragment } from "react";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { steps } from "@/lib/data/landing-page";
import { cn } from "@/lib/utils";
import Image from "next/image";

export function HowItWorksSection() {
  return (
    <section id="how-it-works" aria-labelledby="steps-title" className="py-10 my-20">
      <div className="container-page">
        <Reveal>
          <SectionHeading id="steps-title" className="flex flex-col gap-2" eyebrow="How it works" title="Get Your Pack in 3 Simple Steps" />
        </Reveal>
        <RevealGroup className="mt-6">
          <ol className="grid gap-6 md:flex md:justify-between">
            {steps.map((s) => {
              return (
                <Fragment key={s.id}>
                  <li>
                    <RevealItem className="flex items-center gap-4">
                      <span className={cn("relative grid size-42 shrink-0 place-items-center ")}>
                        <Image
                          width={500}
                          height={500}
                          alt={"Psybet"}
                          src={s.image}
                          className="w-full object-cover shadow-2xl"
                        />
                        
                      </span>
                      <div className="pt-1">
                        <h3 className="font-display text-base font-bold">{s.title}</h3>
                        <p className="mt-1 max-w-48 text-xs text-muted-foreground">{s.description}</p>
                      </div>
                    </RevealItem>
                  </li>
                 
                </Fragment>
              );
            })}
          </ol>
        </RevealGroup>
      </div>
    </section>
  );
}

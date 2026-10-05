import { ArrowRight } from "lucide-react";
import { Fragment } from "react";
import { iconMap } from "@/components/ui/icon-map";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { steps } from "@/lib/data/landing-page";
import { toneStyles } from "@/lib/tone";
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
          <ol className="grid gap-6 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-start">
            {steps.map((s, i) => {
              const Icon = iconMap[s.icon];
              const tone = toneStyles[s.tone];
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
                          className="w-full object-cover"
                        />
                        
                      </span>
                      <div className="pt-1">
                        <h3 className="font-display text-base font-bold">{s.title}</h3>
                        <p className="mt-1 max-w-48 text-xs text-muted-foreground">{s.description}</p>
                      </div>
                    </RevealItem>
                  </li>
                  {i < steps.length - 1 ? (
                    <li aria-hidden="true" className="hidden self-center text-blue md:block">
                      <ArrowRight />
                    </li>
                  ) : null}
                </Fragment>
              );
            })}
          </ol>
        </RevealGroup>
      </div>
    </section>
  );
}

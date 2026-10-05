import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { RoadmapItem } from "@/components/ui/roadmap-item";
import { SectionHeading } from "@/components/ui/section-heading";
import { milestones } from "@/lib/data/landing-page";

export function RoadmapSection() {
  return (
    <section id="roadmap" aria-labelledby="roadmap-title" className="py-10">
      <div className="container-page grid items-center  gap-6 lg:grid-cols-[14rem_1fr]">
        <Reveal>
          <SectionHeading
            className="flex flex-col gap-3"
            id="roadmap-title"
            eyebrow="Our journey"
            title="The Roadmap"
            description="From our first pack to a full ecosystem. Here’s what’s next."
          />
          <Button asChild className="mt-4">
            <Link href="/#roadmap">View Full Roadmap</Link>
          </Button>
        </Reveal>
        <RevealGroup>
          <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {milestones.map((m, i) => (
              <li key={m.id}>
                <RevealItem className="h-full">
                  <RoadmapItem milestone={m} isLast={i === milestones.length - 1} />
                </RevealItem>
              </li>
            ))}
          </ol>
        </RevealGroup>
      </div>
    </section>
  );
}

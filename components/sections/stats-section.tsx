import { LiveStats } from "@/components/sections/live-stats";
import { Reveal } from "@/components/ui/reveal";
import { demoStats } from "@/lib/data/landing-page";

export function StatsSection() {
  return (
    <section aria-label="Marketplace statistics" className="relative z-10 -translate-y-20 mb-10">
      <Reveal className="container-page mt-5" delay={0.25}>
        <LiveStats fallback={demoStats} />
      </Reveal>
    </section>
  );
}

import { CommunityBannerSection } from "@/components/sections/community-banner-section";
import { EcosystemSection } from "@/components/sections/ecosystem-section";
import { FaqSection } from "@/components/sections/faq-section";
import { FeaturedPacksSection } from "@/components/sections/featured-packs-section";
import { HeroSection } from "@/components/sections/hero-section";
import { HowItWorksSection } from "@/components/sections/how-it-works-section";
import PlayDeckSection from "@/components/sections/play-deck";
import PsyPackSection from "@/components/sections/psy-pack";
import { RoadmapSection } from "@/components/sections/roadmap-section";
import { StatsSection } from "@/components/sections/stats-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";

export default function HomePage() {
  return (
    <main id="main">
      <HeroSection />
      <StatsSection />
      <FeaturedPacksSection />
      <PlayDeckSection />
      <EcosystemSection />
      <HowItWorksSection />
      <CommunityBannerSection />
      <RoadmapSection />
      <TestimonialsSection />
      <PsyPackSection/>
      <FaqSection />
    </main>
  );
}

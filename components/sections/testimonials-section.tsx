import { Mascot } from "@/components/ui/mascot";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { TestimonialCard } from "@/components/ui/testimonial-card";
import { testimonials } from "@/lib/data/landing-page";
import Image from "next/image";

export function TestimonialsSection() {
  return (
    <section aria-labelledby="testimonials-title" className="py-10">
      <div className="container-page grid items-center gap-8 lg:grid-cols-[16rem_1fr]">
        <Reveal className="hidden justify-center lg:flex">
        <Image
            width={1000}
            height={1000}
            alt={"Psybet"}
            src={"/images/mascot/mascot.png"}
            className=""
          />
        </Reveal>
        <div>
          <Reveal>
            <SectionHeading
              id="testimonials-title"
              eyebrow="Community"
              title="What Our Holders Say"
              description="Demonstration quotes from fictional holders. Replace with verified testimonials before launch."
            />
          </Reveal>
          <RevealGroup className="mt-5 grid gap-3 md:grid-cols-3">
            {testimonials.map((t) => (
              <RevealItem key={t.id}>
                <TestimonialCard item={t} />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}

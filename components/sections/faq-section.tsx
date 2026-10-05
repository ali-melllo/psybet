import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { faqs } from "@/lib/data/landing-page";

export function FaqSection() {
  const half = Math.ceil(faqs.length / 2);
  const columns = [faqs.slice(0, half), faqs.slice(half)];
  return (
    <section id="faq" aria-labelledby="faq-title" className="py-10">
      <Reveal className="container-page grid gap-6 border-t border-border pt-8 lg:grid-cols-[18rem_1fr]">
        <div >
          <SectionHeading
            id="faq-title"
            eyebrow="FAQ"
            title="Frequently Asked Questions"
            description="Got questions? We’ve got answers. Here are the most common ones."
          />
          {/* <Button asChild size="sm" className="mt-4">
            <Link href="/#faq">View All FAQ</Link>
          </Button> */}
        </div>
        <div className="grid items-start gap-3 md:grid-cols-2">
          {columns.map((col, i) => (
            <Accordion key={i} type="single" collapsible className="space-y-2">
              {col.map((f) => (
                <AccordionItem key={f.id} value={f.id}>
                  <AccordionTrigger>{f.question}</AccordionTrigger>
                  <AccordionContent>{f.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

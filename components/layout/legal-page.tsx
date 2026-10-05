import { Reveal } from "@/components/ui/reveal";

interface LegalPageProps {
  title: string;
  sections: { heading: string; body: string }[];
}

export function LegalPage({ title, sections }: LegalPageProps) {
  return (
    <main id="main" className="container-page max-w-3xl py-12">
      <Reveal>
        <h1 className="font-display text-4xl font-bold">{title}</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Template text for demonstration. Have it reviewed by a qualified professional before launch.
        </p>
      </Reveal>
      <div className="mt-8 space-y-6">
        {sections.map((s) => (
          <Reveal key={s.heading}>
            <h2 className="font-display text-xl font-bold">{s.heading}</h2>
            <p className="mt-1 text-muted-foreground">{s.body}</p>
          </Reveal>
        ))}
      </div>
    </main>
  );
}

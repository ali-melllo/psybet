import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
  className?: string;
}

export function SectionHeading({ id, eyebrow, title, description, className }: SectionHeadingProps) {
  return (
    <div className={className}>
      <p className="text-xs font-semibold uppercase tracking-wide text-primary">{eyebrow}</p>
      <h2 id={id} className={cn("font-display text-2xl font-bold leading-tight sm:text-4xl")}>
        {title}
      </h2>
      {description ? <p className="mt-2 max-w-md text-sm text-muted-foreground">{description}</p> : null}
    </div>
  );
}

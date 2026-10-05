import { Star } from "lucide-react";
import { toneStyles } from "@/lib/tone";
import { cn } from "@/lib/utils";
import type { Testimonial } from "@/types/marketplace";

export function TestimonialCard({ item }: { item: Testimonial }) {
  const tone = toneStyles[item.tone];
  return (
    <figure className="flex h-full flex-col rounded-lg border border-border bg-surface p-3">
      <div className="mb-3 flex items-center gap-3">
        <span
          aria-hidden="true"
          className={cn("grid size-10 place-items-center rounded-full font-display font-bold", tone.solid, tone.onSolid)}
        >
          {item.name.charAt(0)}
        </span>
        <figcaption>
          <p className="text-sm font-semibold">{item.name}</p>
          <p className="text-xs text-muted-foreground">{item.handle}</p>
        </figcaption>
      </div>
      <blockquote className="text-sm text-muted-foreground">“{item.quote}”</blockquote>
      <div className="mt-3 flex gap-0.5" role="img" aria-label={`${item.rating} out of 5 stars`}>
        {Array.from({ length: 5 }, (_, i) => (
          <Star
            key={i}
            className={cn("size-3.5", i < item.rating ? "fill-green/80 text-green/50" : "text-border")}
            aria-hidden="true"
          />
        ))}
      </div>
    </figure>
  );
}

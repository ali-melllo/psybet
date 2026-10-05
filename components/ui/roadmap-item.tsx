import { ChevronRight } from "lucide-react";
import type { RoadmapMilestone } from "@/types/marketplace";
import Image from "next/image";


export function RoadmapItem({ milestone, isLast }: { milestone: RoadmapMilestone; isLast: boolean }) {

  return (
    <article className="relative flex h-full flex-col items-center rounded-lg p-4 text-center">
      <span>
        <Image
          width={1000}
          height={1000}
          alt={"Psybet"}
          src={milestone.image}
          className="size-64 object-cover"
        />
      </span>
      <h3 className="font-display text-sm font-bold">{milestone.title}</h3>
      <p className="mb-3 mt-1 text-xs text-muted-foreground">{milestone.description}</p>
      
      {!isLast ? (
        <ChevronRight
          className="absolute -right-4.5 top-1/2 hidden size-4 -translate-y-1/2 text-muted-foreground lg:block"
          aria-hidden="true"
        />
      ) : null}
    </article>
  );
}

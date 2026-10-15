import type { RoadmapMilestone } from "@/types/marketplace";
import Image from "next/image";


export function RoadmapItem({ milestone }: { milestone: RoadmapMilestone; isLast: boolean }) {

  return (
    <article className="relative flex h-full flex-col items-center rounded-lg p-4 text-center">
      <span>
        <Image
          width={1000}
          height={1000}
          alt={"Psybet"}
          src={milestone.image}
          className="object-cover rounded-4xl h-32 md:size-52"
        />
      </span>
      <h3 className="font-display text-sm mt-3 font-bold">{milestone.title}</h3>
      <p className="mb-3 mt-1 text-xs text-muted-foreground">{milestone.description}</p>
      
    
    </article>
  );
}

import { cn } from "@/lib/utils";
import type { MarketplaceStat } from "@/types/marketplace";
import Image from "next/image";

export function StatItem({ stat }: { stat: MarketplaceStat }) {
  
  return (
    <div className="flex items-center justify-center gap-3 px-3">
      <span className={cn("grid size-16 md:size-20 shrink-0 place-items-center rounded-lg")}>
        <Image
          width={200}
          height={100}
          alt={"Psybet"}
          src={stat.image}
        />
      </span>
      <div>
        <p className="font-display md:text-2xl font-bold leading-none">{stat.value}</p>
        <p className="mt-1 text-xs md:text-base text-muted-foreground">{stat.label}</p>
      </div>
    </div>
  );
}

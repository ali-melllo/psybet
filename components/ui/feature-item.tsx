import type { Feature } from "@/types/marketplace";
import Image from "next/image";

export function FeatureItem({ feature }: { feature: Feature }) {
  return (
    <li className="flex items-center gap-3">
      <span className="grid size-10 shrink-0 place-items-center rounded-lg  text-primary">
        <Image
          width={300}
          height={300}
          alt={"Psybet"}
          src={feature.image}
          className=""
        />
      </span>
      <div>
        <p className="font-semibold">{feature.title}</p>
        <p className="text-sm text-muted-foreground">{feature.description}</p>
      </div>
    </li>
  );
}

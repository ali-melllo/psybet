"use client";

import { StatItem } from "@/components/ui/stat-item";
import { isApiConfigured } from "@/lib/env";
import { useGetStatsQuery } from "@/lib/features/marketplace/marketplace-api";
import type { MarketplaceStat } from "@/types/marketplace";

/** Renders bundled demo stats immediately; swaps in API data only when an API is configured. */
export function LiveStats({ fallback }: { fallback: MarketplaceStat[] }) {
  const { data } = useGetStatsQuery(undefined, { skip: !isApiConfigured });
  const stats = data ?? fallback;
  return (
    <>
      <ul className="grid grid-cols-2 gap-y-5 rounded-xl border border-border bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] transform-gpu dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] shadow-xl py-4 lg:grid-cols-4 lg:divide-x lg:divide-border lg:gap-y-0">
        {stats.map((s) => (
          <li key={s.id}>
            <StatItem stat={s} />
          </li>
        ))}
      </ul>
      
    </>
  );
}

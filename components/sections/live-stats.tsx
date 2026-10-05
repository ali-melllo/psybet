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
      <ul className="grid grid-cols-2 gap-y-5 rounded-2xl border border-border bg-surface py-4 lg:grid-cols-4 lg:divide-x lg:divide-border lg:gap-y-0">
        {stats.map((s) => (
          <li key={s.id}>
            <StatItem stat={s} />
          </li>
        ))}
      </ul>
      
    </>
  );
}

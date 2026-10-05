"use client";

import { NftPackCard } from "@/components/ui/nft-pack-card";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { isApiConfigured } from "@/lib/env";
import { useGetPacksQuery } from "@/lib/features/marketplace/marketplace-api";
import type { NftPack } from "@/types/marketplace";

export function LivePacksGrid({ fallback }: { fallback: NftPack[] }) {
  const { data, isError } = useGetPacksQuery(undefined, { skip: !isApiConfigured });
  const packs = data && data.length > 0 ? data : fallback;
  return (
    <>
      {isError ? (
        <p role="status" className="mb-3 text-xs text-muted-foreground">
          Live pack data is unavailable. Showing demo packs.
        </p>
      ) : null}
      <RevealGroup className="grid gap-5 grid-cols-2 lg:grid-cols-4">
        {packs.map((p) => (
          <RevealItem key={p.id}>
            <NftPackCard pack={p} />
          </RevealItem>
        ))}
      </RevealGroup>
    </>
  );
}

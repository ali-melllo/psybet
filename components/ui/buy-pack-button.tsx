"use client";

import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/lib/hooks";
import { noticeShown } from "@/lib/features/marketplace/marketplace-slice";
import { requestPackPurchase } from "@/lib/web3/purchase";
import type { NftPack } from "@/types/marketplace";
import { Product } from "@/lib/data/products";

export function BuyPackButton({ pack }: { pack: Product }) {
  const dispatch = useAppDispatch();
  const handleClick = async () => {
    const result = await requestPackPurchase(pack);
    dispatch(noticeShown(result.message));
  };
  return (
    <Button className="h-8 rounded-lg shadow px-2 ml-auto" aria-label={`Buy ${pack.name}`} onClick={() => void handleClick()}>
      Buy Pack
    </Button>
  );
}

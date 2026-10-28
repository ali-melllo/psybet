import type { Product } from "../data/products";

export interface PurchaseResult { status: "unavailable"; message: string }

/**
 * Integration point for wallet connection and pack purchase.
 * Replace the body with a real Solana wallet flow; callers only depend on PurchaseResult.
 */
export async function requestPackPurchase(pack: Product): Promise<PurchaseResult> {
  return {
    status: "unavailable",
    message: `${pack.name}: purchasing isn't live yet. Wallet integration will connect here.`,
  };
}

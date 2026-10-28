import type { ServerOrder } from "@/lib/payments/server/store";

/**
 * Called exactly once when an order becomes `paid`.
 * Integration point: reserve/deliver the digital goods and email the buyer.
 * Must be idempotent (safe if your process crashes and retries).
 */
export async function onOrderPaid(order: ServerOrder): Promise<void> {
  console.warn(`[fulfillment] order ${order.id} paid – delivery is not implemented yet`);
}

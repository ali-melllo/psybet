import type { Order } from "@/lib/payments/types";

/** Internal order: the public Order plus the full email. */
export type ServerOrder = Omit<Order, "emailMasked"> & { email: string };

export interface OrderStore {
  get(id: string): Promise<ServerOrder | undefined>;
  save(order: ServerOrder): Promise<void>;
  /** Atomically reserve a tx hash for one order. Returns false if another order already owns it. */
  claimTxHash(hash: string, orderId: string): Promise<boolean>;
}

type Globals = typeof globalThis & { __adesnyaOrders?: Map<string, ServerOrder>; __adesnyaHashes?: Map<string, string> };
const g = globalThis as Globals;
const orders = (g.__adesnyaOrders ??= new Map());
const hashes = (g.__adesnyaHashes ??= new Map());

/**
 * DEMO STORE – process memory only. It is lost on restart and NOT shared between serverless instances.
 * Replace with Postgres/Redis (keep the same interface) before taking real payments.
 */
export const orderStore: OrderStore = {
  async get(id) { return orders.get(id); },
  async save(order) { orders.set(order.id, order); },
  async claimTxHash(hash, orderId) {
    const owner = hashes.get(hash);
    if (owner && owner !== orderId) return false;
    hashes.set(hash, orderId);
    return true;
  },
};

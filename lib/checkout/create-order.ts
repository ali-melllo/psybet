import { readErrorMessage } from "@/lib/payments/types";

export interface OrderDraft {
  productId: string;
  quantity: number;
  email: string;
  walletAddress: string;
  chainId: number;
}

export type CreateOrderResult =
  | { status: "created"; orderId: string }
  | { status: "error"; message: string };

/**
 * Creates a server-side order. The server re-prices it from its own catalog and validates everything;
 * nothing the browser sends (price, totals) is trusted. The payment itself happens on /orders/[id].
 */
export async function createOrder(draft: OrderDraft): Promise<CreateOrderResult> {
  try {
    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(draft),
    });
    const json: unknown = await res.json().catch(() => null);
    if (!res.ok) return { status: "error", message: readErrorMessage(json) ?? "Couldn’t create your order. Please try again." };
    const id = (json as { order?: { id?: unknown } } | null)?.order?.id;
    if (typeof id !== "string") return { status: "error", message: "Unexpected response from the server." };
    return { status: "created", orderId: id };
  } catch {
    return { status: "error", message: "Network error. Check your connection and try again." };
  }
}
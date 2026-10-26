export interface OrderDraft {
  productId: string;
  quantity: number;
  email: string;
  walletAddress: string;
  chainId: number;
}

export interface CreateOrderResult { status: "unavailable"; message: string }

/**
 * Integration point for the payment step.
 * Production: POST the draft to your server, which must (1) re-price the order from its own catalog,
 * (2) verify wallet ownership with a signed message (e.g. SIWE), then (3) return a payment session.
 * Never trust the client-side price or the connected address on its own.
 */
export async function createOrder(_draft: OrderDraft): Promise<CreateOrderResult> {
  return { status: "unavailable", message: "Payment isn’t connected yet. Your order details are ready for the payment step." };
}

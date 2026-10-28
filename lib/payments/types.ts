/** Types shared by the browser and the API routes. */
export type PaymentCurrency = "ETH" | "USDC";
export type OrderStatus = "created" | "quoted" | "pending" | "paid" | "failed" | "expired";

/** A transaction ready to be signed by the wallet. Built by the server, never by the client. */
export interface TxRequest { to: string; value: string; data: string }

export interface PaymentQuote {
  currency: PaymentCurrency;
  /** Exact amount in base units (wei / token units) as a decimal string. */
  amount: string;
  amountDisplay: string;
  decimals: number;
  /** ERC-20 contract, when paying in a token. */
  tokenAddress?: string;
  /** USD price of 1 ETH used for this quote (ETH only). */
  rateUsd?: string;
  chainId: number;
  recipient: string;
  tx: TxRequest;
  expiresAt: number;
}

export interface PaymentProgress {
  txHash: string;
  confirmations: number;
  required: number;
  submittedAt: number;
}

export interface Order {
  id: string;
  status: OrderStatus;
  productId: string;
  productName: string;
  quantity: number;
  totalUsdCents: number;
  emailMasked: string;
  walletAddress: string;
  chainId: number;
  currencies: PaymentCurrency[];
  quote?: PaymentQuote;
  payment?: PaymentProgress;
  failureReason?: string;
  createdAt: number;
  expiresAt: number;
}

export interface CreateOrderBody {
  productId: string;
  quantity: number;
  email: string;
  walletAddress: string;
  chainId: number;
}

export interface ApiErrorBody { error: { code: string; message: string } }

/** Reads `{ error: { message } }` from an unknown JSON body. */
export function readErrorMessage(body: unknown): string | null {
  if (typeof body !== "object" || body === null || !("error" in body)) return null;
  const err = (body as { error: unknown }).error;
  if (typeof err !== "object" || err === null || !("message" in err)) return null;
  const msg = (err as { message: unknown }).message;
  return typeof msg === "string" ? msg : null;
}

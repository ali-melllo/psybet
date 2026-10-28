export type PaymentErrorCode =
  | "invalid_request" | "not_found" | "not_configured" | "unavailable"
  | "conflict" | "expired" | "wrong_network" | "out_of_stock";

export class PaymentError extends Error {
  constructor(public readonly code: PaymentErrorCode, message: string, public readonly status = 400) {
    super(message);
    this.name = "PaymentError";
  }
}

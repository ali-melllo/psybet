export const ceilDiv = (a: bigint, b: bigint): bigint => (a + b - 1n) / b;

/** Trims a decimal string to at most `max` places, padded to at least `min`. */
export function trimDecimals(value: string, max: number, min = 0): string {
  const [int = "0", frac = ""] = value.split(".");
  const f = frac.slice(0, max).replace(/0+$/, "").padEnd(min, "0");
  return f ? `${int}.${f}` : int;
}

export function maskEmail(email: string): string {
  const [local = "", domain = ""] = email.split("@");
  return `${local.slice(0, 1)}***@${domain}`;
}

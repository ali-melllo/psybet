const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

export const formatPrice = (amount: number): string => usd.format(amount);
export const formatCents = (cents: number): string => usd.format(cents / 100);
export const shortAddress = (address: string): string => `${address.slice(0, 6)}…${address.slice(-4)}`;

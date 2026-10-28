import { isAddress, getAddress, type Address, type Chain } from "viem";
import { mainnet, sepolia } from "viem/chains";
import { PaymentError } from "@/lib/payments/server/errors";

export interface TokenConfig { symbol: "USDC"; address: Address; decimals: number }

interface ChainPayConfig {
  chain: Chain;
  rpcUrl: string;
  /** Chainlink ETH/USD aggregator (8 decimals). */
  ethUsdFeed: Address;
  usdc?: TokenConfig;
}

const CHAIN_PAY: Record<number, ChainPayConfig> = {
  1: {
    chain: mainnet,
    rpcUrl: process.env.RPC_URL_1 ?? "https://ethereum-rpc.publicnode.com",
    ethUsdFeed: "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419",
    usdc: { symbol: "USDC", address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", decimals: 6 },
  },
  11155111: {
    chain: sepolia,
    rpcUrl: process.env.RPC_URL_11155111 ?? "https://ethereum-sepolia-rpc.publicnode.com",
    ethUsdFeed: "0x694AA1769357215DE4FAC081bf1f309aDC325306",
    usdc: { symbol: "USDC", address: "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238", decimals: 6 },
  },
};

export const TARGET_CHAIN_ID = Number(process.env.NEXT_PUBLIC_CHAIN_ID ?? "1");
export const REQUIRED_CONFIRMATIONS = Math.max(1, Number(process.env.PAYMENT_CONFIRMATIONS ?? "2"));
export const ORDER_TTL_MS = 30 * 60 * 1000;
export const QUOTE_TTL_MS = 10 * 60 * 1000;
/** A submitted hash that never shows up on-chain after this long is treated as dropped. */
export const TX_NOT_FOUND_TIMEOUT_MS = 30 * 60 * 1000;

export function getChainPay(chainId: number): ChainPayConfig {
  const cfg = CHAIN_PAY[chainId];
  if (!cfg) throw new PaymentError("wrong_network", "This network isn’t supported for payments.");
  return cfg;
}

/** Your receiving wallet. Server-only env var – never expose it with NEXT_PUBLIC_. */
export function getMerchantAddress(): Address {
  const raw = process.env.MERCHANT_ADDRESS;
  if (!raw || !isAddress(raw)) {
    throw new PaymentError("not_configured", "Payments aren’t configured yet. Please try again later.", 503);
  }
  return getAddress(raw);
}

export interface ChainConfig {
  id: number;
  hex: string;
  name: string;
  rpcUrls: string[];
  explorer: string;
  nativeCurrency: { name: string; symbol: string; decimals: number };
}

const ETH = { name: "Ether", symbol: "ETH", decimals: 18 };

export const CHAINS: Record<number, ChainConfig> = {
  1: { id: 1, hex: "0x1", name: "Ethereum", rpcUrls: ["https://ethereum-rpc.publicnode.com"], explorer: "https://etherscan.io", nativeCurrency: ETH },
  11155111: { id: 11155111, hex: "0xaa36a7", name: "Sepolia", rpcUrls: ["https://ethereum-sepolia-rpc.publicnode.com"], explorer: "https://sepolia.etherscan.io", nativeCurrency: ETH },
};

const fallback = CHAINS[1] as ChainConfig;

/** The network payments are accepted on. Override with NEXT_PUBLIC_CHAIN_ID (e.g. 11155111 for testing). */
export const TARGET_CHAIN: ChainConfig = CHAINS[Number(process.env.NEXT_PUBLIC_CHAIN_ID ?? "1")] ?? fallback;

export const chainName = (id: number | null): string =>
  id === null ? "Unknown network" : (CHAINS[id]?.name ?? `Chain ${id}`);

export const parseChainId = (hex: string): number | null => {
  const n = Number.parseInt(hex, 16);
  return Number.isNaN(n) ? null : n;
};

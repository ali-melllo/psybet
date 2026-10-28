import type {
  Eip1193Provider, Eip6963ProviderDetail, ImposterFlag, InjectedProvider,
} from "@/lib/wallet/types";

const METAMASK_RDNS = new Set(["io.metamask", "io.metamask.flask", "io.metamask.mmi"]);
export const isMetaMaskRdns = (rdns: string): boolean => METAMASK_RDNS.has(rdns);

/**
 * Subscribes to EIP-6963 announcements for as long as the caller wants. Every installed wallet announces
 * itself with a stable `rdns`, so we can pick MetaMask by identity instead of trusting `window.ethereum`
 * (which Phantom, Brave, Coinbase… also occupy while claiming `isMetaMask`).
 * Late announcements (slow extension start-up, mobile in-app browsers) are still delivered.
 */
export function subscribeToProviders(onAnnounce: (detail: Eip6963ProviderDetail) => void): () => void {
  if (typeof window === "undefined") return () => undefined;
  const handler = (event: Event) => {
    const detail = (event as CustomEvent<Eip6963ProviderDetail>).detail;
    if (detail?.info && detail.provider) onAnnounce(detail);
  };
  window.addEventListener("eip6963:announceProvider", handler);
  window.dispatchEvent(new Event("eip6963:requestProvider"));
  return () => window.removeEventListener("eip6963:announceProvider", handler);
}

const IMPOSTER_FLAGS: ImposterFlag[] = [
  "isPhantom", "isBraveWallet", "isCoinbaseWallet", "isRabby", "isTrust", "isTrustWallet",
  "isOkxWallet", "isTokenPocket", "isExodus", "isBitKeep", "isFrame", "isZerion",
];

const isGenuineMetaMask = (p: InjectedProvider): boolean =>
  p.isMetaMask === true && !IMPOSTER_FLAGS.some((flag) => p[flag] === true);

/** Fallback for old MetaMask builds without EIP-6963. Never returns another wallet that only claims `isMetaMask`. */
export function findLegacyMetaMask(): Eip1193Provider | null {
  if (typeof window === "undefined") return null;
  const eth = (window as Window & { ethereum?: InjectedProvider }).ethereum;
  if (!eth) return null;
  return [...(eth.providers ?? []), eth].find(isGenuineMetaMask) ?? null;
}

export function detectMobile(): boolean {
  if (typeof navigator === "undefined") return false;
  const iPadOs = /Macintosh/i.test(navigator.userAgent) && navigator.maxTouchPoints > 1;
  return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent) || iPadOs;
}

/** MetaMask's universal link: opens this page inside the MetaMask app's built-in browser. */
export function metaMaskDeepLink(): string {
  if (typeof window === "undefined") return "https://metamask.io/download";
  const { host, pathname, search } = window.location;
  return `https://metamask.app.link/dapp/${host}${pathname}${search}`;
}
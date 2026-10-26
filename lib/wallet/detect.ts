import type { Eip1193Provider, Eip6963ProviderDetail } from "@/lib/wallet/types";

const METAMASK_RDNS = new Set(["io.metamask", "io.metamask.flask"]);

/**
 * Finds MetaMask via EIP-6963 (so other wallets that spoof `window.ethereum.isMetaMask`
 * can't hijack it), falling back to the legacy injected provider.
 */
export function detectMetaMask(timeoutMs = 300): Promise<Eip1193Provider | null> {
  return new Promise((resolve) => {
    if (typeof window === "undefined") return resolve(null);
    let settled = false;

    const finish = (provider: Eip1193Provider | null) => {
      if (settled) return;
      settled = true;
      window.removeEventListener("eip6963:announceProvider", onAnnounce);
      window.clearTimeout(timer);
      resolve(provider);
    };
    const onAnnounce = (event: Event) => {
      const detail = (event as CustomEvent<Eip6963ProviderDetail>).detail;
      if (detail && METAMASK_RDNS.has(detail.info.rdns)) finish(detail.provider);
    };
    const timer = window.setTimeout(() => {
      const legacy = (window as Window & { ethereum?: Eip1193Provider }).ethereum;
      finish(legacy?.isMetaMask ? legacy : null);
    }, timeoutMs);

    window.addEventListener("eip6963:announceProvider", onAnnounce);
    window.dispatchEvent(new Event("eip6963:requestProvider"));
  });
}

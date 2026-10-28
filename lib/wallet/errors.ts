import { isRpcError, type WalletError } from "@/lib/wallet/types";

export type WalletAction = "connect" | "switch" | "sync";

const hasText = (error: unknown, re: RegExp): boolean =>
  typeof error === "object" && error !== null && "message" in error && re.test(String((error as { message: unknown }).message));

/** Some mobile builds wrap "unrecognized chain" (4902) inside a -32603 error. */
export function isUnrecognizedChain(error: unknown): boolean {
  if (!isRpcError(error)) return false;
  if (error.code === 4902) return true;
  const data = error.data as { originalError?: { code?: unknown } } | undefined;
  return data?.originalError?.code === 4902 || hasText(error, /unrecognized chain|not been added/i);
}

/** Maps EIP-1193 / JSON-RPC errors to messages a buyer can act on (extension and mobile app). */
export function toWalletError(error: unknown, action: WalletAction): WalletError {
  if (isRpcError(error)) {
    switch (error.code) {
      case 4001:
        return {
          kind: "rejected",
          message: action === "switch" ? "You rejected the network switch in MetaMask." : "You closed or rejected the request in MetaMask. Try again when you’re ready.",
        };
      case -32002:
        return { kind: "pending", message: "MetaMask already has a request waiting. Open the MetaMask extension or app, approve or reject it, then try again." };
      case 4100:
        return { kind: "unauthorized", message: "MetaMask hasn’t authorized this site. Please reconnect your wallet." };
      case 4200:
      case -32601:
        return { kind: "unsupported", message: "Your version of MetaMask doesn’t support this action. Please update it and try again." };
      case 4900:
      case 4901:
        return { kind: "network", message: "MetaMask lost its connection to the network. Check your internet connection and try again." };
    }
  }
  if (hasText(error, /locked|unlock/i)) return { kind: "locked", message: "MetaMask is locked. Unlock it and try again." };
  if (hasText(error, /network|fetch|timeout/i)) return { kind: "network", message: "A network error occurred. Check your connection and try again." };
  return { kind: "unknown", message: "MetaMask returned an unexpected error. Please try again." };
}

export const noProviderError = (mobile: boolean): WalletError => ({
  kind: "no-provider",
  message: mobile
    ? "MetaMask wasn’t detected. Open this page inside the MetaMask app’s browser."
    : "MetaMask wasn’t detected. Install the extension (or enable it for this site) and reload the page.",
});
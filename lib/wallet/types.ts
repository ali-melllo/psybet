export interface RequestArguments { method: string; params?: unknown[] | Record<string, unknown> }

/** Minimal EIP-1193 provider surface used by the app. */
export interface Eip1193Provider {
  isMetaMask?: boolean;
  request<T = unknown>(args: RequestArguments): Promise<T>;
  on(event: string, listener: (payload: unknown) => void): void;
  removeListener(event: string, listener: (payload: unknown) => void): void;
}

/** Wallets that inject themselves at `window.ethereum` and also claim `isMetaMask`. */
export type ImposterFlag =
  | "isPhantom" | "isBraveWallet" | "isCoinbaseWallet" | "isRabby" | "isTrust" | "isTrustWallet"
  | "isOkxWallet" | "isTokenPocket" | "isExodus" | "isBitKeep" | "isFrame" | "isZerion";

export interface InjectedProvider extends Eip1193Provider, Partial<Record<ImposterFlag, boolean>> {
  /** Legacy multi-wallet array some extensions expose on `window.ethereum`. */
  providers?: InjectedProvider[];
}

/** EIP-6963 multi-provider discovery. */
export interface Eip6963ProviderInfo { uuid: string; name: string; icon: string; rdns: string }
export interface Eip6963ProviderDetail { info: Eip6963ProviderInfo; provider: Eip1193Provider }

export type WalletStatus = "detecting" | "unavailable" | "disconnected" | "connecting" | "connected";

export type WalletErrorKind =
  | "rejected" | "pending" | "locked" | "unauthorized" | "unsupported"
  | "network" | "no-provider" | "unknown";

export interface WalletError { kind: WalletErrorKind; message: string }

export interface WalletState {
  status: WalletStatus;
  address: string | null;
  chainId: number | null;
  error: WalletError | null;
  modalOpen: boolean;
}

export interface RpcError { code: number; message?: string; data?: unknown }
export const isRpcError = (e: unknown): e is RpcError =>
  typeof e === "object" && e !== null && "code" in e && typeof (e as { code: unknown }).code === "number";

export const isStringArray = (v: unknown): v is string[] =>
  Array.isArray(v) && v.every((x) => typeof x === "string");
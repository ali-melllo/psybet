export interface RequestArguments { method: string; params?: unknown[] | Record<string, unknown> }

/** Minimal EIP-1193 provider surface used by the app. */
export interface Eip1193Provider {
  isMetaMask?: boolean;
  request<T = unknown>(args: RequestArguments): Promise<T>;
  on(event: string, listener: (payload: unknown) => void): void;
  removeListener(event: string, listener: (payload: unknown) => void): void;
}

/** EIP-6963 multi-provider discovery. */
export interface Eip6963ProviderInfo { uuid: string; name: string; icon: string; rdns: string }
export interface Eip6963ProviderDetail { info: Eip6963ProviderInfo; provider: Eip1193Provider }

export type WalletStatus = "detecting" | "unavailable" | "disconnected" | "connecting" | "connected";

export interface WalletState {
  status: WalletStatus;
  address: string | null;
  chainId: number | null;
  error: string | null;
  modalOpen: boolean;
}

export interface RpcError { code: number; message?: string }
export const isRpcError = (e: unknown): e is RpcError =>
  typeof e === "object" && e !== null && "code" in e && typeof (e as { code: unknown }).code === "number";

export const isStringArray = (v: unknown): v is string[] =>
  Array.isArray(v) && v.every((x) => typeof x === "string");

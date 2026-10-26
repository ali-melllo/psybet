"use client";

import { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import { WalletContext, type WalletContextValue } from "@/components/wallet/wallet-context";
import { WalletModal } from "@/components/wallet/wallet-modal";
import { parseChainId, TARGET_CHAIN } from "@/lib/wallet/chains";
import { detectMetaMask } from "@/lib/wallet/detect";
import { isRpcError, isStringArray, type Eip1193Provider, type WalletState } from "@/lib/wallet/types";

const AUTOCONNECT_KEY = "adesnya:wallet:autoconnect";

const flag = {
  get: () => { try { return window.localStorage.getItem(AUTOCONNECT_KEY) === "1"; } catch { return false; } },
  set: () => { try { window.localStorage.setItem(AUTOCONNECT_KEY, "1"); } catch { /* storage unavailable */ } },
  clear: () => { try { window.localStorage.removeItem(AUTOCONNECT_KEY); } catch { /* storage unavailable */ } },
};

type Action =
  | { type: "detected"; available: boolean }
  | { type: "connecting" }
  | { type: "connected"; address: string; chainId: number | null }
  | { type: "accounts"; address: string }
  | { type: "chain"; chainId: number | null }
  | { type: "disconnected" }
  | { type: "failed"; error: string }
  | { type: "modal"; open: boolean };

const initialState: WalletState = { status: "detecting", address: null, chainId: null, error: null, modalOpen: false };

function reducer(state: WalletState, action: Action): WalletState {
  switch (action.type) {
    case "detected":
      return { ...state, status: action.available ? (state.status === "detecting" ? "disconnected" : state.status) : "unavailable" };
    case "connecting":
      return { ...state, status: "connecting", error: null };
    case "connected":
      return { ...state, status: "connected", address: action.address, chainId: action.chainId, error: null, modalOpen: state.status === "connecting" ? false : state.modalOpen };
    case "accounts":
      return state.status === "connected" ? { ...state, address: action.address } : state;
    case "chain":
      return state.status === "connected" ? { ...state, chainId: action.chainId } : state;
    case "disconnected":
      return { ...state, status: "disconnected", address: null, chainId: null, error: null };
    case "failed":
      return { ...state, status: state.address ? "connected" : "disconnected", error: action.error };
    case "modal":
      return { ...state, modalOpen: action.open, error: action.open ? state.error : null };
  }
}

function describeError(error: unknown): string {
  if (isRpcError(error)) {
    if (error.code === 4001) return "The request was rejected in MetaMask.";
    if (error.code === -32002) return "A request is already pending. Open MetaMask to continue.";
  }
  return "Something went wrong talking to MetaMask. Please try again.";
}

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [provider, setProvider] = useState<Eip1193Provider | null>(null);

  // 1. Detect MetaMask, then silently restore a previous session (no popup: eth_accounts).
  useEffect(() => {
    let cancelled = false;
    void (async () => {
      const found = await detectMetaMask();
      if (cancelled) return;
      setProvider(found);
      dispatch({ type: "detected", available: found !== null });
      if (!found || !flag.get()) return;
      try {
        const accounts = await found.request<string[]>({ method: "eth_accounts" });
        const address = accounts[0];
        if (!address || cancelled) return;
        const chainId = parseChainId(await found.request<string>({ method: "eth_chainId" }));
        if (!cancelled) dispatch({ type: "connected", address, chainId });
      } catch {
        /* silent restore failed – user can connect manually */
      }
    })();
    return () => { cancelled = true; };
  }, []);

  // 2. Keep state in sync with wallet-side changes.
  useEffect(() => {
    if (!provider) return;
    const onAccounts = (payload: unknown) => {
      if (!isStringArray(payload)) return;
      const next = payload[0];
      if (next) dispatch({ type: "accounts", address: next });
      else { flag.clear(); dispatch({ type: "disconnected" }); }
    };
    const onChain = (payload: unknown) => {
      if (typeof payload === "string") dispatch({ type: "chain", chainId: parseChainId(payload) });
    };
    provider.on("accountsChanged", onAccounts);
    provider.on("chainChanged", onChain);
    return () => {
      provider.removeListener("accountsChanged", onAccounts);
      provider.removeListener("chainChanged", onChain);
    };
  }, [provider]);

  const connect = useCallback(async () => {
    if (!provider) { dispatch({ type: "failed", error: "MetaMask was not detected in this browser." }); return; }
    dispatch({ type: "connecting" });
    try {
      const accounts = await provider.request<string[]>({ method: "eth_requestAccounts" });
      const address = accounts[0];
      if (!address) throw new Error("No account returned");
      const chainId = parseChainId(await provider.request<string>({ method: "eth_chainId" }));
      flag.set();
      dispatch({ type: "connected", address, chainId });
    } catch (error) {
      dispatch({ type: "failed", error: describeError(error) });
    }
  }, [provider]);

  const disconnect = useCallback(async () => {
    flag.clear();
    dispatch({ type: "disconnected" });
    try {
      // Revokes this site's permission where supported (MetaMask ≥ 11).
      await provider?.request({ method: "wallet_revokePermissions", params: [{ eth_accounts: {} }] });
    } catch {
      /* not supported – local session is already cleared */
    }
  }, [provider]);

  const switchToTargetChain = useCallback(async () => {
    if (!provider) return;
    try {
      await provider.request({ method: "wallet_switchEthereumChain", params: [{ chainId: TARGET_CHAIN.hex }] });
    } catch (error) {
      if (isRpcError(error) && error.code === 4902) {
        try {
          await provider.request({
            method: "wallet_addEthereumChain",
            params: [{
              chainId: TARGET_CHAIN.hex,
              chainName: TARGET_CHAIN.name,
              rpcUrls: TARGET_CHAIN.rpcUrls,
              nativeCurrency: TARGET_CHAIN.nativeCurrency,
              blockExplorerUrls: [TARGET_CHAIN.explorer],
            }],
          });
          return;
        } catch (addError) {
          dispatch({ type: "failed", error: describeError(addError) });
          return;
        }
      }
      dispatch({ type: "failed", error: describeError(error) });
    }
  }, [provider]);

  const openModal = useCallback(() => dispatch({ type: "modal", open: true }), []);
  const closeModal = useCallback(() => dispatch({ type: "modal", open: false }), []);

  const value = useMemo<WalletContextValue>(
    () => ({
      ...state,
      isConnected: state.status === "connected",
      isCorrectChain: state.chainId === TARGET_CHAIN.id,
      targetChain: TARGET_CHAIN,
      connect, disconnect, switchToTargetChain, openModal, closeModal,
    }),
    [state, connect, disconnect, switchToTargetChain, openModal, closeModal],
  );

  return (
    <WalletContext.Provider value={value}>
      {children}
      <WalletModal />
    </WalletContext.Provider>
  );
}

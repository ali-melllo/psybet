"use client";

import { useCallback, useEffect, useMemo, useReducer, useRef, useState } from "react";
import { WalletContext, type SendTransactionResult, type WalletContextValue } from "@/components/wallet/wallet-context";
import { WalletModal } from "@/components/wallet/wallet-modal";
import type { PaymentQuote, TxRequest } from "@/lib/payments/types";
import { chainName, parseChainId, TARGET_CHAIN } from "@/lib/wallet/chains";
import { detectMobile, findLegacyMetaMask, isMetaMaskRdns, subscribeToProviders } from "@/lib/wallet/detect";
import { isUnrecognizedChain, noProviderError, toWalletError } from "@/lib/wallet/errors";
import { isStringArray, type Eip1193Provider, type WalletError, type WalletState } from "@/lib/wallet/types";

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
  | { type: "failed"; error: WalletError }
  | { type: "modal"; open: boolean };

const initialState: WalletState = { status: "detecting", address: null, chainId: null, error: null, modalOpen: false };

function reducer(state: WalletState, action: Action): WalletState {
  switch (action.type) {
    case "detected":
      if (!action.available) return state.status === "detecting" ? { ...state, status: "unavailable" } : state;
      return state.status === "detecting" || state.status === "unavailable" ? { ...state, status: "disconnected" } : state;
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
      return { ...state, status: state.address ? "connected" : state.status === "unavailable" ? "unavailable" : "disconnected", error: action.error };
    case "modal":
      return { ...state, modalOpen: action.open, error: action.open ? state.error : null };
  }
}

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [provider, setProvider] = useState<Eip1193Provider | null>(null);
  const [otherWallets, setOtherWallets] = useState<string[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const attempt = useRef(0);
  const found = useRef(false);

  // 1. Discover MetaMask by EIP-6963 identity. Other wallets (Phantom…) are recorded but never used.
  useEffect(() => {
    const mobile = detectMobile();
    setIsMobile(mobile);
    const unsubscribe = subscribeToProviders((detail) => {
      if (isMetaMaskRdns(detail.info.rdns)) {
        found.current = true;
        setProvider(detail.provider);
      } else {
        setOtherWallets((prev) => (prev.includes(detail.info.name) ? prev : [...prev, detail.info.name]));
      }
    });
    // Give slower environments (mobile in-app browsers) longer before declaring "unavailable".
    const timer = window.setTimeout(() => {
      if (found.current) return;
      const legacy = findLegacyMetaMask();
      if (legacy) { found.current = true; setProvider(legacy); }
      else dispatch({ type: "detected", available: false });
    }, mobile ? 1500 : 800);
    return () => { unsubscribe(); window.clearTimeout(timer); };
  }, []);

  // 2. Once MetaMask is known, silently restore a previous session (eth_accounts never opens a popup).
  useEffect(() => {
    if (!provider) return;
    dispatch({ type: "detected", available: true });
    if (!flag.get()) return;
    let cancelled = false;
    void (async () => {
      try {
        const address = (await provider.request<string[]>({ method: "eth_accounts" }))[0];
        if (!address || cancelled) return;
        const chainId = parseChainId(await provider.request<string>({ method: "eth_chainId" }));
        if (!cancelled) dispatch({ type: "connected", address, chainId });
      } catch {
        /* silent restore failed – the user can connect manually */
      }
    })();
    return () => { cancelled = true; };
  }, [provider]);

  // 3. Stay in sync with wallet-side changes.
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
    const onDisconnect = () =>
      dispatch({ type: "failed", error: { kind: "network", message: "MetaMask lost its connection to the network. Check your internet connection." } });
    provider.on("accountsChanged", onAccounts);
    provider.on("chainChanged", onChain);
    provider.on("disconnect", onDisconnect);
    return () => {
      provider.removeListener("accountsChanged", onAccounts);
      provider.removeListener("chainChanged", onChain);
      provider.removeListener("disconnect", onDisconnect);
    };
  }, [provider]);

  // 4. Mobile: events can be missed while the wallet app is in the foreground – re-sync when the tab is visible again.
  useEffect(() => {
    if (!provider || state.status !== "connected") return;
    const onVisible = () => {
      if (document.visibilityState !== "visible") return;
      void (async () => {
        try {
          const address = (await provider.request<string[]>({ method: "eth_accounts" }))[0];
          if (!address) { flag.clear(); dispatch({ type: "disconnected" }); return; }
          dispatch({ type: "accounts", address });
          dispatch({ type: "chain", chainId: parseChainId(await provider.request<string>({ method: "eth_chainId" })) });
        } catch {
          /* transient – keep current state */
        }
      })();
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => document.removeEventListener("visibilitychange", onVisible);
  }, [provider, state.status]);

  const connect = useCallback(async () => {
    if (!provider) { dispatch({ type: "failed", error: noProviderError(isMobile) }); return; }
    const id = ++attempt.current;
    dispatch({ type: "connecting" });
    try {
      const address = (await provider.request<string[]>({ method: "eth_requestAccounts" }))[0];
      if (id !== attempt.current) return; // cancelled by the user
      if (!address) throw new Error("No account returned");
      const chainId = parseChainId(await provider.request<string>({ method: "eth_chainId" }));
      if (id !== attempt.current) return;
      flag.set();
      dispatch({ type: "connected", address, chainId });
    } catch (error) {
      if (id === attempt.current) dispatch({ type: "failed", error: toWalletError(error, "connect") });
    }
  }, [provider, isMobile]);

  /** Lets the user escape a stuck/hidden wallet popup. */
  const cancelConnect = useCallback(() => {
    attempt.current += 1;
    dispatch({ type: "disconnected" });
  }, []);

  const disconnect = useCallback(async () => {
    attempt.current += 1;
    flag.clear();
    dispatch({ type: "disconnected" });
    try {
      await provider?.request({ method: "wallet_revokePermissions", params: [{ eth_accounts: {} }] });
    } catch {
      /* not supported – local session is already cleared */
    }
  }, [provider]);

  const switchToTargetChain = useCallback(async () => {
    if (!provider) { dispatch({ type: "failed", error: noProviderError(isMobile) }); return; }
    try {
      await provider.request({ method: "wallet_switchEthereumChain", params: [{ chainId: TARGET_CHAIN.hex }] });
    } catch (error) {
      if (!isUnrecognizedChain(error)) { dispatch({ type: "failed", error: toWalletError(error, "switch") }); return; }
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
      } catch (addError) {
        dispatch({ type: "failed", error: toWalletError(addError, "switch") });
      }
    }
  }, [provider, isMobile]);

  const sendTransaction = useCallback(
    async (tx: TxRequest, expectedChainId: number): Promise<SendTransactionResult> => {
      if (!provider) return { ok: false, error: noProviderError(isMobile) };
      const from = state.address;
      if (!from) return { ok: false, error: { kind: "unauthorized", message: "Connect your wallet first." } };
      try {
        // Re-check the network right before signing: the user may have switched it since the page loaded.
        const chainId = parseChainId(await provider.request<string>({ method: "eth_chainId" }));
        if (chainId !== expectedChainId) {
          return { ok: false, error: { kind: "wrong-chain", message: `Switch MetaMask to ${chainName(expectedChainId)} and try again.` } };
        }
        const hash = await provider.request<unknown>({
          method: "eth_sendTransaction",
          params: [{ from, to: tx.to, value: tx.value, data: tx.data }],
        });
        if (typeof hash !== "string" || !/^0x[0-9a-fA-F]{64}$/.test(hash)) throw new Error("Invalid transaction hash");
        return { ok: true, hash };
      } catch (error) {
        return { ok: false, error: toWalletError(error, "pay") };
      }
    },
    [provider, isMobile, state.address],
  );

  const readBalance = useCallback(
    async (quote: PaymentQuote): Promise<bigint | null> => {
      const address = state.address;
      if (!provider || !address) return null;
      try {
        if (quote.currency === "ETH") {
          return BigInt(await provider.request<string>({ method: "eth_getBalance", params: [address, "latest"] }));
        }
        if (!quote.tokenAddress) return null;
        const data = `0x70a08231${address.slice(2).toLowerCase().padStart(64, "0")}`; // balanceOf(address)
        return BigInt(await provider.request<string>({ method: "eth_call", params: [{ to: quote.tokenAddress, data }, "latest"] }));
      } catch {
        return null;
      }
    },
    [provider, state.address],
  );

  const openModal = useCallback(() => dispatch({ type: "modal", open: true }), []);
  const closeModal = useCallback(() => dispatch({ type: "modal", open: false }), []);

  const value = useMemo<WalletContextValue>(
    () => ({
      ...state,
      isConnected: state.status === "connected",
      isCorrectChain: state.chainId === TARGET_CHAIN.id,
      isMobile,
      otherWallets,
      targetChain: TARGET_CHAIN,
      connect, cancelConnect, disconnect, switchToTargetChain, sendTransaction, readBalance, openModal, closeModal,
    }),
    [state, isMobile, otherWallets, connect, cancelConnect, disconnect, switchToTargetChain, sendTransaction, readBalance, openModal, closeModal],
  );

  return (
    <WalletContext.Provider value={value}>
      {children}
      <WalletModal />
    </WalletContext.Provider>
  );
}
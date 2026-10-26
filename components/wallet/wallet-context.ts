"use client";

import { createContext, useContext } from "react";
import type { ChainConfig } from "@/lib/wallet/chains";
import type { WalletState } from "@/lib/wallet/types";

export interface WalletContextValue extends WalletState {
  isConnected: boolean;
  isCorrectChain: boolean;
  targetChain: ChainConfig;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  switchToTargetChain: () => Promise<void>;
  openModal: () => void;
  closeModal: () => void;
}

export const WalletContext = createContext<WalletContextValue | null>(null);

export function useWallet(): WalletContextValue {
  const ctx = useContext(WalletContext);
  if (!ctx) throw new Error("useWallet must be used inside <WalletProvider>");
  return ctx;
}

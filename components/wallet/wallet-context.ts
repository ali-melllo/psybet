"use client";

import { createContext, useContext } from "react";
import type { ChainConfig } from "@/lib/wallet/chains";
import type { PaymentQuote, TxRequest } from "@/lib/payments/types";
import type { WalletError, WalletState } from "@/lib/wallet/types";

export type SendTransactionResult = { ok: true; hash: string } | { ok: false; error: WalletError };

export interface WalletContextValue extends WalletState {
  isConnected: boolean;
  isCorrectChain: boolean;
  isMobile: boolean;
  /** Names of other injected wallets found (e.g. Phantom). They are ignored; MetaMask is always used. */
  otherWallets: string[];
  targetChain: ChainConfig;
  connect: () => Promise<void>;
  cancelConnect: () => void;
  disconnect: () => Promise<void>;
  switchToTargetChain: () => Promise<void>;
  /** Sends a server-built transaction from the connected account (extension or MetaMask mobile). */
  sendTransaction: (tx: TxRequest, expectedChainId: number) => Promise<SendTransactionResult>;
  /** Balance in base units of the asset a quote is denominated in, or null if it can't be read. */
  readBalance: (quote: PaymentQuote) => Promise<bigint | null>;
  openModal: () => void;
  closeModal: () => void;
}

export const WalletContext = createContext<WalletContextValue | null>(null);

export function useWallet(): WalletContextValue {
  const ctx = useContext(WalletContext);
  if (!ctx) throw new Error("useWallet must be used inside <WalletProvider>");
  return ctx;
}
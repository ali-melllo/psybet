"use client";

import { Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWallet } from "@/components/wallet/wallet-context";
import { shortAddress } from "@/lib/format";

/** Header trigger for the global wallet modal. */
export function WalletButton({ className }: { className?: string }) {
  const { status, address, isConnected, isCorrectChain, openModal } = useWallet();
  const label = isConnected && address ? shortAddress(address) : status === "connecting" ? "Connecting…" : "Connect Wallet";

  return (
    <Button
      size="sm"
      variant={isConnected ? "outline" : "default"}
      className={className}
      aria-haspopup="dialog"
      onClick={openModal}
    >
      <Wallet aria-hidden="true" />
      <span>{label}</span>
      {isConnected && !isCorrectChain ? (
        <>
          <span aria-hidden="true" className="size-2 rounded-full bg-primary" />
          <span className="sr-only">Wrong network</span>
        </>
      ) : null}
    </Button>
  );
}

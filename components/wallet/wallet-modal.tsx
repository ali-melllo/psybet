"use client";

import { AlertTriangle, Check, Copy, ExternalLink, Loader2, LogOut, Wallet } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useWallet } from "@/components/wallet/wallet-context";
import { shortAddress } from "@/lib/format";
import { chainName } from "@/lib/wallet/chains";

/** Rendered once by <WalletProvider>; open it anywhere with `useWallet().openModal()`. */
export function WalletModal() {
  const w = useWallet();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const id = window.setTimeout(() => setCopied(false), 1500);
    return () => window.clearTimeout(id);
  }, [copied]);

  const copyAddress = async () => {
    if (!w.address) return;
    try {
      await navigator.clipboard.writeText(w.address);
      setCopied(true);
    } catch {
      /* clipboard blocked – ignore */
    }
  };

  const mobileLink =
    typeof window === "undefined" ? "#" : `https://metamask.app.link/dapp/${window.location.host}${window.location.pathname}`;

  return (
    <Dialog open={w.modalOpen} onOpenChange={(open) => (open ? w.openModal() : w.closeModal())}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{w.isConnected ? "Your wallet" : "Connect a wallet"}</DialogTitle>
          <DialogDescription>
            {w.isConnected
              ? "You’re connected. Disconnect any time."
              : "Connect to continue to payment. We never ask for your seed phrase."}
          </DialogDescription>
        </DialogHeader>

        {w.error ? (
          <p role="alert" className="mb-4 flex gap-2 rounded-lg border border-primary/40 bg-primary/10 p-3 text-sm">
            <AlertTriangle className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
            {w.error}
          </p>
        ) : null}

        {w.status === "detecting" ? (
          <div role="status" className="flex items-center gap-2 py-4 text-sm text-muted-foreground">
            <Loader2 className="size-4 animate-spin" aria-hidden="true" /> Looking for wallets…
          </div>
        ) : null}

        {w.status === "unavailable" ? (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              MetaMask wasn’t found in this browser. Install the extension, or open this page inside the MetaMask app.
            </p>
            <Button asChild className="w-full">
              <a href="https://metamask.io/download" target="_blank" rel="noopener noreferrer">
                Install MetaMask <ExternalLink aria-hidden="true" />
              </a>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <a href={mobileLink}>Open in MetaMask app</a>
            </Button>
          </div>
        ) : null}

        {w.status === "disconnected" || w.status === "connecting" ? (
          <button
            type="button"
            onClick={() => void w.connect()}
            disabled={w.status === "connecting"}
            className="flex w-full items-center gap-3 rounded-lg border border-border bg-surface p-3 text-left transition-colors hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-60"
          >
            <span className="grid size-10 place-items-center rounded-lg bg-primary/15 text-primary">
              <Wallet className="size-5" aria-hidden="true" />
            </span>
            <span className="flex-1">
              <span className="block text-sm font-semibold">MetaMask</span>
              <span className="block text-xs text-muted-foreground">
                {w.status === "connecting" ? "Confirm in the MetaMask popup…" : "Browser extension or mobile app"}
              </span>
            </span>
            {w.status === "connecting" ? <Loader2 className="size-4 animate-spin" aria-hidden="true" /> : null}
          </button>
        ) : null}

        {w.isConnected && w.address ? (
          <div className="space-y-4">
            <div className="rounded-lg border border-border bg-surface p-3">
              <p className="text-xs text-muted-foreground">Address</p>
              <div className="mt-1 flex items-center justify-between gap-2">
                <p className="font-mono text-sm" title={w.address}>{shortAddress(w.address)}</p>
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm" onClick={() => void copyAddress()} aria-label="Copy address">
                    {copied ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
                  </Button>
                  <Button asChild variant="ghost" size="sm">
                    <a href={`${w.targetChain.explorer}/address/${w.address}`} target="_blank" rel="noopener noreferrer" aria-label="View on block explorer">
                      <ExternalLink aria-hidden="true" />
                    </a>
                  </Button>
                </div>
              </div>
              <p className="mt-3 text-xs text-muted-foreground">Network</p>
              <p className="text-sm">{chainName(w.chainId)}</p>
            </div>

            {!w.isCorrectChain ? (
              <div role="alert" className="space-y-2 rounded-lg border border-primary/40 bg-primary/10 p-3 text-sm">
                <p className="flex gap-2"><AlertTriangle className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" /> Payments are accepted on {w.targetChain.name}.</p>
                <Button size="sm" onClick={() => void w.switchToTargetChain()}>Switch to {w.targetChain.name}</Button>
              </div>
            ) : null}

            <Button variant="outline" className="w-full" onClick={() => void w.disconnect()}>
              <LogOut aria-hidden="true" /> Disconnect
            </Button>
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}

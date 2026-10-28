"use client";

import { CheckCircle2, Circle, Loader2, Minus, Plus, ShieldCheck, Zap } from "lucide-react";
import Link from "next/link";
import { useId, useState } from "react";
import { Button } from "@/components/ui/button";
import { useWallet } from "@/components/wallet/wallet-context";
import { createOrder } from "@/lib/checkout/create-order";
import type { Product } from "@/lib/data/products";
import { formatCents, formatPrice, shortAddress } from "@/lib/format";
import { cn } from "@/lib/utils";
import { chainName } from "@/lib/wallet/chains";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface CheckoutPanelProps { product: Product; maxQuantity: number }

export function CheckoutPanel({ product, maxQuantity }: CheckoutPanelProps) {
  const wallet = useWallet();
  const [quantity, setQuantity] = useState(1);
  const [email, setEmail] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [attempted, setAttempted] = useState(false);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const emailId = useId();
  const emailErrorId = useId();

  const emailValid = EMAIL_RE.test(email.trim());
  const totalCents = Math.round(product.price * 100) * quantity;
  const showEmailError = attempted && !emailValid;
  const showTermsError = attempted && !accepted;

  const submit = async () => {
    setAttempted(true);
    if (!emailValid || !accepted || !wallet.address || wallet.chainId === null) return;
    setBusy(true);
    try {
      const result = await createOrder({
        productId: product.id,
        quantity,
        email: email.trim(),
        walletAddress: wallet.address,
        chainId: wallet.chainId,
      });
      setNotice(result.message);
    } finally {
      setBusy(false);
    }
  };

  // Single primary action that walks the buyer through the required steps.
  let cta: { label: string; disabled?: boolean; run: () => void };
  if (!product.inStock) cta = { label: "Out of stock", disabled: true, run: () => undefined };
  else if (wallet.status === "detecting" || wallet.status === "connecting")
    cta = { label: "Connecting…", disabled: true, run: () => undefined };
  else if (!wallet.isConnected) cta = { label: "Connect wallet to continue", run: wallet.openModal };
  else if (!wallet.isCorrectChain)
    cta = { label: `Switch to ${wallet.targetChain.name}`, run: () => void wallet.switchToTargetChain() };
  else cta = { label: "Continue to payment", run: () => void submit() };

  return (
    <aside aria-labelledby="checkout-title" className="rounded-xl border border-border bg-surface p-5 lg:sticky lg:top-20">
      <h2 id="checkout-title" className="font-display text-xl font-bold">Checkout</h2>

      <ol className="mt-4 space-y-2 text-sm">
        <li className="flex items-center gap-2">
          {wallet.isConnected ? <CheckCircle2 className="size-4 text-green" aria-hidden="true" /> : <Circle className="size-4 text-muted-foreground" aria-hidden="true" />}
          <span className="flex-1">
            {wallet.isConnected && wallet.address ? `Wallet ${shortAddress(wallet.address)}` : "Connect your wallet"}
          </span>
          {wallet.isConnected ? (
            <button type="button" onClick={wallet.openModal} className="text-xs font-semibold text-primary hover:underline">Manage</button>
          ) : null}
        </li>
        <li className="flex items-center gap-2">
          {wallet.isConnected && wallet.isCorrectChain ? <CheckCircle2 className="size-4 text-green" aria-hidden="true" /> : <Circle className="size-4 text-muted-foreground" aria-hidden="true" />}
          <span>
            {wallet.isConnected && !wallet.isCorrectChain
              ? `On ${chainName(wallet.chainId)} – switch to ${wallet.targetChain.name}`
              : `Network: ${wallet.targetChain.name}`}
          </span>
        </li>
      </ol>

      <form
        noValidate
        className="mt-5 space-y-4"
        onSubmit={(e) => { e.preventDefault(); if (!cta.disabled) cta.run(); }}
      >
        <div className="flex items-center justify-between">
          <span id="qty-label" className="text-sm font-semibold">Quantity</span>
          <div role="group" aria-labelledby="qty-label" className="flex items-center gap-1">
            <Button type="button" variant="outline" size="icon" className="size-8" aria-label="Decrease quantity" disabled={quantity <= 1} onClick={() => setQuantity((q) => Math.max(1, q - 1))}>
              <Minus aria-hidden="true" />
            </Button>
            <output aria-live="polite" className="w-8 text-center text-sm font-semibold">{quantity}</output>
            <Button type="button" variant="outline" size="icon" className="size-8" aria-label="Increase quantity" disabled={quantity >= maxQuantity} onClick={() => setQuantity((q) => Math.min(maxQuantity, q + 1))}>
              <Plus aria-hidden="true" />
            </Button>
          </div>
        </div>

        <div>
          <label htmlFor={emailId} className="mb-1 block text-sm font-semibold">Delivery email</label>
          <input
            id={emailId}
            type="email"
            autoComplete="email"
            inputMode="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={showEmailError}
            aria-describedby={showEmailError ? emailErrorId : undefined}
            placeholder="you@example.com"
            className={cn(
              "h-10 w-full rounded-lg border bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              showEmailError ? "border-primary" : "border-border",
            )}
          />
          {showEmailError ? <p id={emailErrorId} className="mt-1 text-xs text-primary">Enter a valid email address.</p> : null}
        </div>

        <div>
          <label className="flex cursor-pointer items-start gap-2 text-xs text-muted-foreground">
            <input type="checkbox" checked={accepted} onChange={(e) => setAccepted(e.target.checked)} aria-invalid={showTermsError} className="mt-0.5 size-4 accent-primary" />
            <span>
              I agree to the <Link href="/terms" className="text-primary underline">Terms</Link> and{" "}
              <Link href="/privacy" className="text-primary underline">Privacy Policy</Link>, and understand this is a digital product.
            </span>
          </label>
          {showTermsError ? <p className="mt-1 text-xs text-primary">Please accept the terms to continue.</p> : null}
        </div>

        <dl className="space-y-1 border-t border-border pt-4 text-sm">
          <div className="flex justify-between"><dt className="text-muted-foreground">{formatPrice(product.price)} × {quantity}</dt><dd>{formatCents(totalCents)}</dd></div>
          <div className="flex justify-between text-base font-bold"><dt>Total</dt><dd>{formatCents(totalCents)}</dd></div>
        </dl>

        <Button type="submit" size="lg" className="w-full" disabled={cta.disabled || busy}>
          {busy ? <Loader2 className="animate-spin" aria-hidden="true" /> : null}
          {cta.label}
        </Button>
      </form>

      {wallet.error ? <p role="alert" className="mt-3 text-xs text-primary">{wallet.error.kind}</p> : null}
      {notice ? <p role="status" className="mt-3 rounded-lg bg-surface-2 p-3 text-sm">{notice}</p> : null}

      <ul className="mt-4 space-y-1.5 text-xs text-muted-foreground">
        <li className="flex items-center gap-2"><Zap className="size-3.5" aria-hidden="true" />{product.delivery === "instant" ? "Delivered instantly after payment" : "Delivered within 1 hour"}</li>
        <li className="flex items-center gap-2"><ShieldCheck className="size-3.5" aria-hidden="true" />We never ask for your seed phrase or private keys</li>
      </ul>
    </aside>
  );
}

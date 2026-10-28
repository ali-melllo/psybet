"use client";

import { AlertTriangle, Check, Clock, Copy, ExternalLink, Loader2, RefreshCw, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { useWallet } from "@/components/wallet/wallet-context";
import {
    getApiErrorMessage, useGetOrderQuery, useQuoteOrderMutation, useSubmitPaymentMutation,
} from "@/lib/features/orders/orders-api";
import { formatCents, shortAddress } from "@/lib/format";
import type { Order, PaymentCurrency } from "@/lib/payments/types";
import { cn } from "@/lib/utils";
import { CHAINS, chainName } from "@/lib/wallet/chains";
import MetaMaskIcon from "../icons/meta-mask";

const HASH_RE = /^0x[0-9a-fA-F]{64}$/;
const hashKey = (orderId: string) => `adesnya:order:${orderId}:tx`;

const storage = {
    get: (k: string): string | null => { try { return window.localStorage.getItem(k); } catch { return null; } },
    set: (k: string, v: string) => { try { window.localStorage.setItem(k, v); } catch { /* storage unavailable */ } },
};

const CURRENCY_LABEL: Record<PaymentCurrency, { title: string; hint: string }> = {
    USDC: { title: "USDC", hint: "Stablecoin, 1 USDC = $1" },
    ETH: { title: "ETH", hint: "Live price from Chainlink" },
};

function formatCountdown(ms: number): string {
    const s = Math.max(0, Math.floor(ms / 1000));
    return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

function CopyButton({ value, label }: { value: string; label: string }) {
    const [copied, setCopied] = useState(false);
    useEffect(() => {
        if (!copied) return;
        const id = window.setTimeout(() => setCopied(false), 1500);
        return () => window.clearTimeout(id);
    }, [copied]);
    return (
        <Button
            type="button" variant="ghost" size="sm" aria-label={`Copy ${label}`}
            onClick={() => { void navigator.clipboard.writeText(value).then(() => setCopied(true)).catch(() => undefined); }}
        >
            {copied ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
        </Button>
    );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <div className="flex items-center justify-between gap-3 py-2 text-sm">
            <dt className="text-muted-foreground">{label}</dt>
            <dd className="flex items-center text-right font-medium">{children}</dd>
        </div>
    );
}

function Timeline({ order }: { order: Order }) {
    const confirmations = order.payment?.confirmations ?? 0;
    const required = order.payment?.required ?? 1;
    const paid = order.status === "paid";
    const steps = [
        { label: "Payment sent", done: true },
        { label: paid ? "Confirmed on-chain" : `Confirming on-chain (${Math.min(confirmations, required)}/${required})`, done: paid, active: !paid },
        { label: "Order complete", done: paid },
    ];
    return (
        <ol className="space-y-3" aria-label="Payment progress">
            {steps.map((s) => (
                <li key={s.label} className="flex items-center gap-3 text-sm">
                    <span className={cn("grid size-6 place-items-center rounded-full border", s.done ? "border-green bg-green text-[#080A10]" : "border-border")}>
                        {s.done ? <Check className="size-3.5" aria-hidden="true" /> : s.active ? <Loader2 className="size-3.5 animate-spin" aria-hidden="true" /> : null}
                    </span>
                    <span className={s.done || s.active ? "" : "text-muted-foreground"}>{s.label}</span>
                </li>
            ))}
        </ol>
    );
}

export function PaymentDetails({ orderId }: { orderId: string }) {
    const wallet = useWallet();
    const [pollMs, setPollMs] = useState(0);
    const { data: order, error, isLoading, refetch } = useGetOrderQuery(orderId, { pollingInterval: pollMs });
    const [quoteOrder, { isLoading: quoting }] = useQuoteOrderMutation();
    const [submitPayment, { isLoading: submitting }] = useSubmitPaymentMutation();
    const [paying, setPaying] = useState(false);
    const [actionError, setActionError] = useState<string | null>(null);
    const [balance, setBalance] = useState<bigint | null>(null);
    const [now, setNow] = useState(() => Date.now());
    const [manualHash, setManualHash] = useState("");
    const resumed = useRef(false);

    const status = order?.status;
    const quote = order?.quote;

    // Poll while a payment is confirming; stop once it is final.
    useEffect(() => { setPollMs(status === "pending" ? 4000 : 0); }, [status]);

    // Tick for the quote / order countdown.
    useEffect(() => {
        if (status !== "created" && status !== "quoted") return;
        const id = window.setInterval(() => setNow(Date.now()), 1000);
        return () => window.clearInterval(id);
    }, [status]);

    // Mobile: when the user returns from the wallet app, refresh immediately.
    useEffect(() => {
        const onVisible = () => { if (document.visibilityState === "visible") void refetch(); };
        document.addEventListener("visibilitychange", onVisible);
        return () => document.removeEventListener("visibilitychange", onVisible);
    }, [refetch]);

    const register = useCallback(async (txHash: string) => {
        setActionError(null);
        try { await submitPayment({ id: orderId, txHash }).unwrap(); }
        catch (e) { setActionError(getApiErrorMessage(e)); }
    }, [orderId, submitPayment]);

    // Resume: the page may have been reloaded after the wallet app sent the tx but before we registered it.
    useEffect(() => {
        if (status !== "quoted" || resumed.current) return;
        const stored = storage.get(hashKey(orderId));
        if (stored && HASH_RE.test(stored)) { resumed.current = true; void register(stored); }
    }, [status, orderId, register]);

    // Show the buyer's balance so we can warn before they open the wallet.
    useEffect(() => {
        if (!quote || !wallet.isConnected) { setBalance(null); return; }
        let cancelled = false;
        void wallet.readBalance(quote).then((b) => { if (!cancelled) setBalance(b); });
        return () => { cancelled = true; };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [quote?.currency, quote?.amount, wallet.address, wallet.chainId, wallet.isConnected]);

    if (isLoading) {
        return <div role="status" className="flex items-center justify-center gap-2 py-20 text-muted-foreground"><Loader2 className="animate-spin" aria-hidden="true" /> Loading your order…</div>;
    }
    if (error || !order) {
        return (
            <div role="alert" className="rounded-xl border border-border bg-surface p-8 text-center">
                <AlertTriangle className="mx-auto mb-3 size-8 text-primary" aria-hidden="true" />
                <h1 className="font-display text-2xl font-bold">Order not found</h1>
                <p className="mt-2 text-sm text-muted-foreground">{error ? getApiErrorMessage(error) : "This order doesn’t exist."}</p>
                <Button asChild className="mt-5"><Link href="/shop">Back to shop</Link></Button>
            </div>
        );
    }

    const chain = CHAINS[order.chainId];
    const explorerTx = order.payment && chain ? `${chain.explorer}/tx/${order.payment.txHash}` : null;
    const orderExpired = status === "expired" || ((status === "created" || status === "quoted") && now > order.expiresAt);
    const quoteExpired = quote ? now > quote.expiresAt : false;
    const sameAccount = wallet.address?.toLowerCase() === order.walletAddress.toLowerCase();
    const insufficient = quote && balance !== null && balance < BigInt(quote.amount);

    const choose = async (currency: PaymentCurrency) => {
        setActionError(null);
        try { await quoteOrder({ id: orderId, currency }).unwrap(); }
        catch (e) { setActionError(getApiErrorMessage(e)); }
    };

    const pay = async () => {
        if (!quote) return;
        setPaying(true);
        setActionError(null);
        const result = await wallet.sendTransaction(quote.tx, order.chainId);
        if (!result.ok) { setActionError(result.error.message); setPaying(false); return; }
        storage.set(hashKey(orderId), result.hash); // survives a reload while the wallet app is in front
        await register(result.hash);
        setPaying(false);
    };

    let cta: { label: string; disabled?: boolean; run: () => void };
    if (!wallet.isConnected) cta = { label: "Connect MetaMask", run: wallet.openModal };
    else if (!wallet.isCorrectChain) cta = { label: `Switch to ${wallet.targetChain.name}`, run: () => void wallet.switchToTargetChain() };
    else if (!sameAccount) cta = { label: "Wrong account selected", disabled: true, run: () => undefined };
    else if (quoteExpired) cta = { label: "Refresh quote", run: () => void choose(quote?.currency ?? "USDC") };
    else if (insufficient) cta = { label: "Insufficient balance", disabled: true, run: () => undefined };
    else cta = { label: `Pay ${quote?.amountDisplay ?? ""} ${quote?.currency ?? ""}`.trim(), run: () => void pay() };

    const busy = paying || submitting || quoting;

    return (
        <div className="space-y-5">
            <header>
                <p className="text-xs font-semibold uppercase tracking-wide text-primary">Payment</p>
                <h1 className="font-display text-3xl font-extrabold">Complete your order</h1>
                <p className="mt-1 text-xs text-muted-foreground">Order {order.id.slice(0, 8).toUpperCase()}</p>
            </header>

            <section aria-labelledby="summary" className="rounded-xl border border-border bg-surface p-5">
                <h2 id="summary" className="sr-only">Order summary</h2>
                <dl className="divide-y divide-border">
                    <Row label="Product">{order.productName} × {order.quantity}</Row>
                    <Row label="Delivery to">{order.emailMasked}</Row>
                    <Row label="Paying wallet"><span className="font-mono">{shortAddress(order.walletAddress)}</span></Row>
                    <Row label="Total"><span className="text-base font-bold">{formatCents(order.totalUsdCents)}</span></Row>
                </dl>
            </section>

            {status === "paid" ? (
                <section role="status" className="rounded-xl border border-green bg-green/10 p-6 text-center">
                    <Check className="mx-auto mb-2 size-8 text-green" aria-hidden="true" />
                    <h2 className="font-display text-xl font-bold">Payment confirmed</h2>
                    <p className="mt-1 text-sm text-muted-foreground">Delivery details go to {order.emailMasked}. Keep this order ID for support.</p>
                    {explorerTx ? <a href={explorerTx} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1 text-sm text-primary hover:underline">View transaction <ExternalLink className="size-3.5" aria-hidden="true" /></a> : null}
                    <div className="mt-5"><Button asChild><Link href="/shop">Continue shopping</Link></Button></div>
                </section>
            ) : null}

            {status === "failed" ? (
                <section role="alert" className="rounded-xl border border-primary/50 bg-primary/10 p-6">
                    <h2 className="flex items-center gap-2 font-display text-xl font-bold"><AlertTriangle className="size-5 text-primary" aria-hidden="true" /> Payment problem</h2>
                    <p className="mt-2 text-sm">{order.failureReason ?? "We couldn’t verify this payment."}</p>
                    <p className="mt-2 text-xs text-muted-foreground">If funds left your wallet, contact support with order {order.id}.</p>
                    {explorerTx ? <a href={explorerTx} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1 text-sm text-primary hover:underline">View transaction <ExternalLink className="size-3.5" aria-hidden="true" /></a> : null}
                </section>
            ) : null}

            {orderExpired ? (
                <section role="alert" className="rounded-xl border border-border bg-surface p-6 text-center">
                    <Clock className="mx-auto mb-2 size-8 text-muted-foreground" aria-hidden="true" />
                    <h2 className="font-display text-xl font-bold">This order expired</h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Prices are locked for a short time. Start again to get a fresh quote.
                    </p>
                    <Button asChild className="mt-4">
                        <Link href={`/shop/${order.productId}`}>Start again</Link>
                    </Button>
                </section>
            ) : null}

            {status === "pending" ? (
                <section aria-live="polite" className="rounded-xl border border-border bg-surface p-5">
                    <h2 className="mb-4 font-display text-lg font-bold">Waiting for confirmation</h2>
                    <Timeline order={order} />
                    <p className="mt-4 text-xs text-muted-foreground">This updates automatically. You can safely leave this page and come back with the same link.</p>
                    {explorerTx ? <a href={explorerTx} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1 text-sm text-primary hover:underline">View transaction <ExternalLink className="size-3.5" aria-hidden="true" /></a> : null}
                </section>
            ) : null}

            {(status === "created" || status === "quoted") && !orderExpired ? (
                <section aria-labelledby="pay-title" className="space-y-4 rounded-xl border border-border bg-surface p-5">
                    <h2 id="pay-title" className="font-display flex gap-2 items-center text-lg font-bold">
                        Pay with MetaMask
                        <MetaMaskIcon size={35} title="MetaMask" className="metamask-icon" />
                    </h2>

                    <fieldset>
                        <legend className="mb-2 text-sm font-semibold">Currency</legend>
                        <div className="grid gap-2 sm:grid-cols-2">
                            {order.currencies.map((c) => (
                                <label key={c} className={cn("flex cursor-pointer items-center gap-3 rounded-lg border p-3 text-sm transition-colors", quote?.currency === c ? "border-primary bg-primary/10" : "border-border hover:border-primary")}>
                                    <input type="radio" name="currency" className="accent-primary" checked={quote?.currency === c} disabled={busy} onChange={() => void choose(c)} />
                                    <span><span className="block font-semibold">{CURRENCY_LABEL[c].title}</span><span className="text-xs text-muted-foreground">{CURRENCY_LABEL[c].hint}</span></span>
                                </label>
                            ))}
                        </div>
                    </fieldset>

                    {quote ? (
                        <dl className="divide-y divide-border rounded-lg border border-border px-3">
                            <Row label="You pay"><span className="text-base font-bold">{quote.amountDisplay} {quote.currency}</span></Row>
                            {quote.rateUsd ? <Row label="Rate">1 ETH = ${quote.rateUsd}</Row> : null}
                            <Row label="Network">{chainName(quote.chainId)}</Row>
                            <Row label="Recipient"><span className="font-mono">{shortAddress(quote.recipient)}</span><CopyButton value={quote.recipient} label="recipient address" /></Row>
                            <Row label="Quote expires"><span className={cn("flex items-center gap-1", quoteExpired && "text-primary")}><Clock className="size-3.5" aria-hidden="true" />{quoteExpired ? "Expired" : formatCountdown(quote.expiresAt - now)}</span></Row>
                            {balance !== null ? <Row label="Your balance"><span className={insufficient ? "text-primary" : ""}>{insufficient ? "Not enough for this payment" : "Sufficient"}</span></Row> : null}
                        </dl>
                    ) : (
                        <p className="text-sm text-muted-foreground">Choose a currency to lock in your price.</p>
                    )}

                    {wallet.isConnected && !sameAccount ? (
                        <p role="alert" className="flex gap-2 rounded-lg border border-primary/40 bg-primary/10 p-3 text-sm">
                            <AlertTriangle className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                            This order was created for {shortAddress(order.walletAddress)}. Switch to that account in MetaMask to pay.
                        </p>
                    ) : null}
                    {actionError || wallet.error ? (
                        <p role="alert" className="flex gap-2 rounded-lg border border-primary/40 bg-primary/10 p-3 text-sm">
                            <AlertTriangle className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />{actionError ?? wallet.error?.message}
                        </p>
                    ) : null}

                    {quote ? (
                        <Button size="lg" className="w-full" disabled={cta.disabled || busy} onClick={cta.run}>
                            {busy ? <Loader2 className="animate-spin" aria-hidden="true" /> : quoteExpired ? <RefreshCw aria-hidden="true" /> : null}
                            {paying ? "Confirm in MetaMask…" : submitting ? "Registering payment…" : cta.label}
                        </Button>
                    ) : null}

                    <p className="flex items-center gap-2 text-xs text-muted-foreground"><ShieldCheck className="size-3.5 shrink-0" aria-hidden="true" />MetaMask shows the exact amount before you confirm. We never see your keys.</p>

                    <details className="text-sm">
                        <summary className="cursor-pointer text-muted-foreground hover:text-foreground">Already paid? Enter your transaction hash</summary>
                        <form
                            className="mt-3 flex flex-col gap-2 sm:flex-row"
                            onSubmit={(e) => { e.preventDefault(); if (HASH_RE.test(manualHash.trim())) void register(manualHash.trim()); else setActionError("Enter a valid transaction hash (0x + 64 characters)."); }}
                        >
                            <label htmlFor="manual-hash" className="sr-only">Transaction hash</label>
                            <input id="manual-hash" value={manualHash} onChange={(e) => setManualHash(e.target.value)} placeholder="0x…" className="h-10 flex-1 rounded-lg border border-border bg-background px-3 font-mono text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
                            <Button type="submit" variant="outline" disabled={submitting}>Verify payment</Button>
                        </form>
                    </details>
                </section>
            ) : null}
        </div>
    );
}
import { randomBytes } from "node:crypto";
import { encodeFunctionData, erc20Abi, formatEther, formatUnits, getAddress, isAddress, toHex } from "viem";
import { getMaxQuantity, getProductById } from "@/lib/data/products";
import { ceilDiv, maskEmail, trimDecimals } from "@/lib/payments/server/amounts";
import { getEthUsdPrice, verifyPayment } from "@/lib/payments/server/chain";
import {
  getChainPay, getMerchantAddress, ORDER_TTL_MS, QUOTE_TTL_MS, REQUIRED_CONFIRMATIONS, TARGET_CHAIN_ID,
} from "@/lib/payments/server/config";
import { PaymentError } from "@/lib/payments/server/errors";
import { onOrderPaid } from "@/lib/payments/server/fulfillment";
import { orderStore, type ServerOrder } from "@/lib/payments/server/store";
import type { Order, PaymentCurrency, PaymentQuote } from "@/lib/payments/types";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const HASH_RE = /^0x[0-9a-fA-F]{64}$/;
const ID_RE = /^[0-9a-f]{32}$/;

export function toPublicOrder(o: ServerOrder): Order {
  const { email, ...rest } = o;
  return { ...rest, emailMasked: maskEmail(email) };
}

const bad = (message: string) => new PaymentError("invalid_request", message);

export async function createOrder(input: unknown): Promise<ServerOrder> {
  if (typeof input !== "object" || input === null) throw bad("Invalid request.");
  const b = input as Record<string, unknown>;
  const { productId, quantity, email, walletAddress, chainId } = b;

  if (typeof productId !== "string") throw bad("Missing product.");
  const product = getProductById(productId);
  if (!product) throw new PaymentError("not_found", "That product doesn’t exist.", 404);
  if (!product.inStock) throw new PaymentError("out_of_stock", "This product is out of stock.", 409);

  if (typeof quantity !== "number" || !Number.isInteger(quantity) || quantity < 1 || quantity > getMaxQuantity(product)) {
    throw bad("Invalid quantity.");
  }
  if (typeof email !== "string" || email.length > 254 || !EMAIL_RE.test(email.trim())) throw bad("Enter a valid email address.");
  if (typeof walletAddress !== "string" || !isAddress(walletAddress)) throw bad("Invalid wallet address.");
  if (chainId !== TARGET_CHAIN_ID) throw new PaymentError("wrong_network", "Please switch your wallet to the supported network.");

  getMerchantAddress(); // fail early if payments aren't configured
  const cfg = getChainPay(TARGET_CHAIN_ID);
  const now = Date.now();
  const order: ServerOrder = {
    id: randomBytes(16).toString("hex"),
    status: "created",
    productId: product.id,
    productName: product.name,
    quantity,
    // The price ALWAYS comes from our catalog, never from the request.
    totalUsdCents: Math.round(product.price * 100) * quantity,
    email: email.trim(),
    walletAddress: getAddress(walletAddress),
    chainId: TARGET_CHAIN_ID,
    currencies: cfg.usdc ? ["USDC", "ETH"] : ["ETH"],
    createdAt: now,
    expiresAt: now + ORDER_TTL_MS,
  };
  await orderStore.save(order);
  return order;
}

async function load(id: string): Promise<ServerOrder> {
  if (!ID_RE.test(id)) throw new PaymentError("not_found", "Order not found.", 404);
  const order = await orderStore.get(id);
  if (!order) throw new PaymentError("not_found", "Order not found.", 404);
  return order;
}

function expireIfNeeded(order: ServerOrder): ServerOrder {
  if ((order.status === "created" || order.status === "quoted") && Date.now() > order.expiresAt) {
    return { ...order, status: "expired" };
  }
  return order;
}

export async function quoteOrder(id: string, currencyInput: unknown): Promise<ServerOrder> {
  let order = expireIfNeeded(await load(id));
  if (order.status === "expired") { await orderStore.save(order); throw new PaymentError("expired", "This order has expired.", 410); }
  if (order.status !== "created" && order.status !== "quoted") throw new PaymentError("conflict", "This order can no longer be changed.", 409);

  const currency = currencyInput as PaymentCurrency;
  if (!order.currencies.includes(currency)) throw bad("Unsupported payment currency.");

  const merchant = getMerchantAddress();
  const cfg = getChainPay(order.chainId);
  const cents = BigInt(order.totalUsdCents);
  const expiresAt = Math.min(Date.now() + QUOTE_TTL_MS, order.expiresAt);
  let quote: PaymentQuote;

  if (currency === "ETH") {
    const price = await getEthUsdPrice(order.chainId); // 8 decimals
    const wei = ceilDiv(cents * 10n ** 24n, price); // cents/100 USD ÷ (price/1e8) × 1e18
    quote = {
      currency, chainId: order.chainId, recipient: merchant, expiresAt, decimals: 18,
      amount: wei.toString(),
      amountDisplay: trimDecimals(formatEther(wei), 6, 4),
      rateUsd: trimDecimals(formatUnits(price, 8), 2, 2),
      tx: { to: merchant, value: toHex(wei), data: "0x" },
    };
  } else {
    if (!cfg.usdc) throw bad("USDC isn’t available on this network.");
    const units = cents * 10_000n; // cents → 6-decimal USDC
    quote = {
      currency, chainId: order.chainId, recipient: merchant, expiresAt, decimals: cfg.usdc.decimals,
      amount: units.toString(),
      amountDisplay: trimDecimals(formatUnits(units, cfg.usdc.decimals), 6, 2),
      tokenAddress: cfg.usdc.address,
      tx: {
        to: cfg.usdc.address,
        value: "0x0",
        data: encodeFunctionData({ abi: erc20Abi, functionName: "transfer", args: [merchant, units] }),
      },
    };
  }

  order = { ...order, status: "quoted", quote };
  await orderStore.save(order);
  return order;
}

export async function attachPayment(id: string, txHashInput: unknown): Promise<ServerOrder> {
  const order = await load(id);
  if (typeof txHashInput !== "string" || !HASH_RE.test(txHashInput)) throw bad("Invalid transaction hash.");
  const txHash = txHashInput.toLowerCase();

  if (order.payment && order.payment.txHash !== txHash) throw new PaymentError("conflict", "A different payment is already attached to this order.", 409);
  if (!order.payment) {
    if (order.status !== "quoted" || !order.quote) throw new PaymentError("conflict", "Choose a payment option before paying.", 409);
    if (!(await orderStore.claimTxHash(txHash, order.id))) throw new PaymentError("conflict", "This transaction was already used for another order.", 409);
    order.payment = { txHash, confirmations: 0, required: REQUIRED_CONFIRMATIONS, submittedAt: Date.now() };
    order.status = "pending";
    await orderStore.save(order);
  }
  return refreshOrder(order.id);
}

/** Loads an order and, if a payment is in flight, re-checks it on-chain. */
export async function refreshOrder(id: string): Promise<ServerOrder> {
  let order = expireIfNeeded(await load(id));

  if (order.status === "pending" && order.payment) {
    const result = await verifyPayment(order);
    if (result.state === "failed") {
      order = { ...order, status: "failed", failureReason: result.reason };
    } else {
      order = { ...order, payment: { ...order.payment, confirmations: result.confirmations } };
      if (result.state === "paid") {
        order = { ...order, status: "paid" };
        await orderStore.save(order);
        await onOrderPaid(order);
        return order;
      }
    }
  }
  await orderStore.save(order);
  return order;
}
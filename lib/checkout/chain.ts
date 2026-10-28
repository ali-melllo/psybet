import {
    createPublicClient, erc20Abi, http, parseAbi, parseEventLogs,
    type Address, type Chain, type Hex, type HttpTransport, type PublicClient,
  } from "viem";
  import {
    getChainPay, getMerchantAddress, REQUIRED_CONFIRMATIONS, TX_NOT_FOUND_TIMEOUT_MS,
  } from "@/lib/payments/server/config";
  import { PaymentError } from "@/lib/payments/server/errors";
  import type { ServerOrder } from "@/lib/payments/server/store";
  
  type Client = PublicClient<HttpTransport, Chain>;
  const clients = new Map<number, Client>();
  
  export function getClient(chainId: number): Client {
    let client = clients.get(chainId);
    if (!client) {
      const cfg = getChainPay(chainId);
      client = createPublicClient({ chain: cfg.chain, transport: http(cfg.rpcUrl) });
      clients.set(chainId, client);
    }
    return client;
  }
  
  const aggregatorAbi = parseAbi([
    "function latestRoundData() view returns (uint80 roundId, int256 answer, uint256 startedAt, uint256 updatedAt, uint80 answeredInRound)",
  ]);
  const MAX_FEED_AGE_S = 3 * 60 * 60;
  
  /** USD price of 1 ETH from the on-chain Chainlink feed, with 8 decimals. */
  export async function getEthUsdPrice(chainId: number): Promise<bigint> {
    try {
      const feed = getChainPay(chainId).ethUsdFeed;
      const [, answer, , updatedAt] = await getClient(chainId).readContract({
        address: feed, abi: aggregatorAbi, functionName: "latestRoundData",
      });
      const age = Math.floor(Date.now() / 1000) - Number(updatedAt);
      if (answer <= 0n || age > MAX_FEED_AGE_S) throw new Error("stale price");
      return answer;
    } catch (error) {
      if (error instanceof PaymentError) throw error;
      console.error("[payments] price feed failed", error);
      throw new PaymentError("unavailable", "Couldn’t fetch a live ETH price. Pay with USDC or try again shortly.", 503);
    }
  }
  
  export type Verification =
    | { state: "pending"; confirmations: number }
    | { state: "paid"; confirmations: number }
    | { state: "failed"; reason: string };
  
  const isNotFound = (e: unknown): boolean => e instanceof Error && /NotFound/.test(e.name);
  const same = (a: string, b: string): boolean => a.toLowerCase() === b.toLowerCase();
  
  /** Verifies the submitted tx against the stored quote. Never trusts anything the browser says about it. */
  export async function verifyPayment(order: ServerOrder): Promise<Verification> {
    const { quote, payment } = order;
    if (!quote || !payment) return { state: "failed", reason: "No payment was submitted." };
    const client = getClient(order.chainId);
    const hash = payment.txHash as Hex;
    const merchant = getMerchantAddress();
  
    try {
      let receipt = null;
      try { receipt = await client.getTransactionReceipt({ hash }); }
      catch (e) { if (!isNotFound(e)) throw e; }
  
      if (!receipt) {
        if (Date.now() - payment.submittedAt > TX_NOT_FOUND_TIMEOUT_MS) {
          return { state: "failed", reason: "The transaction was never confirmed on-chain (it may have been dropped or replaced)." };
        }
        return { state: "pending", confirmations: 0 };
      }
      if (receipt.status !== "success") return { state: "failed", reason: "The transaction failed on-chain. No funds were received." };
  
      const expected = BigInt(quote.amount);
      if (!same(receipt.from, order.walletAddress)) return { state: "failed", reason: "The payment came from a different wallet than the order." };
  
      if (quote.currency === "ETH") {
        const tx = await client.getTransaction({ hash });
        if (!tx.to || !same(tx.to, merchant) || tx.value < expected) {
          return { state: "failed", reason: "The transaction doesn’t match this order’s recipient or amount." };
        }
      } else {
        const token = quote.tokenAddress as Address | undefined;
        const logs = token ? parseEventLogs({ abi: erc20Abi, eventName: "Transfer", logs: receipt.logs }) : [];
        const ok = logs.some(
          (l) => token && same(l.address, token) && same(l.args.from, order.walletAddress) && same(l.args.to, merchant) && l.args.value >= expected,
        );
        if (!ok) return { state: "failed", reason: "The transaction doesn’t transfer the required USDC to us." };
      }
  
      const latest = await client.getBlockNumber();
      const confirmations = Number(latest - receipt.blockNumber) + 1;
      return confirmations >= REQUIRED_CONFIRMATIONS ? { state: "paid", confirmations } : { state: "pending", confirmations };
    } catch (error) {
      // Transient RPC trouble must never fail a real payment – stay pending and retry on the next poll.
      console.error("[payments] verification error", error);
      return { state: "pending", confirmations: 0 };
    }
  }
import { handle, readJson } from "@/lib/payments/server/http";
import { quoteOrder, toPublicOrder } from "@/lib/payments/server/orders";

export const dynamic = "force-dynamic";

export async function POST(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  return handle(async () => {
    const body = (await readJson(req)) as { currency?: unknown } | null;
    return { order: toPublicOrder(await quoteOrder(id, body?.currency)) };
  });
}

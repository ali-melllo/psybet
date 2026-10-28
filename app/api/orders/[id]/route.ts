import { handle } from "@/lib/payments/server/http";
import { refreshOrder, toPublicOrder } from "@/lib/payments/server/orders";

export const dynamic = "force-dynamic";

export async function GET(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  return handle(async () => ({ order: toPublicOrder(await refreshOrder(id)) }));
}

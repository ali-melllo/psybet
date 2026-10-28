import { handle, readJson } from "@/lib/payments/server/http";
import { createOrder, toPublicOrder } from "@/lib/payments/server/orders";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  return handle(async () => ({ order: toPublicOrder(await createOrder(await readJson(req))) }));
}

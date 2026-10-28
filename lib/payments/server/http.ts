import { NextResponse } from "next/server";
import { PaymentError } from "@/lib/payments/server/errors";

const headers = { "Cache-Control": "no-store" };

export async function handle<T>(fn: () => Promise<T>): Promise<NextResponse> {
  try {
    return NextResponse.json(await fn(), { headers });
  } catch (error) {
    if (error instanceof PaymentError) {
      return NextResponse.json({ error: { code: error.code, message: error.message } }, { status: error.status, headers });
    }
    console.error("[payments] unexpected error", error);
    return NextResponse.json({ error: { code: "internal", message: "Something went wrong. Please try again." } }, { status: 500, headers });
  }
}

export const readJson = (req: Request): Promise<unknown> => req.json().catch(() => null);

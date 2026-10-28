import type { Metadata } from "next";
import { PaymentDetails } from "@/components/payment/payment-details";

export const metadata: Metadata = { title: "Payment", robots: { index: false, follow: false } };

export default async function OrderPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <main id="main" className="container-page max-w-2xl py-8 md:py-10">
      <PaymentDetails orderId={id} />
    </main>
  );
}

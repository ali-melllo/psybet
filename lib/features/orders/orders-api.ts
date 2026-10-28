import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { readErrorMessage, type Order, type PaymentCurrency } from "@/lib/payments/types";

const unwrap = (r: { order: Order }): Order => r.order;

export const ordersApi = createApi({
  reducerPath: "ordersApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/orders" }),
  tagTypes: ["Order"],
  endpoints: (build) => ({
    getOrder: build.query<Order, string>({
      query: (id) => `/${id}`,
      transformResponse: unwrap,
      providesTags: (_r, _e, id) => [{ type: "Order", id }],
    }),
    quoteOrder: build.mutation<Order, { id: string; currency: PaymentCurrency }>({
      query: ({ id, currency }) => ({ url: `/${id}/quote`, method: "POST", body: { currency } }),
      transformResponse: unwrap,
      invalidatesTags: (_r, _e, { id }) => [{ type: "Order", id }],
    }),
    submitPayment: build.mutation<Order, { id: string; txHash: string }>({
      query: ({ id, txHash }) => ({ url: `/${id}/payment`, method: "POST", body: { txHash } }),
      transformResponse: unwrap,
      invalidatesTags: (_r, _e, { id }) => [{ type: "Order", id }],
    }),
  }),
});

export const { useGetOrderQuery, useQuoteOrderMutation, useSubmitPaymentMutation } = ordersApi;

/** Turns any RTK Query error into a user-facing sentence. */
export function getApiErrorMessage(error: unknown): string {
  if (typeof error === "object" && error !== null) {
    if ("data" in error) {
      const msg = readErrorMessage((error as { data: unknown }).data);
      if (msg) return msg;
    }
    if ("status" in error && (error as { status: unknown }).status === "FETCH_ERROR") {
      return "Network error. Check your connection and try again.";
    }
  }
  return "Something went wrong. Please try again.";
}

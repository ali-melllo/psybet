import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "@/lib/env";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  tagTypes: ["Packs", "Stats", "Roadmap"],
  keepUnusedDataFor: 300,
  refetchOnReconnect: true,
  endpoints: () => ({}),
});

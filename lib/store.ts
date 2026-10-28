import { configureStore } from "@reduxjs/toolkit";
import { api } from "@/lib/features/api/api-slice";
import marketplaceReducer from "@/lib/features/marketplace/marketplace-slice";
import { ordersApi } from "@/lib/features/orders/orders-api";

/** Factory: one store per client session (safe for the App Router). */
export const makeStore = () =>
  configureStore({
    reducer: {
      [api.reducerPath]: api.reducer,
      [ordersApi.reducerPath]: ordersApi.reducer,
      marketplace: marketplaceReducer,
    },
    middleware: (getDefault) => getDefault().concat(api.middleware, ordersApi.middleware),
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

import { configureStore } from "@reduxjs/toolkit";
import { api } from "@/lib/features/api/api-slice";
import marketplaceReducer from "@/lib/features/marketplace/marketplace-slice";

/** Factory: one store per client session (safe for the App Router). */
export const makeStore = () =>
  configureStore({
    reducer: { [api.reducerPath]: api.reducer, marketplace: marketplaceReducer },
    middleware: (getDefault) => getDefault().concat(api.middleware),
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

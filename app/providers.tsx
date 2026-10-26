"use client";

import { domAnimation, LazyMotion } from "framer-motion";
import { ThemeProvider } from "next-themes";
import { useState } from "react";
import { Provider } from "react-redux";
import { DemoNotice } from "@/components/ui/demo-notice";
import { makeStore } from "@/lib/store";
import { WalletProvider } from "@/components/wallet/wallet-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  const [store] = useState(makeStore);
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
      <Provider store={store}>
        <LazyMotion features={domAnimation} strict>
          <WalletProvider>
            {children}
            <DemoNotice />
          </WalletProvider>
        </LazyMotion>
      </Provider>
    </ThemeProvider>
  );
}

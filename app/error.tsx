"use client";

import { Button } from "@/components/ui/button";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main id="main" className="container-page grid min-h-[60vh] place-content-center gap-4 text-center">
      <h1 className="font-display text-3xl font-bold">Something went wrong</h1>
      <p className="text-muted-foreground">An unexpected error occurred. Please try again.</p>
      <div>
        <Button onClick={reset}>Try again</Button>
      </div>
    </main>
  );
}

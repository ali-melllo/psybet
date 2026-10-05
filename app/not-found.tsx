import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Mascot } from "@/components/ui/mascot";

export default function NotFound() {
  return (
    <main id="main" className="container-page grid min-h-[70vh] place-content-center justify-items-center gap-4 text-center">
      <Mascot className="w-40" />
      <h1 className="font-display text-4xl font-bold">404 – Pack not found</h1>
      <p className="text-muted-foreground">The page you’re looking for doesn’t exist.</p>
      <Button asChild>
        <Link href="/">Back home</Link>
      </Button>
    </main>
  );
}

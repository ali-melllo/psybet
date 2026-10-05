import Link from "next/link";
import { cn } from "@/lib/utils";
import Image from "next/image";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Psybet home"
      className={cn("font-display text-2xl font-extrabold italic tracking-tighter", className)}
    >
      <Image
        width={200}
        height={100}
        alt={"Psybet"}
        src={"/images/icons/logo.png"}
      />
    </Link>
  );
}

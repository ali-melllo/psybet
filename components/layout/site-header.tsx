"use client";

import { m } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { SocialLinks } from "@/components/ui/social-links";
import { navLinks } from "@/lib/data/landing-page";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <m.header
      data-reveal
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className={cn(
        "sticky top-0 z-50 w-full",
        "transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1.03)]",
        "will-change-[max-width,padding,top,border-radius,background-color]",
        scrolled
          ? "bg-primary shadow-xl md:bg-background"
          : "bg-primary"
      )}
    >
      <div className="container-page py-8 md:py-10 flex h-14 items-center gap-8">
        <Logo />
        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-7 font-semibold">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={`transition-colors ${ scrolled ? "hover:text-primary" : "hover:text-background"} `}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="ml-auto flex items-center gap-1">
          <SocialLinks scrolled={scrolled} className="hidden lg:flex" only={["discord", "x", "instagram"]} />
          {/* <ThemeToggle /> */}
          <Button asChild className="ml-2 font-bold hidden px-10 sm:inline-flex bg-linear-to-br from-pink-700 to-red-800 hover:scale-105 transition-all duration-200 shadow-xl ">
            {/* Integration point: point at the real dapp URL when available. */}
            <Link href="/#packs">Connect Wallet</Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </Button>
        </div>
      </div>
      {open ? (
        <nav id="mobile-nav" aria-label="Mobile" className="border-t border-border bg-surface md:hidden">
          <ul className="container-page flex flex-col gap-1 py-3">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-2 py-3 text-sm font-semibold hover:bg-surface-2"
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <Button asChild className="w-full ">
                <Link href="/#packs" onClick={() => setOpen(false)}>
                  Connect Wallet
                </Link>
              </Button>
            </li>
          </ul>
        </nav>
      ) : null}
    </m.header>
  );
}

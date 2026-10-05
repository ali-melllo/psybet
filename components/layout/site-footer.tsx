import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { Reveal } from "@/components/ui/reveal";
import { SocialLinks } from "@/components/ui/social-links";
import { navLinks } from "@/lib/data/landing-page";

export function SiteFooter() {
  return (
    <footer className="mt-10 border-t border-border pb-[env(safe-area-inset-bottom)]">
      <Reveal className="container-page flex flex-col items-start gap-4 py-6 md:flex-row md:items-center md:gap-8">
        <Logo className="text-xl" />
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-xs font-semibold">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-primary">
                  {l.label}
                </Link>
              </li>
            ))}
            <li><Link href="/privacy" className="hover:text-primary">Privacy</Link></li>
            <li><Link href="/terms" className="hover:text-primary">Terms</Link></li>
          </ul>
        </nav>
        <SocialLinks scrolled only={["discord", "x", "instagram"]} className="md:ml-auto" />
        <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Psybet. All rights reserved.</p>
      </Reveal>
    </footer>
  );
}

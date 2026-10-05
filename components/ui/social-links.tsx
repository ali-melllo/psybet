import { Instagram, MessagesSquare, Twitter, Youtube, type LucideIcon } from "lucide-react";
import { socialLinks } from "@/lib/data/landing-page";
import type { SocialId } from "@/types/marketplace";
import { cn } from "@/lib/utils";
import { SVGProps } from "react";

type IconComponent = LucideIcon | React.ComponentType<SVGProps<SVGSVGElement>>;

const DiscordIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 -28.5 256 256"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M216.856339,16.5966031 C200.285002,8.84328665 182.566144,3.2084988 164.041564,0 C161.766523,4.11318106 159.108624,9.64549908 157.276099,14.0464379 C137.583995,11.0849896 118.072967,11.0849896 98.7430163,14.0464379 C96.9108417,9.64549908 94.1925838,4.11318106 91.8971895,0 C73.3526068,3.2084988 55.6133949,8.86399117 39.0420583,16.6376612 C5.61752293,67.146514 -3.4433191,116.400813 1.08711069,164.955721 C23.2560196,181.510915 44.7403634,191.567697 65.8621325,198.148576 C71.0772151,190.971126 75.7283628,183.341335 79.7352139,175.300261 C72.104019,172.400575 64.7949724,168.822202 57.8887866,164.667963 C59.7209612,163.310589 61.5131304,161.891452 63.2445898,160.431257 C105.36741,180.133187 151.134928,180.133187 192.754523,160.431257 C194.506336,161.891452 196.298154,163.310589 198.110326,164.667963 C191.183787,168.842556 183.854737,172.420929 176.223542,175.320965 C180.230393,183.341335 184.861538,190.991831 190.096624,198.16893 C211.238746,191.588051 232.743023,181.531619 254.911949,164.955721 C260.227747,108.668201 245.831087,59.8662432 216.856339,16.5966031 Z M85.4738752,135.09489 C72.8290281,135.09489 62.4592217,123.290155 62.4592217,108.914901 C62.4592217,94.5396472 72.607595,82.7145587 85.4738752,82.7145587 C98.3405064,82.7145587 108.709962,94.5189427 108.488529,108.914901 C108.508531,123.290155 98.3405064,135.09489 85.4738752,135.09489 Z M170.525237,135.09489 C157.88039,135.09489 147.510584,123.290155 147.510584,108.914901 C147.510584,94.5396472 157.658606,82.7145587 170.525237,82.7145587 C183.391518,82.7145587 193.761324,94.5189427 193.539891,108.914901 C193.539891,123.290155 183.391518,135.09489 170.525237,135.09489 Z"
      fill="currentColor"
      fillRule="nonzero"
    />
  </svg>
);

const XIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    fill="none"
    {...props}
    >
    <path 
    fill="currentColor"
      fillRule="nonzero"
    d="M12.6 0.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867 -5.07 -4.425 5.07H0.316l5.733 -6.57L0 0.75h5.063l3.495 4.633L12.601 0.75Zm-0.86 13.028h1.36L4.323 2.145H2.865z" strokeWidth="1"></path>
  </svg>
)

export function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g>
        <path
          d="M22.3,8.4c-0.8,0-1.4,0.6-1.4,1.4c0,0.8,0.6,1.4,1.4,1.4
          c0.8,0,1.4-0.6,1.4-1.4C23.7,9,23.1,8.4,22.3,8.4z"
          fill="currentColor"
        />

        <path
          d="M16,10.2c-3.3,0-5.9,2.7-5.9,5.9s2.7,5.9,5.9,5.9
          s5.9-2.7,5.9-5.9S19.3,10.2,16,10.2z
          M16,19.9c-2.1,0-3.8-1.7-3.8-3.8
          c0-2.1,1.7-3.8,3.8-3.8
          c2.1,0,3.8,1.7,3.8,3.8
          C19.8,18.2,18.1,19.9,16,19.9z"
          fill="currentColor"
        />

        <path
          d="M20.8,4h-9.5C7.2,4,4,7.2,4,11.2v9.5
          c0,4,3.2,7.2,7.2,7.2h9.5
          c4,0,7.2-3.2,7.2-7.2v-9.5
          C28,7.2,24.8,4,20.8,4z
          M25.7,20.8c0,2.7-2.2,5-5,5h-9.5
          c-2.7,0-5-2.2-5-5v-9.5
          c0-2.7,2.2-5,5-5h9.5
          c2.7,0,5,2.2,5,5V20.8z"
          fill="currentColor"
        />
      </g>
    </svg>
  );
}

const icons: Record<SocialId, any> = {
  discord: DiscordIcon,
  x: XIcon,
  instagram: InstagramIcon,
  youtube: Youtube,
};

interface SocialLinksProps { className?: string; only?: SocialId[] , scrolled?: boolean }

export function SocialLinks({ className, only , scrolled }: SocialLinksProps) {
  const items = only ? socialLinks.filter((s) => only.includes(s.id)) : socialLinks;
  return (
    <ul className={cn("flex items-center gap-1", className)}>
      {items.map((s) => {
        const Icon = icons[s.id];
        return (
          <li key={s.id}>
            <a
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="grid size-9 place-items-center rounded-lg text-muted-foreground transition-colors hover:text-primary"
            >
              <Icon className={cn(s.id === "x"? "size-4" :"size-6" , scrolled ? "" : "stroke-black text-black stroke-1!")} aria-hidden="true" />
            </a>
          </li>
        );
      })}
    </ul>
  );
}

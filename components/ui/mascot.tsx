import { cn } from "@/lib/utils";

interface MascotProps {
  className?: string;
  /** Provide to expose the mascot to assistive tech; omitted = decorative. */
  title?: string;
}

/**
 * Vector stand-in for the PSYBET mascot. Swap for the real artwork by rendering
 * <Image src="/images/mascot/..." /> here; every section imports this component.
 */
export function Mascot({ className, title }: MascotProps) {
  return (
    <svg
      viewBox="0 0 200 190"
      className={cn("text-primary", className)}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g stroke="#080A10" strokeWidth="5" strokeLinejoin="round" strokeLinecap="round">
        <path d="M175 150c30 0 30-60 5-70" fill="none" stroke="currentColor" strokeWidth="12" />
        <path d="M30 70 20 10 85 40Z M170 70 180 10 115 40Z" fill="currentColor" />
        <ellipse cx="100" cy="105" rx="82" ry="75" fill="currentColor" />
        <circle cx="68" cy="82" r="28" fill="#fff" />
        <circle cx="132" cy="82" r="28" fill="#fff" />
        <circle cx="72" cy="86" r="13" fill="#080A10" />
        <circle cx="128" cy="86" r="13" fill="#080A10" />
        <path d="M38 118Q100 135 162 118 160 168 100 168 40 168 38 118Z" fill="#fff" />
        <path d="M60 124v40M80 128v40M100 130v38M120 128v40M140 124v40" strokeWidth="3" />
      </g>
    </svg>
  );
}

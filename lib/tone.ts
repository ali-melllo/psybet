import type { Tone } from "@/types/marketplace";

interface ToneStyle { text: string; solid: string; onSolid: string; border: string; soft: string }

/** Full class strings so Tailwind can detect them. */
export const toneStyles: Record<Tone, ToneStyle> = {
  pink: { text: "text-primary", solid: "bg-primary", onSolid: "text-white", border: "border-primary", soft: "bg-primary/15" },
  blue: { text: "text-blue", solid: "bg-blue", onSolid: "text-[#080A10]", border: "border-blue", soft: "bg-blue/15" },
  green: { text: "text-green", solid: "bg-green", onSolid: "text-[#080A10]", border: "border-green", soft: "bg-green/15" },
  neutral: { text: "text-muted-foreground", solid: "bg-muted-foreground", onSolid: "text-background", border: "border-border", soft: "bg-surface-2" },
};

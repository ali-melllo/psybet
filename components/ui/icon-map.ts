import {
  Gamepad2, Gift, ImageIcon, MessagesSquare, Package, Rocket, ShieldCheck, Sparkles, Users, Wallet,
  type LucideIcon,
} from "lucide-react";
import type { IconName } from "@/types/marketplace";

export const iconMap: Record<IconName, LucideIcon> = {
  users: Users,
  image: ImageIcon,
  discord: MessagesSquare,
  shield: ShieldCheck,
  gift: Gift,
  gamepad: Gamepad2,
  wallet: Wallet,
  package: Package,
  sparkles: Sparkles,
  rocket: Rocket,
};

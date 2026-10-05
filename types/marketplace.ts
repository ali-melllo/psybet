export type Tone = "pink" | "blue" | "green" | "neutral";
export type RarityTier = "Legendary" | "Epic" | "Rare" | "Uncommon" | "Common";
export type IconName =
  | "users" | "image" | "discord" | "shield" | "gift"
  | "gamepad" | "wallet" | "package" | "sparkles" | "rocket";
export type SocialId = "discord" | "x" | "instagram" | "youtube";
export type RoadmapStatus = "completed" | "in-progress" | "upcoming";

export interface NavLink { label: string; href: string }
export interface SocialLink { id: SocialId; label: string; href: string }

export interface MarketplaceStat { id: string; label: string; value: string; icon: IconName; tone: Tone, image: string }

export interface RarityChip { tier: RarityTier; chance: number }
export interface NftPack {
  id: string;
  name: string;
  badge: RarityTier;
  supply: number;
  priceSol: number;
  image: string;
  tone: Tone;
  rarities: RarityChip[];
}

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: IconName,
  image: string;
}

export interface ProcessStep { id: string; title: string; description: string; icon: IconName; tone: Tone , image : string }
export interface RoadmapMilestone {
  id: string;
  title: string;
  description: string;
  status: RoadmapStatus;
  icon: IconName;
  image:string;
  tone: Tone;
}
export interface Testimonial { id: string; name: string; handle: string; quote: string; rating: number; tone: Tone }
export interface FaqItem { id: string; question: string; answer: string }

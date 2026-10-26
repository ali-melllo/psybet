import { Bot, Film, Gamepad2, Gift, KeyRound, Music2, type LucideIcon } from "lucide-react";

export type CategoryId = "gaming-accounts" | "game-keys" | "ai" | "streaming" | "music" | "gift-cards";
export type Delivery = "instant" | "1h";

export interface Product {
  id: string;
  name: string;
  description: string;
  category: CategoryId;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  delivery: Delivery;
  badge?: string;
  /** Overrides the category default. */
  highlights?: string[];
  maxQuantity?: number;
}

export interface Category { id: CategoryId; label: string; Icon: LucideIcon }

export const CATEGORY_BY_ID: Record<CategoryId, Category> = {
  "gaming-accounts": { id: "gaming-accounts", label: "Gaming Accounts", Icon: Gamepad2 },
  "game-keys": { id: "game-keys", label: "Steam & Game Keys", Icon: KeyRound },
  ai: { id: "ai", label: "AI Accounts", Icon: Bot },
  streaming: { id: "streaming", label: "Movies & TV", Icon: Film },
  music: { id: "music", label: "Music", Icon: Music2 },
  "gift-cards": { id: "gift-cards", label: "Gift Cards", Icon: Gift },
};
export const CATEGORIES: Category[] = Object.values(CATEGORY_BY_ID);

interface CategoryDefaults { highlights: string[]; terms: string[]; maxQuantity: number }

const COMMON_TERMS = [
  "Digital product: delivered to your email and your order page, nothing ships physically.",
  "Check the platform’s own terms of service before purchasing.",
];

export const CATEGORY_DEFAULTS: Record<CategoryId, CategoryDefaults> = {
  "gaming-accounts": {
    maxQuantity: 1,
    highlights: ["Access details delivered securely after payment", "Library and region listed before you buy", "Replacement if access fails within the warranty period"],
    terms: [...COMMON_TERMS, "Do not change the account email within the first 24 hours."],
  },
  "game-keys": {
    maxQuantity: 5,
    highlights: ["Instant code delivery", "Redeemable on the official platform", "Region information shown on the product"],
    terms: [...COMMON_TERMS, "Codes cannot be refunded once revealed."],
  },
  ai: {
    maxQuantity: 3,
    highlights: ["Activation on your own account where applicable", "Step-by-step activation guide", "Support if activation fails"],
    terms: [...COMMON_TERMS, "Plans renew according to the provider’s billing rules."],
  },
  streaming: {
    maxQuantity: 3,
    highlights: ["Private profile access", "HD / 4K where the plan supports it", "Warranty for the full subscription period"],
    terms: [...COMMON_TERMS, "Do not share credentials with others."],
  },
  music: {
    maxQuantity: 3,
    highlights: ["Ad-free listening and offline downloads", "Works across your devices", "Warranty for the full subscription period"],
    terms: COMMON_TERMS,
  },
  "gift-cards": {
    maxQuantity: 5,
    highlights: ["Instant code delivery", "Stated region only", "Redeem directly in the store"],
    terms: [...COMMON_TERMS, "Gift card codes cannot be refunded once revealed."],
  },
};

const IMG = "/images/packs/spotify.webp"; // placeholder – replace per product

/** Demo data only – swap for your API / DB. */
export const DEMO_PRODUCTS: Product[] = [
  { id: "p1", name: "PS5 Account – 20 Games", description: "Primary PS5 account with a curated library of 20 titles.", category: "gaming-accounts", price: 39.9, originalPrice: 59.9, image: "/images/packs/ps5.png", rating: 4.8, reviews: 312, inStock: true, delivery: "1h", badge: "Best seller" },
  { id: "p2", name: "Xbox Game Pass Ultimate – 3 Months", description: "Hundreds of games on console, PC and cloud.", category: "gaming-accounts", price: 29.5, image: "/images/packs/clash-royal.jpg", rating: 4.6, reviews: 187, inStock: true, delivery: "instant" },
  { id: "p3", name: "Steam Wallet Gift Card $50", description: "Global-region wallet code, redeemable instantly.", category: "game-keys", price: 48, image: "/images/packs/steam.webp", rating: 4.9, reviews: 954, inStock: true, delivery: "instant", badge: "Popular" },
  { id: "p4", name: "Elden Ring – Steam Key", description: "Base game key for Steam. Region-free.", category: "game-keys", price: 32.4, originalPrice: 39.99, image: "/images/packs/dota2.jpg", rating: 4.7, reviews: 241, inStock: true, delivery: "instant" },
  { id: "p5", name: "ChatGPT Plus – 1 Month", description: "Private upgrade of your own account for one month.", category: "ai", price: 18.9, image: "/images/packs/gpt.webp", rating: 4.5, reviews: 402, inStock: true, delivery: "1h", badge: "Hot" },
  { id: "p6", name: "Claude Pro – 1 Month", description: "Subscription activation for a month of higher limits.", category: "ai", price: 19.5, image: "/images/packs/gta-vi.jpg", rating: 4.7, reviews: 133, inStock: true, delivery: "1h" },
  { id: "p7", name: "Midjourney Standard – 1 Month", description: "Image generation plan with fast GPU hours.", category: "ai", price: 24, image: "/images/packs/cod.png", rating: 4.3, reviews: 76, inStock: false, delivery: "1h" },
  { id: "p8", name: "Netflix Premium – 6 Months", description: "4K plan on a private profile, 6-month warranty.", category: "streaming", price: 44.9, originalPrice: 71.94, image: "/images/packs/csgo.jpg", rating: 4.4, reviews: 520, inStock: true, delivery: "instant" },
  { id: "p9", name: "Disney+ Annual", description: "Twelve months of Disney, Pixar, Marvel and Star Wars.", category: "streaming", price: 59, image: "/images/packs/spotify.webp", rating: 4.5, reviews: 98, inStock: true, delivery: "1h" },
  { id: "p10", name: "Spotify Premium – 12 Months", description: "Ad-free music, offline listening, unlimited skips.", category: "music", price: 54.9, originalPrice: 119.88, image: "/images/packs/spotify.webp", rating: 4.8, reviews: 1204, inStock: true, delivery: "instant", badge: "Best value" },
  { id: "p11", name: "Apple Music – 3 Months", description: "Lossless audio and spatial sound on all your devices.", category: "music", price: 12.9, image: "/images/packs/spotify.webp", rating: 4.4, reviews: 61, inStock: true, delivery: "instant" },
  { id: "p12", name: "PlayStation Store Card $25", description: "US-region PSN credit delivered as a code.", category: "gift-cards", price: 24.5, image: "/images/packs/spotify.webp", rating: 4.9, reviews: 689, inStock: true, delivery: "instant" },
];


export const getProductById = (id: string): Product | undefined => DEMO_PRODUCTS.find((p) => p.id === id);

export const getRelatedProducts = (product: Product, limit = 3): Product[] =>
  DEMO_PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, limit);

export const getHighlights = (p: Product): string[] => p.highlights ?? CATEGORY_DEFAULTS[p.category].highlights;
export const getMaxQuantity = (p: Product): number => p.maxQuantity ?? CATEGORY_DEFAULTS[p.category].maxQuantity;

import type {
  FaqItem, Feature, MarketplaceStat, NavLink, NftPack, ProcessStep,
  RoadmapMilestone, SocialLink, Testimonial,
} from "@/types/marketplace";

export const navLinks: NavLink[] = [
  { label: "Games", href: "/#games" },
  { label: "NFT Packs", href: "/#packs" },
  { label: "Roadmap", href: "/#roadmap" },
  { label: "FAQ", href: "/#faq" },
];

export const socialLinks: SocialLink[] = [
  { id: "discord", label: "Psybet on Discord", href: "https://discord.com" },
  { id: "x", label: "Psybet on X", href: "https://x.com" },
  { id: "instagram", label: "Psybet on Instagram", href: "https://instagram.com" },
  { id: "youtube", label: "Psybet on YouTube", href: "https://youtube.com" },
];

/** Demo data – not live blockchain information. */
export const demoStats: MarketplaceStat[] = [
  { id: "holders", label: "Total Holders", value: "48,732", icon: "users", tone: "pink" , image : "/images/icons/people.png"},
  { id: "minted", label: "NFTs Minted", value: "312,846", icon: "image", tone: "blue" ,image : "/images/icons/contact.png"},
  { id: "community", label: "Community Members", value: "24,891", icon: "discord", tone: "green" ,image : "/images/icons/discord.png"},
  { id: "packs", label: "Packs Released", value: "100+", icon: "shield", tone: "pink" ,image : "/images/icons/shield.png"},
];

export const demoPacks: NftPack[] = [
  { id: "legends", name: "Psybet Legends Pack", badge: "Legendary", supply: 10000, priceSol: 2.5, tone: "pink",
    rarities: [{ tier: "Legendary", chance: 2 }, { tier: "Epic", chance: 8 }, { tier: "Rare", chance: 20 }, { tier: "Common", chance: 70 }] , image :"/images/nft-packs/sample-1.png" },
  { id: "chaos", name: "Chaos Pack", badge: "Epic", supply: 5000, priceSol: 1.2, tone: "blue",
    rarities: [{ tier: "Epic", chance: 5 }, { tier: "Rare", chance: 15 }, { tier: "Common", chance: 80 }] , image :"/images/nft-packs/sample-2.png" },
  { id: "lucky", name: "Lucky Pack", badge: "Rare", supply: 2500, priceSol: 0.6, tone: "green",
    rarities: [{ tier: "Rare", chance: 10 }, { tier: "Uncommon", chance: 25 }, { tier: "Common", chance: 65 }] , image :"/images/nft-packs/sample-3.png" },
  { id: "starter", name: "Starter Pack", badge: "Common", supply: 1000, priceSol: 0.2, tone: "neutral",
    rarities: [{ tier: "Uncommon", chance: 30 }, { tier: "Common", chance: 70 }] , image :"/images/nft-packs/sample-4.png" },
];

export const features: Feature[] = [
  { id: "exclusive", title: "Exclusive Packs", description: "Limited edition drops", icon: "gift" , image : "/images/icons/people.png"},
  { id: "community", title: "Community Driven", description: "Real holders. Real power.", icon: "users" , image : "/images/icons/shield.png"},
  { id: "play", title: "Play & Earn", description: "More than just collectibles.", icon: "gamepad" , image : "/images/icons/discord.png"},
  { id: "secure", title: "Secure & Transparent", description: "Built on Solana.", icon: "shield" , image : "/images/icons/contact.png"},
];

export const steps: ProcessStep[] = [
  { id: "wallet", title: "Connect Wallet", description: "Link your wallet in seconds. It’s safe and easy.", icon: "wallet", tone: "pink" , image : "/images/branding/road-map-1.png"},
  { id: "choose", title: "Choose a Pack", description: "Pick your favorite pack and make it yours.", icon: "package", tone: "blue" , image : "/images/branding/road-map-2.png"},
  { id: "reveal", title: "Reveal Your Collectible", description: "Open your pack and discover your unique NFT.", icon: "sparkles", tone: "green" , image : "/images/branding/road-map-3.png"},
];

export const milestones: RoadmapMilestone[] = [
  { id: "beginning", title: "The Beginning", description: "NFT collection and community launch.", status: "completed", icon: "sparkles", tone: "pink" , image : "/images/branding/step-1.png"},
  { id: "universe", title: "Expand the Universe", description: "New packs, more utilities and bigger rewards.", status: "in-progress", icon: "discord", tone: "blue" , image : "/images/branding/step-2.png"},
  { id: "game", title: "The Big Game", description: "Full ecosystem, games, rewards and more.", status: "upcoming", icon: "gamepad", tone: "green" , image : "/images/branding/step-3.png"},
  { id: "next", title: "Next Level", description: "More surprises, coming soon.", status: "upcoming", icon: "rocket", tone: "neutral" , image : "/images/branding/step-4.png"},
];

/** Fictional demonstration testimonials – replace with verified ones before launch. */
export const testimonials: Testimonial[] = [
  { id: "t1", name: "Demo Holder One", handle: "@demo_holder_1", quote: "The pack reveal feels great and the community is genuinely fun.", rating: 5, tone: "pink" },
  { id: "t2", name: "Demo Holder Two", handle: "@demo_holder_2", quote: "Clean experience from start to finish. Excited for the game.", rating: 5, tone: "blue" },
  { id: "t3", name: "Demo Holder Three", handle: "@demo_holder_3", quote: "Love the art style. The Chaos Pack is my favorite so far.", rating: 4, tone: "green" },
];

export const faqs: FaqItem[] = [
  { id: "what", question: "What is Psybet?", answer: "Psybet is a community-driven NFT collection and game universe. This page shows demo information only." },
  { id: "buy", question: "How do I buy a pack?", answer: "Connect a compatible wallet, choose a pack and confirm. Purchasing is not live in this demo." },
  { id: "wallet", question: "What wallet can I use?", answer: "Solana-compatible wallets will be supported at launch." },
  { id: "rarities", question: "What are the rarities?", answer: "Packs can contain Legendary, Epic, Rare, Uncommon and Common collectibles." },
  { id: "launch", question: "When will the game launch?", answer: "Timing is tracked on the roadmap and will be announced in our community channels." },
  { id: "support", question: "How can I get support?", answer: "Join our Discord community and the team will help you out." },
];

"use client";

import { m, useReducedMotion } from "framer-motion";
import {
  Bot, Film, Gamepad2, Gift, KeyRound, Music2, PackageOpen, Search,
  ShoppingCart, SlidersHorizontal, Star, X, Zap, type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import { useDeferredValue, useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

/* ----------------------------- Types & demo data ----------------------------- */

type CategoryId = "gaming-accounts" | "game-keys" | "ai" | "streaming" | "music" | "gift-cards";
type SortId = "featured" | "price-asc" | "price-desc" | "rating";
type Delivery = "instant" | "1h";

interface Product {
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
}

interface Filters {
  query: string;
  categories: CategoryId[];
  maxPrice: number;
  instantOnly: boolean;
  inStockOnly: boolean;
  sort: SortId;
}

interface Category { id: CategoryId; label: string; Icon: LucideIcon }

const CATEGORY_BY_ID: Record<CategoryId, Category> = {
  "gaming-accounts": { id: "gaming-accounts", label: "Gaming Accounts", Icon: Gamepad2 },
  "game-keys": { id: "game-keys", label: "Steam & Game Keys", Icon: KeyRound },
  ai: { id: "ai", label: "AI Accounts", Icon: Bot },
  streaming: { id: "streaming", label: "Movies & TV", Icon: Film },
  music: { id: "music", label: "Music", Icon: Music2 },
  "gift-cards": { id: "gift-cards", label: "Gift Cards", Icon: Gift },
};
const CATEGORIES: Category[] = Object.values(CATEGORY_BY_ID);

const SORT_OPTIONS: { id: SortId; label: string }[] = [
  { id: "featured", label: "Featured" },
  { id: "price-asc", label: "Price: low to high" },
  { id: "price-desc", label: "Price: high to low" },
  { id: "rating", label: "Top rated" },
];

const PAGE_SIZE = 12;

/** Demo data only – swap for your API / DB results. */
const DEMO_PRODUCTS: Product[] = [
  { id: "p1", name: "PS5 Account – 20 Games", description: "Primary PS5 account with a curated library of 20 titles.", category: "gaming-accounts", price: 39.9, originalPrice: 59.9, image: "/images/packs/ps5.png", rating: 4.8, reviews: 312, inStock: true, delivery: "1h", badge: "Best seller" },
  { id: "p2", name: "Xbox Game Pass Ultimate – 3 Months", description: "Hundreds of games on console, PC and cloud.", category: "gaming-accounts", price: 29.5, image: "/images/packs/clash-royal.jpg", rating: 4.6, reviews: 187, inStock: true, delivery: "instant" },
  { id: "p3", name: "Steam Wallet Gift Card $50", description: "Global-region wallet code, redeemable instantly.", category: "game-keys", price: 48, image: "/images/packs/steam.webp", rating: 4.9, reviews: 954, inStock: true, delivery: "instant", badge: "Popular" },
  { id: "p4", name: "Elden Ring – Steam Key", description: "Base game key for Steam. Region-free.", category: "game-keys", price: 32.4, originalPrice: 39.99, image: "/images/packs/dota2.jpg", rating: 4.7, reviews: 241, inStock: true, delivery: "instant" },
  { id: "p5", name: "ChatGPT Plus – 1 Month", description: "Private upgrade of your own account for one month.", category: "ai", price: 18.9, image: "/images/packs/gpt.webp", rating: 4.5, reviews: 402, inStock: true, delivery: "1h", badge: "Hot" },
  { id: "p6", name: "Claude Pro – 1 Month", description: "Subscription activation for a month of higher limits.", category: "ai", price: 19.5, image: "/images/packs/gta-vi.jpg", rating: 4.7, reviews: 133, inStock: true, delivery: "1h" },
  { id: "p7", name: "Midjourney Standard – 1 Month", description: "Image generation plan with fast GPU hours.", category: "ai", price: 24, image: "/images/packs/cod.png", rating: 4.3, reviews: 76, inStock: false, delivery: "1h" },
  { id: "p8", name: "Netflix Premium – 6 Months", description: "4K plan on a private profile, 6-month warranty.", category: "streaming", price: 44.9, originalPrice: 71.94, image: "/images/packs/csgo.jpg", rating: 4.4, reviews: 520, inStock: true, delivery: "instant" },
  { id: "p9", name: "Disney+ Annual", description: "Twelve months of Disney, Pixar, Marvel and Star Wars.", category: "streaming", price: 59, image: "/images/packs/spotify.jpg", rating: 4.5, reviews: 98, inStock: true, delivery: "1h" },
  { id: "p10", name: "Spotify Premium – 12 Months", description: "Ad-free music, offline listening, unlimited skips.", category: "music", price: 54.9, originalPrice: 119.88, image: "/images/packs/figma.webp", rating: 4.8, reviews: 1204, inStock: true, delivery: "instant", badge: "Best value" },
  { id: "p11", name: "Apple Music – 3 Months", description: "Lossless audio and spatial sound on all your devices.", category: "music", price: 12.9, image: "/images/packs/v-bucks.png", rating: 4.4, reviews: 61, inStock: true, delivery: "instant" },
  { id: "p12", name: "PlayStation Store Card $25", description: "US-region PSN credit delivered as a code.", category: "gift-cards", price: 24.5, image: "/images/packs/mobile-legends.jpg", rating: 4.9, reviews: 689, inStock: true, delivery: "instant" },
];

const currency = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });
const formatPrice = (n: number): string => currency.format(n);

/* --------------------------------- Product card --------------------------------- */

function ProductCard({ product, onBuy }: { product: Product; onBuy: (p: Product) => void }) {
  const reduce = useReducedMotion();
  const category = CATEGORY_BY_ID[product.category];
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  return (
    <m.li
      className="h-full"
      initial={reduce ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      <article
        className={cn(
          "group flex h-full flex-col overflow-hidden rounded-xl bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] transform-gpu dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] shadow-xl transition-transform duration-200 hover:-translate-y-1",
          !product.inStock && "opacity-75",
        )}
      >
        <div className="relative flex p-2 shadow-inner">
          <Image
            width={600}
            height={600}
            alt={product.name}
            src={product.image}
            sizes="(min-width:1280px) 22vw, (min-width:640px) 33vw, 100vw"
            className="h-48 w-full rounded-t-lg object-cover md:h-56"
          />
          <span className="absolute right-2 top-2 rounded-lg rounded-br-none rounded-tl-none bg-primary px-3 pt-1 text-[10px] md:text-xs font-bold uppercase text-white">
            {product.badge ?? category.label}
          </span>
          {discount > 0 ? (
            <span className="absolute left-2 top-2 rounded-lg rounded-bl-none rounded-tr-none bg-green px-2 py-0.5 text-xs font-bold text-[#080A10]">
              -{discount}%
            </span>
          ) : null}
        </div>

        <div className="flex flex-1 flex-col gap-2 p-3 pt-1">
          <p className="flex items-center gap-1 text-xs text-muted-foreground">
            <category.Icon className="size-3.5" aria-hidden="true" /> {category.label}
          </p>
          <h3 className="font-display md:text-lg font-bold leading-tight">{product.name}</h3>
          <p className="line-clamp-2 text-xs md:text-sm text-muted-foreground">{product.description}</p>

          <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-3 text-[10px] text-nowrap md:text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Star className="size-3.5 fill-green text-green" aria-hidden="true" />
              <span className="sr-only">Rated </span>
              {product.rating.toFixed(1)} ({product.reviews.toLocaleString("en-US")})
            </span>
            <span className="flex items-center gap-1">
              <Zap className="size-3.5" aria-hidden="true" />
              {product.delivery === "instant" ? "Instant delivery" : "Within 1 hour"}
            </span>
          </div>

          <div className="mt-auto flex items-center justify-between gap-2 pt-2">
            <p className="font-semibold flex flex-col md:flex-row">
              {formatPrice(product.price)}
              {product.originalPrice ? (
                <span className="md:ml-2 text-xs font-normal text-muted-foreground line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              ) : null}
            </p>
            <Button
              size="sm"
              disabled={!product.inStock}
              aria-label={product.inStock ? `Buy ${product.name}` : `${product.name} is out of stock`}
              onClick={() => onBuy(product)}
            >
              {product.inStock ? (<><ShoppingCart aria-hidden="true" /> Buy</>) : "Sold out"}
            </Button>
          </div>
        </div>
      </article>
    </m.li>
  );
}

/* --------------------------------- Filter panel --------------------------------- */

interface FilterPanelProps {
  filters: Filters;
  priceBound: number;
  counts: Record<CategoryId, number>;
  onChange: (patch: Partial<Filters>) => void;
  onClear: () => void;
  hasActive: boolean;
}

function FilterPanel({ filters, priceBound, counts, onChange, onClear, hasActive }: FilterPanelProps) {
  const toggleCategory = (id: CategoryId) =>
    onChange({
      categories: filters.categories.includes(id)
        ? filters.categories.filter((c) => c !== id)
        : [...filters.categories, id],
    });

  return (
    <div className="space-y-6">
      <fieldset>
        <legend className="mb-2 font-display text-sm font-bold">Category</legend>
        <ul className="space-y-1">
          {CATEGORIES.map(({ id, label, Icon }) => (
            <li key={id}>
              <label className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5 text-sm hover:bg-surface-2">
                <input
                  type="checkbox"
                  className="size-4 accent-primary"
                  checked={filters.categories.includes(id)}
                  onChange={() => toggleCategory(id)}
                />
                <Icon className="size-4 text-muted-foreground" aria-hidden="true" />
                <span className="flex-1">{label}</span>
                <span className="text-xs text-muted-foreground">{counts[id]}</span>
              </label>
            </li>
          ))}
        </ul>
      </fieldset>

      <div>
        <label htmlFor="max-price" className="mb-2 flex items-center justify-between font-display text-sm font-bold">
          Max price <span className="font-sans font-semibold text-primary">{formatPrice(filters.maxPrice)}</span>
        </label>
        <input
          id="max-price"
          type="range"
          min={0}
          max={priceBound}
          step={1}
          value={filters.maxPrice}
          onChange={(e) => onChange({ maxPrice: Number(e.target.value) })}
          className="w-full accent-primary"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{formatPrice(0)}</span>
          <span>{formatPrice(priceBound)}</span>
        </div>
      </div>

      <fieldset className="space-y-1">
        <legend className="mb-2 font-display text-sm font-bold">Availability</legend>
        <label className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5 text-sm hover:bg-surface-2">
          <input type="checkbox" className="size-4 accent-primary" checked={filters.instantOnly} onChange={(e) => onChange({ instantOnly: e.target.checked })} />
          Instant delivery only
        </label>
        <label className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5 text-sm hover:bg-surface-2">
          <input type="checkbox" className="size-4 accent-primary" checked={filters.inStockOnly} onChange={(e) => onChange({ inStockOnly: e.target.checked })} />
          In stock only
        </label>
      </fieldset>

      <Button variant="outline" size="sm" className="w-full" disabled={!hasActive} onClick={onClear}>
        Clear all filters
      </Button>
    </div>
  );
}

/* ------------------------------------ Catalog ------------------------------------ */

function ShopCatalog({ products }: { products: Product[] }) {
  const priceBound = useMemo(() => Math.ceil(Math.max(1, ...products.map((p) => p.price))), [products]);
  const defaults = useMemo<Filters>(
    () => ({ query: "", categories: [], maxPrice: priceBound, instantOnly: false, inStockOnly: false, sort: "featured" }),
    [priceBound],
  );

  const [filters, setFilters] = useState<Filters>(defaults);
  const [limit, setLimit] = useState(PAGE_SIZE);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const deferredQuery = useDeferredValue(filters.query);

  const router = useRouter();

  const update = (patch: Partial<Filters>) => {
    setFilters((f) => ({ ...f, ...patch }));
    setLimit(PAGE_SIZE);
  };
  const clearAll = () => {
    setFilters((f) => ({ ...defaults, sort: f.sort }));
    setLimit(PAGE_SIZE);
  };

  const counts = useMemo(() => {
    const base = Object.fromEntries(CATEGORIES.map((c) => [c.id, 0])) as Record<CategoryId, number>;
    for (const p of products) base[p.category] += 1;
    return base;
  }, [products]);

  const results = useMemo(() => {
    const q = deferredQuery.trim().toLowerCase();
    const list = products.filter(
      (p) =>
        (filters.categories.length === 0 || filters.categories.includes(p.category)) &&
        p.price <= filters.maxPrice &&
        (!filters.instantOnly || p.delivery === "instant") &&
        (!filters.inStockOnly || p.inStock) &&
        (q === "" || `${p.name} ${p.description} ${CATEGORY_BY_ID[p.category].label}`.toLowerCase().includes(q)),
    );
    switch (filters.sort) {
      case "price-asc": return [...list].sort((a, b) => a.price - b.price);
      case "price-desc": return [...list].sort((a, b) => b.price - a.price);
      case "rating": return [...list].sort((a, b) => b.rating - a.rating || b.reviews - a.reviews);
      default: return list;
    }
  }, [products, filters, deferredQuery]);

  const hasActive =
    filters.query !== "" || filters.categories.length > 0 || filters.maxPrice < priceBound ||
    filters.instantOnly || filters.inStockOnly;
  const activeCount =
    filters.categories.length + (filters.maxPrice < priceBound ? 1 : 0) +
    (filters.instantOnly ? 1 : 0) + (filters.inStockOnly ? 1 : 0);

  // Close drawer on Escape and lock background scroll while it is open.
  useEffect(() => {
    if (!drawerOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setDrawerOpen(false); };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = prev; };
  }, [drawerOpen]);

  useEffect(() => {
    if (!notice) return;
    const id = window.setTimeout(() => setNotice(null), 4000);
    return () => window.clearTimeout(id);
  }, [notice]);

  // Integration point: replace with real cart / checkout logic.
  const handleBuy = (p: Product) => {
    router.push(`/shop/${p.id}`)
    // setNotice(`${p.name} — checkout isn't connected yet (demo).`)
};

  const panel = (
    <FilterPanel filters={filters} priceBound={priceBound} counts={counts} onChange={update} onClear={clearAll} hasActive={hasActive} />
  );

  return (
    <main id="main" className="container-page py-8 md:py-10">
      <Reveal>
        <p className="text-xs font-semibold uppercase tracking-wide text-primary">Shop</p>
        <h1 className="font-display text-3xl font-extrabold sm:text-4xl">Gift cards &amp; digital accounts</h1>
        <p className="mt-2 max-w-xl text-sm text-muted-foreground">
          Games, AI tools, streaming, music and more — browse, filter and pick up what you need.
        </p>
      </Reveal>

      {/* Toolbar */}
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <label htmlFor="shop-search" className="sr-only">Search products</label>
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
          <input
            id="shop-search"
            type="search"
            value={filters.query}
            onChange={(e) => update({ query: e.target.value })}
            placeholder="Search Spotify, Steam, ChatGPT…"
            className="h-10 w-full rounded-lg border border-border bg-surface pl-9 pr-3 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="lg:hidden" onClick={() => setDrawerOpen(true)} aria-haspopup="dialog">
            <SlidersHorizontal aria-hidden="true" /> Filters{activeCount > 0 ? ` (${activeCount})` : ""}
          </Button>
          <label htmlFor="shop-sort" className="sr-only">Sort products</label>
          <select
            id="shop-sort"
            value={filters.sort}
            onChange={(e) => update({ sort: e.target.value as SortId })}
            className="h-10 flex-1 rounded-lg border border-border bg-surface px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:flex-none"
          >
            {SORT_OPTIONS.map((o) => (<option key={o.id} value={o.id}>{o.label}</option>))}
          </select>
        </div>
      </div>

      <div className="mt-6 grid gap-8 lg:grid-cols-[16rem_1fr]">
        {/* Desktop sidebar */}
        <aside aria-label="Filters" className="hidden lg:block">
          <div className="sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto rounded-xl border border-border bg-surface p-4">
            {panel}
          </div>
        </aside>

        <section aria-label="Products">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <p role="status" aria-live="polite" className="mr-2 text-sm text-muted-foreground">
              {results.length} {results.length === 1 ? "product" : "products"}
            </p>
            {filters.categories.map((id) => (
              <button key={id} type="button" onClick={() => update({ categories: filters.categories.filter((c) => c !== id) })}
                className="flex items-center gap-1 rounded-full border border-border bg-surface px-3 py-1 text-xs hover:border-primary">
                {CATEGORY_BY_ID[id].label} <X className="size-3" aria-hidden="true" /><span className="sr-only">Remove filter</span>
              </button>
            ))}
            {filters.maxPrice < priceBound ? (
              <button type="button" onClick={() => update({ maxPrice: priceBound })} className="flex items-center gap-1 rounded-full border border-border bg-surface px-3 py-1 text-xs hover:border-primary">
                Under {formatPrice(filters.maxPrice)} <X className="size-3" aria-hidden="true" /><span className="sr-only">Remove filter</span>
              </button>
            ) : null}
            {filters.instantOnly ? (
              <button type="button" onClick={() => update({ instantOnly: false })} className="flex items-center gap-1 rounded-full border border-border bg-surface px-3 py-1 text-xs hover:border-primary">
                Instant <X className="size-3" aria-hidden="true" /><span className="sr-only">Remove filter</span>
              </button>
            ) : null}
            {filters.inStockOnly ? (
              <button type="button" onClick={() => update({ inStockOnly: false })} className="flex items-center gap-1 rounded-full border border-border bg-surface px-3 py-1 text-xs hover:border-primary">
                In stock <X className="size-3" aria-hidden="true" /><span className="sr-only">Remove filter</span>
              </button>
            ) : null}
            {hasActive ? (
              <button type="button" onClick={clearAll} className="text-xs font-semibold text-primary hover:underline">Clear all</button>
            ) : null}
          </div>

          {results.length === 0 ? (
            <div className="grid place-items-center gap-3 rounded-xl border border-dashed border-border px-6 py-16 text-center">
              <PackageOpen className="size-10 text-muted-foreground" aria-hidden="true" />
              <h2 className="font-display md:text-xl font-bold">No products match</h2>
              <p className="text-sm text-muted-foreground">Try a different search or loosen your filters.</p>
              <Button variant="outline" onClick={clearAll}>Clear filters</Button>
            </div>
          ) : (
            <>
              <ul className="grid gap-4 grid-cols-2 xl:grid-cols-4">
                {results.slice(0, limit).map((p) => (
                  <ProductCard key={p.id} product={p} onBuy={handleBuy} />
                ))}
              </ul>
              {results.length > limit ? (
                <div className="mt-8 text-center">
                  <Button variant="outline" size="lg" onClick={() => setLimit((l) => l + PAGE_SIZE)}>
                    Load more ({results.length - limit} left)
                  </Button>
                </div>
              ) : null}
            </>
          )}
        </section>
      </div>

      {/* Mobile filter drawer */}
      {drawerOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button type="button" aria-label="Close filters" className="absolute inset-0 bg-black/60" onClick={() => setDrawerOpen(false)} />
          <div role="dialog" aria-modal="true" aria-label="Filters" className="absolute inset-y-0 left-0 flex w-[85%] max-w-sm flex-col bg-background pb-[env(safe-area-inset-bottom)]">
            <div className="flex items-center justify-between border-b border-border p-4">
              <h2 className="font-display text-lg font-bold">Filters</h2>
              <Button variant="ghost" size="icon" aria-label="Close filters" autoFocus onClick={() => setDrawerOpen(false)}>
                <X aria-hidden="true" />
              </Button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">{panel}</div>
            <div className="border-t border-border p-4">
              <Button className="w-full" onClick={() => setDrawerOpen(false)}>Show {results.length} results</Button>
            </div>
          </div>
        </div>
      ) : null}

      {notice ? (
        <div role="status" aria-live="polite" className="fixed inset-x-4 bottom-4 z-60 mx-auto max-w-md rounded-lg border border-border bg-surface p-4 text-sm shadow-lg">
          {notice}
        </div>
      ) : null}
    </main>
  );
}

export default function ShopPage() {
  return <ShopCatalog products={DEMO_PRODUCTS} />;
}
import { ShoppingCart, Star, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CATEGORY_BY_ID, type Product } from "@/lib/data/products";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";

export function NftPackCard({ pack }: { pack: Product }) {
  const category = CATEGORY_BY_ID[pack.category];
  const discount = pack.originalPrice
    ? Math.round((1 - pack.price / pack.originalPrice) * 100)
    : 0;

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-xl bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] transform-gpu dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] shadow-xl transition-transform duration-200 hover:-translate-y-1",
        !pack.inStock && "opacity-75",
      )}
    >
      <div className="relative flex p-2 shadow-inner">
        <Image
          width={1000}
          height={1000}
          alt={pack.name}
          src={pack.image}
          sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw"
          className="h-52 w-full rounded-t-lg object-cover md:h-64"
        />
        <span className="absolute right-2 top-2 rounded-lg rounded-br-none rounded-tl-none bg-primary px-3 pt-1 text-xs font-bold uppercase text-white">
          {pack.badge ?? category.label}
        </span>
        {discount > 0 ? (
          <span className="absolute left-2 top-2 rounded-lg rounded-bl-none rounded-tr-none bg-green px-2 pt-1 text-xs font-bold text-[#080A10]">
            -{discount}%
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-3 pt-1">
        <p className="flex items-center gap-1 text-xs text-muted-foreground">
          <category.Icon className="size-3.5" aria-hidden="true" /> {category.label}
        </p>

        {/* Stretched link: the whole card opens the product page, the Buy button stays above it. */}
        <h3 className="font-display font-bold leading-tight md:text-lg">
          <Link href={`/shop/${pack.id}`} className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none focus-visible:after:ring-2 focus-visible:after:ring-ring focus-visible:after:rounded-xl">
            {pack.name}
          </Link>
        </h3>
        <p className="line-clamp-2 text-xs text-muted-foreground md:text-sm">{pack.description}</p>

        <div className="flex flex-col gap-1 text-nowrap text-[10px] text-muted-foreground md:flex-row md:items-center md:gap-3 md:text-xs">
          <span className="flex items-center gap-1">
            <Star className="size-3.5 fill-green text-green" aria-hidden="true" />
            <span className="sr-only">Rated </span>
            {pack.rating.toFixed(1)} ({pack.reviews.toLocaleString("en-US")})
          </span>
          <span className="flex items-center gap-1">
            <Zap className="size-3.5" aria-hidden="true" />
            {pack.delivery === "instant" ? "Instant delivery" : "Within 1 hour"}
          </span>
        </div>

        <div className="mt-auto flex items-center justify-between gap-2 pt-2">
          <p className="flex flex-col font-semibold md:flex-row">
            {formatPrice(pack.price)}
            {pack.originalPrice ? (
              <span className="text-xs font-normal text-muted-foreground line-through md:ml-2">
                {formatPrice(pack.originalPrice)}
              </span>
            ) : null}
          </p>

          {pack.inStock ? (
            <Button asChild size="sm" className="relative z-10">
              <Link href={`/shop/${pack.id}`} aria-label={`Buy ${pack.name}`}>
                <ShoppingCart aria-hidden="true" /> Buy
              </Link>
            </Button>
          ) : (
            <Button size="sm" disabled aria-label={`${pack.name} is out of stock`}>
              Sold out
            </Button>
          )}
        </div>
      </div>
    </article>
  );
}
import { Check, ChevronRight, Star, Zap } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckoutPanel } from "@/components/checkout/checkout-panel";
import { Reveal } from "@/components/ui/reveal";
import {
  CATEGORY_BY_ID, CATEGORY_DEFAULTS, DEMO_PRODUCTS, getHighlights, getMaxQuantity,
  getProductById, getRelatedProducts,
} from "@/lib/data/products";
import { formatPrice } from "@/lib/format";

interface ProductPageProps { params: Promise<{ id: string }> }

export function generateStaticParams() {
  return DEMO_PRODUCTS.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) return { title: "Product not found" };
  return {
    title: product.name,
    description: product.description,
    alternates: { canonical: `/shop/${product.id}` },
    openGraph: { title: product.name, description: product.description, images: [product.image] },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) notFound();

  const category = CATEGORY_BY_ID[product.category];
  const terms = CATEGORY_DEFAULTS[product.category].terms;
  const related = getRelatedProducts(product);
  const discount = product.originalPrice ? Math.round((1 - product.price / product.originalPrice) * 100) : 0;

  return (
    <main id="main" className="container-page py-6 md:py-10">
      <nav aria-label="Breadcrumb" className="mb-5 text-xs text-muted-foreground">
        <ol className="flex flex-wrap items-center gap-1">
          <li><Link href="/shop" className="hover:text-primary">Shop</Link></li>
          <li aria-hidden="true"><ChevronRight className="size-3" /></li>
          <li>{category.label}</li>
          <li aria-hidden="true"><ChevronRight className="size-3" /></li>
          <li aria-current="page" className="font-semibold text-foreground">{product.name}</li>
        </ol>
      </nav>

      <div className="grid gap-8 lg:grid-cols-[1fr_22rem]">
        <div className="space-y-8">
          <Reveal>
            <div className="overflow-hidden rounded-xl border border-border bg-surface p-2">
              <Image
                src={product.image}
                alt={product.name}
                width={3000}
                height={3000}
                priority
                // sizes="(min-width:1024px) 640px, 100vw"
                className="h-64 w-full rounded-lg object-cover sm:h-110"
              />
            </div>
          </Reveal>

          <Reveal>
            <p className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-primary">
              <category.Icon className="size-3.5" aria-hidden="true" /> {category.label}
            </p>
            <h1 className="mt-1 font-display text-3xl font-extrabold sm:text-4xl">{product.name}</h1>
            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Star className="size-4 fill-green text-green" aria-hidden="true" />
                <span className="sr-only">Rated </span>{product.rating.toFixed(1)} ({product.reviews.toLocaleString("en-US")} reviews)
              </span>
              <span className="flex items-center gap-1"><Zap className="size-4" aria-hidden="true" />{product.delivery === "instant" ? "Instant delivery" : "Within 1 hour"}</span>
              <span className={product.inStock ? "text-green" : "text-primary"}>{product.inStock ? "In stock" : "Out of stock"}</span>
            </div>
            <p className="mt-4 text-3xl font-bold">
              {formatPrice(product.price)}
              {product.originalPrice ? (
                <span className="ml-3 text-base font-normal text-muted-foreground">
                  <s>{formatPrice(product.originalPrice)}</s> <span className="font-semibold text-green">-{discount}%</span>
                </span>
              ) : null}
            </p>
            <p className="mt-4 max-w-2xl text-muted-foreground">{product.description}</p>
          </Reveal>

          <Reveal>
            <h2 className="font-display text-xl font-bold">What you get</h2>
            <ul className="mt-3 space-y-2">
              {getHighlights(product).map((h) => (
                <li key={h} className="flex items-start gap-2 text-sm">
                  <Check className="mt-0.5 size-4 shrink-0 text-green" aria-hidden="true" /> {h}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal>
            <h2 className="font-display text-xl font-bold">Good to know</h2>
            <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-muted-foreground">
              {terms.map((t) => (<li key={t}>{t}</li>))}
            </ul>
          </Reveal>
        </div>

        <div>
          <CheckoutPanel product={product} maxQuantity={getMaxQuantity(product)} />
        </div>
      </div>

      {related.length > 0 ? (
        <section aria-labelledby="related-title" className="mt-14">
          <Reveal>
            <h2 id="related-title" className="font-display text-2xl font-bold">You might also like</h2>
            <ul className="mt-4 grid gap-4 sm:grid-cols-3">
              {related.map((r) => (
                <li key={r.id}>
                  <Link href={`/shop/${r.id}`} className="flex h-full flex-col overflow-hidden rounded-xl border border-border bg-surface transition-transform hover:-translate-y-1">
                    <Image src={r.image} alt="" width={400} height={400} sizes="(min-width:640px) 33vw, 100vw" className="h-36 w-full object-cover" />
                    <span className="p-3">
                      <span className="block font-display font-bold leading-tight">{r.name}</span>
                      <span className="mt-1 block text-sm text-muted-foreground">{formatPrice(r.price)}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </section>
      ) : null}
    </main>
  );
}

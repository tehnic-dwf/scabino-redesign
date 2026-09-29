import { Link } from "@tanstack/react-router";
import { BellRing, Heart, ShoppingBag, Star } from "lucide-react";
import { toast } from "sonner";
import { formatPrice } from "@/data/product";
import type { EyeProduct } from "@/data/eyeCategory";
import { useShop } from "@/lib/store";
import { cn } from "@/lib/utils";

const localPdpSlug = "k-secret-seoul-1988-eye-cream-retinal-liposome-4-fermented-bean-crema-anti-rid-cu-retinol-si-extract-fermentat-30ml";

function ProductLink({ product, children, className }: { product: EyeProduct; children: React.ReactNode; className?: string }) {
  if (product.slug === localPdpSlug) {
    return <Link to="/p/$slug" params={{ slug: product.slug }} className={className}>{children}</Link>;
  }
  return <a href={`https://www.scabino.ro/p/creme-de-ochi-coreene/${product.slug}/`} className={className}>{children}</a>;
}

export function EyeProductCard({ product, priority = false }: { product: EyeProduct; priority?: boolean }) {
  const { addToCart, favorites, toggleFavorite } = useShop();
  const favorite = favorites.includes(product.slug);
  const discount = product.oldPrice ? Math.round((1 - product.price / product.oldPrice) * 100) : 0;

  return (
    <article className={cn("group relative flex min-w-0 flex-col", !product.inStock && !priority && "opacity-75")}>
      <div className="relative overflow-hidden rounded-2xl border border-border/70 bg-card">
        <ProductLink product={product} className="block aspect-square overflow-hidden bg-[#faf8f6]">
          <img src={product.image} alt={`${product.brand} ${product.name}`} loading="lazy" className="h-full w-full object-contain p-2 transition-transform duration-300 group-hover:scale-[1.035] sm:p-3" />
        </ProductLink>
        <div className="absolute left-2 top-2 flex flex-col items-start gap-1.5">
          {discount > 0 && <span className="rounded-full bg-primary px-2 py-1 text-[10px] font-bold text-primary-foreground">-{discount}%</span>}
          {!product.inStock && <span className="rounded-full border border-primary/15 bg-white/95 px-2 py-1 text-[9px] font-semibold uppercase tracking-wide text-primary">Indisponibil</span>}
        </div>
        <button type="button" aria-label={favorite ? `Elimină ${product.name} din favorite` : `Adaugă ${product.name} la favorite`} aria-pressed={favorite} onClick={() => toggleFavorite(product.slug)} className="absolute right-2 top-2 grid size-9 place-items-center rounded-full border border-border/70 bg-white/95 text-primary shadow-sm transition-transform hover:scale-105">
          <Heart className={cn("size-4", favorite && "fill-primary")} />
        </button>
      </div>

      <div className="flex flex-1 flex-col pt-3">
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">{product.brand}</p>
        <ProductLink product={product} className="mt-1.5">
          <h2 className="line-clamp-2 text-[13px] font-semibold leading-[1.45] text-foreground transition-colors group-hover:text-primary sm:text-sm">{product.name}</h2>
        </ProductLink>
        <p className="mt-1.5 line-clamp-2 text-[11px] leading-relaxed text-muted-foreground sm:text-xs">{product.subtitle}</p>
        <div className="mt-2 flex min-h-5 flex-wrap gap-1">
          {product.concerns.slice(0, 2).map((tag) => <span key={tag} className="rounded-full bg-muted px-2 py-1 text-[9px] font-medium text-muted-foreground">{tag}</span>)}
        </div>
        <p className="mt-2 line-clamp-1 text-[10px] text-muted-foreground">{product.ingredients.slice(0, 2).join(" · ")}</p>
        {product.reviews > 0 ? (
          <div className="mt-2 flex items-center gap-1 text-[10px] text-muted-foreground"><Star className="size-3 fill-primary text-primary" /><span className="font-semibold text-foreground">{product.rating.toFixed(1)}</span><span>({product.reviews})</span></div>
        ) : <div className="mt-2 h-3" />}

        <div className="mt-auto pt-3">
          <div className="flex min-h-10 flex-wrap items-baseline gap-x-2">
            <span className="text-sm font-bold text-primary sm:text-base">{formatPrice(product.price)}</span>
            {product.oldPrice && <span className="text-[10px] text-muted-foreground line-through sm:text-xs">{formatPrice(product.oldPrice)}</span>}
          </div>
          <button type="button" onClick={() => {
            if (product.inStock) {
              addToCart({ slug: product.slug, price: product.price });
              toast.success(`${product.name} a fost adăugat în coș`);
            } else {
              toast.success("Deschidem opțiunea de notificare pe pagina produsului");
            }
          }} className={cn("mt-1 flex h-10 w-full items-center justify-center gap-2 rounded-full px-2 text-[11px] font-semibold transition-colors sm:text-xs", product.inStock ? "bg-primary text-primary-foreground hover:bg-primary/90" : "border border-primary bg-background text-primary hover:bg-secondary/55")}>
            {product.inStock ? <ShoppingBag className="size-3.5" /> : <BellRing className="size-3.5" />}
            {product.inStock ? "Adaugă în coș" : "Anunță-mă când revine"}
          </button>
        </div>
      </div>
    </article>
  );
}

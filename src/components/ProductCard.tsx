import { Link } from "@tanstack/react-router";
import { ShoppingBag } from "lucide-react";
import { formatPrice, type RecommendedProduct } from "@/data/product";
import { useShop } from "@/lib/store";
import { toast } from "sonner";

export function ProductCard({ product }: { product: RecommendedProduct }) {
  const { addToCart } = useShop();

  return (
    <article className="group flex flex-col rounded-xl border bg-card p-3 transition-shadow hover:shadow-md">
      <Link to="/" className="block overflow-hidden rounded-lg bg-muted">
        <img
          src={product.image}
          alt={`${product.brand} ${product.name}`}
          loading="lazy"
          className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </Link>
      <p className="mt-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {product.brand}
      </p>
      <h3 className="mt-1 text-sm font-semibold leading-snug text-foreground">
        {product.name}
      </h3>
      <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
        {product.subtitle}
      </p>
      <div className="mt-auto flex items-center justify-between pt-3">
        <div>
          {product.oldPrice && (
            <span className="mr-2 text-xs text-muted-foreground line-through">
              {formatPrice(product.oldPrice)}
            </span>
          )}
          <span className="text-sm font-bold text-primary">
            {formatPrice(product.price)}
          </span>
        </div>
        <button
          type="button"
          aria-label={`Adaugă ${product.name} în coș`}
          onClick={() => {
            addToCart({ slug: product.slug, price: product.price });
            toast.success(`${product.name} adăugat în coș`);
          }}
          className="flex size-9 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform hover:scale-105 active:scale-95"
        >
          <ShoppingBag className="size-4" aria-hidden />
        </button>
      </div>
    </article>
  );
}

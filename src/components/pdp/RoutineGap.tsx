import { toast } from "sonner";
import { Plus } from "lucide-react";
import { findProduct, formatPrice } from "@/data/product";
import { useShop } from "@/lib/store";

export interface RoutineGapItem {
  slug: string;
  role: string;
  why: string;
  required: boolean;
}

export function RoutineGapCrossSell({ items }: { items: RoutineGapItem[] }) {
  const { addToCart } = useShop();

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {items.map((item) => {
        const p = findProduct(item.slug);
        if (!p) return null;
        return (
          <article key={item.slug} className="flex flex-col rounded-2xl border bg-card p-4">
            <div className="flex items-start gap-3">
              <img
                src={p.image}
                alt={`${p.brand} ${p.name}`}
                loading="lazy"
                className="size-20 shrink-0 rounded-lg bg-muted object-cover"
              />
              <div>
                <span
                  className={`inline-block rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                    item.required
                      ? "bg-fit-soft text-fit"
                      : "bg-evidence-soft text-evidence"
                  }`}
                >
                  {item.required ? "Pas de bază" : "Opțional"}
                </span>
                <p className="mt-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  {item.role}
                </p>
                <h3 className="mt-0.5 text-sm font-semibold leading-snug text-foreground">
                  {p.brand} {p.name}
                </h3>
              </div>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.why}</p>
            <div className="mt-auto flex items-center justify-between pt-4">
              <span className="text-sm font-bold text-primary">{formatPrice(p.price)}</span>
              <button
                type="button"
                onClick={() => {
                  addToCart({ slug: p.slug, price: p.price });
                  toast.success(`${p.name} adăugat în coș`);
                }}
                className="flex h-11 items-center gap-1.5 rounded-lg border border-primary px-4 text-sm font-semibold text-primary transition-colors hover:bg-accent"
              >
                <Plus className="size-4" aria-hidden />
                Adaugă
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
}

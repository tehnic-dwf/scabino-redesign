import { useMemo } from "react";
import { Check, CheckCircle2, Truck, X } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { formatPrice, shipping } from "@/data/product";
import { pickCrossSell, resolveAddedProduct } from "@/data/crossSell";
import { useShop } from "@/lib/store";
import { cn } from "@/lib/utils";

/**
 * PostAddToCartDrawer — ecran intermediar post „Adaugă în coș".
 * 3 layere: confirmare → progres transport gratuit → cross-sell explicabil
 * („Completează rutina"), cu acțiuni sticky jos.
 */
export function PostAddToCartDrawer() {
  const { lastAdded, closeAddedDrawer, cartValue, cartSlugs, addToCart } = useShop();

  const added = lastAdded ? resolveAddedProduct(lastAdded.slug) : null;
  const remaining = Math.max(0, shipping.freeFrom - cartValue);
  const progress = Math.min(100, (cartValue / shipping.freeFrom) * 100);

  const recommendations = useMemo(
    () => (added ? pickCrossSell(added, cartSlugs, remaining) : []),
    [added, cartSlugs, remaining],
  );

  return (
    <Sheet open={!!added} onOpenChange={(o) => !o && closeAddedDrawer()}>
      <SheetContent
        side="bottom"
        className="mx-auto flex h-[85dvh] max-w-lg flex-col gap-0 overflow-hidden rounded-t-3xl p-0 [&>button]:hidden"
      >
        <SheetDescription className="sr-only">Confirmare adăugare în coș</SheetDescription>

        {/* LAYER 1 — Confirmare */}
        <div className="relative shrink-0 border-b px-5 pb-4 pt-5">
          <SheetTitle className="flex items-center justify-center gap-2 text-base">
            <CheckCircle2 className="size-5 text-fit" aria-hidden />
            Adăugat în coș
          </SheetTitle>
          <button
            type="button"
            aria-label="Închide"
            onClick={closeAddedDrawer}
            className="absolute right-4 top-4 grid size-9 place-items-center rounded-full text-foreground transition-colors hover:bg-muted"
          >
            <X className="size-5" />
          </button>
          {added && (
            <div className="mt-4 flex items-center gap-3">
              <img
                src={added.image}
                alt=""
                className="size-16 shrink-0 rounded-xl border bg-white object-contain p-1"
              />
              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  {added.brand}
                </p>
                <p className="truncate text-sm font-semibold leading-snug">{added.name}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {lastAdded?.quantity ?? 1} buc.
                </p>
              </div>
              <div className="shrink-0 text-right">
                {added.oldPrice && (
                  <p className="text-[11px] text-muted-foreground line-through">
                    {formatPrice(added.oldPrice)}
                  </p>
                )}
                <p className="text-sm font-bold text-primary">{formatPrice(added.price)}</p>
              </div>
            </div>
          )}
        </div>

        {/* Zona centrală scrollabilă */}
        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-4">
          {/* LAYER 2 — Cart Goal Progress */}
          <div className="rounded-2xl border bg-secondary/40 p-4">
            <p className="flex items-center justify-center gap-2 text-center text-sm font-semibold">
              {remaining > 0 ? (
                <>
                  Încă <span className="text-primary">{formatPrice(remaining)}</span> până la
                  transport gratuit
                  <Truck className="size-4 text-primary" aria-hidden />
                </>
              ) : (
                <>
                  <CheckCircle2 className="size-4 text-fit" aria-hidden />
                  Ai transport gratuit pentru această comandă
                </>
              )}
            </p>
            <div
              className="mt-3 h-2 overflow-hidden rounded-full bg-muted"
              role="progressbar"
              aria-valuenow={Math.round(progress)}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Progres până la transport gratuit"
            >
              <div
                className="h-full rounded-full bg-primary transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* LAYER 3 — Smart Cross-Sell */}
          {recommendations.length > 0 && (
            <div className="mt-5">
              <h3 className="text-center text-base font-bold">Completează rutina</h3>
              <p className="mt-1 text-center text-xs text-muted-foreground">
                Produse compatibile cu ceea ce ai adăugat.
              </p>
              <div className="scrollbar-none -mx-5 mt-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-1">
                {recommendations.map((rec) => {
                  const isAdded = cartSlugs.includes(rec.slug);
                  return (
                    <div
                      key={rec.slug}
                      className="flex w-40 shrink-0 snap-start flex-col rounded-2xl border bg-card p-3"
                    >
                      <div className="overflow-hidden rounded-xl bg-[#faf8f6]">
                        <img
                          src={rec.image}
                          alt={`${rec.brand} ${rec.name}`}
                          loading="lazy"
                          className="aspect-square w-full object-contain p-2"
                        />
                      </div>
                      <p className="mt-2.5 text-[9px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                        {rec.brand}
                      </p>
                      <p className="mt-0.5 line-clamp-2 text-xs font-semibold leading-snug">
                        {rec.name}
                      </p>
                      <p className="mt-1.5">
                        <span className="rounded-full bg-secondary px-2 py-0.5 text-[9px] font-medium text-primary">
                          {rec.why}
                        </span>
                      </p>
                      <p className="mt-2 text-sm font-bold text-primary">
                        {formatPrice(rec.price)}
                      </p>
                      <button
                        type="button"
                        disabled={isAdded}
                        onClick={() => addToCart({ slug: rec.slug, price: rec.price }, 1)}
                        className={cn(
                          "mt-2 flex h-9 w-full items-center justify-center gap-1.5 rounded-full text-[11px] font-semibold transition-colors",
                          isAdded
                            ? "border border-fit/40 bg-fit/10 text-fit"
                            : "bg-primary text-primary-foreground hover:bg-primary/90",
                        )}
                      >
                        {isAdded ? (
                          <>
                            <Check className="size-3.5" aria-hidden /> Adăugat
                          </>
                        ) : (
                          "Adaugă"
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* LAYER 4 — Acțiuni sticky */}
        <div className="shrink-0 space-y-2 border-t bg-card px-5 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3">
          <Button
            variant="outline"
            className="h-11 w-full rounded-full border-primary/40 text-primary"
            onClick={closeAddedDrawer}
          >
            Continuă cumpărăturile
          </Button>
          <Button
            className="h-11 w-full rounded-full bg-primary font-semibold text-primary-foreground hover:bg-primary/90"
            onClick={closeAddedDrawer}
          >
            Vezi coșul
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

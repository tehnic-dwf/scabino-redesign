import { CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { formatPrice, product, recommendedProducts, shipping } from "@/data/product";
import { useShop } from "@/lib/store";

export function AddedToCartSheet({
  open,
  onOpenChange,
  quantity,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  quantity: number;
}) {
  const { cartValue, addToCart } = useShop();
  const remaining = Math.max(0, shipping.freeFrom - cartValue);
  const suggestion = recommendedProducts[0];

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="mx-auto max-w-lg rounded-t-2xl p-5">
        <SheetHeader className="p-0 text-left">
          <SheetTitle className="flex items-center gap-2 text-base">
            <CheckCircle2 className="size-5 text-fit" aria-hidden />
            Adăugat în coș
          </SheetTitle>
          <SheetDescription className="sr-only">Confirmare adăugare în coș</SheetDescription>
        </SheetHeader>

        <div className="mt-3 flex items-center gap-3">
          <img src={product.images[0]} alt="" className="size-14 rounded-lg border bg-white object-contain" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">
              {product.brand} {product.name.split(",")[0]}
            </p>
            <p className="text-xs text-muted-foreground">
              {quantity} × {formatPrice(product.price)}
            </p>
          </div>
        </div>

        <p className="mt-4 rounded-lg bg-muted/60 px-3 py-2 text-xs">
          {remaining > 0 ? (
            <>
              Mai ai <strong className="text-primary">{formatPrice(remaining)}</strong> până la livrare gratuită.
            </>
          ) : (
            <strong className="text-fit">Ai livrare gratuită pentru această comandă.</strong>
          )}
        </p>

        {remaining > 0 && suggestion && (
          <div className="mt-3 flex items-center gap-3 rounded-lg border p-2.5">
            <img src={suggestion.image} alt="" className="size-12 rounded-md bg-white object-contain" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-semibold">
                {suggestion.brand} {suggestion.name}
              </p>
              <p className="text-[11px] text-muted-foreground">{formatPrice(suggestion.price)}</p>
            </div>
            <Button
              size="sm"
              variant="outline"
              className="shrink-0 border-primary text-primary"
              onClick={() => {
                addToCart({ slug: suggestion.slug, price: suggestion.price }, 1);
                toast.success(`${suggestion.brand} ${suggestion.name} adăugat în coș`);
              }}
            >
              Adaugă
            </Button>
          </div>
        )}

        <div className="mt-4 grid grid-cols-2 gap-2">
          <Button variant="outline" className="h-11" onClick={() => onOpenChange(false)}>
            Continuă
          </Button>
          <Button className="h-11 bg-primary text-primary-foreground hover:bg-primary/90" onClick={() => onOpenChange(false)}>
            Vezi coșul
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

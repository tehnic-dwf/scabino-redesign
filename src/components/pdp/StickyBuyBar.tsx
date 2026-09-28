import { useEffect, useRef, useState } from "react";
import { Heart, ShoppingBag } from "lucide-react";
import { useShop } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/data/product";

export function StickyBuyBar({
  title,
  price,
  onAdd,
  slug,
}: {
  title: string;
  price: number;
  onAdd: () => void;
  slug?: string;
}) {
  const { favorites, toggleFavorite } = useShop();
  const fav = slug ? favorites.includes(slug) : false;
  const [visible, setVisible] = useState(false);
  const raf = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(() => {
        const anchor = document.getElementById("buy-panel");
        if (!anchor) return;
        setVisible(anchor.getBoundingClientRect().bottom < 0);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t bg-card/95 backdrop-blur transition-transform duration-200 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      aria-hidden={!visible}
    >
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-1.5 px-4 py-2 sm:flex sm:py-2.5">
        <p className="min-w-0 truncate text-xs font-medium text-foreground sm:flex-1 sm:text-sm">
          {title}
        </p>
        <p className="shrink-0 text-sm font-bold text-primary sm:text-base">{formatPrice(price)}</p>
        <div className="col-span-2 flex gap-2 sm:contents">
        {slug && (
          <button
            type="button"
            tabIndex={visible ? 0 : -1}
            aria-label={fav ? "Elimină din favorite" : "Adaugă la favorite"}
            aria-pressed={fav}
            onClick={() => toggleFavorite(slug)}
            className="flex size-10 shrink-0 items-center justify-center rounded-lg border text-primary sm:size-11"
          >
            <Heart className={`size-5 ${fav ? "fill-primary" : ""}`} aria-hidden />
          </button>
        )}
        <Button
          onClick={onAdd}
          tabIndex={visible ? 0 : -1}
          className="h-10 min-w-0 flex-1 rounded-lg bg-primary text-sm font-semibold text-primary-foreground hover:bg-primary/90 sm:h-11 sm:w-auto sm:flex-none sm:px-8"
        >
          <ShoppingBag className="size-4" aria-hidden />
          Adaugă în coș
        </Button>
        </div>
      </div>
    </div>
  );
}

import { useEffect, useRef, useState } from "react";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/data/product";

export function StickyBuyBar({
  title,
  price,
  onAdd,
}: {
  title: string;
  price: number;
  onAdd: () => void;
}) {
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
        <Button
          onClick={onAdd}
          tabIndex={visible ? 0 : -1}
          className="col-span-2 h-10 w-full rounded-lg bg-primary text-sm font-semibold text-primary-foreground hover:bg-primary/90 sm:h-11 sm:w-auto sm:flex-none sm:px-8"
        >
          <ShoppingBag className="size-4" aria-hidden />
          Adaugă în coș
        </Button>
      </div>
    </div>
  );
}

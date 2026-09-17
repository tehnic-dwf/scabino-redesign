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
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3">
        <p className="hidden flex-1 truncate text-sm font-medium text-foreground sm:block">
          {title}
        </p>
        <p className="text-base font-bold text-primary">{formatPrice(price)}</p>
        <Button
          onClick={onAdd}
          tabIndex={visible ? 0 : -1}
          className="h-11 flex-1 rounded-lg bg-primary text-sm font-semibold text-primary-foreground hover:bg-primary/90 sm:flex-none sm:px-8"
        >
          <ShoppingBag className="size-4" aria-hidden />
          Adaugă în coș
        </Button>
      </div>
    </div>
  );
}

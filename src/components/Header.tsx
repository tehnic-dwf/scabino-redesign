import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Heart, Menu, Search, ShoppingBag, Truck, User, X } from "lucide-react";
import { logo } from "@/lib/assets";
import { formatPrice, shipping } from "@/data/product";
import { useShop } from "@/lib/store";

const categories = [
  "Cosmetice Coreene",
  "Produse de îngrijire orală",
  "Produse de îngrijire a corpului",
  "Produse de machiaj",
  "Produse cosmetice pentru ten",
  "Protecție Solară",
  "Produse pentru bărbați",
];

export function Header() {
  const { cartCount, cartValue, favorites } = useShop();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-card">
      <div className="bg-secondary">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-2 px-4 py-2 text-xs font-medium text-primary sm:text-sm">
          <Truck className="size-4" aria-hidden />
          <span>
            Livrare gratuită de la {shipping.freeFrom} RON · Expediere din
            București
          </span>
        </div>
      </div>

      <div className="border-b bg-card">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-4">
          <button
            type="button"
            className="rounded-md p-2 text-primary lg:hidden"
            aria-label="Deschide meniul"
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>

          <Link to="/" className="shrink-0" aria-label="Scabino — pagina principală">
            <img src={logo} alt="Scabino" className="h-9 w-auto sm:h-10" />
          </Link>

          <form
            className="ml-auto hidden flex-1 items-center md:flex md:max-w-md lg:max-w-xl"
            onSubmit={(e) => e.preventDefault()}
            role="search"
          >
            <div className="relative w-full">
              <input
                type="search"
                placeholder="Caută produse, branduri, ingrediente…"
                className="h-11 w-full rounded-full border bg-background pl-11 pr-4 text-sm outline-none placeholder:text-muted-foreground focus:border-ring"
              />
              <Search
                className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden
              />
            </div>
          </form>

          <div className="ml-auto flex items-center gap-1 md:ml-0">
            <button
              type="button"
              className="hidden items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-primary hover:bg-secondary sm:flex"
            >
              <User className="size-5" aria-hidden />
              <span className="hidden lg:inline">Conectează-te</span>
            </button>
            <button
              type="button"
              className="relative rounded-md p-2 text-primary hover:bg-secondary"
              aria-label="Favorite"
            >
              <Heart className="size-5" aria-hidden />
              {favorites.length > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex size-4.5 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground">
                  {favorites.length}
                </span>
              )}
            </button>
            <button
              type="button"
              className="relative flex items-center gap-2 rounded-md p-2 text-primary hover:bg-secondary"
              aria-label="Coș de cumpărături"
            >
              <ShoppingBag className="size-5" aria-hidden />
              {cartCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex size-4.5 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground">
                  {cartCount}
                </span>
              )}
              <span className="hidden text-sm font-semibold lg:inline">
                {formatPrice(cartValue)}
              </span>
            </button>
          </div>
        </div>

        <nav
          aria-label="Categorii"
          className="mx-auto hidden max-w-7xl items-center gap-6 px-4 pb-3 lg:flex"
        >
          {categories.map((c) => (
            <Link
              key={c}
              to="/"
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
            >
              {c}
            </Link>
          ))}
        </nav>
      </div>

      {mobileOpen && (
        <nav aria-label="Categorii" className="border-b bg-card lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col px-4 py-2">
            {categories.map((c) => (
              <Link
                key={c}
                to="/"
                className="border-b border-border/60 py-3 text-sm font-medium text-foreground last:border-0"
                onClick={() => setMobileOpen(false)}
              >
                {c}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}

import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Heart, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { formatPrice, shipping } from "@/data/product";
import { useShop } from "@/lib/store";

const categories = [
  { label: "Cosmetice Coreene", to: "/cosmetice-coreene/creme-de-ochi-coreene" },
  { label: "Produse de îngrijire orala", to: "/" },
  { label: "Produse de îngrijire a corpului", to: "/" },
  { label: "Produse de machiaj", to: "/" },
  { label: "Produse cosmetice pentru ten", to: "/" },
  { label: "Protectie Solara", to: "/" },
  { label: "Produse pentru bărbați", to: "/" },
] as const;

const topMessages = [
  `Livrare gratuita de la ${shipping.freeFrom} RON`,
  "Primesti puncte in contul tau la fiecare achizitie",
];

const productShortcuts = [
  {
    label: "Produs 1 — Medicube Body Peel Shot",
    slug: "medicube-hypochlorous-acid-body-peel-shot-280-ml",
  },
  {
    label: "Produs 2 — K-Secret Seoul 1988 Eye Cream",
    slug:
      "k-secret-seoul-1988-eye-cream-retinal-liposome-4-fermented-bean-crema-anti-rid-cu-retinol-si-extract-fermentat-30ml",
  },
] as const;

export function Header() {
  const { cartCount, cartValue, favorites } = useShop();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setSlide((s) => (s + 1) % topMessages.length), 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-card">
      <div className="bg-secondary">
        <div className="mx-auto flex h-9 max-w-7xl items-center justify-center px-4">
          <p
            key={slide}
            className="text-center text-xs font-medium text-foreground/80 sm:text-[13px]"
            aria-live="polite"
          >
            {topMessages[slide]}
          </p>
        </div>
      </div>

      <div className="bg-card">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-4 lg:py-5">
          <button
            type="button"
            className="-ml-2 rounded-md p-2 text-primary lg:hidden"
            aria-label="Deschide meniul"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>

          <Link to="/" className="shrink-0" aria-label="Scabino — pagina principală">
            <img
              src="/scabino-wordmark.svg"
              alt="Scabino"
              width={162}
              height={41}
              className="h-8 w-auto sm:h-10"
            />
          </Link>

          <form
            role="search"
            onSubmit={(e) => e.preventDefault()}
            className="mx-auto hidden w-full max-w-md md:block"
          >
            <div className="relative">
              <label htmlFor="site-search" className="sr-only">
                Caută produse
              </label>
              <input
                id="site-search"
                type="search"
                placeholder="Ce cauți?"
                className="h-11 w-full rounded-full border border-border bg-background pl-5 pr-12 text-sm outline-none placeholder:text-muted-foreground focus:border-primary/50"
              />
              <button
                type="submit"
                aria-label="Caută"
                className="absolute right-1.5 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-full text-primary"
              >
                <Search className="size-4.5" aria-hidden />
              </button>
            </div>
          </form>

          <div className="ml-auto flex items-center gap-2 md:ml-0 md:gap-5">
            <button
              type="button"
              className="hidden items-center gap-2 text-sm font-medium text-primary hover:opacity-80 lg:flex"
            >
              <User className="size-5" aria-hidden />
              <span>Conecteaza-te/Inregistreaza-te</span>
            </button>
            <button type="button" className="relative p-1 text-primary" aria-label="Favorite">
              <Heart className="size-5.5" aria-hidden />
              {favorites.length > 0 && (
                <span className="absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground">
                  {favorites.length}
                </span>
              )}
            </button>
            <button
              type="button"
              className="relative flex items-center gap-2 p-1 text-primary"
              aria-label="Coș de cumpărături"
            >
              <ShoppingBag className="size-5.5" aria-hidden />
              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground">
                  {cartCount}
                </span>
              )}
              <span className="hidden text-sm font-semibold sm:inline">
                {formatPrice(cartValue).replace("lei", "LEI")}
              </span>
            </button>
          </div>
        </div>

        <div className="md:hidden">
          <form role="search" onSubmit={(e) => e.preventDefault()} className="px-4 pb-4">
            <div className="relative">
              <label htmlFor="site-search-mobile" className="sr-only">
                Caută produse
              </label>
              <input
                id="site-search-mobile"
                type="search"
                placeholder="Ce cauți?"
                className="h-11 w-full rounded-full border border-border bg-background pl-5 pr-12 text-sm outline-none placeholder:text-muted-foreground focus:border-primary/50"
              />
              <button
                type="submit"
                aria-label="Caută"
                className="absolute right-1.5 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-full text-primary"
              >
                <Search className="size-4.5" aria-hidden />
              </button>
            </div>
          </form>
        </div>

        <nav
          aria-label="Categorii"
          className="mx-auto hidden max-w-7xl items-center gap-5 px-4 pb-4 lg:flex xl:gap-7"
        >
          {categories.map((category) => (
            <Link
              key={category.label}
              to={category.to}
              className="text-sm font-bold text-primary transition-opacity hover:opacity-70 xl:text-[15px]"
            >
              {category.label}
            </Link>
          ))}
          <Link
            to="/set/$slug"
            params={{ slug: "duo-ton-uniform-si-bariera" }}
            className="text-sm font-bold text-primary transition-opacity hover:opacity-70 xl:text-[15px]"
          >
            Pachete
          </Link>
          <Link
            to="/rutina/$slug"
            params={{ slug: "rutina-de-baza-ten-mixt-sensibil" }}
            className="text-sm font-bold text-primary transition-opacity hover:opacity-70 xl:text-[15px]"
          >
            Rutine
          </Link>
        </nav>
      </div>

      {mobileOpen && (
        <nav aria-label="Categorii" className="border-b bg-card lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col px-4 py-2">
            <div className="border-b border-border pb-2">
              {productShortcuts.map((item) => (
                <Link
                  key={item.slug}
                  to="/p/$slug"
                  params={{ slug: item.slug }}
                  className="flex min-h-11 items-center border-b border-border/60 py-2.5 text-sm font-semibold text-primary last:border-b-0"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
            {categories.map((category) => (
              <Link
                key={category.label}
                to={category.to}
                className="border-b border-border/60 py-3 text-sm font-bold text-primary"
                onClick={() => setMobileOpen(false)}
              >
                {category.label}
              </Link>
            ))}
            <Link
              to="/set/$slug"
              params={{ slug: "duo-ton-uniform-si-bariera" }}
              className="border-b border-border/60 py-3 text-sm font-bold text-primary"
              onClick={() => setMobileOpen(false)}
            >
              Pachete
            </Link>
            <Link
              to="/rutina/$slug"
              params={{ slug: "rutina-de-baza-ten-mixt-sensibil" }}
              className="py-3 text-sm font-bold text-primary"
              onClick={() => setMobileOpen(false)}
            >
              Rutine
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}

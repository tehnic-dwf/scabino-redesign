import { useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import {
  ChevronDown,
  ChevronRight,
  Heart,
  Minus,
  Plus,
  RefreshCcw,
  ShieldCheck,
  ShoppingBag,
  Star,
  Truck,
} from "lucide-react";
import { toast } from "sonner";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductGallery } from "@/components/ProductGallery";
import { ReviewsSection } from "@/components/Reviews";
import { ProductCard } from "@/components/ProductCard";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { formatPrice, product, recommendedProducts, shipping } from "@/data/product";
import { useShop } from "@/lib/store";

export const Route = createFileRoute("/p/$slug")({
  head: () => ({
    meta: [
      { title: `${product.brand} ${product.name} — Scabino` },
      {
        name: "description",
        content: product.shortDescription.slice(0, 155),
      },
      { property: "og:title", content: `${product.brand} ${product.name}` },
      { property: "og:description", content: product.shortDescription },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProductPage,
});

function Breadcrumb() {
  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1 text-xs text-muted-foreground">
      <Link to="/" className="hover:text-primary">Acasă</Link>
      <ChevronRight className="size-3" aria-hidden />
      <Link to="/" className="hover:text-primary">{product.category}</Link>
      <ChevronRight className="size-3" aria-hidden />
      <span className="text-foreground" aria-current="page">
        {product.brand} — {product.name.split(",")[0]}
      </span>
    </nav>
  );
}

function PurchasePanel() {
  const [quantity, setQuantity] = useState(1);
  const { addToCart, favorites, toggleFavorite } = useShop();
  const isFavorite = favorites.includes(product.slug);

  const add = () => {
    addToCart({ slug: product.slug, price: product.price }, quantity);
    toast.success(`${quantity} × ${product.brand} ${product.name.split(",")[0]} adăugat în coș`);
  };

  return (
    <div className="mt-6 rounded-2xl border bg-card p-5 sm:p-6">
      <div className="flex items-end gap-3">
        <p className="text-3xl font-bold text-primary">{formatPrice(product.price)}</p>
        <p className="pb-1 text-xs text-muted-foreground">
          incl. TVA · + {product.loyaltyPoints} pct. loialitate
        </p>
      </div>
      <p className="mt-1 text-xs font-medium text-emerald-700">
        <span className="mr-1 inline-block size-2 rounded-full bg-emerald-500" aria-hidden />
        În stoc
      </p>

      <div className="mt-5 flex items-stretch gap-3">
        <div className="flex items-center rounded-lg border">
          <button
            type="button"
            aria-label="Scade cantitatea"
            className="flex size-11 items-center justify-center text-primary disabled:opacity-40"
            disabled={quantity <= 1}
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          >
            <Minus className="size-4" aria-hidden />
          </button>
          <span className="w-8 text-center text-sm font-semibold" aria-live="polite">
            {quantity}
          </span>
          <button
            type="button"
            aria-label="Crește cantitatea"
            className="flex size-11 items-center justify-center text-primary"
            onClick={() => setQuantity((q) => Math.min(10, q + 1))}
          >
            <Plus className="size-4" aria-hidden />
          </button>
        </div>
        <Button
          onClick={add}
          className="h-11 flex-1 rounded-lg bg-primary text-sm font-semibold text-primary-foreground hover:bg-primary/90"
        >
          <ShoppingBag className="size-4" aria-hidden />
          Adaugă în coș
        </Button>
        <button
          type="button"
          aria-label={isFavorite ? "Elimină din favorite" : "Adaugă la favorite"}
          aria-pressed={isFavorite}
          onClick={() => toggleFavorite(product.slug)}
          className="flex size-11 items-center justify-center rounded-lg border text-primary transition-colors hover:bg-accent"
        >
          <Heart className={`size-5 ${isFavorite ? "fill-primary" : ""}`} aria-hidden />
        </button>
      </div>

      <ul className="mt-5 grid gap-2.5 rounded-xl bg-muted/60 p-4 text-sm text-foreground/85">
        <li className="flex items-center gap-2.5">
          <ShieldCheck className="size-4 shrink-0 text-primary" aria-hidden />
          Produse 100% originale, direct de la distribuitorii autorizați
        </li>
        <li className="flex items-center gap-2.5">
          <Truck className="size-4 shrink-0 text-primary" aria-hidden />
          Livrare GLS {formatPrice(shipping.gls)} · Easybox {formatPrice(shipping.easybox)} ·
          gratuită de la {shipping.freeFrom} RON
        </li>
        <li className="flex items-center gap-2.5">
          <RefreshCcw className="size-4 shrink-0 text-primary" aria-hidden />
          Drept de retur în 14 zile
        </li>
      </ul>
    </div>
  );
}

function ChoiceHelpSection() {
  return (
    <div className="mt-10 grid gap-6 sm:grid-cols-3">
      <div className="rounded-xl border bg-card p-5">
        <h3 className="text-sm font-semibold text-primary">Este pentru mine?</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Potrivit pentru toate tipurile de ten, inclusiv pielea sensibilă.
          Alege-l dacă pielea corpului este aspră, cu pori încărcați sau
          iritații frecvente.
        </p>
      </div>
      <div className="rounded-xl border bg-card p-5">
        <h3 className="text-sm font-semibold text-primary">De ce funcționează?</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Acidul hipocloros dizolvă blând celulele moarte, în timp ce ceramidele
          și panthenolul păstrează bariera cutanată intactă.
        </p>
      </div>
      <div className="rounded-xl border bg-card p-5">
        <h3 className="text-sm font-semibold text-primary">Cum îl folosesc?</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Aplică pe pielea curată, lasă 5–10 minute, apoi clătește. De 1–3 ori
          pe săptămână, în funcție de răspunsul pielii.
        </p>
      </div>
    </div>
  );
}

function IngredientsSection() {
  return (
    <div className="mt-10 grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-1">
        <h2 className="text-xl font-bold text-foreground">Ingrediente cheie</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Fiecare ingredient are un rol clar — fără umpluturi inutile.
        </p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {product.ingredientsKey.map((i) => (
            <li
              key={i}
              className="rounded-full bg-accent px-3 py-1.5 text-xs font-medium text-accent-foreground"
            >
              {i}
            </li>
          ))}
        </ul>
        <div className="mt-6">
          <h3 className="text-sm font-semibold text-primary">Tip de ten</h3>
          <ul className="mt-2 flex flex-wrap gap-2">
            {product.skinTypes.map((s) => (
              <li
                key={s}
                className="rounded-full border px-3 py-1.5 text-xs font-medium text-foreground/80"
              >
                {s}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="lg:col-span-2">
        <ul className="space-y-3">
          {product.keyIngredients.map((ing) => (
            <li key={ing.name} className="rounded-xl border bg-card p-4">
              <p className="text-sm font-semibold text-foreground">{ing.name}</p>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{ing.role}</p>
            </li>
          ))}
        </ul>
        <Accordion type="single" collapsible className="mt-4">
          <AccordionItem value="inci" className="border-b-0">
            <AccordionTrigger className="rounded-xl border bg-card px-4 text-sm font-semibold text-primary hover:no-underline">
              Lista completă de ingrediente (INCI)
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-2 pt-3 text-sm leading-relaxed text-muted-foreground">
              {product.inci}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}

function DetailsSection() {
  return (
    <Accordion type="multiple" defaultValue={["detalii"]} className="mt-12 space-y-3">
      <AccordionItem value="detalii" className="rounded-xl border bg-card px-5">
        <AccordionTrigger className="text-base font-semibold text-foreground hover:no-underline">
          Detalii produs
        </AccordionTrigger>
        <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
          <p>{product.shortDescription}</p>
          <h4 className="mt-5 font-semibold text-foreground">Caracteristici unice</h4>
          <ul className="mt-2 space-y-2.5">
            {product.uniqueFeatures.map((f) => (
              <li key={f.title}>
                <span className="font-medium text-foreground">{f.title}.</span> {f.text}
              </li>
            ))}
          </ul>
          <h4 className="mt-5 font-semibold text-foreground">Beneficii</h4>
          <ul className="mt-2 list-disc space-y-1.5 pl-5">
            {product.benefits.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
          <h4 className="mt-5 font-semibold text-foreground">Mod de utilizare</h4>
          <ol className="mt-2 list-decimal space-y-1.5 pl-5">
            {product.usage.map((u) => (
              <li key={u}>{u}</li>
            ))}
          </ol>
          <h4 className="mt-5 font-semibold text-foreground">Cum acționează</h4>
          <ul className="mt-2 list-disc space-y-1.5 pl-5">
            {product.action.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="extra" className="rounded-xl border bg-card px-5">
        <AccordionTrigger className="text-base font-semibold text-foreground hover:no-underline">
          Informații suplimentare
        </AccordionTrigger>
        <AccordionContent>
          <dl className="divide-y divide-border">
            {product.extraInfo.map(([label, value]) => (
              <div key={label} className="flex justify-between gap-6 py-2.5 text-sm">
                <dt className="font-medium text-foreground">{label}</dt>
                <dd className="text-right text-muted-foreground">{value}</dd>
              </div>
            ))}
          </dl>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

function RatingBadge() {
  return (
    <a href="#reviews" className="inline-flex items-center gap-2 text-sm hover:underline">
      <span className="flex" aria-hidden>
        {[1, 2, 3, 4, 5].map((i) => (
          <Star key={i} className="size-4 fill-amber-400 text-amber-400" />
        ))}
      </span>
      <span className="font-semibold">{product.rating.toFixed(1)}</span>
      <span className="text-muted-foreground">
        ({product.reviewCount} recenzii)
      </span>
    </a>
  );
}

function RecommendedSection() {
  return (
    <section aria-labelledby="recommended-heading" className="mt-14">
      <div className="flex items-baseline justify-between">
        <h2 id="recommended-heading" className="text-xl font-bold">
          Produse recomandate pentru tine
        </h2>
        <Link to="/" className="flex items-center gap-1 text-sm font-medium text-primary hover:underline">
          Vezi toate <ChevronRight className="size-4" aria-hidden />
        </Link>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        {recommendedProducts.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
    </section>
  );
}

function ProductPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-6">
        <Breadcrumb />

        <div className="mt-6 grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="lg:sticky lg:top-36 lg:self-start">
            <ProductGallery />
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-primary">
              {product.brand}
            </p>
            <h1 className="mt-1.5 text-2xl font-bold leading-snug text-foreground sm:text-3xl">
              {product.name}
            </h1>
            <div className="mt-3">
              <RatingBadge />
            </div>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground sm:text-base">
              {product.shortDescription}
            </p>
            <PurchasePanel />
          </div>
        </div>

        <ChoiceHelpSection />
        <IngredientsSection />
        <DetailsSection />
        <div id="reviews" />
        <ReviewsSection />
        <RecommendedSection />
      </main>
      <Footer />
    </div>
  );
}

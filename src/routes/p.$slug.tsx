import { useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { ChevronRight, Heart, Minus, Plus, ShoppingBag, Star } from "lucide-react";
import { toast } from "sonner";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductGallery } from "@/components/ProductGallery";
import { ReviewsSection } from "@/components/Reviews";
import { ProductCard } from "@/components/ProductCard";
import {
  CompareTable,
  CompatibilityBlock,
  EvidenceBlock,
  FitNonFit,
  FreeShippingProgress,
  LoyaltyLine,
  Section,
  TrustRow,
  VerdictCard,
} from "@/components/pdp/DecisionBlocks";
import { RoutineGapCrossSell } from "@/components/pdp/RoutineGap";
import { StickyBuyBar } from "@/components/pdp/StickyBuyBar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { formatPrice, product, recommendedProducts } from "@/data/product";
import { useShop } from "@/lib/store";

export const Route = createFileRoute("/p/$slug")({
  head: () => ({
    meta: [
      { title: `${product.brand} ${product.name} — Scabino` },
      { name: "description", content: product.benefitLine.slice(0, 155) },
      { property: "og:title", content: `${product.brand} ${product.name}` },
      { property: "og:description", content: product.benefitLine },
      { property: "og:type", content: "product" },
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

function PurchasePanel({ onAdd }: { onAdd: (q: number) => void }) {
  const [quantity, setQuantity] = useState(1);
  const { favorites, toggleFavorite, cartValue } = useShop();
  const isFavorite = favorites.includes(product.slug);

  return (
    <div id="buy-panel" className="mt-6 rounded-2xl border bg-card p-5 sm:p-6">
      <div className="flex items-end gap-3">
        <p className="text-3xl font-bold text-primary">{formatPrice(product.price)}</p>
        <p className="pb-1 text-xs text-muted-foreground">incl. TVA</p>
      </div>
      <p className="mt-1 text-xs font-medium text-fit">
        <span className="mr-1 inline-block size-2 rounded-full bg-fit" aria-hidden />
        În stoc · expediem azi
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
          onClick={() => onAdd(quantity)}
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

      <LoyaltyLine points={product.loyaltyPoints} />
      <FreeShippingProgress cartValue={cartValue} />
      <TrustRow />
    </div>
  );
}

function AttributeTags() {
  return (
    <ul className="mt-4 flex flex-wrap gap-2" aria-label="Atribute produs">
      {[...product.skinTypes, "Fără parfum", "Spray"].map((t) => (
        <li
          key={t}
          className="rounded-md bg-muted px-2.5 py-1 text-[11px] font-medium uppercase tracking-wide text-muted-foreground"
        >
          {t}
        </li>
      ))}
    </ul>
  );
}

function IngredientsSection() {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-1">
        <ul className="flex flex-wrap gap-2">
          {product.ingredientsKey.map((i) => (
            <li
              key={i}
              className="rounded-full bg-accent px-3 py-1.5 text-xs font-medium text-accent-foreground"
            >
              {i}
            </li>
          ))}
        </ul>
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
    <Accordion type="multiple" className="mt-12 space-y-3">
      <AccordionItem value="utilizare" className="rounded-xl border bg-card px-5">
        <AccordionTrigger className="text-base font-semibold text-foreground hover:no-underline">
          Cum îl folosești
        </AccordionTrigger>
        <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
          <ol className="list-decimal space-y-1.5 pl-5">
            {product.usage.map((u) => (
              <li key={u}>{u}</li>
            ))}
          </ol>
          <p className="mt-4">
            Moment în rutină: seara sau înainte de duș. Continuă rutina când produsul s-a
            distribuit și se așază confortabil pe piele.
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="detalii" className="rounded-xl border bg-card px-5">
        <AccordionTrigger className="text-base font-semibold text-foreground hover:no-underline">
          Detalii produs
        </AccordionTrigger>
        <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
          <p>{product.shortDescription}</p>
          <h4 className="mt-5 font-semibold text-foreground">Caracteristici</h4>
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
      <span className="text-muted-foreground">({product.reviewCount} recenzii)</span>
    </a>
  );
}

function ProductPage() {
  const { addToCart } = useShop();

  const add = (quantity = 1) => {
    addToCart({ slug: product.slug, price: product.price }, quantity);
    toast.success(`${quantity} × ${product.brand} ${product.name.split(",")[0]} adăugat în coș`);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
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
            <p className="mt-3 text-sm leading-relaxed text-foreground/85 sm:text-base">
              {product.benefitLine}
            </p>
            <div className="mt-3">
              <RatingBadge />
            </div>
            <AttributeTags />
            <PurchasePanel onAdd={add} />
          </div>
        </div>

        <Section
          id="verdict"
          title="Verdict în 15 secunde"
          intro="Ce este, cum se simte și când îl folosești — fără să citești toată pagina."
        >
          <VerdictCard attributes={product.verdict} bestFor={product.bestFor} />
        </Section>

        <Section
          id="fit"
          title="Alege-l sau nu — spunem și când nu are sens"
          intro="Preferăm să pierdem o vânzare decât să îți vindem un produs care nu ți se potrivește."
        >
          <FitNonFit
            fit={product.fit}
            nonFit={product.nonFit}
            alternative={{
              label: product.nonFitAlternative.label,
              to: product.nonFitAlternative.to,
            }}
          />
        </Section>

        <Section
          id="evidence"
          title="Ce știm și ce nu promitem"
          intro="Separăm ce spune brandul de ce vedem noi în formulă și de ce nu putem garanta."
        >
          <EvidenceBlock rows={product.evidence} />
        </Section>

        <Section
          id="ingrediente"
          title="Ingredientele care contează"
          intro="Trei ingrediente cu rol clar, plus lista completă dacă vrei să verifici."
        >
          <IngredientsSection />
        </Section>

        <Section
          id="compatibilitate"
          title="Se combină cu ce folosești deja?"
          intro="Verifică rapid dacă are loc în rutina ta sau dacă funcția este deja acoperită."
        >
          <CompatibilityBlock {...product.compatibility} />
        </Section>

        <Section
          id="comparatie"
          title="Compară cu o alternativă"
          intro="O singură alternativă relevantă, nu douăsprezece produse similare."
        >
          <CompareTable
            currentLabel={`${product.brand} Body Peel Shot`}
            alternativeLabel={product.comparison.alternativeName}
            rows={product.comparison.rows}
          />
        </Section>

        <DetailsSection />

        <div id="reviews" />
        <ReviewsSection />

        <Section
          id="routine-gap"
          title="Ce îi lipsește rutinei tale"
          intro="Nu îți recomandăm alt exfoliant. Îți arătăm pașii care completează acesta — sari peste ce ai deja."
        >
          <RoutineGapCrossSell items={product.routineGap} />
        </Section>

        <section aria-labelledby="recommended-heading" className="mt-14">
          <h2 id="recommended-heading" className="text-xl font-bold">
            Din aceeași categorie
          </h2>
          <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
            {recommendedProducts.slice(0, 6).map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
      <StickyBuyBar
        title={`${product.brand} ${product.name.split(",")[0]}`}
        price={product.price}
        onAdd={() => add(1)}
      />
    </div>
  );
}

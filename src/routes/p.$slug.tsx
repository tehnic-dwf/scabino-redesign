import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Droplet, Heart, Minus, Plus, Shield, ShoppingBag, Sparkles, Star } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
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
import {
  AuthenticityLine,
  DeliveryEstimate,
  HowToSteps,
  faqJsonLd,
} from "@/components/pdp/ConversionBlocks";
import { PostAddToCartDrawer } from "@/components/PostAddToCartDrawer";
import { RoutineGapCrossSell } from "@/components/pdp/RoutineGap";
import { QuickMatch } from "@/components/pdp/QuickMatch";
import { StickyBuyBar } from "@/components/pdp/StickyBuyBar";
import { KSecretProductDraft, kSecretProduct } from "@/components/KSecretProductDraft";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { formatPrice, product, recommendedProducts, unitPrice } from "@/data/product";
import { useShop } from "@/lib/store";

export const Route = createFileRoute("/p/$slug")({
  head: ({ params }) => {
    const isKSecret = params.slug === kSecretProduct.slug;
    const title = isKSecret
      ? `${kSecretProduct.brand} ${kSecretProduct.name} — Scabino`
      : `${product.brand} ${product.name} — Scabino`;
    const description = isKSecret
      ? `${kSecretProduct.subtitle}. Produs indisponibil momentan.`
      : product.benefitLine;

    return {
      meta: [
        { title },
        { name: "description", content: description.slice(0, 155) },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "product" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: ProductRoute,
});

function ProductRoute() {
  const { slug } = Route.useParams();

  if (slug === kSecretProduct.slug) {
    return <KSecretProductDraft />;
  }

  return <ProductPage />;
}

const crumbs = [
  { label: "Prima pagină", to: "/" },
  { label: "Produse de îngrijire a corpului", to: "/" },
  { label: "Ingrijire corp", to: "/" },
  { label: product.category, to: "/" },
  { label: `${product.brand}, ${product.name}` },
];

function PurchasePanel({ onAdd }: { onAdd: (q: number) => void }) {
  const [quantity, setQuantity] = useState(1);
  const { favorites, toggleFavorite, cartValue } = useShop();
  const isFavorite = favorites.includes(product.slug);

  return (
    <div id="buy-panel" className="mt-4 min-w-0 rounded-2xl border bg-card p-4 sm:mt-6 sm:p-6">
      <div className="flex flex-wrap items-end gap-x-3 gap-y-0.5">
        <p className="text-3xl font-bold text-primary">{formatPrice(product.price)}</p>
        <p className="pb-1 text-xs text-muted-foreground">
          incl. TVA · {unitPrice(product.price, product.volumeMl)}
        </p>
      </div>
      <p className="mt-1 text-xs font-medium text-fit">
        <span className="mr-1 inline-block size-2 rounded-full bg-fit" aria-hidden />
        {product.stock ? "În stoc" : "Stoc epuizat"}
      </p>
      <DeliveryEstimate />
      <p className="mt-1 hidden text-[11px] text-muted-foreground sm:block">
        Cod produs: {product.code}
      </p>
      <AuthenticityLine />

      <div className="mt-4 grid grid-cols-[auto_minmax(0,1fr)_2.75rem] items-stretch gap-2 sm:mt-5 sm:gap-3">
        <div className="flex shrink-0 items-center rounded-lg border">
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
          className="h-11 min-w-0 rounded-lg bg-primary px-2 text-xs font-semibold text-primary-foreground hover:bg-primary/90 sm:px-4 sm:text-sm"
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
      <p className="mt-2 text-[11px] text-muted-foreground">
        {isFavorite
          ? "Salvat la favorite — te anunțăm dacă scade prețul sau se termină stocul."
          : "Nu te-ai hotărât? Salvează-l la favorite ♡ și te anunțăm la reducere."}
      </p>

      <LoyaltyLine points={product.loyaltyPoints} />
      <FreeShippingProgress cartValue={cartValue} />
      <TrustRow />
    </div>
  );
}

function IngredientChips() {
  const icons = [Droplet, Shield, Sparkles];
  const explanations = new Map(product.keyIngredients.map((ingredient) => [ingredient.name, ingredient.role]));

  return (
    <ul className="grid grid-cols-3 gap-2 sm:gap-3">
      {product.ingredientsKey.map((ingredient, index) => {
        const Icon = icons[index] ?? Droplet;
        return (
          <li key={ingredient} className="min-w-0">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  aria-label={`Află mai multe despre ${ingredient}`}
                  className="h-full min-h-20 w-full min-w-0 whitespace-normal rounded-lg px-2 py-3 shadow-none"
                >
                  <span className="flex min-w-0 flex-col items-center text-center">
                    <Icon className="size-6 text-primary" strokeWidth={1.5} aria-hidden />
                    <span className="mt-2 text-[11px] font-medium leading-tight text-foreground sm:text-xs">
                      {ingredient}
                    </span>
                  </span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-64 p-3" side="top">
                <p className="text-sm font-semibold text-foreground">{ingredient}</p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  {explanations.get(ingredient)}
                </p>
              </PopoverContent>
            </Popover>
          </li>
        );
      })}
    </ul>
  );
}

function AttributeTags() {
  return (
    <ul className="mt-4 flex flex-wrap gap-2" aria-label="Atribute produs">
      {[...product.skinTypes, "Fără parfum", "Spray"].map((t) => (
        <li
          key={t}
          className="border-l-2 border-primary/30 bg-muted/60 px-2.5 py-1 text-[11px] font-medium uppercase tracking-wide text-muted-foreground"
        >
          {t}
        </li>
      ))}
    </ul>
  );
}

function SecondaryDetails() {
  return (
    <section aria-labelledby="details-heading" className="mt-14">
      <h2 id="details-heading" className="text-xl font-bold text-foreground sm:text-2xl">
        Detalii, la nevoie
      </h2>
      <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
        Formula completă, compatibilitatea și informațiile tehnice rămân la un pas distanță.
      </p>
      <Accordion type="multiple" className="mt-5 rounded-xl border bg-card px-4 sm:px-6">
        <AccordionItem value="inci">
          <AccordionTrigger className="text-left text-sm font-semibold text-foreground hover:no-underline sm:text-base">
            Lista completă de ingrediente (INCI)
          </AccordionTrigger>
          <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
            {product.inci}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="evidence">
          <AccordionTrigger className="text-left text-sm font-semibold text-foreground hover:no-underline sm:text-base">
            Ce știm și ce nu promitem
        </AccordionTrigger>
          <AccordionContent>
            <EvidenceBlock rows={product.evidence} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="compatibility">
          <AccordionTrigger className="text-left text-sm font-semibold text-foreground hover:no-underline sm:text-base">
            Compatibilitate cu rutina ta
          </AccordionTrigger>
          <AccordionContent>
            <CompatibilityBlock {...product.compatibility} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="comparison">
          <AccordionTrigger className="text-left text-sm font-semibold text-foreground hover:no-underline sm:text-base">
            Compară cu o alternativă
          </AccordionTrigger>
          <AccordionContent>
            <CompareTable
              currentLabel={`${product.brand} Body Peel Shot`}
              alternativeLabel={product.comparison.alternativeName}
              rows={product.comparison.rows}
            />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="technical">
          <AccordionTrigger className="text-left text-sm font-semibold text-foreground hover:no-underline sm:text-base">
            Descriere, beneficii și detalii tehnice
          </AccordionTrigger>
          <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
            <p>{product.shortDescription}</p>
            <h3 className="mt-5 font-semibold text-foreground">Caracteristici</h3>
            <ul className="mt-2 space-y-2.5">
              {product.uniqueFeatures.map((feature) => (
                <li key={feature.title}>
                  <span className="font-medium text-foreground">{feature.title}.</span> {feature.text}
                </li>
              ))}
            </ul>
            <h3 className="mt-5 font-semibold text-foreground">Beneficii</h3>
            <ul className="mt-2 list-disc space-y-1.5 pl-5">
              {product.benefits.map((benefit) => (
                <li key={benefit}>{benefit}</li>
              ))}
            </ul>
            <dl className="mt-5 divide-y divide-border border-t">
              {product.extraInfo.map(([label, value]) => (
                <div key={label} className="flex justify-between gap-6 py-2.5 text-sm">
                  <dt className="font-medium text-foreground">{label}</dt>
                  <dd className="text-right text-muted-foreground">{value}</dd>
                </div>
              ))}
            </dl>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="faq" className="border-b-0">
          <AccordionTrigger className="text-left text-sm font-semibold text-foreground hover:no-underline sm:text-base">
            Întrebări frecvente
          </AccordionTrigger>
          <AccordionContent>
            <dl className="divide-y divide-border">
              {product.faq.map((item) => (
                <div key={item.q} className="py-3 first:pt-0">
                  <dt className="text-sm font-semibold text-foreground">{item.q}</dt>
                  <dd className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.a}</dd>
                </div>
              ))}
            </dl>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqJsonLd() }} />
    </section>
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
  const [added, setAdded] = useState<number | null>(null);

  const add = (quantity = 1) => {
    addToCart({ slug: product.slug, price: product.price }, quantity);
    setAdded(quantity);
  };

  const commaIndex = product.name.indexOf(",");
  const mainTitle = commaIndex > -1 ? product.name.slice(0, commaIndex) : product.name;
  const productSubtitle = commaIndex > -1 ? product.name.slice(commaIndex + 1).trim() : "";

  return (
    <div className="min-h-screen max-w-full overflow-x-clip bg-background pb-20">
      <Header />
      <Breadcrumbs items={crumbs} />
      <main className="mx-auto w-full min-w-0 max-w-7xl px-4 pb-6 pt-3">
        <div className="mt-1 grid min-w-0 gap-5 lg:grid-cols-2 lg:gap-14">
          {/* Mobile: brand + title above the gallery (identity → visual → action) */}
          <div className="min-w-0 lg:hidden">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
              {product.brand}
            </p>
            <h1 className="mt-1 text-xl font-bold leading-snug text-foreground">
              {mainTitle}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">{productSubtitle}</p>
          </div>

          <div className="min-w-0 lg:sticky lg:top-36 lg:self-start">
            <ProductGallery />
          </div>
          <div className="mt-6 min-w-0 lg:mt-0">
            <div className="hidden lg:block">
              <p className="text-sm font-semibold uppercase tracking-wide text-primary">
                {product.brand}
              </p>
              <h1 className="mt-1.5 text-2xl font-bold leading-snug text-foreground sm:text-3xl">
                {product.name}
              </h1>
            </div>
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

        <Section id="quick-match" title="Ce produs este:">
          <QuickMatch attributes={product.quickMatch} />
        </Section>

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

        <HowToSteps />

        <Section
          id="ingrediente"
          title="Ingrediente cheie"
          intro="Trei ingrediente cu rol clar. Lista completă rămâne disponibilă mai jos."
        >
          <IngredientChips />
        </Section>

        <div id="reviews" className="scroll-mt-24" />
        <ReviewsSection />

        <SecondaryDetails />

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
        slug={product.slug}
      />
      <AddedToCartSheet
        open={added !== null}
        onOpenChange={(o) => !o && setAdded(null)}
        quantity={added ?? 1}
      />
    </div>
  );
}

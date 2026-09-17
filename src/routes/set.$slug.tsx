import { useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { ChevronRight, ShoppingBag, Star } from "lucide-react";
import { toast } from "sonner";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  FitNonFit,
  FreeShippingProgress,
  LoyaltyLine,
  Section,
  TrustRow,
} from "@/components/pdp/DecisionBlocks";
import { StickyBuyBar } from "@/components/pdp/StickyBuyBar";
import { Button } from "@/components/ui/button";
import { bundle, formatPercent } from "@/data/bundle";
import { formatPrice } from "@/data/product";
import { useShop } from "@/lib/store";

export const Route = createFileRoute("/set/$slug")({
  head: () => ({
    meta: [
      { title: `${bundle.title} — Scabino` },
      { name: "description", content: bundle.subtitle.slice(0, 155) },
      { property: "og:title", content: bundle.title },
      { property: "og:description", content: bundle.subtitle },
      { property: "og:type", content: "product" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BundlePage,
});

function BundlePage() {
  const { addToCart, cartValue } = useShop();
  const [checked, setChecked] = useState<string[]>([]);
  const saving = bundle.separatePrice - bundle.price;

  const add = () => {
    addToCart({ slug: bundle.slug, price: bundle.price });
    toast.success("Pachetul a fost adăugat în coș");
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-6">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-xs text-muted-foreground">
          <Link to="/" className="hover:text-primary">Acasă</Link>
          <ChevronRight className="size-3" aria-hidden />
          <span className="text-foreground" aria-current="page">Pachete</span>
        </nav>

        <div className="mt-6 grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="grid grid-cols-2 gap-4 lg:sticky lg:top-36 lg:self-start">
            {bundle.items.map((i) => (
              <figure key={i.slug} className="rounded-2xl border bg-card p-4">
                <img
                  src={i.image}
                  alt={`${i.brand} ${i.name}`}
                  className="mx-auto aspect-square w-full rounded-lg object-contain"
                />
                <figcaption className="mt-3 text-xs text-muted-foreground">
                  <span className="font-semibold text-foreground">{i.role}</span> · {i.volume}
                </figcaption>
              </figure>
            ))}
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-primary">
              Pachet · 2 produse
            </p>
            <h1 className="mt-1.5 text-2xl font-bold leading-snug sm:text-3xl">{bundle.title}</h1>
            <p className="mt-3 text-sm leading-relaxed text-foreground/85 sm:text-base">
              {bundle.subtitle}
            </p>
            <p className="mt-3 flex items-center gap-2 text-sm">
              <span className="flex" aria-hidden>
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="size-4 fill-amber-400 text-amber-400" />
                ))}
              </span>
              <span className="font-semibold">{bundle.rating}</span>
              <span className="text-muted-foreground">({bundle.reviewCount} recenzii)</span>
            </p>

            <div id="buy-panel" className="mt-6 rounded-2xl border bg-card p-5 sm:p-6">
              <div className="flex flex-wrap items-end gap-3">
                <p className="text-3xl font-bold text-primary">{formatPrice(bundle.price)}</p>
                <p className="pb-1 text-sm text-muted-foreground line-through">
                  {formatPrice(bundle.separatePrice)}
                </p>
                <p className="pb-1 text-sm font-semibold text-fit">
                  economisești {formatPrice(saving)} ({formatPercent(saving, bundle.separatePrice)})
                </p>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                Prețul separat este suma prețurilor individuale de pe site, pe care le poți verifica
                mai jos, produs cu produs.
              </p>
              <Button
                onClick={add}
                className="mt-5 h-11 w-full rounded-lg bg-primary text-sm font-semibold text-primary-foreground hover:bg-primary/90"
              >
                <ShoppingBag className="size-4" aria-hidden />
                Adaugă pachetul în coș
              </Button>
              <LoyaltyLine points={bundle.loyaltyPoints} />
              <FreeShippingProgress cartValue={cartValue} />
              <TrustRow />
            </div>
          </div>
        </div>

        <Section
          id="dece"
          title="De ce aceste două produse împreună"
          intro="Scopul pachetului este de rutină, nu de discount."
        >
          <p className="max-w-3xl rounded-2xl border bg-card p-5 text-sm leading-relaxed text-foreground/85 sm:p-6">
            {bundle.whyTogether}
          </p>
        </Section>

        <Section
          id="continut"
          title="Ce conține, produs cu produs"
          intro="Fiecare produs are un rol diferit și un preț verificabil separat."
        >
          <div className="grid gap-4 md:grid-cols-2">
            {bundle.items.map((i) => (
              <article key={i.slug} className="flex gap-4 rounded-2xl border bg-card p-5">
                <img
                  src={i.image}
                  alt={`${i.brand} ${i.name}`}
                  loading="lazy"
                  className="size-24 shrink-0 rounded-lg bg-muted object-contain"
                />
                <div>
                  <span className="inline-block rounded-full bg-fit-soft px-2 py-0.5 text-[11px] font-semibold text-fit">
                    {i.role}
                  </span>
                  <h3 className="mt-1.5 text-sm font-semibold leading-snug">
                    {i.brand} {i.name}
                  </h3>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {i.ingredient} · {i.volume} · preț separat {formatPrice(i.price)}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{i.why}</p>
                </div>
              </article>
            ))}
          </div>
        </Section>

        <Section
          id="fit"
          title="Pachetul are sens pentru tine?"
          intro="Dacă ai deja unul dintre produse, îți spunem să cumperi doar celălalt."
        >
          <FitNonFit fit={bundle.fit} nonFit={bundle.nonFit} />
        </Section>

        <Section
          id="suprapunere"
          title="Verifică suprapunerea cu rutina ta"
          intro="Bifează ce folosești deja. Nu trimitem datele nicăieri — este doar un ghid pentru tine."
        >
          <div className="rounded-2xl border bg-card p-5 sm:p-6">
            <ul className="space-y-3">
              {bundle.overlapChecks.map((c) => (
                <li key={c}>
                  <label className="flex cursor-pointer items-center gap-3 text-sm text-foreground/85">
                    <input
                      type="checkbox"
                      checked={checked.includes(c)}
                      onChange={() =>
                        setChecked((prev) =>
                          prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c],
                        )
                      }
                      className="size-4 accent-primary"
                    />
                    {c}
                  </label>
                </li>
              ))}
            </ul>
            <p className="mt-4 border-t pt-4 text-sm text-foreground/85" aria-live="polite">
              {checked.length === 0
                ? "Nimic bifat: pachetul completează o rutină care nu are încă aceste două funcții."
                : "Ai bifat funcții pe care le acoperi deja. Îți recomandăm să iei doar produsul care îți lipsește, nu pachetul."}
            </p>
          </div>
        </Section>

        <Section
          id="protocol"
          title="Cum le folosești împreună"
          intro="Ordinea contează mai mult decât cantitatea."
        >
          <div className="grid gap-4 md:grid-cols-2">
            {bundle.protocol.map((p) => (
              <div key={p.moment} className="rounded-2xl border bg-card p-5">
                <h3 className="text-sm font-semibold text-primary">{p.moment}</h3>
                <p className="mt-2 text-sm font-medium text-foreground">{p.steps}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.role}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section
          id="asteptari"
          title="Ce putem și ce nu putem promite"
          intro="Preferăm o așteptare corectă unei vânzări urmate de dezamăgire."
        >
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-fit-border bg-fit-soft p-5">
              <h3 className="text-sm font-semibold text-fit">Ce spunem</h3>
              <ul className="mt-3 space-y-2 text-sm leading-relaxed text-foreground/85">
                {bundle.expectations.can.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-caution-border bg-caution-soft p-5">
              <h3 className="text-sm font-semibold text-caution">Ce nu spunem</h3>
              <ul className="mt-3 space-y-2 text-sm leading-relaxed text-foreground/85">
                {bundle.expectations.cannot.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>
          </div>
        </Section>
      </main>
      <Footer />
      <StickyBuyBar title={bundle.title} price={bundle.price} onAdd={add} />
    </div>
  );
}

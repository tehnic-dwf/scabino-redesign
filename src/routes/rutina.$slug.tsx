import { useMemo, useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { ChevronRight, ShoppingBag, Star } from "lucide-react";
import { toast } from "sonner";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  FreeShippingProgress,
  LoyaltyLine,
  Section,
  TrustRow,
} from "@/components/pdp/DecisionBlocks";
import { StickyBuyBar } from "@/components/pdp/StickyBuyBar";
import { Button } from "@/components/ui/button";
import { formatPrice, findProduct } from "@/data/product";
import { routine } from "@/data/routine";
import { useShop } from "@/lib/store";

export const Route = createFileRoute("/rutina/$slug")({
  head: () => ({
    meta: [
      { title: `${routine.title} — Scabino` },
      { name: "description", content: routine.subtitle.slice(0, 155) },
      { property: "og:title", content: routine.title },
      { property: "og:description", content: routine.subtitle },
      { property: "og:type", content: "product" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: RoutinePage,
});

type Sensitivity = "Sensibilă" | "Normală";
type Experience = "Începător" | "Rutină stabilă";

function RoutinePage() {
  const { addToCart, cartValue } = useShop();
  const [sensitivity, setSensitivity] = useState<Sensitivity>("Normală");
  const [experience, setExperience] = useState<Experience>("Începător");

  const steps = useMemo(
    () =>
      routine.steps.filter(
        (s) => !(s.skipIfSensitive && (sensitivity === "Sensibilă" || experience === "Începător")),
      ),
    [sensitivity, experience],
  );

  const price = useMemo(
    () =>
      steps.reduce((sum, s) => sum + (findProduct(s.slug)?.price ?? 0), 0),
    [steps],
  );

  const add = () => {
    addToCart({ slug: routine.slug, price }, 1);
    toast.success(`Rutina cu ${steps.length} pași a fost adăugată în coș`);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-6">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-xs text-muted-foreground">
          <Link to="/" className="hover:text-primary">Acasă</Link>
          <ChevronRight className="size-3" aria-hidden />
          <span className="text-foreground" aria-current="page">Rutine complete</span>
        </nav>

        <div className="mt-6 grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="grid grid-cols-2 gap-4 lg:sticky lg:top-36 lg:self-start">
            {steps.map((s) => {
              const p = findProduct(s.slug);
              if (!p) return null;
              return (
                <figure key={s.slug} className="rounded-2xl border bg-card p-4">
                  <img
                    src={p.image}
                    alt={`${p.brand} ${p.name}`}
                    className="mx-auto aspect-square w-full rounded-lg object-contain"
                  />
                  <figcaption className="mt-3 text-xs text-muted-foreground">
                    <span className="font-semibold text-foreground">{s.step}</span> · {s.role}
                  </figcaption>
                </figure>
              );
            })}
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-primary">
              Rutină completă · {steps.length} pași
            </p>
            <h1 className="mt-1.5 text-2xl font-bold leading-snug sm:text-3xl">{routine.title}</h1>
            <p className="mt-3 text-sm leading-relaxed text-foreground/85 sm:text-base">
              {routine.subtitle}
            </p>
            <p className="mt-3 flex items-center gap-2 text-sm">
              <span className="flex" aria-hidden>
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="size-4 fill-amber-400 text-amber-400" />
                ))}
              </span>
              <span className="font-semibold">{routine.rating}</span>
              <span className="text-muted-foreground">({routine.reviewCount} recenzii)</span>
            </p>

            <div className="mt-6 rounded-2xl border bg-card p-5 sm:p-6">
              <h2 className="text-sm font-semibold">Personalizează rutina</h2>
              <p className="mt-1 text-xs text-muted-foreground">
                Două întrebări, nu zece. Rutina se ajustează, nu se transformă într-un catalog.
              </p>
              <div className="mt-4 space-y-4">
                <Choice
                  label="Cum reacționează pielea ta"
                  options={["Normală", "Sensibilă"] as Sensitivity[]}
                  value={sensitivity}
                  onChange={setSensitivity}
                />
                <Choice
                  label="Experiența ta cu rutinele"
                  options={["Începător", "Rutină stabilă"] as Experience[]}
                  value={experience}
                  onChange={setExperience}
                />
              </div>
              <p className="mt-4 rounded-xl bg-muted/60 p-3.5 text-xs text-foreground/85" aria-live="polite">
                {steps.length < routine.steps.length
                  ? "Am scos serul activ din start. Îl poți adăuga după 2–3 săptămâni de bază tolerată."
                  : "Rutina include și serul activ, introdus ultimul, din două în două zile."}
              </p>
            </div>

            <div id="buy-panel" className="mt-4 rounded-2xl border bg-card p-5 sm:p-6">
              <div className="flex flex-wrap items-end gap-3">
                <p className="text-3xl font-bold text-primary">{formatPrice(price)}</p>
                <p className="pb-1 text-xs text-muted-foreground">
                  pentru {steps.length} produse, la prețurile individuale de pe site
                </p>
              </div>
              <Button
                onClick={add}
                className="mt-5 h-11 w-full rounded-lg bg-primary text-sm font-semibold text-primary-foreground hover:bg-primary/90"
              >
                <ShoppingBag className="size-4" aria-hidden />
                Adaugă rutina în coș
              </Button>
              <LoyaltyLine points={Math.round(price)} />
              <FreeShippingProgress cartValue={cartValue} />
              <TrustRow />
            </div>
          </div>
        </div>

        <Section
          id="pasi"
          title="Pașii rutinei, cu rol clar"
          intro="Fiecare pas are o funcție. Dacă ai deja un produs echivalent, sari peste el."
        >
          <div className="space-y-4">
            {steps.map((s) => {
              const p = findProduct(s.slug);
              const alt = s.alternativeSlug ? findProduct(s.alternativeSlug) : undefined;
              if (!p) return null;
              return (
                <article key={s.slug} className="flex flex-col gap-4 rounded-2xl border bg-card p-5 sm:flex-row">
                  <img
                    src={p.image}
                    alt={`${p.brand} ${p.name}`}
                    loading="lazy"
                    className="size-24 shrink-0 rounded-lg bg-muted object-contain"
                  />
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-semibold text-primary">{s.step}</span>
                      <span
                        className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                          s.required === "Bază"
                            ? "bg-fit-soft text-fit"
                            : "bg-evidence-soft text-evidence"
                        }`}
                      >
                        {s.required}
                      </span>
                      <span className="ml-auto text-sm font-bold text-primary">
                        {formatPrice(p.price)}
                      </span>
                    </div>
                    <h3 className="mt-1.5 text-sm font-semibold">
                      {p.brand} {p.name}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{s.why}</p>
                    <p className="mt-2 text-xs text-muted-foreground">
                      Dimineața: {s.am} · Seara: {s.pm}
                    </p>
                    {alt && s.alternativeNote && (
                      <p className="mt-2 text-xs text-foreground/85">
                        <span className="font-semibold">Alternativă: </span>
                        {s.alternativeNote} ({alt.brand} {alt.name})
                      </p>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </Section>

        <Section
          id="program"
          title="Program AM / PM"
          intro="Nu toți pașii se folosesc de două ori pe zi."
        >
          <div className="overflow-x-auto rounded-2xl border bg-card">
            <table className="w-full min-w-[34rem] text-left text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th scope="col" className="p-4 font-semibold text-muted-foreground">Pas</th>
                  <th scope="col" className="p-4 font-semibold text-foreground">Dimineața</th>
                  <th scope="col" className="p-4 font-semibold text-foreground">Seara</th>
                </tr>
              </thead>
              <tbody>
                {steps.map((s) => (
                  <tr key={s.slug} className="border-b last:border-b-0">
                    <th scope="row" className="p-4 font-medium text-foreground">{s.step}</th>
                    <td className="p-4 text-muted-foreground">{s.am}</td>
                    <td className="p-4 text-muted-foreground">{s.pm}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        <Section
          id="onboarding"
          title="Cum introduci rutina, pas cu pas"
          intro="Nu începe totul în aceeași zi — altfel nu știi ce a funcționat."
        >
          <ol className="grid gap-4 md:grid-cols-3">
            {routine.onboarding.map((o) => (
              <li key={o.stage} className="rounded-2xl border bg-card p-5">
                <h3 className="text-sm font-semibold text-primary">{o.stage}</h3>
                <p className="mt-2 text-sm font-medium text-foreground">{o.logic}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{o.copy}</p>
              </li>
            ))}
          </ol>
        </Section>

        <Section
          id="reactii"
          title="Dacă pielea reacționează"
          intro="Este normal să ajustezi. Iată ce faci concret."
        >
          <dl className="divide-y rounded-2xl border border-caution-border bg-caution-soft p-5 sm:p-6">
            {routine.reaction.map(([issue, fix]) => (
              <div key={issue} className="grid gap-1 py-3 sm:grid-cols-[16rem_1fr] sm:gap-6">
                <dt className="text-sm font-semibold text-foreground">{issue}</dt>
                <dd className="text-sm leading-relaxed text-foreground/85">{fix}</dd>
              </div>
            ))}
          </dl>
        </Section>

        <Section
          id="addons"
          title="Adaugi ceva doar dacă ai un motiv"
          intro="Maximum două completări targetate, nu un raft întreg."
        >
          <div className="grid gap-4 sm:grid-cols-2">
            {routine.addons.map((a) => {
              const p = findProduct(a.slug);
              if (!p) return null;
              return (
                <article key={a.slug} className="flex items-center gap-4 rounded-2xl border bg-card p-5">
                  <img
                    src={p.image}
                    alt={`${p.brand} ${p.name}`}
                    loading="lazy"
                    className="size-20 shrink-0 rounded-lg bg-muted object-contain"
                  />
                  <div className="flex-1">
                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      {a.label}
                    </p>
                    <h3 className="mt-1 text-sm font-semibold">
                      {p.brand} {p.name}
                    </h3>
                    <p className="mt-1 text-sm font-bold text-primary">{formatPrice(p.price)}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      addToCart({ slug: p.slug, price: p.price });
                      toast.success(`${p.name} adăugat în coș`);
                    }}
                    className="h-11 shrink-0 rounded-lg border border-primary px-4 text-sm font-semibold text-primary hover:bg-accent"
                  >
                    Adaugă
                  </button>
                </article>
              );
            })}
          </div>
        </Section>

        <Section
          id="reaprovizionare"
          title="Cât durează fiecare produs"
          intro="Ca să știi când revii, fără abonament impus."
        >
          <dl className="grid gap-3 rounded-2xl border bg-card p-5 sm:grid-cols-2 sm:p-6">
            {routine.replenishment.map(([label, value]) => (
              <div key={label} className="flex justify-between gap-4 border-b pb-2 text-sm last:border-b-0">
                <dt className="font-medium text-foreground">{label}</dt>
                <dd className="text-muted-foreground">{value}</dd>
              </div>
            ))}
          </dl>
        </Section>

        <Section id="reviews-rutina" title="Ce spun cei care au folosit setul">
          <ul className="grid gap-4 md:grid-cols-2">
            {routine.reviews.map((r) => (
              <li key={r.author} className="rounded-2xl border bg-card p-5">
                <div className="flex items-center gap-3">
                  <span className="font-semibold">{r.author}</span>
                  <span className="text-xs text-muted-foreground">{r.date}</span>
                  <span className="ml-auto flex" aria-label={`${r.rating} din 5`}>
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star
                        key={i}
                        className={`size-3.5 ${
                          i <= r.rating ? "fill-amber-400 text-amber-400" : "text-muted-foreground/40"
                        }`}
                        aria-hidden
                      />
                    ))}
                  </span>
                </div>
                <p className="mt-1 text-[11px] text-muted-foreground">
                  Ten {r.skinType.toLowerCase()} · {r.experience}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-foreground/85">{r.text}</p>
              </li>
            ))}
          </ul>
        </Section>
      </main>
      <Footer />
      <StickyBuyBar title={routine.title} price={price} onAdd={add} />
    </div>
  );
}

function Choice<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: T[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{label}</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {options.map((o) => (
          <button
            key={o}
            type="button"
            aria-pressed={value === o}
            onClick={() => onChange(o)}
            className={`min-h-11 rounded-lg border px-4 text-sm font-medium transition-colors ${
              value === o
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border text-foreground/80 hover:border-primary/50"
            }`}
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}

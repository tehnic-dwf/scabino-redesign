import { useState } from "react";
import {
  ArrowRight,
  BellRing,
  Clock3,
  Droplet,
  Heart,
  Leaf,
  Moon,
  Quote,
  Sparkles,
  Star,
  Sun,
  Hand,
  Waves,
  Minus,
} from "lucide-react";
import { toast } from "sonner";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ProductGallery } from "@/components/ProductGallery";
import {
  FitNonFit,
  LoyaltyLine,
  Section,
  TrustRow,
  VerdictCard,
} from "@/components/pdp/DecisionBlocks";
import { AuthenticityLine, HowToSteps } from "@/components/pdp/ConversionBlocks";
import { QuickMatch } from "@/components/pdp/QuickMatch";
import { StickyBuyBar } from "@/components/pdp/StickyBuyBar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { formatPrice, type QuickMatchAttribute } from "@/data/product";
import { useShop } from "@/lib/store";
import imageAsset from "@/assets/scabino/k-secret-seoul-1988-eye-cream.webp.asset.json";
import image2 from "@/assets/scabino/k-secret-eye-cream-2.webp.asset.json";
import image3 from "@/assets/scabino/k-secret-eye-cream-3.webp.asset.json";
import altBoj from "@/assets/scabino/alt-boj-revive-eye-serum.webp.asset.json";
import altHaru from "@/assets/scabino/alt-haruharu-bakuchiol-eye-cream.webp.asset.json";
import altPdrn from "@/assets/scabino/alt-medicube-pdrn-eye-cream.webp.asset.json";

export const kSecretProduct = {
  slug:
    "k-secret-seoul-1988-eye-cream-retinal-liposome-4-fermented-bean-crema-anti-rid-cu-retinol-si-extract-fermentat-30ml",
  brand: "K-SECRET",
  name: "Seoul 1988 Eye Cream: Retinal Liposome 4% + Fermented Bean",
  subtitle: "Cremă pentru conturul ochilor, 30 ml",
  price: 75.64,
  oldPrice: 84.99,
  volumeMl: 30,
  loyaltyPoints: 75,
  code: "KSecret-EyeCream-Retinal-30ml",
  image: imageAsset.url,
  images: [imageAsset.url, image2.url, image3.url],
};

const quickMatch: QuickMatchAttribute[] = [
  { icon: "product", label: "Tip produs", value: "Cremă de ochi" },
  { icon: "eye", label: "Zonă", value: "Conturul ochilor" },
  { icon: "target", label: "Pentru", value: "Riduri fine · pigmentare" },
  { icon: "active", label: "Activ principal", value: "Retinal Liposome 4%" },
  { icon: "formula", label: "Formulă", value: "Ingrediente fermentate" },
  { icon: "skin", label: "Tip de piele", value: "Toate tipurile · mai ales matură" },
];

const verdict: [string, string][] = [
  [
    "Pe scurt",
    "Cremă pentru conturul ochilor construită în jurul Retinal Liposome 4% și ingredientelor fermentate, orientată spre riduri fine, pigmentare și textură neuniformă.",
  ],
  [
    "De știut",
    "Retinalul este un activ pe care merită să îl introduci progresiv în rutină, mai ales dacă nu folosești deja produse cu retinoizi.",
  ],
];

const fit = [
  "preocuparea ta principală sunt ridurile fine din jurul ochilor;",
  "vrei să lucrezi și pe aspectul pigmentării sau texturii;",
  "cauți un produs targetat cu retinal;",
  "ești dispusă să introduci produsul progresiv în rutină.",
];
const nonFit = [
  "cauți exclusiv hidratare simplă pentru conturul ochilor;",
  "nu vrei să folosești ingrediente din familia retinoizilor;",
  "folosești deja un alt produs puternic cu retinoid în aceeași zonă și nu vrei să dublezi inutil activii.",
];

const howTo = [
  { title: "Curăță", text: "Aplică produsul pe pielea curată." },
  { title: "Cantitate mică", text: "Folosește o cantitate mică pentru zona ochilor." },
  { title: "Aplică delicat", text: "Tapotează ușor în jurul conturului ochilor." },
  {
    title: "Introdu gradual",
    text: "Dacă retinalul este nou în rutina ta, începe treptat și urmărește toleranța pielii.",
  },
  { title: "SPF ziua", text: "Folosește protecție solară în rutina de dimineață." },
];

const ingredients = [
  {
    name: "Retinal",
    icon: Sparkles,
    role: "Activ din familia vitaminei A; în produs este prezent în sistemul denumit oficial „Retinal Liposome 4%”.",
  },
  {
    name: "Complex fermentat",
    icon: Leaf,
    role: "Formula conține ingrediente fermentate din soia, ginseng, orez și alte extracte fermentate.",
  },
  { name: "Niacinamide", icon: Droplet, role: "Ingredient prezent în INCI." },
  { name: "Bakuchiol + peptide", icon: Waves, role: "Ingrediente complementare prezente în formulă." },
];

const inci =
  "Water, Butylene Glycol, Glycerin, Propanediol, Retinal Liposome (4%), Glycine Soja (Soybean) Ferment Extract, Lactobacillus/Soybean Ferment Extract, Niacinamide, Panthenol, Beta-Glucan, Allantoin, Sodium Hyaluronate, Tocopherol, Caprylyl Glycol, Carbomer, Tromethamine, Adenosine, 1,2-Hexanediol, Disodium EDTA";

const reviews = [
  {
    author: "Tanase Andreea",
    date: "20.08.2026",
    rating: 5,
    text: "Este a doua oara când cumpăr acest produs și se vede rezultate ❤️",
  },
  { author: "xDamaa Damaa", date: "25.05.2026", rating: 5, text: "Crema de ochi 5/5⭐️" },
];

const alternatives = [
  {
    brand: "Beauty of Joseon",
    name: "Revive Eye Serum: Ginseng + Retinal",
    subtitle: "Ser pentru ochi, 30 ml",
    price: 79.99,
    image: altBoj.url,
    why: "vrei tot un retinoid pentru conturul ochilor, într-o textură de ser mai lejeră.",
  },
  {
    brand: "Haruharu Wonder",
    name: "Black Rice Bakuchiol Eye Cream",
    subtitle: "Cremă de ochi, 20 ml",
    price: 91.99,
    image: altHaru.url,
    why: "preferi să eviți retinoizii și cauți o alternativă mai blândă, cu bakuchiol.",
  },
  {
    brand: "Medicube",
    name: "PDRN Pink Peptide Eye Cream",
    subtitle: "Cremă de ochi, 30 ml",
    price: 83.99,
    image: altPdrn.url,
    why: "prioritatea ta sunt cearcănele și fermitatea, cu peptide în loc de retinal.",
  },
];

const extraInfo: [string, string][] = [
  ["Brand", "K-Secret"],
  ["Gramaj", "30 ml"],
  ["Moment în rutină", "Seara"],
  ["Textură", "Cremă lejeră"],
  ["Tip de ten", "Toate tipurile"],
  ["Free-from", "Non-comedogenic"],
  ["Origine", "Coreea de Sud"],
  ["Cod produs", kSecretProduct.code],
];

const crumbs = [
  { label: "Prima pagină", to: "/" },
  { label: "Cosmetice coreene", to: "/" },
  { label: "Creme de ochi coreene", to: "/" },
  { label: `${kSecretProduct.brand} ${kSecretProduct.name}` },
];

function Stars({ value, className = "size-4" }: { value: number; className?: string }) {
  return (
    <span className="flex gap-0.5" aria-label={`Evaluare ${value} din 5 stele`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`${className} ${i <= value ? "fill-amber-400 text-amber-400" : "text-muted-foreground/40"}`}
          aria-hidden
        />
      ))}
    </span>
  );
}

function NotifyForm() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <p className="mt-3 rounded-lg bg-fit-soft p-3 text-sm text-fit" role="status">
        Gata. Te anunțăm la {email} când produsul revine în stoc.
      </p>
    );
  }

  return (
    <form
      className="mt-3 rounded-xl border bg-muted/40 p-3.5"
      onSubmit={(e) => {
        e.preventDefault();
        if (!/^\S+@\S+\.\S+$/.test(email)) {
          toast.error("Introdu o adresă de email validă.");
          return;
        }
        setSent(true);
      }}
    >
      <label htmlFor="notify-email" className="text-xs font-semibold text-foreground">
        Email
      </label>
      <div className="mt-1.5 grid grid-cols-[minmax(0,1fr)_auto] gap-2">
        <Input
          id="notify-email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="adresa@email.ro"
          className="h-11 min-w-0 bg-card"
          required
        />
        <Button type="submit" className="h-11 rounded-lg px-4 text-sm font-semibold">
          Anunță-mă
        </Button>
      </div>
      <p className="mt-2 text-[11px] text-muted-foreground">
        Te anunțăm o singură dată când produsul revine în stoc.
      </p>
    </form>
  );
}

function PurchasePanel({ open, onOpen }: { open: boolean; onOpen: () => void }) {
  const { favorites, toggleFavorite } = useShop();
  const isFavorite = favorites.includes(kSecretProduct.slug);

  return (
    <div id="buy-panel" className="mt-4 min-w-0 rounded-2xl border bg-card p-4 sm:mt-6 sm:p-6">
      <div className="flex flex-wrap items-end gap-x-3 gap-y-0.5">
        <p className="text-3xl font-bold text-primary">{formatPrice(kSecretProduct.price)}</p>
        <p className="pb-1 text-sm text-muted-foreground line-through">
          {formatPrice(kSecretProduct.oldPrice)}
        </p>
        <p className="pb-1 text-xs text-muted-foreground">
          incl. TVA · {formatPrice((kSecretProduct.price / kSecretProduct.volumeMl) * 10)}/10ml
        </p>
      </div>
      <p className="mt-1.5 flex flex-wrap items-center gap-x-2 text-xs font-medium text-caution">
        <Clock3 className="size-3.5 shrink-0" aria-hidden />
        Momentan indisponibil
        <span className="text-muted-foreground">· Revine în 3–5 zile</span>
      </p>
      <AuthenticityLine />

      <div className="mt-4 grid grid-cols-[minmax(0,1fr)_2.75rem] gap-2 sm:mt-5 sm:gap-3">
        <Button
          onClick={onOpen}
          aria-expanded={open}
          aria-controls="notify-email"
          className="h-11 min-w-0 rounded-lg px-2 text-sm font-semibold"
        >
          <BellRing className="size-4" aria-hidden />
          Anunță-mă când revine
        </Button>
        <button
          type="button"
          aria-label={isFavorite ? "Elimină din favorite" : "Adaugă la favorite"}
          aria-pressed={isFavorite}
          onClick={() => toggleFavorite(kSecretProduct.slug)}
          className="flex size-11 items-center justify-center rounded-lg border text-primary transition-colors hover:bg-accent"
        >
          <Heart className={`size-5 ${isFavorite ? "fill-primary" : ""}`} aria-hidden />
        </button>
      </div>
      {open && <NotifyForm />}
      <a
        href="#alternative"
        className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
      >
        Vezi alternative disponibile
        <ArrowRight className="size-3.5" aria-hidden />
      </a>

      <LoyaltyLine points={kSecretProduct.loyaltyPoints} />
      <TrustRow />
    </div>
  );
}

function IngredientCards() {
  return (
    <>
      <ul className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
        {ingredients.map(({ name, icon: Icon, role }) => (
          <li key={name} className="min-w-0">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  aria-label={`Află mai multe despre ${name}`}
                  className="h-full min-h-20 w-full min-w-0 whitespace-normal rounded-lg px-2 py-3 shadow-none"
                >
                  <span className="flex min-w-0 flex-col items-center text-center">
                    <Icon className="size-6 text-primary" strokeWidth={1.5} aria-hidden />
                    <span className="mt-2 text-[11px] font-medium leading-tight text-foreground sm:text-xs">
                      {name}
                    </span>
                  </span>
                </Button>
              </PopoverTrigger>
              <PopoverContent side="top" className="w-64 text-sm">
                <p className="font-semibold text-foreground">{name}</p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{role}</p>
              </PopoverContent>
            </Popover>
          </li>
        ))}
      </ul>
      <a href="#details" className="mt-3 inline-block text-sm font-medium text-primary hover:underline">
        Vezi INCI complet
      </a>
    </>
  );
}

function Compatibility() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="rounded-2xl border border-fit-border bg-fit-soft p-5">
        <h3 className="text-sm font-semibold text-fit">Cu ce se potrivește</h3>
        <ul className="mt-3 space-y-2 text-sm leading-relaxed text-foreground/85">
          <li>rutină hidratantă simplă;</li>
          <li>creme reparatoare / hidratante;</li>
          <li>SPF în rutina de dimineață.</li>
        </ul>
      </div>
      <div className="rounded-2xl border border-caution-border bg-caution-soft p-5">
        <h3 className="text-sm font-semibold text-caution">Atenție la</h3>
        <p className="mt-3 text-sm leading-relaxed text-foreground/85">
          Dacă folosești deja alți retinoizi în aceeași zonă, evită să suprapui inutil mai multe
          produse active fără să știi că le tolerezi.
        </p>
      </div>
    </div>
  );
}

function Reviews() {
  const distribution = [5, 4, 3, 2, 1].map((stars) => ({
    stars,
    count: reviews.filter((r) => r.rating === stars).length,
  }));
  return (
    <section id="reviews" aria-labelledby="reviews-heading" className="mt-14 scroll-mt-24">
      <h2 id="reviews-heading" className="text-xl font-bold text-foreground sm:text-2xl">
        Ce spun cumpărătorii
      </h2>
      <div className="mt-6 rounded-2xl border bg-card p-6 sm:p-8">
        <div className="flex items-center gap-6">
          <div className="text-center">
            <p className="text-4xl font-bold text-primary">5.0</p>
            <Stars value={5} />
            <p className="mt-1 text-xs text-muted-foreground">{reviews.length} recenzii</p>
          </div>
          <div className="min-w-0 flex-1 space-y-1">
            {distribution.map((d) => (
              <div key={d.stars} className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="w-3">{d.stars}</span>
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-border">
                  <div
                    className="h-full rounded-full bg-amber-400"
                    style={{ width: `${(d.count / reviews.length) * 100}%` }}
                  />
                </div>
                <span className="w-3 text-right">{d.count}</span>
              </div>
            ))}
          </div>
        </div>
        <ul className="mt-6 divide-y border-t">
          {reviews.map((r) => (
            <li key={r.author} className="py-4">
              <div className="flex items-center justify-between gap-3">
                <p className="truncate text-sm font-semibold text-foreground">{r.author}</p>
                <span className="shrink-0 text-xs text-muted-foreground">{r.date}</span>
              </div>
              <div className="mt-1">
                <Stars value={r.rating} className="size-3.5" />
              </div>
              <p className="mt-2 flex gap-2 text-sm leading-relaxed text-foreground/85">
                <Quote className="mt-0.5 size-3.5 shrink-0 text-primary/50" aria-hidden />
                {r.text}
              </p>
            </li>
          ))}
        </ul>
        <p className="border-t pt-4 text-xs text-muted-foreground">
          Recenzii lăsate pe Scabino. Nu importăm evaluări de pe alte site-uri.
        </p>
      </div>
    </section>
  );
}

function Details() {
  return (
    <section id="details" aria-labelledby="details-heading" className="mt-14 scroll-mt-24">
      <h2 id="details-heading" className="text-xl font-bold text-foreground sm:text-2xl">
        Detalii, la nevoie
      </h2>
      <Accordion type="multiple" className="mt-5 rounded-xl border bg-card px-4 sm:px-6">
        <AccordionItem value="specs">
          <AccordionTrigger className="text-left text-sm font-semibold hover:no-underline sm:text-base">
            Detalii & specificații
          </AccordionTrigger>
          <AccordionContent>
            <dl className="divide-y divide-border">
              {extraInfo.map(([label, value]) => (
                <div key={label} className="flex justify-between gap-6 py-2.5 text-sm">
                  <dt className="font-medium text-foreground">{label}</dt>
                  <dd className="text-right text-muted-foreground">{value}</dd>
                </div>
              ))}
            </dl>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="inci">
          <AccordionTrigger className="text-left text-sm font-semibold hover:no-underline sm:text-base">
            Lista completă de ingrediente (INCI)
          </AccordionTrigger>
          <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
            {inci}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="producer">
          <AccordionTrigger className="text-left text-sm font-semibold hover:no-underline sm:text-base">
            Informații producător
          </AccordionTrigger>
          <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
            K-Secret, Coreea de Sud. Importat prin distribuitori autorizați.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="storage">
          <AccordionTrigger className="text-left text-sm font-semibold hover:no-underline sm:text-base">
            Depozitare / EAN
          </AccordionTrigger>
          <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
            A se păstra la loc uscat, ferit de lumina directă a soarelui. EAN: de completat.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="faq" className="border-b-0">
          <AccordionTrigger className="text-left text-sm font-semibold hover:no-underline sm:text-base">
            Întrebări frecvente
          </AccordionTrigger>
          <AccordionContent>
            <dl className="divide-y divide-border">
              {[
                [
                  "Când revine în stoc?",
                  "Estimăm 3–5 zile. Lasă-ne emailul și te anunțăm o singură dată, când revine.",
                ],
                [
                  "Pot folosi crema dimineața?",
                  "Recomandăm seara. Dacă o folosești ziua, nu sări peste SPF.",
                ],
                [
                  "Este „4% retinal pur”?",
                  "Nu. Denumirea oficială a sistemului este „Retinal Liposome 4%”.",
                ],
              ].map(([q, a]) => (
                <div key={q} className="py-3 first:pt-0">
                  <dt className="text-sm font-semibold text-foreground">{q}</dt>
                  <dd className="mt-1 text-sm leading-relaxed text-muted-foreground">{a}</dd>
                </div>
              ))}
            </dl>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
}

function Alternatives() {
  const { addToCart } = useShop();
  return (
    <section id="alternative" aria-labelledby="alternative-heading" className="mt-14 scroll-mt-24">
      <h2 id="alternative-heading" className="text-xl font-bold text-foreground sm:text-2xl">
        Nu vrei să aștepți?
      </h2>
      <p className="mt-2 text-sm text-muted-foreground">Vezi alternative disponibile acum.</p>
      <ul className="mt-6 grid gap-3 md:grid-cols-3">
        {alternatives.map((a) => (
          <li
            key={a.name}
            className="grid min-w-0 grid-cols-[5.5rem_minmax(0,1fr)] gap-3 rounded-2xl border bg-card p-3 md:grid-cols-1"
          >
            <img
              src={a.image}
              alt={`${a.brand} ${a.name}`}
              loading="lazy"
              className="aspect-square w-full rounded-lg bg-white object-contain"
            />
            <div className="min-w-0">
              <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                {a.brand}
              </p>
              <p className="text-sm font-semibold leading-snug text-foreground">{a.name}</p>
              <p className="text-xs text-muted-foreground">{a.subtitle}</p>
              <p className="mt-2 text-xs leading-relaxed text-foreground/85">
                <span className="font-semibold">Alege această alternativă dacă </span>
                {a.why}
              </p>
              <div className="mt-2 flex items-center justify-between gap-2">
                <span className="text-sm font-bold text-primary">{formatPrice(a.price)}</span>
                <Button
                  size="sm"
                  variant="outline"
                  className="h-8 rounded-lg text-xs"
                  onClick={() => {
                    addToCart({ slug: a.name, price: a.price }, 1);
                    toast.success(`${a.brand} ${a.name} a fost adăugat în coș`);
                  }}
                >
                  Adaugă
                </Button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function KSecretProductDraft() {
  const [notifyOpen, setNotifyOpen] = useState(false);

  const openNotify = () => {
    setNotifyOpen(true);
    requestAnimationFrame(() => {
      const el = document.getElementById("buy-panel");
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
      setTimeout(() => document.getElementById("notify-email")?.focus({ preventScroll: true }), 350);
    });
  };

  return (
    <div className="min-h-screen max-w-full overflow-x-clip bg-background pb-20">
      <Header />
      <Breadcrumbs items={crumbs} />
      <main className="mx-auto w-full min-w-0 max-w-7xl px-4 pb-6 pt-3">
        <div className="mt-1 grid min-w-0 gap-5 lg:grid-cols-2 lg:gap-14">
          <div className="min-w-0 lg:hidden">
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
              {kSecretProduct.brand}
              <span className="rounded-sm bg-accent px-1.5 py-0.5 text-[10px] tracking-wide">
                Bestseller
              </span>
            </p>
            <h1 className="mt-1 text-xl font-bold leading-snug text-foreground">
              {kSecretProduct.name}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">{kSecretProduct.subtitle}</p>
          </div>

          <div className="min-w-0 lg:sticky lg:top-36 lg:self-start">
            <ProductGallery
              images={kSecretProduct.images}
              withVideo={false}
              alt={`${kSecretProduct.brand} ${kSecretProduct.name}`}
            />
          </div>
          <div className="mt-6 min-w-0 lg:mt-0">
            <div className="hidden lg:block">
              <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-primary">
                {kSecretProduct.brand}
                <span className="rounded-sm bg-accent px-1.5 py-0.5 text-[10px] tracking-wide">
                  Bestseller
                </span>
              </p>
              <h1 className="mt-1.5 text-2xl font-bold leading-snug text-foreground sm:text-3xl">
                {kSecretProduct.name}, {kSecretProduct.volumeMl} ml
              </h1>
            </div>
            <a href="#reviews" className="mt-3 inline-flex items-center gap-2 text-sm hover:underline">
              <Stars value={5} />
              <span className="font-semibold">5.0</span>
              <span className="text-muted-foreground">({reviews.length} recenzii)</span>
            </a>
            <PurchasePanel open={notifyOpen} onOpen={() => setNotifyOpen((v) => !v)} />
          </div>
        </div>

        <Section id="quick-match" title="Ce produs este:">
          <QuickMatch attributes={quickMatch} />
        </Section>

        <Section id="verdict" title="Verdict în 15 secunde">
          <VerdictCard
            attributes={verdict}
            bestFor="vrei un produs targetat anti-aging pentru zona ochilor, nu doar o cremă hidratantă simplă."
          />
        </Section>

        <Section id="fit" title="Ți se potrivește / Mai bine alege altceva">
          <FitNonFit
            fit={fit}
            nonFit={nonFit}
            fitTitle="Ți se potrivește dacă"
            nonFitTitle="Mai bine alege altceva dacă"
            footnote="Ai deja o cremă cu retinal care funcționează bine pentru tine? Nu ai nevoie să o schimbi doar pentru că acest produs este popular."
          />
        </Section>

        <HowToSteps
          steps={howTo}
          frequency="Seara, introdus treptat"
          icons={[Droplet, Minus, Hand, Moon, Sun]}
        />

        <Section id="ingrediente" title="Ingrediente cheie">
          <IngredientCards />
        </Section>

        <Section id="compatibilitate" title="Compatibilitate">
          <Compatibility />
        </Section>

        <Reviews />
        <Details />
        <Alternatives />
      </main>
      <Footer />
      <StickyBuyBar
        title={`${kSecretProduct.brand} Seoul 1988 Eye Cream`}
        price={kSecretProduct.price}
        onAdd={openNotify}
        slug={kSecretProduct.slug}
        ctaLabel="Anunță-mă când revine"
        ctaIcon={BellRing}
      />
    </div>
  );
}

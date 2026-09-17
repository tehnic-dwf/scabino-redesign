import { recommendedProducts } from "@/data/product";

const byslug = (slug: string) => recommendedProducts.find((p) => p.slug === slug)!;

export interface RoutineStep {
  step: string;
  slug: string;
  role: string;
  why: string;
  am: string;
  pm: string;
  required: "Bază" | "Opțional";
  alternativeSlug?: string;
  alternativeNote?: string;
  skipIfSensitive?: boolean;
}

export const routine = {
  slug: "rutina-de-baza-ten-mixt-sensibil",
  title: "Rutina coreeană de bază pentru ten mixt, sensibil și predispus la imperfecțiuni — 4 pași",
  subtitle:
    "O rutină pentru cine vrea să înceapă simplu, fără să cumpere din prima cinci acizi și trei serumuri.",
  productCount: 4,
  price: 339.9,
  separatePrice: 399.6,
  loyaltyPoints: 339,
  rating: 4.9,
  reviewCount: 8,
  steps: [
    {
      step: "1. Curățare",
      slug: "arencia-fresh-green-rice-mochi-cleanser",
      role: "Curățare blândă",
      why: "Pregătește pielea fără să o usuce. Dacă pielea „scârțâie” după curățare, restul rutinei pornește greșit.",
      am: "după nevoie",
      pm: "da",
      required: "Bază",
      alternativeSlug: "heimish-all-clean-balm",
      alternativeNote: "Dacă te machiezi zilnic, adaugă un balsam demachiant seara.",
    },
    {
      step: "2. Toner",
      slug: "im-from-rice-toner",
      role: "Hidratare de bază",
      why: "Un strat de hidratare care face crema mai confortabilă. Nu este un activ.",
      am: "da",
      pm: "da",
      required: "Bază",
    },
    {
      step: "3. Ser de susținere",
      slug: "nine-less-b-boost-10-niacinamide-serum",
      role: "Activ ușor pentru ton",
      why: "Singurul activ din rutină. Se introduce ultimul, după ce baza este tolerată.",
      am: "opțional",
      pm: "da",
      required: "Opțional",
      skipIfSensitive: true,
    },
    {
      step: "4. Cremă",
      slug: "dr-althea-345-relief-cream",
      role: "Barieră și calmare",
      why: "Închide rutina și reduce riscul de iritație atunci când adaugi un activ.",
      am: "da",
      pm: "da",
      required: "Bază",
    },
  ] as RoutineStep[],
  onboarding: [
    {
      stage: "Săptămâna 1–2 — baza",
      logic: "Curățare, toner, cremă.",
      copy: "Începe cu ceea ce poți menține. Baza contează mai mult decât activul.",
    },
    {
      stage: "Săptămâna 3 — un singur produs nou",
      logic: "Adaugi serul, seara, din două în două zile.",
      copy: "Dacă apare o reacție, identifici mai ușor cauza.",
    },
    {
      stage: "Mai târziu — activ targetat",
      logic: "Doar dacă rămâne o problemă clară.",
      copy: "Nu ai nevoie automat de exfoliant sau retinoid.",
    },
  ],
  reaction: [
    ["Uscăciune sau senzație de întindere", "Redu serul la 2 aplicări pe săptămână și păstrează crema în fiecare seară."],
    ["Usturime care persistă peste câteva minute", "Oprește serul câteva zile și rămâi la curățare, toner, cremă."],
    ["Nu știi ce produs a cauzat reacția", "Revino la bază și reintrodu un singur produs la 5–7 zile."],
  ] as [string, string][],
  addons: [
    {
      slug: "nine-less-a-control-10-azelaic-acid-serum",
      label: "Dacă ai imperfecțiuni persistente",
    },
    {
      slug: "medicube-deep-vita-c-capsule-cream",
      label: "Dacă obiectivul principal este luminozitatea",
    },
  ],
  replenishment: [
    ["Curățare", "aprox. 3 luni"],
    ["Toner", "aprox. 2 luni"],
    ["Ser", "aprox. 6 săptămâni"],
    ["Cremă", "aprox. 3 luni"],
  ] as [string, string][],
  reviews: [
    {
      author: "Andreea M.",
      date: "02.09.2026",
      rating: 5,
      text: "Am luat setul ca începătoare și mi-a plăcut că mi-a spus clar ce să folosesc întâi. Nu am mai cumpărat lucruri de care nu aveam nevoie.",
      skinType: "Mixt",
      experience: "Începător",
    },
    {
      author: "Ioana P.",
      date: "21.08.2026",
      rating: 4,
      text: "Serul m-a înțepat ușor prima săptămână, am redus frecvența și acum e în regulă. Crema este foarte bună.",
      skinType: "Sensibil",
      experience: "Rutină stabilă",
    },
  ],
};

export const routineProduct = byslug;

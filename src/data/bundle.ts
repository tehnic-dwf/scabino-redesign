import { recommendedProducts } from "@/data/product";

const byslug = (slug: string) => recommendedProducts.find((p) => p.slug === slug)!;

const serum = byslug("nine-less-b-boost-10-niacinamide-serum");
const cream = byslug("dr-althea-345-relief-cream");

export const bundle = {
  slug: "duo-ton-uniform-si-bariera",
  title: "Duo pentru ton mai uniform și o barieră mai calmă",
  subtitle:
    "Nine Less B-Boost 10% Niacinamide Serum + Dr. Althea 345 Relief Cream — două funcții diferite ale aceleiași rutine, nu același rol de două ori.",
  separatePrice: serum.price + cream.price,
  price: 154.99,
  loyaltyPoints: 154,
  rating: 4.8,
  reviewCount: 12,
  whyTogether:
    "Am asociat un ser orientat spre ton neuniform cu o cremă de barieră pentru că acoperă două funcții diferite: activul punctual și susținerea pielii care îl primește. Nu prezentăm pachetul ca fiind mai eficient clinic decât produsele folosite separat — nu au fost testate împreună.",
  fit: [
    "Îți lipsesc ambele funcții: un activ pentru ton și o cremă de susținere.",
    "Ai încercat un activ înainte și pielea s-a uscat pentru că lipsea hidratarea.",
    "Vrei să începi o rutină simplă, cu doi pași, nu cu cinci.",
  ],
  nonFit: [
    "Ai deja o cremă de barieră pe care o folosești constant → ia doar serul.",
    "Ai deja un ser cu niacinamidă și îl tolerezi → ia doar crema.",
    "Problema principală este acneea inflamată — cere sfatul unui medic dermatolog.",
    "Vrei să schimbi simultan patru–cinci produse — introdu-le pe rând.",
  ],
  items: [
    {
      slug: serum.slug,
      brand: serum.brand,
      name: serum.name,
      image: serum.image,
      price: serum.price,
      role: "Pasul activ",
      ingredient: "Niacinamidă 10%",
      volume: "20 ml",
      why: "Orientat spre aspectul tonului neuniform și al porilor vizibili.",
    },
    {
      slug: cream.slug,
      brand: cream.brand,
      name: cream.name,
      image: cream.image,
      price: cream.price,
      role: "Pasul de susținere",
      ingredient: "Ceramide + panthenol",
      volume: "50 ml",
      why: "Hidratează și calmează pielea care primește activul.",
    },
  ],
  protocol: [
    {
      moment: "Dimineața",
      steps: "Curățare → ser → cremă → protecție solară",
      role: "Serul se aplică pe pielea curată; crema închide rutina înainte de SPF.",
    },
    {
      moment: "Seara",
      steps: "Curățare → ser → cremă",
      role: "Aceeași ordine. Continuă când produsul s-a așezat confortabil pe piele.",
    },
  ],
  expectations: {
    can: [
      "Serul este formulat și poziționat pentru aspectul tonului neuniform.",
      "Crema susține bariera și reduce senzația de uscăciune în timpul introducerii unui activ.",
      "Rezultatele cosmetice diferă în funcție de piele și de consecvență.",
    ],
    cannot: [
      "„Petele dispar în 4 săptămâni.”",
      "„Pachetul este de două ori mai eficient decât produsele separat.”",
      "„Sinergie clinică” — produsele nu au fost testate împreună.",
    ],
  },
  overlapChecks: [
    "Folosesc deja un ser cu niacinamidă",
    "Folosesc deja o cremă de barieră cu ceramide",
    "Folosesc retinoid seara",
    "Folosesc exfoliant cu acizi de 2+ ori pe săptămână",
  ],
};

export function formatPercent(saving: number, base: number): string {
  return `${((saving / base) * 100).toFixed(1).replace(".", ",")}%`;
}

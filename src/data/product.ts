import {
  recommendationImages,
  productImages,
  reviewPhotos,
} from "@/lib/assets";

export const CURRENCY = "lei";

export const shipping = {
  freeFrom: 250,
  gls: 16.99,
  easybox: 8.99,
  processing: "Comenzi plasate până la ora 14:00 se pregătesc în aceeași zi.",
};

export interface RecommendedProduct {
  brand: string;
  name: string;
  subtitle: string;
  price: number;
  oldPrice?: number;
  image: string;
  slug: string;
}

export const recommendedProducts: RecommendedProduct[] = [
  {
    brand: "I'm From",
    name: "Rice Toner",
    subtitle: "Toner iluminator cu orez, 200 ml",
    price: 116.99,
    image: recommendationImages.rice,
    slug: "im-from-rice-toner",
  },
  {
    brand: "Nine Less",
    name: "Root-Biome Caffeine Scalp Shampoo",
    subtitle: "Șampon calmant pentru scalp, 300 ml",
    price: 99.99,
    image: recommendationImages.scalp,
    slug: "nine-less-root-biome-caffeine-scalp-shampoo",
  },
  {
    brand: "Elizavecca",
    name: "Witch Piggy Marine Collagen Ample",
    subtitle: "Ser cu colagen marin, 100 ml",
    price: 69.99,
    image: recommendationImages.collagen,
    slug: "elizavecca-witch-piggy-marine-collagen-ample",
  },
  {
    brand: "Nine Less",
    name: "A-Control 10% Azelaic Acid Serum",
    subtitle: "Ser cu acid azelaic 10%, 20 ml",
    price: 76.99,
    image: recommendationImages.azelaic,
    slug: "nine-less-a-control-10-azelaic-acid-serum",
  },
  {
    brand: "Dr. Althea",
    name: "345 Relief Cream",
    subtitle: "Calmant și reparatoare, 50 ml",
    price: 98.99,
    image: recommendationImages.althea,
    slug: "dr-althea-345-relief-cream",
  },
  {
    brand: "Crest",
    name: "Pro-Health Mouthwash",
    subtitle: "Apă de gură protecție completă, 473 ml",
    price: 129.99,
    image: recommendationImages.crest,
    slug: "crest-pro-health-mouthwash",
  },
  {
    brand: "Medicube",
    name: "Deep Vita C Capsule Cream",
    subtitle: "Cremă iluminatoare cu vitamina C, 55 g",
    price: 117.99,
    image: recommendationImages.vitac,
    slug: "medicube-deep-vita-c-capsule-cream",
  },
  {
    brand: "Nine Less",
    name: "B-Boost 10% Niacinamide Serum",
    subtitle: "Ser cu niacinamide 10%, 20 ml",
    price: 75.99,
    image: recommendationImages.bboost,
    slug: "nine-less-b-boost-10-niacinamide-serum",
  },
  {
    brand: "Missha",
    name: "M Perfect Cover BB Cream",
    subtitle: "BB cream cu SPF 42, 50 ml",
    price: 61.99,
    image: recommendationImages.missha,
    slug: "missha-m-perfect-cover-bb-cream",
  },
  {
    brand: "Heimish",
    name: "All Clean Balm",
    subtitle: "Balsam demachiant, 120 ml",
    price: 80.99,
    oldPrice: 89.99,
    image: recommendationImages.heimish,
    slug: "heimish-all-clean-balm",
  },
  {
    brand: "Arencia",
    name: "Fresh Green Rice Mochi Cleanser",
    subtitle: "Cleanser cu orez, 120 g",
    price: 84.99,
    image: recommendationImages.arencia,
    slug: "arencia-fresh-green-rice-mochi-cleanser",
  },
];

export interface Review {
  author: string;
  date: string;
  rating: number;
  title?: string;
  text: string;
  photo?: string;
}

export const product = {
  slug: "medicube-hypochlorous-acid-body-peel-shot-280-ml",
  brand: "Medicube",
  category: "Exfoliant pentru corp",
  name: "Hypochlorous Acid Body Peel Shot, Spray exfoliant pentru corp, 280 ml",
  shortDescription:
    "Un spray exfoliant pentru corp care ajută la netezirea texturii pielii și la îndepărtarea celulelor moarte. Formulat pentru zone cu piele aspră sau pori încărcați, oferă o îngrijire blândă, dar eficientă.",
  price: 119.99,
  code: "6419",
  stock: true,
  rating: 5.0,
  reviewCount: 4,
  loyaltyPoints: 119,
  images: productImages,
  ingredientsKey: ["Acid hialuronic", "Acid hipocloros", "Ceramide"],
  skinTypes: ["Sensibil", "Toate tipurile"],
  reviews: [
    {
      author: "Ghioghiu Alexandra",
      date: "31.08.2026",
      rating: 5,
      title: "bun",
      text: "m a scapat de cosurile de pe spate",
      photo: reviewPhotos[0],
    },
    {
      author: "Băghină Raluca Alexandra",
      date: "19.08.2026",
      rating: 5,
      text: "Am auzit numai păreri bune",
      photo: reviewPhotos[1],
    },
    {
      author: "Olaru Sara",
      date: "13.07.2026",
      rating: 5,
      title: "Recomand",
      text:
        "Exfoliază foarte bine pielea, dupa doua utilizari se vad deja îmbunătățiri.",
      photo: reviewPhotos[2],
    },
  ] as Review[],
  uniqueFeatures: [
    {
      title: "Exfoliere fără frecare",
      text: "Formula spray elimină celulele moarte fără perii abrazive sau particule — potrivită și pentru pielea sensibilă.",
    },
    {
      title: "Calmare imediată",
      text: "Acidul hipocloros liniștește zonele iritate și roșii, susținut de ceramide și panthenol pentru confort.",
    },
    {
      title: "Utilizare flexibilă",
      text: "Se aplică pe corp în zona umerilor, spatelui sau brațelor, înainte sau după duș, de una până la trei ori pe săptămână.",
    },
  ],
  benefits: [
    "Netezește textura pielii și reduce asperitatea",
    "Ajută la curățarea porilor încărcați de pe corp",
    "Păstrează bariera cutanată intactă datorită ceramidelor",
    "Fără parfum — potrivit pentru pielea reactivă",
  ],
  keyIngredients: [
    {
      name: "Acid hipocloros",
      role: "Calmant și purifiant; susține echilibrul microbiomului pielii.",
    },
    {
      name: "Ceramide",
      role: "Refac bariera cutanată și previn senzația de uscăciune.",
    },
    {
      name: "Acid hialuronic",
      role: "Hidratează și menține supleunea pielii între exfolieri.",
    },
  ],
  usage: [
    "Agită bine flaconul înainte de utilizare.",
    "Aplică un strat uniform pe pielea curată și uscată, pe zonele dorite.",
    "Lasă să acționeze 5–10 minute, apoi clătește cu apă călduță.",
    "Folosește de 1–3 ori pe săptămână, în funcție de toleranță.",
  ],
  action: [
    "Acidul hipocloros înmoaie legăturile dintre celulele moarte, care se elimină natural.",
    "Ingredientele calmante reduc roșeața și iritația în timpul exfolierii.",
    "Ceramidele și acidul hialuronic refac bariera și hidratarea după tratament.",
  ],
  extraInfo: [
    ["Greutate", "0,1 kg"],
    ["Dimensiuni", "10 × 5 × 5 cm"],
    ["Brand", "Medicube"],
    ["Concern", "Exfoliere, Textură neuniformă"],
    ["Free-from", "Fără parfum"],
    ["Gramaj", "280 ml"],
    ["Ingrediente cheie", "Ceramide, Niacinamide, Panthenol"],
    ["Moment în rutină", "Ambele, Ocazional"],
    ["Textură", "Spray / mist"],
    ["Tip de ten", "Sensibil, Toate tipurile"],
  ],
  inci:
    "Water, Hypochlorous Acid, Sodium Chloride, Glycerin, Butylene Glycol, 1,2-Hexanediol, Panthenol, Allantoin, Ceramide NP, Sodium Hyaluronate, Niacinamide, Madecassoside, Betaine, Trehalose, Citric Acid, Disodium EDTA.",
};

export function formatPrice(value: number): string {
  return `${value.toFixed(2).replace(".", ",")} lei`;
}

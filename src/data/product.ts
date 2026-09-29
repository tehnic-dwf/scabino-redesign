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
  skinType?: string;
  concern?: string;
  experience?: string;
  pros?: string[];
  cons?: string[];
}

export interface QuickMatchAttribute {
  /** cheie de iconiță interpretată de componenta QuickMatch */
  icon: string;
  /** eticheta secundară, cu litere mici (randată uppercase) */
  label: string;
  /** valoarea principală — mai vizibilă decât label-ul */
  value: string;
}

/** Setul se schimbă în funcție de product_type (SPF, serum, cleanser etc.). */
export const productType = "body-peel" as const;

export const product = {
  quickMatch: [
    { icon: "type", label: "Tip produs", value: "Exfoliant corporal" },
    { icon: "area", label: "Zonă", value: "Corp" },
    { icon: "concern", label: "Problemă vizată", value: "Textură neuniformă / zone aspre" },
    { icon: "usage", label: "Utilizare", value: "Se clătește" },
    { icon: "frequency", label: "Frecvență", value: "2× pe săptămână" },
    { icon: "format", label: "Format", value: "Spray" },
  ] as QuickMatchAttribute[],
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
  benefitLine:
    "Exfoliere blândă pentru pielea corpului, fără frecare și fără parfum — pentru zonele aspre sau cu pori încărcați.",
  verdict: [
    ["Rol principal", "Exfoliere blândă + calmare"],
    ["Textură", "Spray foarte fluid, apos"],
    ["Finish", "Se clătește, nu lasă film"],
    ["Parfum", "Fără parfum adăugat"],
    ["Când", "Seara sau înainte de duș, de 2 ori pe săptămână"],
    ["Nivel rutină", "Începător — nu cere alți activi"],
  ] as [string, string][],
  bestFor: "Vrei să netezești pielea spatelui sau a brațelor fără scrub abraziv.",
  fit: [
    "Pielea corpului este aspră, cu pori încărcați sau imperfecțiuni pe spate.",
    "Nu tolerezi scrub-urile mecanice sau periile exfoliante.",
    "Cauți un pas ocazional, nu încă un produs zilnic.",
    "Preferi formule fără parfum.",
  ],
  nonFit: [
    "Folosești deja un exfoliant chimic de corp care îți place — nu ai nevoie de al doilea.",
    "Problema principală este uscăciunea severă: ai nevoie întâi de hidratare.",
    "Cauți tratament pentru acnee diagnosticată — acesta este un produs cosmetic.",
    "Pielea are răni deschise, arsuri solare sau eczemă activă.",
  ],
  nonFitAlternative: {
    label: "Dacă pielea este mai degrabă uscată decât aspră",
    to: "Dr. Althea 345 Relief Cream",
    slug: "dr-althea-345-relief-cream",
  },
  evidence: [
    ["Ce spune brandul", "Spray exfoliant pentru corp, formulat pentru textură neuniformă și pori încărcați."],
    ["Ce vedem în formulă", "Acid hipocloros, ceramide, panthenol, niacinamidă, madecassosid."],
    ["Dovadă pe produs", "Nu avem publicat un studiu clinic pe produsul finit. Nu extrapolăm de la ingredient la rezultat."],
    ["Interpretarea noastră", "Îl vedem ca pas de întreținere a texturii, nu ca tratament."],
    ["Ce nu promitem", "Nu tratăm acneea și nu garantăm un termen în care dispar imperfecțiunile."],
  ] as [string, string][],
  compatibility: {
    works: [
      "Geluri de duș blânde, fără sulfați agresivi",
      "Hidratant de corp cu ceramide, după clătire",
      "Protecție solară, pe zonele expuse",
    ],
    caution: [
      "Retinoizi de corp — folosește-le în zile diferite",
      "Scrub mecanic sau perie — nu în aceeași zi",
      "Epilare sau ras — lasă 24 de ore",
    ],
    covered: [
      "Ai deja un exfoliant de corp cu AHA/BHA pe care îl tolerezi",
      "Folosești un peeling profesional lunar",
    ],
  },
  comparison: {
    rows: [
      ["Rol principal", "Exfoliere blândă + calmare", "Exfoliere cu acizi, mai intensă"],
      ["Textură", "Spray apos, se clătește", "Ser cu acid azelaic, rămâne pe piele"],
      ["Nivel de experiență", "Începător", "Intermediar"],
      ["Alege dacă", "Ai pielea reactivă și vrei un pas ocazional", "Vrei un activ zilnic pe zone punctuale"],
      ["Nu alege dacă", "Vrei rezultate pe pete pigmentare", "Pielea se irită ușor la acizi"],
    ] as [string, string, string][],
    alternativeSlug: "nine-less-a-control-10-azelaic-acid-serum",
    alternativeName: "Nine Less A-Control 10% Azelaic Acid Serum",
  },
  routineGap: [
    {
      slug: "arencia-fresh-green-rice-mochi-cleanser",
      role: "Curățare blândă",
      why: "Pasul dinaintea exfolierii, ca pielea să nu fie deja iritată.",
      required: true,
    },
    {
      slug: "dr-althea-345-relief-cream",
      role: "Hidratare după exfoliere",
      why: "Ceramidele refac bariera după clătire. Sari peste dacă ai deja un hidratant de corp.",
      required: true,
    },
    {
      slug: "nine-less-b-boost-10-niacinamide-serum",
      role: "Completare opțională",
      why: "Doar dacă ai și un obiectiv de ton neuniform. Nu este necesar pentru textură.",
      required: false,
    },
  ],
  reviews: [
    {
      author: "Ghioghiu Alexandra",
      date: "31.08.2026",
      rating: 5,
      title: "bun",
      text: "m a scapat de cosurile de pe spate",
      photo: reviewPhotos[0],
      skinType: "Mixt",
      concern: "Imperfecțiuni pe corp",
      experience: "Începător",
      pros: ["Rezultat pe spate", "Ușor de aplicat"],
    },
    {
      author: "Băghină Raluca Alexandra",
      date: "19.08.2026",
      rating: 5,
      text: "Am auzit numai păreri bune",
      photo: reviewPhotos[1],
      skinType: "Normal",
      concern: "Textură neuniformă",
      experience: "Începător",
      cons: ["Prea devreme pentru un verdict"],
    },
    {
      author: "Olaru Sara",
      date: "13.07.2026",
      rating: 5,
      title: "Recomand",
      text:
        "Exfoliază foarte bine pielea, dupa doua utilizari se vad deja îmbunătățiri.",
      photo: reviewPhotos[2],
      skinType: "Sensibil",
      concern: "Textură neuniformă",
      experience: "Rutină stabilă",
      pros: ["Exfoliere eficientă", "Nu irită"],
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
    "Agită recipientul bine înainte de fiecare utilizare.",
    "Aplică pe pielea uscată, cu un spray uniform, de la 15 cm.",
    "Masează ușor zona, cu mișcări blânde.",
    "Clătește cu apă călduță, după 5–10 minute.",
    "Continuă cu o loțiune de corp pentru hidratare și confort.",
    "Frecvență recomandată de brand: 2× / săptămână.",
  ],
  action: [
    "Acidul hipocloros înmoaie legăturile dintre celulele moarte, care se elimină natural.",
    "Ingredientele calmante reduc roșeața și iritația în timpul exfolierii.",
    "Ceramidele și acidul hialuronic refac bariera și hidratarea după tratament.",
  ],
  extraInfo: [
    ["Cod produs", "6419"],
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
    "Water, Alcohol Denat., Carbomer, Quaternium-60, Propylene Glycol, 1,2-Hexanediol, Dipropylene Glycol, Cetrimonium Methosulfate, Caprylyl Methicone, Caprylyl Glycol, Polyglyceryl-10 Oleate, Ethylhexylglycerin, Charcoal Powder, Hypochlorous Acid (20ppm), Glucose, Chlorella Vulgaris Extract, Butylene Glycol, Fructose, Fructooligosaccharides, Tocopherol, Sodium Hyaluronate Crosspolymer, Cynanchum Atratum Extract, Xylose, Polyglutamic Acid, Althaea Rosea Flower Extract, Ceramide NP, Sodium Chloride, Allantoin, Panthenol, Oryza Sativa (Rice) Bran Water, Melaleuca Alternifolia (Tea Tree) Leaf Extract, Protease, Oryza Sativa (Rice) Extract, Centella Asiatica Extract, Hydrolyzed Hyaluronic Acid.",
  volumeMl: 280,
  expiry: "12.2028",
  origin: "Coreea de Sud",
  howTo: [
    { title: "Agită recipientul", text: "Bine înainte de fiecare utilizare." },
    { title: "Aplică pe pielea uscată", text: "Spray uniform, de la 15 cm." },
    { title: "Masează ușor zona", text: "Cu mișcări blânde, circulare." },
    { title: "Clătește cu apă călduță", text: "După 5–10 minute de acțiune." },
    { title: "Continuă cu o loțiune de corp", text: "Pentru hidratare și confort." },
  ],
  frequency: "Frecvență recomandată de brand: 2× / săptămână",
  reviewHighlights: [
    "Piele mai netedă după primele 2 utilizări",
    "Nu irită, nici pe ten sensibil",
    "Ajută la imperfecțiunile de pe spate",
  ],
  faq: [
    {
      q: "Pot să-l folosesc după epilare?",
      a: "Așteaptă 24–48 de ore după epilare sau ras. Pe pielea proaspăt epilată orice exfoliant poate înțepa.",
    },
    {
      q: "Merge pe pielea sensibilă?",
      a: "Da, formula este fără parfum și conține ceramide și panthenol. Începe cu o aplicare pe săptămână și crește treptat.",
    },
    {
      q: "Cu ce nu se combină?",
      a: "Nu îl folosi în aceeași zi cu alte exfoliante (AHA/BHA, scrub-uri) sau cu retinoizi pe corp.",
    },
    {
      q: "Pot să-l folosesc pe față?",
      a: "Este formulat pentru corp. Pentru față alege un exfoliant dedicat, cu concentrații adaptate.",
    },
    {
      q: "Cât ține un flacon?",
      a: "La 2 utilizări pe săptămână pe spate și brațe, aproximativ 2–3 luni.",
    },
  ],
};

export function unitPrice(price: number, ml: number): string {
  return `${formatPrice((price / ml) * 100)} / 100 ml`;
}

export function formatPrice(value: number): string {
  return `${value.toFixed(2).replace(".", ",")} lei`;
}

export function findProduct(slug: string): RecommendedProduct | undefined {
  return recommendedProducts.find((p) => p.slug === slug);
}

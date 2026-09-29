import { recommendationImages } from "@/lib/assets";
import { eyeProducts, type EyeProduct } from "@/data/eyeCategory";
import { product, recommendedProducts } from "@/data/product";

export interface CrossSellProduct {
  slug: string;
  brand: string;
  name: string;
  price: number;
  image: string;
  /** Micro-label derivat din datele QuickMatch — explică de ce e recomandat. */
  why: string;
  /** Rolul în rutină — folosit ca să nu recomandăm aceeași funcție ca produsul adăugat. */
  routineRole: string;
}

/**
 * Catalog de cross-sell: doar produse în stoc, cu rol complementar
 * (nu încă o cremă de ochi după o cremă de ochi).
 */
export const crossSellCatalog: CrossSellProduct[] = [
  {
    slug: "heimish-all-clean-balm",
    brand: "Heimish",
    name: "All Clean Balm",
    price: 79.99,
    image: recommendationImages.heimish,
    why: "Pasul de curățare",
    routineRole: "cleanser",
  },
  {
    slug: "im-from-rice-toner",
    brand: "I'm From",
    name: "Rice Toner",
    price: 116.99,
    image: recommendationImages.rice,
    why: "Pentru hidratare",
    routineRole: "toner",
  },
  {
    slug: "medicube-deep-vita-c-capsule-cream",
    brand: "Medicube",
    name: "Deep Vita C Capsule Cream",
    price: 117.99,
    image: recommendationImages.vitac,
    why: "Pentru rutina AM",
    routineRole: "moisturizer",
  },
  {
    slug: "dr-althea-345-relief-cream",
    brand: "Dr. Althea",
    name: "345 Relief Cream",
    price: 98.99,
    image: recommendationImages.althea,
    why: "Compatibil cu retinal",
    routineRole: "moisturizer",
  },
  {
    slug: "arencia-red-smoothie-lotion-5",
    brand: "Arencia",
    name: "Red Smoothie Lotion 5",
    price: 98.99,
    image: recommendationImages.arencia,
    why: "Pentru luminozitate",
    routineRole: "moisturizer",
  },
  {
    slug: "missha-m-perfect-cover-bb-cream",
    brand: "Missha",
    name: "M Perfect Cover BB Cream SPF42",
    price: 75.99,
    image: recommendationImages.missha,
    why: "Protecție SPF dimineața",
    routineRole: "spf",
  },
];

export interface AddedProductInfo {
  slug: string;
  brand: string;
  name: string;
  price: number;
  oldPrice?: number | undefined;
  image: string;
  routineRole: string;
}

const kSecretSlug =
  "k-secret-seoul-1988-eye-cream-retinal-liposome-4-fermented-bean-crema-anti-rid-cu-retinol-si-extract-fermentat-30ml";

/** Rezolvă informațiile afișate în drawer pentru orice slug adăugat în coș. */
export function resolveAddedProduct(slug: string): AddedProductInfo | null {
  if (slug === product.slug) {
    return {
      slug: product.slug,
      brand: product.brand,
      name: product.name.split(",")[0] ?? product.name,
      price: product.price,
      image: product.images[0] ?? "",
      routineRole: "body-peel",
    };
  }
  const eye = eyeProducts.find((p: EyeProduct) => p.slug === slug);
  if (eye) {
    return {
      slug: eye.slug,
      brand: eye.brand,
      name: eye.name,
      price: eye.price,
      oldPrice: eye.oldPrice,
      image: eye.image,
      routineRole: slug === kSecretSlug ? "eye-retinal" : "eye-care",
    };
  }
  const rec = recommendedProducts.find((p) => p.slug === slug);
  if (rec) {
    return {
      slug: rec.slug,
      brand: rec.brand,
      name: rec.name,
      price: rec.price,
      oldPrice: rec.oldPrice,
      image: rec.image,
      routineRole: "treatment",
    };
  }
  const cross = crossSellCatalog.find((p) => p.slug === slug);
  if (cross) {
    return { ...cross };
  }
  return null;
}

/**
 * Scor de recomandare: RoutineGap + Compatibility + Availability + ShippingGap.
 * Exclude produsele deja în coș și rolul produsului tocmai adăugat;
 * preferă produse al căror preț acoperă (sau se apropie de) gap-ul până la
 * transport gratuit.
 */
export function pickCrossSell(
  added: AddedProductInfo,
  cartSlugs: string[],
  shippingGap: number,
  count = 3,
): CrossSellProduct[] {
  return crossSellCatalog
    .filter((p) => !cartSlugs.includes(p.slug) && p.slug !== added.slug)
    .map((p) => {
      let score = 10; // toate sunt în stoc și compatibile
      if (p.routineRole !== added.routineRole) score += 20; // completează o funcție lipsă
      if (shippingGap > 0) {
        if (p.price >= shippingGap) score += 15; // acoperă singur gap-ul
        else score += Math.max(0, 10 - Math.abs(shippingGap - p.price) / 10);
      }
      return { p, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, count)
    .map(({ p }) => p);
}

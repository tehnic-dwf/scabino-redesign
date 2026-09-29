import { Clock3 } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import imageAsset from "@/assets/scabino/k-secret-seoul-1988-eye-cream.webp.asset.json";

export const kSecretProduct = {
  slug: "k-secret-seoul-1988-eye-cream-retinal-liposome-4-fermented-bean",
  brand: "K-Secret",
  name: "Seoul 1988 Eye Cream Retinal Liposome 4% + Fermented Bean",
  subtitle: "Cremă pentru conturul ochilor revitalizantă, 30 ml",
  price: "75,64 lei",
  oldPrice: "84,99 lei",
  image: imageAsset.url,
} as const;

export function KSecretProductDraft() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto w-full max-w-7xl px-4 pb-16 pt-5 sm:pt-8">
        <p className="text-xs text-muted-foreground">Creme de ochi coreene</p>
        <div className="mt-4 grid gap-6 lg:grid-cols-2 lg:gap-14">
          <div className="aspect-square overflow-hidden rounded-2xl border bg-card">
            <img
              src={kSecretProduct.image}
              alt={`${kSecretProduct.brand} ${kSecretProduct.name}`}
              className="size-full object-contain"
            />
          </div>
          <div className="min-w-0 lg:pt-3">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
              {kSecretProduct.brand}
            </p>
            <h1 className="mt-2 text-xl font-bold leading-snug text-foreground sm:text-3xl">
              {kSecretProduct.name}
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {kSecretProduct.subtitle}
            </p>

            <div className="mt-6 border-y py-5">
              <div className="flex items-baseline gap-3">
                <p className="text-2xl font-bold text-primary">{kSecretProduct.price}</p>
                <p className="text-sm text-muted-foreground line-through">{kSecretProduct.oldPrice}</p>
              </div>
              <p className="mt-4 flex items-center gap-2 text-sm font-semibold text-foreground">
                <Clock3 className="size-4 text-primary" aria-hidden />
                Indisponibil momentan
              </p>
              <Button disabled className="mt-5 h-11 w-full rounded-lg">
                Indisponibil momentan
              </Button>
            </div>

            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              Aceasta este baza vizuală pentru produsul 2. Conținutul și ordinea blocurilor vor fi
              desenate în etapa următoare.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
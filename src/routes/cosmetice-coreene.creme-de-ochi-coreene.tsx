import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Check, ChevronDown, RotateCcw, SlidersHorizontal, X } from "lucide-react";
import { toast } from "sonner";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { EyeProductCard } from "@/components/category/EyeProductCard";
import { CategoryFilters, type CategoryFilterState } from "@/components/category/CategoryFilters";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { concernChoices, eyeProducts, type EyeProduct } from "@/data/eyeCategory";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/cosmetice-coreene/creme-de-ochi-coreene")({
  head: () => ({
    meta: [
      { title: "Creme de ochi coreene | Scabino" },
      { name: "description", content: "Creme, seruri și plasturi coreeni pentru conturul ochilor, selectați după nevoie, ingrediente și tipul de ten." },
      { property: "og:title", content: "Creme de ochi coreene | Scabino" },
      { property: "og:description", content: "Creme, seruri și plasturi coreeni pentru conturul ochilor, selectați după nevoie, ingrediente și tipul de ten." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: EyeCategoryPage,
});

const emptyFilters: CategoryFilterState = {
  concerns: [], ingredients: [], types: [], brands: [], skin: [], availability: [], promo: false, minPrice: 0, maxPrice: 260,
};

type FilterArrayKey = "concerns" | "ingredients" | "types" | "brands" | "skin" | "availability";
type SortKey = "recommended" | "popular" | "rating" | "price-asc" | "price-desc" | "discount" | "newest";

function readUrlState() {
  if (typeof window === "undefined") return { filters: emptyFilters, sort: "recommended" as SortKey };
  const params = new URLSearchParams(window.location.search);
  const list = (key: string) => params.get(key)?.split("|").filter(Boolean) ?? [];
  return {
    filters: {
      concerns: list("concern"), ingredients: list("ingredient"), types: list("type"), brands: list("brand"), skin: list("skin"), availability: list("stock"),
      promo: params.get("promo") === "1", minPrice: Number(params.get("min") ?? 0), maxPrice: Number(params.get("max") ?? 260),
    },
    sort: (params.get("sort") as SortKey) || "recommended",
  };
}

function matches(product: EyeProduct, filters: CategoryFilterState) {
  const includesAny = (selected: string[], values: string[]) => !selected.length || selected.some((x) => values.includes(x));
  const stock = product.inStock ? "În stoc" : "Indisponibil";
  return includesAny(filters.concerns, product.concerns)
    && includesAny(filters.ingredients, product.ingredients)
    && includesAny(filters.types, [product.type])
    && includesAny(filters.brands, [product.brand])
    && includesAny(filters.skin, [product.skin])
    && includesAny(filters.availability, [stock])
    && (!filters.promo || Boolean(product.oldPrice))
    && product.price >= filters.minPrice && product.price <= filters.maxPrice;
}

function activeCount(filters: CategoryFilterState) {
  return filters.concerns.length + filters.ingredients.length + filters.types.length + filters.brands.length + filters.skin.length + filters.availability.length + Number(filters.promo) + Number(filters.minPrice > 0 || filters.maxPrice < 260);
}

function sortProducts(items: EyeProduct[], sort: SortKey) {
  const copy = [...items];
  if (sort === "recommended") return copy.sort((a, b) => Number(b.slug.startsWith("k-secret")) - Number(a.slug.startsWith("k-secret")) || Number(b.inStock) - Number(a.inStock) || a.id - b.id);
  if (sort === "popular") return copy.sort((a, b) => b.reviews - a.reviews || Number(b.inStock) - Number(a.inStock));
  if (sort === "rating") return copy.sort((a, b) => b.rating - a.rating || b.reviews - a.reviews);
  if (sort === "price-asc") return copy.sort((a, b) => a.price - b.price);
  if (sort === "price-desc") return copy.sort((a, b) => b.price - a.price);
  if (sort === "discount") return copy.sort((a, b) => ((b.oldPrice ?? b.price) - b.price) - ((a.oldPrice ?? a.price) - a.price));
  return copy.sort((a, b) => b.id - a.id);
}

function EyeCategoryPage() {
  const initial = useMemo(readUrlState, []);
  const [filters, setFilters] = useState<CategoryFilterState>(initial.filters);
  const [draftFilters, setDraftFilters] = useState<CategoryFilterState>(initial.filters);
  const [sort, setSort] = useState<SortKey>(initial.sort);
  const [visible, setVisible] = useState(12);
  const [filterOpen, setFilterOpen] = useState(false);

  const filtered = useMemo(() => sortProducts(eyeProducts.filter((p) => matches(p, filters)), sort), [filters, sort]);
  const count = activeCount(filters);

  useEffect(() => {
    const params = new URLSearchParams();
    const put = (key: string, values: string[]) => { if (values.length) params.set(key, values.join("|")); };
    put("concern", filters.concerns); put("ingredient", filters.ingredients); put("type", filters.types); put("brand", filters.brands); put("skin", filters.skin); put("stock", filters.availability);
    if (filters.promo) params.set("promo", "1");
    if (filters.minPrice > 0) params.set("min", String(filters.minPrice));
    if (filters.maxPrice < 260) params.set("max", String(filters.maxPrice));
    if (sort !== "recommended") params.set("sort", sort);
    window.history.replaceState({}, "", `${window.location.pathname}${params.size ? `?${params}` : ""}`);
    setVisible(12);
  }, [filters, sort]);

  const mutate = (source: CategoryFilterState, field: FilterArrayKey, value: string) => ({
    ...source,
    [field]: source[field].includes(value) ? source[field].filter((x) => x !== value) : [...source[field], value],
  });
  const toggle = (field: FilterArrayKey, value: string) => setFilters((f) => mutate(f, field, value));
  const toggleDraft = (field: FilterArrayKey, value: string) => setDraftFilters((f) => mutate(f, field, value));
  const reset = () => { setFilters(emptyFilters); setDraftFilters(emptyFilters); };

  const removeChip = (field: FilterArrayKey | "promo" | "price", value?: string) => {
    if (field === "promo") setFilters((f) => ({ ...f, promo: false }));
    else if (field === "price") setFilters((f) => ({ ...f, minPrice: 0, maxPrice: 260 }));
    else setFilters((f) => ({ ...f, [field]: f[field].filter((x) => x !== value) }));
  };

  const active = (["concerns", "ingredients", "types", "brands", "skin", "availability"] as FilterArrayKey[]).flatMap((field) => filters[field].map((value) => ({ field, value })));
  const draftResultCount = useMemo(() => eyeProducts.filter((product) => matches(product, draftFilters)).length, [draftFilters]);
  const recoveryOptions = useMemo(() => active.flatMap(({ field, value }) => {
    const candidate = { ...filters, [field]: filters[field].filter((item) => item !== value) };
    const results = eyeProducts.filter((product) => matches(product, candidate)).length;
    return results > 0 ? [{ field, value, results }] : [];
  }), [active, filters]);

  return <div className="min-h-screen overflow-x-clip bg-background">
    <Header />
    <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Îngrijirea tenului", to: "/" }, { label: "Creme de ochi coreene" }]} />

    <main className="mx-auto w-full max-w-7xl px-4 pb-16 pt-7 sm:pt-10">
      <header className="max-w-3xl">
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-primary/70">Îngrijirea conturului ochilor</p>
        <h1 className="mt-2 text-2xl font-bold tracking-tight text-primary sm:text-4xl">Creme de ochi coreene</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-[15px]">Creme, seruri și plasturi pentru hidratare, linii fine, cearcăne și fermitate. Alege mai întâi nevoia, apoi textura și activii potriviți rutinei tale.</p>
        <p className="mt-2 text-xs font-semibold text-foreground/70">{eyeProducts.length} produse</p>
      </header>

      <section aria-labelledby="quick-concern" className="mt-7 border-y border-border/70 py-5">
        <h2 id="quick-concern" className="text-sm font-semibold text-foreground">Ce vrei să îmbunătățești?</h2>
        <div className="-mx-4 mt-3 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {concernChoices.map((choice) => {
            const mapped = choice === "Piele sensibilă" ? { field: "skin" as const, value: "Sensibil" } : { field: "concerns" as const, value: choice };
            const selected = filters[mapped.field].includes(mapped.value);
            return <Button key={choice} type="button" variant={selected ? "default" : "outline"} aria-pressed={selected} onClick={() => toggle(mapped.field, mapped.value)} className={cn("h-10 shrink-0 gap-1.5 rounded-full px-4 text-xs font-semibold", !selected && "bg-card hover:border-primary/40")}>
              {selected && <Check className="size-3.5" />}{choice}
            </Button>;
          })}
        </div>
      </section>

      <div className="mt-6 flex items-center justify-between gap-3">
        <Button type="button" variant="outline" onClick={() => { setDraftFilters(filters); setFilterOpen(true); }} className="h-10 gap-2 rounded-full lg:hidden"><SlidersHorizontal className="size-4" />Filtre {count > 0 && <span className="grid size-5 place-items-center rounded-full bg-primary text-[10px] text-primary-foreground">{count}</span>}</Button>
          {filterOpen && (() => {
            const draftChips: Array<{ key: string; label: string; clear: () => void }> = [
              ...(["concerns", "ingredients", "types", "brands", "skin", "availability"] as FilterArrayKey[]).flatMap((field) =>
                draftFilters[field].map((value) => ({ key: `${field}-${value}`, label: value, clear: () => setDraftFilters((f) => ({ ...f, [field]: f[field].filter((x) => x !== value) })) })),
              ),
              ...(draftFilters.promo ? [{ key: "promo", label: "Promoții", clear: () => setDraftFilters((f) => ({ ...f, promo: false })) }] : []),
              ...((draftFilters.minPrice > 0 || draftFilters.maxPrice < 260) ? [{ key: "price", label: `${draftFilters.minPrice}–${draftFilters.maxPrice} lei`, clear: () => setDraftFilters((f) => ({ ...f, minPrice: 0, maxPrice: 260 })) }] : []),
            ];
            return <div role="dialog" aria-modal="true" aria-labelledby="mobile-filter-title" className="fixed inset-0 z-50 flex h-dvh flex-col bg-background px-5 pb-4 pt-3 lg:hidden">
              <div className="grid shrink-0 grid-cols-[auto_1fr_auto] items-center gap-2 border-b pb-3">
                <Button type="button" variant="ghost" size="icon" aria-label="Închide filtrele" onClick={() => setFilterOpen(false)}><X className="size-5" /></Button>
                <h2 id="mobile-filter-title" className="text-center text-xl font-bold text-primary">Filtre</h2>
                <Button type="button" variant="ghost" onClick={() => setDraftFilters(emptyFilters)} className="h-auto gap-1.5 px-1 py-1 text-sm font-semibold text-primary hover:bg-transparent hover:text-primary/80"><RotateCcw className="size-4" />Resetează</Button>
              </div>
              {draftChips.length > 0 && <div className="flex shrink-0 flex-wrap gap-2 border-b py-3">
                {draftChips.map((chip) => <button key={chip.key} type="button" onClick={chip.clear} className="flex items-center gap-2 rounded-lg bg-muted px-3 py-2 text-[13px] font-medium text-foreground/90 transition-colors hover:bg-muted/70">
                  {chip.label}<X className="size-3.5 text-foreground/60" aria-hidden />
                  <span className="sr-only">elimină filtrul</span>
                </button>)}
              </div>}
              <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"><CategoryFilters filters={draftFilters} products={eyeProducts} onToggle={toggleDraft} onPromo={(promo) => setDraftFilters((f) => ({ ...f, promo }))} onPrice={(minPrice, maxPrice) => setDraftFilters((f) => ({ ...f, minPrice, maxPrice }))} /></div>
              <div className="shrink-0 border-t bg-background pt-4">
                <Button className="h-12 w-full text-sm font-semibold" onClick={() => { setFilters(draftFilters); setFilterOpen(false); }}>Vezi {draftResultCount} {draftResultCount === 1 ? "produs" : "produse"}</Button>
              </div>
            </div>;
          })()}

        <p className="hidden text-xs text-muted-foreground lg:block">{filtered.length} {filtered.length === 1 ? "produs găsit" : "produse găsite"}</p>
        <div className="ml-auto flex items-center gap-2">
          <span className="hidden text-xs text-muted-foreground sm:inline">Sortează:</span>
          <Select value={sort} onValueChange={(value) => setSort(value as SortKey)}>
            <SelectTrigger className="h-10 w-[160px] rounded-full bg-card text-xs sm:w-[205px]"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="recommended">Recomandate</SelectItem><SelectItem value="popular">Populare</SelectItem><SelectItem value="rating">Rating</SelectItem><SelectItem value="price-asc">Preț crescător</SelectItem><SelectItem value="price-desc">Preț descrescător</SelectItem><SelectItem value="discount">Reducere</SelectItem><SelectItem value="newest">Noutăți</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {(active.length > 0 || filters.promo || filters.minPrice > 0 || filters.maxPrice < 260) && <div className="mt-4 flex flex-wrap items-center gap-2">
        {active.map(({ field, value }) => <Button key={`${field}-${value}`} type="button" variant="secondary" onClick={() => removeChip(field, value)} className="h-auto gap-1 rounded-full px-3 py-1.5 text-[10px] font-semibold text-primary">{value}<X className="size-3" /></Button>)}
        {filters.promo && <Button type="button" variant="secondary" onClick={() => removeChip("promo")} className="h-auto gap-1 rounded-full px-3 py-1.5 text-[10px] font-semibold text-primary">Promoții<X className="size-3" /></Button>}
        {(filters.minPrice > 0 || filters.maxPrice < 260) && <Button type="button" variant="secondary" onClick={() => removeChip("price")} className="h-auto gap-1 rounded-full px-3 py-1.5 text-[10px] font-semibold text-primary">{filters.minPrice}–{filters.maxPrice} lei<X className="size-3" /></Button>}
        <Button type="button" variant="link" onClick={reset} className="h-auto px-2 py-1 text-[10px] font-semibold text-muted-foreground underline underline-offset-4">Șterge toate</Button>
      </div>}

      <div className="mt-7 grid min-w-0 gap-8 lg:grid-cols-[220px_minmax(0,1fr)] xl:grid-cols-[245px_minmax(0,1fr)]">
        <aside className="hidden lg:block"><div className="sticky top-44 rounded-2xl border bg-card px-4 py-1"><div className="flex items-center justify-between border-b py-4"><span className="text-sm font-bold">Filtre</span>{count > 0 && <Button variant="link" onClick={reset} className="h-auto p-0 text-[10px] font-semibold text-muted-foreground underline">Șterge</Button>}</div><CategoryFilters filters={filters} products={eyeProducts} onToggle={toggle} onPromo={(promo) => setFilters((f) => ({ ...f, promo }))} onPrice={(minPrice, maxPrice) => setFilters((f) => ({ ...f, minPrice, maxPrice }))} /></div></aside>

        <section aria-label="Produse" className="min-w-0">
          {filtered.length > 0 ? <>
            <div className="grid min-w-0 grid-cols-2 gap-x-3 gap-y-9 sm:gap-x-5 md:grid-cols-3 xl:grid-cols-4">
              {filtered.slice(0, visible).map((product) => <EyeProductCard key={product.id} product={product} priority={product.id === 1} />)}
            </div>
            {visible < filtered.length && <div className="mt-12 text-center"><Button variant="outline" className="h-11 rounded-full px-7" onClick={() => setVisible((n) => n + 8)}>Încarcă mai multe <ChevronDown className="ml-2 size-4" /></Button><p className="mt-2 text-[10px] text-muted-foreground">Ai văzut {Math.min(visible, filtered.length)} din {filtered.length} produse</p></div>}
          </> : <div className="rounded-2xl border bg-card px-6 py-14 text-center"><h2 className="text-lg font-bold text-primary">Nu am găsit produse pentru combinația selectată</h2><p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">Elimină un filtru activ pentru a vedea din nou produse.</p>{recoveryOptions.length > 0 && <div className="mx-auto mt-5 flex max-w-lg flex-wrap justify-center gap-2">{recoveryOptions.map(({ field, value, results }) => <Button key={`${field}-${value}`} variant="outline" size="sm" className="rounded-full" onClick={() => removeChip(field, value)}>Elimină „{value}” · {results}</Button>)}</div>}<Button variant="link" className="mt-3" onClick={reset}>Șterge toate filtrele</Button></div>}
        </section>
      </div>
    </main>
    <Footer />
  </div>;
}

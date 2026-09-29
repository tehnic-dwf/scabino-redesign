import { useEffect, useRef, useState } from "react";
import { Search } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import type { EyeProduct } from "@/data/eyeCategory";

export interface CategoryFilterState {
  concerns: string[];
  ingredients: string[];
  types: string[];
  brands: string[];
  skin: string[];
  availability: string[];
  promo: boolean;
  minPrice: number;
  maxPrice: number;
}

interface Props {
  filters: CategoryFilterState;
  products: EyeProduct[];
  onToggle: (field: "concerns" | "ingredients" | "types" | "brands" | "skin" | "availability", value: string) => void;
  onPromo: (value: boolean) => void;
  onPrice: (min: number, max: number) => void;
}

function unique(products: EyeProduct[], getter: (p: EyeProduct) => string[]) {
  return [...new Set(products.flatMap(getter))].sort((a, b) => a.localeCompare(b, "ro"));
}

export function CategoryFilters({ filters, products, onToggle, onPromo, onPrice }: Props) {
  const [expandedGroups, setExpandedGroups] = useState<string[]>([]);
  const [queries, setQueries] = useState<Record<string, string>>({});
  const groups = [
    { id: "concerns" as const, title: "Concern principal", values: unique(products, (p) => p.concerns) },
    { id: "ingredients" as const, title: "Ingredient activ", values: unique(products, (p) => p.ingredients) },
    { id: "types" as const, title: "Tip produs", values: unique(products, (p) => [p.type]) },
    { id: "brands" as const, title: "Brand", values: unique(products, (p) => [p.brand]) },
    { id: "skin" as const, title: "Tip de ten", values: unique(products, (p) => [p.skin]) },
    { id: "availability" as const, title: "Disponibilitate", values: ["În stoc", "Indisponibil"] },
  ];

  const activeSections = [
    ...groups.filter((group) => filters[group.id].length > 0).map((group) => group.id),
    ...(filters.minPrice > 0 || filters.maxPrice < 260 ? ["price"] : []),
    ...(filters.promo ? ["promo"] : []),
  ];
  const activeSectionKey = activeSections.join("|");
  const previousActiveSections = useRef<string[]>([]);
  const [openSections, setOpenSections] = useState<string[]>(activeSections);

  useEffect(() => {
    const previous = previousActiveSections.current;
    setOpenSections((current) => {
      const withoutDeactivated = current.filter((section) => activeSections.includes(section) || !previous.includes(section));
      return [...new Set([...withoutDeactivated, ...activeSections])];
    });
    previousActiveSections.current = activeSections;
  }, [activeSectionKey]);

  const countFor = (field: typeof groups[number]["id"], value: string) => products.filter((product) => {
    const includesAny = (selected: string[], values: string[]) => !selected.length || selected.some((item) => values.includes(item));
    const optionMatches = field === "availability"
      ? (value === "În stoc" ? product.inStock : !product.inStock)
      : field === "brands" ? product.brand === value
        : field === "types" ? product.type === value
          : field === "skin" ? product.skin === value
            : product[field].includes(value);

    return optionMatches
      && (field === "concerns" || includesAny(filters.concerns, product.concerns))
      && (field === "ingredients" || includesAny(filters.ingredients, product.ingredients))
      && (field === "types" || includesAny(filters.types, [product.type]))
      && (field === "brands" || includesAny(filters.brands, [product.brand]))
      && (field === "skin" || includesAny(filters.skin, [product.skin]))
      && (field === "availability" || includesAny(filters.availability, [product.inStock ? "În stoc" : "Indisponibil"]))
      && (!filters.promo || Boolean(product.oldPrice))
      && product.price >= filters.minPrice
      && product.price <= filters.maxPrice;
  }).length;

  return (
    <div className="min-w-0">
      <Accordion type="multiple" value={openSections} onValueChange={setOpenSections}>
        {groups.map((group) => {
          const query = queries[group.id] ?? "";
          const sortedValues = [...group.values].sort((a, b) => Number(filters[group.id].includes(b)) - Number(filters[group.id].includes(a)) || a.localeCompare(b, "ro"));
          const matchingValues = sortedValues.filter((value) => value.toLocaleLowerCase("ro").includes(query.trim().toLocaleLowerCase("ro")));
          const expanded = expandedGroups.includes(group.id);
          const visibleValues = expanded || query ? matchingValues : matchingValues.slice(0, 6);
          const isSearchable = (group.id === "brands" || group.id === "ingredients") && group.values.length > 6;

          return <AccordionItem value={group.id} key={group.id}>
            <AccordionTrigger className="text-[13px] font-semibold no-underline hover:no-underline">{group.title}</AccordionTrigger>
            <AccordionContent>
              {isSearchable && <label className="relative mb-3 block">
                <span className="sr-only">Caută în {group.title.toLocaleLowerCase("ro")}</span>
                <Search className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="search"
                  value={query}
                  onChange={(event) => setQueries((current) => ({ ...current, [group.id]: event.target.value }))}
                  placeholder={`Caută ${group.title.toLocaleLowerCase("ro")}`}
                  className="h-9 w-full rounded-md border bg-background pl-9 pr-3 text-xs text-foreground outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
                />
              </label>}
              <div className="space-y-2.5">
                {visibleValues.map((value) => {
                  const checked = filters[group.id].includes(value);
                  const optionCount = countFor(group.id, value);
                  const disabled = optionCount === 0 && !checked;
                  return <label key={value} className={disabled ? "flex cursor-not-allowed items-center gap-2.5 text-xs leading-tight text-muted-foreground/55" : "flex cursor-pointer items-center gap-2.5 text-xs leading-tight text-foreground/85"}>
                    <Checkbox className="rounded-none" checked={checked} disabled={disabled} onCheckedChange={() => onToggle(group.id, value)} aria-label={`${group.title}: ${value}`} />
                    <span className="min-w-0 flex-1">{value}</span>
                    <span className="text-[10px] text-muted-foreground">{optionCount}</span>
                  </label>;
                })}
                {matchingValues.length === 0 && <p className="py-1 text-xs text-muted-foreground">Nicio opțiune găsită.</p>}
              </div>
              {!query && matchingValues.length > 6 && <Button
                type="button"
                variant="link"
                className="mt-3 h-auto p-0 text-xs font-semibold text-primary"
                onClick={() => setExpandedGroups((current) => expanded ? current.filter((id) => id !== group.id) : [...current, group.id])}
              >
                {expanded ? "Vezi mai puține" : `Vezi mai multe (${matchingValues.length - 6})`}
              </Button>}
            </AccordionContent>
          </AccordionItem>
        })}
        <AccordionItem value="price">
          <AccordionTrigger className="text-[13px] font-semibold no-underline hover:no-underline">Preț</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-2 gap-2">
              <label className="text-[10px] uppercase tracking-wide text-muted-foreground">Minim<input type="number" min={0} max={filters.maxPrice} value={filters.minPrice} onChange={(e) => onPrice(Number(e.target.value), filters.maxPrice)} className="mt-1 h-9 w-full rounded-lg border bg-background px-2 text-xs text-foreground" /></label>
              <label className="text-[10px] uppercase tracking-wide text-muted-foreground">Maxim<input type="number" min={filters.minPrice} max={300} value={filters.maxPrice} onChange={(e) => onPrice(filters.minPrice, Number(e.target.value))} className="mt-1 h-9 w-full rounded-lg border bg-background px-2 text-xs text-foreground" /></label>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="promo">
          <AccordionTrigger className="text-[13px] font-semibold no-underline hover:no-underline">Promoții</AccordionTrigger>
          <AccordionContent>
            {(() => {
              const promoCount = products.filter((p) => p.oldPrice).length;
              const disabled = promoCount === 0 && !filters.promo;
              return <label className={disabled ? "flex cursor-not-allowed items-center gap-2.5 text-xs text-muted-foreground/55" : "flex cursor-pointer items-center gap-2.5 text-xs"}><Checkbox className="rounded-none" checked={filters.promo} disabled={disabled} onCheckedChange={(v) => onPromo(v === true)} aria-label="Produse cu preț redus" />Produse cu preț redus <span className="ml-auto text-[10px] text-muted-foreground">{promoCount}</span></label>;
            })()}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

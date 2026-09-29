import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
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
  const groups = [
    { id: "concerns" as const, title: "Concern principal", values: unique(products, (p) => p.concerns) },
    { id: "ingredients" as const, title: "Ingredient activ", values: unique(products, (p) => p.ingredients) },
    { id: "types" as const, title: "Tip produs", values: unique(products, (p) => [p.type]) },
    { id: "brands" as const, title: "Brand", values: unique(products, (p) => [p.brand]) },
    { id: "skin" as const, title: "Tip de ten", values: unique(products, (p) => [p.skin]) },
    { id: "availability" as const, title: "Disponibilitate", values: ["În stoc", "Indisponibil"] },
  ];

  const countFor = (field: typeof groups[number]["id"], value: string) => products.filter((p) => {
    if (field === "availability") return value === "În stoc" ? p.inStock : !p.inStock;
    if (field === "brands") return p.brand === value;
    if (field === "types") return p.type === value;
    if (field === "skin") return p.skin === value;
    return p[field].includes(value);
  }).length;

  return (
    <div className="min-w-0">
      <Accordion type="multiple" defaultValue={["concerns", "ingredients", "types", "availability", "price"]}>
        {groups.map((group) => (
          <AccordionItem value={group.id} key={group.id}>
            <AccordionTrigger className="text-[13px] font-semibold no-underline hover:no-underline">{group.title}</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2.5">
                {group.values.map((value) => {
                  const checked = filters[group.id].includes(value);
                  return <label key={value} className="flex cursor-pointer items-center gap-2.5 text-xs leading-tight text-foreground/85">
                    <Checkbox checked={checked} onCheckedChange={() => onToggle(group.id, value)} />
                    <span className="min-w-0 flex-1">{value}</span>
                    <span className="text-[10px] text-muted-foreground">{countFor(group.id, value)}</span>
                  </label>;
                })}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
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
            <label className="flex cursor-pointer items-center gap-2.5 text-xs"><Checkbox checked={filters.promo} onCheckedChange={(v) => onPromo(v === true)} />Produse cu preț redus <span className="ml-auto text-[10px] text-muted-foreground">{products.filter((p) => p.oldPrice).length}</span></label>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

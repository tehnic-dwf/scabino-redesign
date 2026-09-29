import type { LucideIcon } from "lucide-react";
import {
  CalendarDays,
  Droplet,
  Focus,
  PersonStanding,
  Shapes,
  SprayCan,
  Waves,
  Eye,
  FlaskConical,
  Sprout,
  UserRound,
  Target,
  Package,
} from "lucide-react";
import type { QuickMatchAttribute } from "@/data/product";

const ICONS: Record<string, LucideIcon> = {
  area: PersonStanding,
  concern: Focus,
  type: Shapes,
  format: SprayCan,
  usage: Waves,
  frequency: CalendarDays,
  eye: Eye,
  target: Target,
  active: FlaskConical,
  formula: Sprout,
  skin: UserRound,
  product: Package,
};

/**
 * QuickMatch — „Ce produs este"
 * Răspunde la „Ce fel de produs este?" în 5–10 secunde: atribute tehnice
 * obiective, nu beneficii de marketing. Urmează înainte de „Verdict în 15
 * secunde", care răspunde la „Este potrivit pentru mine?".
 */
export function QuickMatch({ attributes }: { attributes: QuickMatchAttribute[] }) {
  return (
    <ul className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
      {attributes.map((attr) => {
        const Icon = ICONS[attr.icon] ?? Droplet;
        return (
          <li
            key={attr.label}
            className="min-w-0 rounded-xl border bg-card p-3.5 sm:p-4"
          >
            <p className="flex items-center gap-1.5">
              <Icon
                className="size-4 shrink-0 text-primary"
                strokeWidth={1.5}
                aria-hidden
              />
              <span className="truncate text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                {attr.label}
              </span>
            </p>
            <p className="mt-1.5 text-sm font-semibold leading-snug text-foreground">
              {attr.value}
            </p>
          </li>
        );
      })}
    </ul>
  );
}

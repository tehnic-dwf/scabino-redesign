import { useEffect, useState } from "react";
import { BadgeCheck, CalendarDays, Droplets, SprayCan, Truck, Waves } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { product, shipping } from "@/data/product";

export function AuthenticityLine() {
  return (
    <p className="mt-3 flex items-start gap-2 rounded-lg bg-muted/60 px-3 py-2 text-xs leading-relaxed text-foreground/85">
      <BadgeCheck className="mt-0.5 size-4 shrink-0 text-fit" aria-hidden />
      <span>
        <strong className="font-semibold">Produs original</strong>, importat din {product.origin} ·
        lot și valabilitate verificate · valabil până la {product.expiry}
      </span>
    </p>
  );
}

const DAYS = ["duminică", "luni", "marți", "miercuri", "joi", "vineri", "sâmbătă"];
const MONTHS = ["ian.", "feb.", "mar.", "apr.", "mai", "iun.", "iul.", "aug.", "sep.", "oct.", "nov.", "dec."];

function addBusinessDays(d: Date, n: number) {
  const r = new Date(d);
  while (n > 0) {
    r.setDate(r.getDate() + 1);
    if (r.getDay() !== 0 && r.getDay() !== 6) n--;
  }
  return r;
}

export function DeliveryEstimate() {
  const [text, setText] = useState<string | null>(null);

  useEffect(() => {
    const now = new Date();
    const cutoff = 14;
    const isWeekend = now.getDay() === 0 || now.getDay() === 6;
    const shipsToday = !isWeekend && now.getHours() < cutoff;
    const shipDay = shipsToday ? now : addBusinessDays(now, 1);
    const arrival = addBusinessDays(shipDay, 1);
    const when = `${DAYS[arrival.getDay()]}, ${arrival.getDate()} ${MONTHS[arrival.getMonth()]}`;
    setText(
      shipsToday
        ? `Comanzi azi până la ${cutoff}:00 → ajunge ${when}`
        : `Comanzi acum → ajunge ${when}`,
    );
  }, []);

  return (
    <p className="mt-2 flex items-center gap-2 text-xs font-medium text-foreground">
      <Truck className="size-4 shrink-0 text-primary" aria-hidden />
      <span>{text ?? `Expediem în aceeași zi pentru comenzile de până la 14:00`}</span>
    </p>
  );
}

const STEP_ICONS = [Waves, SprayCan, Droplets];

export function HowToSteps() {
  return (
    <section aria-labelledby="howto-heading" className="mt-6">
      <div className="flex items-baseline justify-between gap-3">
        <h2 id="howto-heading" className="text-base font-semibold text-foreground">
          Cum se folosește
        </h2>
        <span className="flex items-center gap-1 text-xs text-muted-foreground">
          <CalendarDays className="size-3.5" aria-hidden />
          {product.frequency}
        </span>
      </div>
      <ol className="mt-3 grid grid-cols-3 gap-2">
        {product.howTo.map((s, i) => {
          const Icon = STEP_ICONS[i] ?? Waves;
          return (
            <li key={s.title} className="min-w-0 rounded-lg border bg-card p-2.5 text-center">
              <span className="mx-auto flex size-9 items-center justify-center rounded-full bg-accent text-primary">
                <Icon className="size-4.5" strokeWidth={1.6} aria-hidden />
              </span>
              <p className="mt-2 text-xs font-semibold text-foreground">
                {i + 1}. {s.title}
              </p>
              <p className="mt-0.5 text-[11px] leading-snug text-muted-foreground">{s.text}</p>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

export function ProductFaq() {
  return (
    <Accordion type="single" collapsible className="rounded-2xl border bg-card px-4 sm:px-6">
      {product.faq.map((f, i) => (
        <AccordionItem key={f.q} value={`faq-${i}`} className={i === product.faq.length - 1 ? "border-b-0" : ""}>
          <AccordionTrigger className="text-left text-sm font-semibold text-foreground hover:no-underline">
            {f.q}
          </AccordionTrigger>
          <AccordionContent className="text-sm leading-relaxed text-muted-foreground">{f.a}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export function faqJsonLd() {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: product.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  });
}

export function freeShippingRemaining(cartValue: number) {
  return Math.max(0, shipping.freeFrom - cartValue);
}

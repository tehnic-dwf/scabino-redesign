import { useEffect, useState } from "react";
import { CalendarDays, Droplets, SprayCan, Truck, Waves } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { product, shipping } from "@/data/product";

function KoreaFlag({ className }: { className?: string }) {
  return (
    <svg
      viewBox="-72 -48 144 96"
      className={className}
      role="img"
      aria-label="Steagul Coreei de Sud"
      focusable="false"
    >
      <path fill="#fff" d="M-72-48v96H72v-96z" />
      <g stroke="#000" strokeWidth="4" fill="none">
        <path d="M-34.946-37.72-48.26-17.75m4.992 3.328 13.313-19.97m4.992 3.329-13.312 19.969m63.236 42.157 6.101-9.152m1.11-1.664 6.101-9.153m4.993 3.328-6.102 9.153m-1.11 1.664-6.101 9.152m4.992 3.329 6.102-9.153m1.11-1.664 6.1-9.153M-48.259 17.75l13.313 19.97m4.992-3.329-6.102-9.152m-1.109-1.664-6.102-9.153m4.993-3.328 13.312 19.97m63.236-42.158-6.101-9.153m-1.11-1.664-6.101-9.152m4.992-3.328 13.313 19.969m4.992-3.328-6.102-9.153m-1.11-1.664-6.1-9.153" />
      </g>
      <path fill="#cd2e3a" d="M9.985 6.656A18 18 0 1 1-19.97-13.313a24 24 0 1 1 39.938 26.626" />
      <path fill="#0047a0" d="M0 0a12 12 0 1 1 19.97 13.313 24 24 0 1 1-39.94-26.626A12 12 0 1 0 0 0" />
    </svg>
  );
}

export function AuthenticityLine() {
  return (
    <p className="mt-3 rounded-lg bg-muted/60 px-3 py-2 text-xs leading-relaxed text-foreground/85">
      <KoreaFlag className="mt-1 mr-2 mb-0.5 float-left h-6 w-9 rounded-[3px] ring-1 ring-black/15" />
      <strong className="font-semibold">Produs original</strong>, importat din {product.origin} · lot
      și valabilitate verificate · valabil până la {product.expiry}
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

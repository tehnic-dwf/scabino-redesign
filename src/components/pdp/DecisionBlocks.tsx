import type { ReactNode } from "react";
import { Check, CircleAlert, FlaskConical, Info, ShieldCheck, Truck, RefreshCcw, CreditCard } from "lucide-react";
import { formatPrice, shipping } from "@/data/product";

export function Section({
  id,
  title,
  intro,
  children,
}: {
  id: string;
  title: string;
  intro?: string;
  children: ReactNode;
}) {
  return (
    <section aria-labelledby={`${id}-heading`} className="mt-14">
      <h2 id={`${id}-heading`} className="text-xl font-bold text-foreground sm:text-2xl">
        {title}
      </h2>
      {intro && (
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          {intro}
        </p>
      )}
      <div className="mt-6">{children}</div>
    </section>
  );
}

export function VerdictCard({
  attributes,
  bestFor,
}: {
  attributes: [string, string][];
  bestFor?: string;
}) {
  return (
    <div className="rounded-2xl border bg-card p-5 sm:p-6">
      <dl className="grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
        {attributes.map(([label, value]) => (
          <div key={label}>
            <dt className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
              {label}
            </dt>
            <dd className="mt-1 text-sm font-medium leading-snug text-foreground">{value}</dd>
          </div>
        ))}
      </dl>
      {bestFor && (
        <p className="mt-5 border-t pt-4 text-sm text-foreground/85">
          <span className="font-semibold">Cel mai util dacă: </span>
          {bestFor}
        </p>
      )}
    </div>
  );
}

export function FitNonFit({
  fit,
  nonFit,
  alternative,
}: {
  fit: string[];
  nonFit: string[];
  alternative?: { label: string; to: string };
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="rounded-2xl border border-fit-border bg-fit-soft p-5 sm:p-6">
        <h3 className="flex items-center gap-2 text-sm font-semibold text-fit">
          <Check className="size-4" aria-hidden />
          Alege-l dacă
        </h3>
        <ul className="mt-3 space-y-2.5 text-sm leading-relaxed text-foreground/85">
          {fit.map((f) => (
            <li key={f} className="flex gap-2">
              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-fit" aria-hidden />
              {f}
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-2xl border border-caution-border bg-caution-soft p-5 sm:p-6">
        <h3 className="flex items-center gap-2 text-sm font-semibold text-caution">
          <CircleAlert className="size-4" aria-hidden />
          Probabil nu dacă
        </h3>
        <ul className="mt-3 space-y-2.5 text-sm leading-relaxed text-foreground/85">
          {nonFit.map((f) => (
            <li key={f} className="flex gap-2">
              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-caution" aria-hidden />
              {f}
            </li>
          ))}
        </ul>
        {alternative && (
          <p className="mt-4 border-t border-caution-border pt-3 text-sm text-foreground/85">
            {alternative.label}:{" "}
            <span className="font-semibold text-primary">{alternative.to}</span>
          </p>
        )}
      </div>
    </div>
  );
}

export function EvidenceBlock({ rows }: { rows: [string, string][] }) {
  return (
    <div className="rounded-2xl border border-evidence-border bg-evidence-soft p-5 sm:p-6">
      <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-evidence">
        <FlaskConical className="size-4" aria-hidden />
        Transparență
      </p>
      <dl className="mt-4 divide-y divide-evidence-border">
        {rows.map(([label, value]) => (
          <div key={label} className="grid gap-1 py-3 sm:grid-cols-[13rem_1fr] sm:gap-6">
            <dt className="text-sm font-semibold text-foreground">{label}</dt>
            <dd className="text-sm leading-relaxed text-muted-foreground">{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export function CompatibilityBlock({
  works,
  caution,
  covered,
}: {
  works: string[];
  caution: string[];
  covered: string[];
}) {
  const groups: { title: string; items: string[]; tone: "fit" | "caution" | "evidence" }[] = [
    { title: "Se combină bine cu", items: works, tone: "fit" },
    { title: "Cu prudență", items: caution, tone: "caution" },
    { title: "Ai deja funcția acoperită dacă", items: covered, tone: "evidence" },
  ];
  const toneClass = {
    fit: "border-fit-border bg-fit-soft text-fit",
    caution: "border-caution-border bg-caution-soft text-caution",
    evidence: "border-evidence-border bg-evidence-soft text-evidence",
  };

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {groups.map((g) => (
        <div key={g.title} className={`rounded-2xl border p-5 ${toneClass[g.tone]}`}>
          <h3 className="text-sm font-semibold">{g.title}</h3>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-foreground/85">
            {g.items.map((i) => (
              <li key={i}>{i}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export function CompareTable({
  currentLabel,
  alternativeLabel,
  rows,
}: {
  currentLabel: string;
  alternativeLabel: string;
  rows: [string, string, string][];
}) {
  return (
    <div className="max-w-full overflow-x-auto rounded-2xl border bg-card">
      <table className="w-full min-w-[40rem] text-left text-sm">
        <thead>
          <tr className="border-b bg-muted/50">
            <th scope="col" className="w-44 p-4 font-semibold text-muted-foreground">
              Criteriu
            </th>
            <th scope="col" className="p-4 font-semibold text-primary">
              {currentLabel}
            </th>
            <th scope="col" className="p-4 font-semibold text-foreground">
              {alternativeLabel}
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r[0]} className="border-b last:border-b-0">
              <th scope="row" className="p-4 align-top font-medium text-foreground">
                {r[0]}
              </th>
              <td className="p-4 align-top text-foreground/85">{r[1]}</td>
              <td className="p-4 align-top text-muted-foreground">{r[2]}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="border-t bg-muted/30 p-4 text-xs text-muted-foreground">
        Nu desemnăm un câștigător. Comparăm criteriile și alegi tu ce ți se potrivește.
      </p>
    </div>
  );
}

export function TrustRow() {
  return (
    <ul className="mt-4 grid gap-2 text-xs text-muted-foreground sm:grid-cols-2">
      <li className="flex items-center gap-2">
        <ShieldCheck className="size-4 shrink-0 text-primary" aria-hidden />
        Distribuitori autorizați
      </li>
      <li className="flex items-center gap-2">
        <CreditCard className="size-4 shrink-0 text-primary" aria-hidden />
        Plată securizată: card sau ramburs
      </li>
      <li className="flex items-center gap-2">
        <Truck className="size-4 shrink-0 text-primary" aria-hidden />
        Expediem azi pentru comenzi până la 14:00
      </li>
      <li className="flex items-center gap-2">
        <RefreshCcw className="size-4 shrink-0 text-primary" aria-hidden />
        Retur în 14 zile
      </li>
    </ul>
  );
}

export function FreeShippingProgress({ cartValue }: { cartValue: number }) {
  const target = shipping.freeFrom;
  const remaining = Math.max(0, target - cartValue);
  const percent = Math.min(100, (cartValue / target) * 100);

  return (
    <div className="mt-4 rounded-xl bg-muted/60 p-3.5">
      <p className="text-xs text-foreground/85">
        {remaining > 0 ? (
          <>
            Mai adaugă <span className="font-semibold">{formatPrice(remaining)}</span> pentru
            livrare gratuită.
          </>
        ) : (
          <span className="font-semibold text-fit">Ai livrare gratuită.</span>
        )}
      </p>
      <div
        className="mt-2 h-1.5 overflow-hidden rounded-full bg-border"
        role="progressbar"
        aria-valuenow={Math.round(percent)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Progres spre livrare gratuită"
      >
        <div className="h-full rounded-full bg-primary transition-[width] duration-300" style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}

export function LoyaltyLine({ points }: { points: number }) {
  return (
    <p className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
      <Info className="size-3.5 shrink-0" aria-hidden />
      +{points} puncte de loialitate cu această comandă
    </p>
  );
}

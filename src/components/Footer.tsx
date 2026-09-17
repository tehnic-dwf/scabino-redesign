import { Link } from "@tanstack/react-router";
import { logo } from "@/lib/assets";
import { shipping } from "@/data/product";

const columns = [
  {
    title: "Scabino",
    links: ["Despre noi", "Branduri", "Blog & ghiduri", "Contact"],
  },
  {
    title: "Categorii",
    links: [
      "Cosmetice coreene",
      "Îngrijirea corpului",
      "Îngrijirea orală",
      "Machiaj",
    ],
  },
  {
    title: "Informații",
    links: ["Termeni și condiții", "Politica de retur", "Confidențialitate", "ANPC"],
  },
];

export function Footer() {
  return (
    <footer className="mt-16 bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <img
            src={logo}
            alt="Scabino"
            className="h-10 w-auto brightness-0 invert"
          />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-primary-foreground/80">
            Selectie atentă de cosmetice coreene și produse de îngrijire,
            alese pentru rezultate reale.
          </p>
          <p className="mt-4 text-sm text-primary-foreground/80">
            {shipping.processing}
          </p>
        </div>
        {columns.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <h3 className="text-sm font-semibold uppercase tracking-wide">
              {col.title}
            </h3>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((l) => (
                <li key={l}>
                  <Link
                    to="/"
                    className="text-sm text-primary-foreground/80 transition-colors hover:text-primary-foreground"
                  >
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="border-t border-primary-foreground/15">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-primary-foreground/70 sm:flex-row">
          <p>© 2026 Scabino. Toate drepturile rezervate.</p>
          <p>Prototip de redesign — date demonstrative</p>
        </div>
      </div>
    </footer>
  );
}

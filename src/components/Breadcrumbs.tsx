import { Link } from "@tanstack/react-router";

export interface Crumb {
  label: string;
  to?: string;
}

function Separator() {
  return (
    <svg
      width="14"
      height="10"
      viewBox="0 0 14 10"
      fill="none"
      aria-hidden
      className="shrink-0 text-muted-foreground/60"
    >
      <path
        d="M8.5 1L12.5 5L8.5 9M12 5H1"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="border-b border-border/60 bg-background">
      <ol
        className="mx-auto flex max-w-7xl items-center gap-x-2 overflow-x-auto whitespace-nowrap px-4 py-3 text-[13px] text-muted-foreground [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item, index) => {
          const last = index === items.length - 1;
          const prev = index === items.length - 2;
          // Pe mobil: doar categoria anterioară + pagina curentă; pe desktop: traseul complet.
          const hiddenOnMobile = items.length > 2 && !last && !prev;
          return (
            <li
              key={item.label}
              className={`flex shrink-0 items-center gap-2 ${hiddenOnMobile ? "hidden md:flex" : ""}`}
            >
              {item.to && !last ? (
                <Link to={item.to} className="transition-colors hover:text-primary">
                  {item.label}
                </Link>
              ) : (
                <span
                  className={last ? "text-foreground" : undefined}
                  aria-current={last ? "page" : undefined}
                >
                  {item.label}
                </span>
              )}
              {!last && <Separator />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

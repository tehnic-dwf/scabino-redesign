import { useRef, useState } from "react";
import { Play } from "lucide-react";
import { product } from "@/data/product";

type Slide = { type: "image"; src: string } | { type: "video"; poster: string };

function VideoPlaceholder({ poster, large }: { poster: string; large?: boolean }) {
  return (
    <div className="relative size-full">
      <img src={poster} alt="" className="size-full bg-white object-contain opacity-40" />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-primary/10 p-3 text-center">
        <span
          className={`flex items-center justify-center rounded-full bg-primary text-primary-foreground ${
            large ? "size-16" : "size-7"
          }`}
        >
          <Play className={large ? "size-7 fill-current" : "size-3.5 fill-current"} aria-hidden />
        </span>
        {large ? (
          <>
            <p className="text-sm font-semibold text-foreground">Clip textură · 5–10 secunde</p>
            <p className="max-w-xs text-xs leading-relaxed text-muted-foreground">
              Aici se încarcă un clip scurt, fără sunet, care arată textura produsului pe piele
              (pulverizare și absorbție). Format vertical sau pătrat, MP4.
            </p>
          </>
        ) : (
          <span className="text-[9px] font-semibold uppercase leading-none tracking-wide text-foreground">
            Video
          </span>
        )}
      </div>
    </div>
  );
}

export function ProductGallery({
  images,
  withVideo = true,
  alt,
}: { images?: string[]; withVideo?: boolean; alt?: string } = {}) {
  const [active, setActive] = useState(0);
  const thumbRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const select = (i: number) => {
    setActive(i);
    thumbRefs.current[i]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "nearest",
    });
  };

  const imgs = images ?? (product.images as string[]);
  const first = imgs[0] ?? "";
  const slides: Slide[] = [
    { type: "image", src: first },
    ...(withVideo ? [{ type: "video" as const, poster: imgs[1] ?? first }] : []),
    ...imgs.slice(1).map((src) => ({ type: "image" as const, src })),
  ];
  const current = slides[active] ?? slides[0]!;

  return (
    <div className="min-w-0 max-w-full flex flex-col gap-3">
      <div className="aspect-square overflow-hidden rounded-2xl border bg-card">
        {current.type === "image" ? (
          <img
            src={current.src}
            alt={alt ?? `${product.brand} ${product.name}`}
            className="size-full bg-white object-contain"
          />
        ) : (
          <VideoPlaceholder poster={current.poster} large />
        )}
      </div>
      <div
        className="-mx-1 flex snap-x snap-mandatory gap-2.5 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        role="tablist"
        aria-label="Imagini produs"
      >
        {slides.map((s, i) => (
          <button
            key={i}
            ref={(el) => {
              thumbRefs.current[i] = el;
            }}
            type="button"
            role="tab"
            aria-selected={i === active}
            aria-label={s.type === "video" ? "Clip textură" : `Imagine ${i + 1} din ${slides.length}`}
            onClick={() => select(i)}
            className={`size-16 shrink-0 snap-start overflow-hidden rounded-lg border-2 transition-colors sm:size-20 ${
              i === active ? "border-primary" : "border-border/60 hover:border-primary/50"
            }`}
          >
            {s.type === "image" ? (
              <img src={s.src} alt="" loading="lazy" className="size-full bg-white object-contain" />
            ) : (
              <VideoPlaceholder poster={s.poster} />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

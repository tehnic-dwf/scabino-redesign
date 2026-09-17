import { useState } from "react";
import { product } from "@/data/product";

export function ProductGallery() {
  const [active, setActive] = useState(0);
  const images = product.images;

  return (
    <div className="flex flex-col gap-3">
      <div className="overflow-hidden rounded-2xl border bg-card">
        <img
          src={images[active]}
          alt={`${product.brand} ${product.name}`}
          className="aspect-square w-full bg-white object-contain"
        />
      </div>
      <div className="flex gap-2.5" role="tablist" aria-label="Imagini produs">
        {images.map((src, i) => (
          <button
            key={src}
            type="button"
            role="tab"
            aria-selected={i === active}
            aria-label={`Imagine ${i + 1}`}
            onClick={() => setActive(i)}
            className={`overflow-hidden rounded-lg border-2 transition-colors ${
              i === active ? "border-primary" : "border-transparent hover:border-border"
            }`}
          >
            <img
              src={src}
              alt=""
              loading="lazy"
              className="size-16 bg-white object-contain sm:size-20"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

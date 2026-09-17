import { useState } from "react";
import { ImagePlus, Star } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { formatPrice, product } from "@/data/product";

function Stars({ value, className = "size-4" }: { value: number; className?: string }) {
  return (
    <span className="flex gap-0.5" aria-label={`Evaluare ${value} din 5 stele`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`${className} ${i <= value ? "fill-amber-400 text-amber-400" : "text-muted-foreground/40"}`}
          aria-hidden
        />
      ))}
    </span>
  );
}

export function ReviewsSection() {
  const [open, setOpen] = useState(false);

  const distribution = [5, 4, 3, 2, 1].map((stars) => ({
    stars,
    count: stars === 5 ? product.reviewCount : 0,
  }));

  return (
    <section aria-labelledby="reviews-heading" className="mt-14">
      <div className="rounded-2xl border bg-card p-6 sm:p-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-center gap-6">
            <div className="text-center">
              <p className="text-4xl font-bold text-primary">
                {product.rating.toFixed(1)}
              </p>
              <Stars value={5} className="size-4" />
              <p className="mt-1 text-xs text-muted-foreground">
                {product.reviewCount} recenzii
              </p>
            </div>
            <div className="min-w-44 flex-1 space-y-1">
              {distribution.map((d) => (
                <div key={d.stars} className="flex items-center gap-2">
                  <span className="w-3 text-xs text-muted-foreground">{d.stars}</span>
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-primary"
                      style={{ width: `${(d.count / product.reviewCount) * 100}%` }}
                    />
                  </div>
                  <span className="w-4 text-right text-xs text-muted-foreground">
                    {d.count}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="border-primary text-primary hover:bg-accent">
                Adaugă un review
              </Button>
            </DialogTrigger>
            <DialogContent>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setOpen(false);
                  toast.success("Mulțumim! Review-ul tău a fost trimis.");
                }}
              >
                <DialogHeader>
                  <DialogTitle>Scrie un review</DialogTitle>
                  <DialogDescription>
                    Spune-le celorlalți cum a funcționat produsul pentru tine.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <Input required placeholder="Numele tău" />
                  <div className="flex gap-1" role="radiogroup" aria-label="Evaluare">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <label key={i} className="cursor-pointer">
                        <input
                          type="radio"
                          name="rating"
                          value={i}
                          defaultChecked={i === 5}
                          className="peer sr-only"
                        />
                        <Star
                          className="size-6 text-muted-foreground/40 peer-checked:fill-amber-400 peer-checked:text-amber-400"
                          aria-hidden
                        />
                      </label>
                    ))}
                  </div>
                  <Textarea required rows={4} placeholder="Cum ți s-a părut produsul?" />
                  <label className="flex cursor-pointer items-center gap-2 text-sm text-muted-foreground">
                    <ImagePlus className="size-4" aria-hidden />
                    Adaugă poze (opțional)
                    <input type="file" accept="image/*" multiple className="sr-only" />
                  </label>
                </div>
                <DialogFooter>
                  <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90">
                    Trimite review
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <ul className="mt-8 space-y-6">
          {product.reviews.map((r) => (
            <li
              key={r.author + r.date}
              className="rounded-xl border bg-background p-5"
            >
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <span className="font-semibold text-foreground">{r.author}</span>
                <span className="text-xs text-muted-foreground">{r.date}</span>
                <span className="ml-auto flex items-center gap-2">
                  <Stars value={r.rating} className="size-3.5" />
                  <span className="rounded-full bg-accent px-2 py-0.5 text-[11px] font-medium text-accent-foreground">
                    Cumpărător verificat
                  </span>
                </span>
              </div>
              {r.title && (
                <p className="mt-2 text-sm font-semibold">{r.title}</p>
              )}
              <p className="mt-1 text-sm leading-relaxed text-foreground/85">
                {r.text}
              </p>
              {r.photo && (
                <img
                  src={r.photo}
                  alt={`Poza recenziei de la ${r.author}`}
                  loading="lazy"
                  className="mt-3 size-20 rounded-lg border object-cover"
                />
              )}
            </li>
          ))}
        </ul>
        <p className="mt-4 text-center text-xs text-muted-foreground">
          Recenzii reale de pe scabino.ro · Preț actual: {formatPrice(product.price)}
        </p>
      </div>
    </section>
  );
}

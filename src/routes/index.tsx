import { createFileRoute, redirect } from "@tanstack/react-router";
import { product } from "@/data/product";

export const Route = createFileRoute("/")({
  beforeLoad: () => {
    throw redirect({ to: "/p/$slug", params: { slug: product.slug } });
  },
});

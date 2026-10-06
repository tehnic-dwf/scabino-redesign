// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
    // Static prerender so the site can also be exported to GitHub Pages
    // (NITRO_PRESET=github_pages in the deploy workflow).
    // Static prerender so the site can also be exported to GitHub Pages.
    // "/" redirects to the default PDP and maxRedirects is pinned to 0,
    // so prerender the real pages directly via `pages`.
    pages: [
      { path: "/p/medicube-hypochlorous-acid-body-peel-shot-280-ml", prerender: { enabled: true } },
      {
        path: "/p/k-secret-seoul-1988-eye-cream-retinal-liposome-4-fermented-bean-crema-anti-rid-cu-retinol-si-extract-fermentat-30ml",
        prerender: { enabled: true },
      },
      { path: "/cosmetice-coreene/creme-de-ochi-coreene", prerender: { enabled: true } },
    ],
  },
});

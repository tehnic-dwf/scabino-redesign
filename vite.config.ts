// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  // GitHub Pages serves the site under /<repo>/; PAGES_BASE is set only in the Pages workflow.
  vite: { base: process.env['PAGES_BASE'] || "/" },
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
    // Static prerender so the site can also be exported to GitHub Pages
    // (NITRO_PRESET=github_pages in the deploy workflow).
    // Static export for GitHub Pages is handled by scripts/export-static.mjs
    // (the built-in prerender is pinned by the platform and can't follow the
    // "/" redirect, so it renders 0 pages here).
  },
});

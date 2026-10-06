// Static export for GitHub Pages.
// The Lovable build pins the nitro preset and prerender options, so we render
// the built server entry directly and write each route's HTML to disk.
import { cp, mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

const OUT = "dist/pages";
const BASE = (process.env.PAGES_BASE || "/").replace(/\/$/, "");
const ROUTES = [
  "/",
  "/p/medicube-hypochlorous-acid-body-peel-shot-280-ml",
  "/p/k-secret-seoul-1988-eye-cream-retinal-liposome-4-fermented-bean-crema-anti-rid-cu-retinol-si-extract-fermentat-30ml",
  "/cosmetice-coreene/creme-de-ochi-coreene",
];

const server = (await import("../dist/server/index.mjs")).default;
const ctx = { waitUntil() {}, passThroughOnException() {}, props: {} };

await cp("dist/client", OUT, { recursive: true });

for (const route of ROUTES) {
  let res = await server.fetch(new Request(`http://localhost${BASE}${route === "/" ? "/" : route}`), {}, ctx);
  // server.fetch returns redirect Responses as-is; follow them (e.g. "/" -> default PDP).
  for (let i = 0; i < 5 && [301, 302, 303, 307, 308].includes(res.status); i++) {
    const location = res.headers.get("location");
    if (!location) break;
    res = await server.fetch(new Request(new URL(location, "http://localhost")), {}, ctx);
  }
  if (res.status >= 400) {
    console.error(`Export failed for ${route}: HTTP ${res.status}`);
    process.exit(1);
  }
  // Follow the "/" redirect to the default PDP and save it as the homepage.
  const html = await res.text();
  const dir = route === "/" ? OUT : join(OUT, route);
  const file = join(dir, "index.html");
  await mkdir(dir, { recursive: true });
  await writeFile(file, html);
  console.log(`exported ${route} -> ${file}`);
}

// SPA-style fallback so deep links on GitHub Pages render the app shell.
await cp(join(OUT, "index.html"), join(OUT, "404.html"));
console.log("done");

// ---- Make Lovable-hosted images work on GitHub Pages ----
// Images live on Lovable's asset host (/__l5e/...). Download each one into the
// export and point every reference at the copy under the Pages base path.
import { readdir, readFile } from "node:fs/promises";
const ASSET_HOST =
  process.env.ASSET_HOST || "https://project--7f933503-ddd6-44e4-a061-5f14272318d6-dev.lovable.app";
const ASSET_RE = /(?<![\w.\/-])\/__l5e\/assets-v1\/[\w-]+\/[^"'`)\s?#\\]+/g;
async function walk(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(p)));
    else if (/\.(html|js|mjs|css)$/.test(e.name)) out.push(p);
  }
  return out;
}
const assets = new Set();
for (const file of await walk(OUT)) {
  let text = await readFile(file, "utf8");
  for (const m of text.matchAll(ASSET_RE)) assets.add(m[0]);
  let next = text.replace(ASSET_RE, (m) => `${BASE}${m}`);
  if (BASE && file.endsWith(".html")) next = next.replaceAll('href="/favicon.png"', `href="${BASE}/favicon.png"`);
  if (next !== text) await writeFile(file, next);
}
for (const a of assets) {
  const res = await fetch(ASSET_HOST + a);
  if (!res.ok) { console.error(`Image download failed ${a}: HTTP ${res.status}`); process.exit(1); }
  const dest = join(OUT, a);
  await mkdir(join(dest, ".."), { recursive: true });
  await writeFile(dest, Buffer.from(await res.arrayBuffer()));
}
await writeFile(join(OUT, ".nojekyll"), "");
console.log(`copied ${assets.size} images`);

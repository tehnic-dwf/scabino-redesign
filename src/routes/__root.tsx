import { Outlet, createRootRouteWithContext, HeadContent, Scripts, Link, useRouter } from "@tanstack/react-router";
import type { QueryClient } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { Toaster } from "sonner";
import { ShopProvider } from "@/lib/store";

import appCss from "@/styles.css?url";

interface MyRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "Scabino — Cosmetice coreene și produse de îngrijire",
      },
      {
        name: "description",
        content:
          "Selecție atentă de cosmetice coreene, skincare și îngrijire orală, cu sfaturi clare și livrare rapidă în toată România.",
      },
      {
        property: "og:title",
        content: "Scabino — Cosmetice coreene și produse de îngrijire",
      },
      {
        property: "og:description",
        content:
          "Selecție atentă de cosmetice coreene, skincare și îngrijire orală, cu sfaturi clare și livrare rapidă în toată România.",
      },
      {
        property: "og:type",
        content: "website",
      },
      {
        name: "twitter:card",
        content: "summary_large_image",
      },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
    ],
  }),

  shellComponent: RootShell,
  component: RootComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="ro">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <ShopProvider>
      <Outlet />
      <Toaster position="bottom-left" richColors />
    </ShopProvider>
  );
}

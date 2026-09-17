import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import type { QueryClient } from "@tanstack/react-query";
import { Toaster } from "sonner";

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

  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <Outlet />
      <TanStackRouterDevtools position="bottom-right" />
      <Toaster position="bottom-left" richColors />
    </>
  );
}

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";
import { HeroUIProvider } from "@heroui/react";
import {
  NavigateOptions,
  RouterProvider,
  ToOptions,
  createRouter,
} from "@tanstack/react-router";
//
// Import the generated route treexs
import { routeTree } from "./routeTree.gen";
import { NotFoundRoute } from "@tanstack/react-router";
import { Route as rootRoute } from "./routes/__root.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const notFoundRoute = new NotFoundRoute({
  getParentRoute: () => rootRoute,
  component: () => "404 Not Found",
});

const queryClient = new QueryClient();
const router = createRouter({
  routeTree,
  notFoundRoute,
  context: {
    auth: undefined!,
    queryClient,
  },
  defaultPreload: "intent",
  defaultPreloadStaleTime: 0,
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

declare module "@react-types/shared" {
  interface RouterConfig {
    href: ToOptions["to"];
    routerOptions: Omit<NavigateOptions, keyof ToOptions>;
  }
}

function Barkeeper() {
  const auth = useAuth0();
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider
        router={router}
        context={{
          auth,
        }}
      />
    </QueryClientProvider>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HeroUIProvider
      navigate={(to, options) => router.navigate({ to, ...(options ?? {}) })}
      useHref={(to) => router.buildLocation({ to }).href}>
      <main id="theme-root" className="bg-background text-foreground">
        <Auth0Provider
          domain={import.meta.env.VITE_AUTH_DOMAIN}
          clientId={import.meta.env.VITE_AUTH_CLIENTID}
          cacheLocation="localstorage"
          authorizationParams={{
            redirect_uri: window.location.origin,
            audience: import.meta.env.VITE_AUTH_AUDIENCE,
          }}>
          <Barkeeper />
        </Auth0Provider>
      </main>
    </HeroUIProvider>
  </StrictMode>,
);

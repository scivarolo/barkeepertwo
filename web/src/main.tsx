import { StrictMode, useMemo } from "react";
import { createRoot } from "react-dom/client";
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";
import { HeroUIProvider } from "@heroui/react";
import {
  NavigateOptions,
  RouterProvider,
  ToOptions,
  createRouter,
} from "@tanstack/react-router";

import { routeTree } from "./routeTree.gen";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

// Router creation function
function createBarkeeperRouter(auth: any) {
  return createRouter({
    routeTree,
    defaultNotFoundComponent: () => "404 Not Found",
    context: {
      auth,
      queryClient,
    },
    defaultPreload: "intent",
    defaultPreloadStaleTime: 0,
  });
}

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof createBarkeeperRouter>;
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

  // Create a new router instance when auth state changes
  const router = useMemo(() => {
    console.log("Creating new router with auth state", {
      isAuthenticated: auth.isAuthenticated,
      user: auth.user,
    });
    return createBarkeeperRouter(auth);
  }, [auth.isAuthenticated, auth.user]);

  return (
    <QueryClientProvider client={queryClient}>
      <HeroUIProvider>
        <RouterProvider
          router={router}
          context={{
            auth,
            queryClient,
          }}
        />
      </HeroUIProvider>
    </QueryClientProvider>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
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
  </StrictMode>,
);

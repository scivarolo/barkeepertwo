import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Auth0Provider } from "@auth0/auth0-react";

import { RouterProvider, createRouter } from "@tanstack/react-router";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";
import { NotFoundRoute } from "@tanstack/react-router";
import { Route as rootRoute } from "./routes/__root.tsx";

const notFoundRoute = new NotFoundRoute({
  getParentRoute: () => rootRoute,
  component: () => "404 Not Found",
});

// Create a new router instance
const router = createRouter({ routeTree, notFoundRoute });

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
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
      <RouterProvider router={router} />
    </Auth0Provider>
  </StrictMode>,
);

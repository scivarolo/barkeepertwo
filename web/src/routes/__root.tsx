import App from "@/App";
import { Auth0ContextInterface, User } from "@auth0/auth0-react";
import { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export interface BarkeeperRouterContext {
  auth: Auth0ContextInterface<User>;
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<BarkeeperRouterContext>()({
  component: () => (
    <>
      <App />
      <TanStackRouterDevtools />
    </>
  ),
});

import { useAuth0 } from "@auth0/auth0-react";
import UnauthenticatedRoot from "@/UnauthenticatedRoot";
import { ThemeProvider } from "./contexts/ThemeProvider";
import AuthenticatedRoot from "@/AuthenticatedRoot";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HeroUIProvider } from "@heroui/react";
import { useRouter } from "@tanstack/react-router";
const queryClient = new QueryClient();

export default function App() {
  const { isAuthenticated } = useAuth0();
  const router = useRouter();
  return (
    <QueryClientProvider client={queryClient}>
      <HeroUIProvider
        navigate={(to, options) => router.navigate({ to, ...(options ?? {}) })}
        useHref={(to) => router.buildLocation({ to }).href}>
        <main id="theme-root" className="bg-background text-foreground">
          <ThemeProvider>
            {isAuthenticated ? <AuthenticatedRoot /> : <UnauthenticatedRoot />}
          </ThemeProvider>
        </main>
      </HeroUIProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

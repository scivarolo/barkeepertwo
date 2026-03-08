import { useAuth0 } from "@auth0/auth0-react";
import UnauthenticatedRoot from "@/UnauthenticatedRoot";
import { ThemeProvider } from "./contexts/ThemeProvider";
import AuthenticatedRoot from "@/AuthenticatedRoot";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

export default function App() {
  const { isAuthenticated } = useAuth0();
  return (
    <QueryClientProvider client={queryClient}>
      <main id="theme-root">
        <ThemeProvider>
          {isAuthenticated ? <AuthenticatedRoot /> : <UnauthenticatedRoot />}
        </ThemeProvider>
      </main>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

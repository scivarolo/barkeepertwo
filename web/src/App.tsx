import { useAuth0 } from "@auth0/auth0-react";
import UnauthenticatedRoot from "@/UnauthenticatedRoot";
import { ThemeProvider } from "./contexts/ThemeProvider";
import AuthenticatedRoot from "@/AuthenticatedRoot";
// import AuthenticatedRoutes from "./routes/AuthenticatedRoutes";

export default function App() {
  const { isAuthenticated } = useAuth0();

  return (
    <ThemeProvider>
      {isAuthenticated ? <AuthenticatedRoot /> : <UnauthenticatedRoot />}
    </ThemeProvider>
  );
}

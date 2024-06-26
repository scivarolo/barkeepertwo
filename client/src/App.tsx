import { useAuth0 } from "@auth0/auth0-react";
import UnauthenticatedRoot from "./UnauthenticatedRoot";
import { ThemeProvider } from "./contexts/ThemeContext";
import AuthenticatedRoutes from "./routes/AuthenticatedRoutes";

export default function App() {
  const { isAuthenticated } = useAuth0();

  return (
    <ThemeProvider>
      {isAuthenticated ? <AuthenticatedRoutes /> : <UnauthenticatedRoot />}
    </ThemeProvider>
  );
}

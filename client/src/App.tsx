import { useAuth0 } from "@auth0/auth0-react";
import { RouterProvider } from "react-router-dom";
import authenticatedRouter from "./routes/authenticatedRouter";
import UnauthenticatedRoot from "./UnauthenticatedRoot";
import { ThemeProvider } from "./contexts/ThemeContext";

export default function App() {
  const { isAuthenticated } = useAuth0();
  return (
    <ThemeProvider>
      {isAuthenticated ? (
        <RouterProvider router={authenticatedRouter} />
      ) : (
        <UnauthenticatedRoot />
      )}
    </ThemeProvider>
  );
}

import AuthenticatedRoot from "@/AuthenticatedRoot";
import CompleteUserProfile from "@/CompleteUserProfile";
import Dashboard from "@/Dashboard";
import ApolloClientProvider from "@/data/ApolloClientProvider";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { routes } from "./routes";

export default function AuthenticatedRoutes() {
  return (
    <ApolloClientProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<AuthenticatedRoot />}>
            <Route path={routes.dashboard.path} element={<Dashboard />} />
            <Route
              path={routes.cocktails.path}
              element={<div>Cocktails</div>}
            />
            <Route path={routes.bar.path} element={<div>Bar</div>} />
            <Route
              path={routes.shoppingList.path}
              element={<div>Shopping List </div>}
            />
            <Route path={routes.settings.path} element={<div>Settings</div>} />
          </Route>
          <Route
            path={routes.completeProfile.path}
            element={<CompleteUserProfile />}
          />
        </Routes>
      </BrowserRouter>
    </ApolloClientProvider>
  );
}

import AuthenticatedRoot from "@/AuthenticatedRoot";
import CompleteUserProfile from "@/CompleteUserProfile";
import Dashboard from "@/Dashboard";
import ApolloClientProvider from "@/data/ApolloClientProvider";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export default function AuthenticatedRoutes() {
  return (
    <ApolloClientProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<AuthenticatedRoot />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/cocktails" element={<div>Cocktails</div>} />
            <Route path="/bar" element={<div>Bar</div>} />
            <Route path="/shopping-list" element={<div>Shopping List </div>} />
          </Route>
          <Route path="/complete-profile" element={<CompleteUserProfile />} />
        </Routes>
      </BrowserRouter>
    </ApolloClientProvider>
  );
}

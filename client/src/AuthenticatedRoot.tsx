import { Outlet } from "react-router-dom";
import ApolloClientProvider from "./data/ApolloClientProvider";
import Header from "./components/header/header";

function AuthenticatedRoot() {
  return (
    <ApolloClientProvider>
      <div className="container flex min-h-screen w-full flex-col bg-slate-100 dark:bg-slate-900">
        <Header />
        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </ApolloClientProvider>
  );
}

export default AuthenticatedRoot;

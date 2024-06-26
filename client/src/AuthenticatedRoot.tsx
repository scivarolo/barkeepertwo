import { Navigate, Outlet } from "react-router-dom";
import Header from "./components/header/header";
import { Loader2 } from "lucide-react";
import { useUser } from "./data/User";
import { useAuth0 } from "@auth0/auth0-react";
import { NetworkStatus } from "@apollo/client";

function AuthenticatedRoot() {
  const auth = useAuth0();

  const user = useUser(auth?.user?.sub);

  if (user.loading) {
    return (
      <div className="flex align-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  } else if (user.networkStatus === NetworkStatus.ready && !user.data) {
    return <Navigate to="/complete-profile" />;
  }
  return (
    <div className=" flex min-h-screen w-full flex-col bg-slate-100 dark:bg-slate-900">
      <Header />
      <div className="p-6">
        <Outlet />
      </div>
    </div>
  );
}

export default AuthenticatedRoot;

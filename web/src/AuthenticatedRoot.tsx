import Header from "./components/header/header";
import { Outlet } from "@tanstack/react-router";

function AuthenticatedRoot() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-zinc-100 dark:bg-zinc-900">
      <Header />
      <div className="p-6">
        <Outlet />
      </div>
    </div>
  );
}

export default AuthenticatedRoot;

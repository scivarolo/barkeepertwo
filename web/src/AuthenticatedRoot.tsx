import Header from "./components/header/Header";
import { Outlet } from "@tanstack/react-router";

function AuthenticatedRoot() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <div className="p-6">
        <Outlet />
      </div>
    </div>
  );
}

export default AuthenticatedRoot;

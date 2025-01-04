import { createFileRoute } from "@tanstack/react-router";
import { useAuth0 } from "@auth0/auth0-react";
// import { useUser } from "./data/User";

export const Route = createFileRoute("/")({
  component: Dashboard,
});

function Dashboard() {
  const { user: authUser } = useAuth0();
  // const user = useUser(authUser?.sub);
  return (
    <div>
      <h1 className="text-3xl font-bold">Dashboard</h1>
      Hey {authUser?.name ?? "No User Logged in."}
    </div>
  );
}

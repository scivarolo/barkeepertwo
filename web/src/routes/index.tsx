import { createFileRoute } from "@tanstack/react-router";
import { useAuth0 } from "@auth0/auth0-react";
import { useUser } from "@/data/User";
import { LoaderCircle } from "lucide-react";
import PageHeader from "@/components/page/PageHeader";

export const Route = createFileRoute("/")({
  component: Dashboard,
});

function Dashboard() {
  const { user: authUser } = useAuth0();
  const user = useUser(authUser?.sub ?? "");

  if (user.isLoading) {
    return (
      <span>
        <LoaderCircle className="mr-2 inline-block animate-spin" /> Loading your
        dashboard...
      </span>
    );
  }

  return (
    <div>
      <PageHeader
        title="Dashboard"
        subtitle={`Hey ${user.data?.DisplayName ?? "No User Logged in."}`}
      />
    </div>
  );
}

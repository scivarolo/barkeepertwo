import PageHeader from "@/components/page/PageHeader";
import { UserHelper } from "@/lib/user";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/")({
  component: RouteComponent,
  beforeLoad: ({ context }) => {
    if (!UserHelper.isAdmin(context.auth.user)) {
      throw redirect({ to: "/" });
    }
  },
});

function RouteComponent() {
  return (
    <div>
      <PageHeader title="Admin" />
    </div>
  );
}

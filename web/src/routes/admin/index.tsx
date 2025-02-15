import IngredientManager from "@/components/admin/IngredientManager";
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
      <div className="grid grid-cols-2 gap-3">
        <div>
          <IngredientManager />
        </div>
      </div>
    </div>
  );
}

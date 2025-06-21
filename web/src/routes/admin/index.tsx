import IngredientManager from "@/components/admin/IngredientManager";
import PageHeader from "@/components/page/PageHeader";
import { UserHelper } from "@/lib/user";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/")({
  component: RouteComponent,
  beforeLoad: ({ context }) => {
    console.log("Admin route beforeLoad", context);

    // If auth is still loading, allow the route to proceed
    // The component will handle the loading state
    if (context.auth.isLoading) {
      return;
    }

    // If not authenticated at all, redirect to home
    if (!context.auth.isAuthenticated) {
      throw redirect({ to: "/" });
    }

    // If authenticated but not admin, redirect to home
    if (!UserHelper.isAdmin(context.auth.user)) {
      throw redirect({ to: "/" });
    }
  },
});

function RouteComponent() {
  const { auth } = Route.useRouteContext();

  // Show loading state while auth is being determined
  if (auth.isLoading) {
    return <div>Loading...</div>;
  }

  // Double-check permissions in the component
  if (!auth.isAuthenticated || !UserHelper.isAdmin(auth.user)) {
    return <div>Access denied</div>;
  }

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

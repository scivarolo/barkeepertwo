import PageHeader from "@/components/page/PageHeader";
import { shoppingQueries } from "@/data/ShoppingList";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import AddShoppingItemDialog from "@/components/shopping-list/AddShoppingItemDialog";
import ShoppingList from "@/components/shopping-list/ShoppingList";
import { useState } from "react";

export const Route = createFileRoute("/shopping-list/")({
  component: RouteComponent,
  loader: async ({ context }) => {
    return context.queryClient.ensureQueryData(
      shoppingQueries.items({ auth: context.auth })
    );
  },
});

function RouteComponent() {
  const context = Route.useRouteContext();
  const [dialogOpen, setDialogOpen] = useState(false);

  useSuspenseQuery(shoppingQueries.items({ auth: context.auth }));

  return (
    <div>
      <PageHeader
        title="Shopping List"
        subtitle="Time to stock up"
        toolbar={
          <AddShoppingItemDialog
            open={dialogOpen}
            onOpenChange={setDialogOpen}
          />
        }
      />
      <div className="container mx-auto mt-6">
        <ShoppingList />
      </div>
    </div>
  );
}

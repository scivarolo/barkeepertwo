import PageHeader from "@/components/page/PageHeader";
import { barQueries } from "@/data/Bar";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import AddIngredientDialog from "@/components/bar/AddIngredientDialog";
import BarIngredientList from "@/components/bar/BarIngredientList";

export const Route = createFileRoute("/bar/")({
  component: RouteComponent,
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(
      barQueries.barIngredients({ auth: context.auth })
    );
    return context.queryClient.ensureQueryData(
      barQueries.barProducts({ auth: context.auth })
    );
  },
});

function RouteComponent() {
  const context = Route.useRouteContext();
  const barQuery = useSuspenseQuery(
    barQueries.barIngredients({ auth: context.auth })
  );
  const productsQuery = useSuspenseQuery(
    barQueries.barProducts({ auth: context.auth })
  );
  const userIngredients = barQuery.data;
  const userProducts = productsQuery.data;

  return (
    <div>
      <PageHeader
        title="Bar"
        toolbar={<AddIngredientDialog />}
      />
      <div className="container mx-auto mt-6">
        <BarIngredientList userIngredients={userIngredients} userProducts={userProducts} />
      </div>
    </div>
  );
}

import PageHeader from "@/components/page/PageHeader";
import { cocktailQueries } from "@/data/Cocktail";
import { Card, CardBody } from "@heroui/react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/cocktails/$cocktailId")({
  component: RouteComponent,
  loader: async ({ context, params }) => {
    const queryOptions = cocktailQueries.cocktail({
      context,
      cocktailId: Number(params.cocktailId),
    });
    return context.queryClient.ensureQueryData(queryOptions);
  },
});

function RouteComponent() {
  const params = Route.useParams();
  const context = Route.useRouteContext();
  const cocktailQuery = useSuspenseQuery(
    cocktailQueries.cocktail({
      cocktailId: Number(params.cocktailId),
      context,
    }),
  );
  const cocktail = cocktailQuery.data;
  return (
    <div>
      <PageHeader
        title={cocktail.Name ?? "Loading..."}
        subtitle={cocktail.Notes}
      />
      <div className="grid grid-cols-4 gap-4">
        <div>
          <h3 className="mb-3 text-2xl text-primary">Ingredients</h3>
          <Card>
            <CardBody className="p-6">
              <dl className="divide-y divide-gray-200">
                {cocktail.CocktailIngredients.map((ci) => (
                  <div
                    key={ci.Id}
                    className="grid grid-cols-2 gap-4 py-5 first:pt-0 last:pb-0">
                    <dt className="font-medium text-gray-900">
                      {ci.Ingredient.Name}
                      {ci.Product ? (
                        <p className="text-sm font-light text-gray-500">
                          Recommended: {ci.Product.Name}
                        </p>
                      ) : null}
                    </dt>
                    <dd className="text-right text-primary">
                      {ci.Amount} {ci.Units}
                    </dd>
                  </div>
                ))}
              </dl>
            </CardBody>
          </Card>
        </div>
        <div className="col-span-3">
          <h3 className="mb-3 text-2xl text-primary">Instructions</h3>
          <Card>
            <CardBody className="p-6">
              <p>{cocktail.Instructions}</p>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}

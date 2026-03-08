import PageHeader from "@/components/page/PageHeader";
import { cocktailQueries } from "@/data/Cocktail";
import { Card, CardContent } from "@/components/ui/card";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Sparkles, Star, StarIcon } from "lucide-react";

export const Route = createFileRoute("/cocktails/$cocktailId")({
  component: RouteComponent,
  loader: async ({ context, params }) => {
    const queryOptions = cocktailQueries.cocktail({
      auth: context.auth,
      request: { cocktailId: Number(params.cocktailId) },
    });
    return context.queryClient.ensureQueryData(queryOptions);
  },
});

function RouteComponent() {
  const params = Route.useParams();
  const context = Route.useRouteContext();
  const cocktailQuery = useSuspenseQuery(
    cocktailQueries.cocktail({
      request: { cocktailId: Number(params.cocktailId) },
      auth: context.auth,
    }),
  );
  const cocktail = cocktailQuery.data;
  return (
    <div className="container mx-auto">
      <PageHeader
        title={cocktail.Name ?? "Loading..."}
        subtitle={cocktail.Notes}
      />
      <div className="grid grid-cols-4 gap-4">
        <div>
          <h3 className="text-primary font-display mb-3 text-2xl font-bold">
            Ingredients
          </h3>
          <Card>
            <CardContent>
              <dl className="divide-y divide-gray-200">
                {cocktail.CocktailIngredients.map((ci) => (
                  <div
                    key={ci.Id}
                    className="grid grid-cols-2 gap-4 py-5 first:pt-0 last:pb-0">
                    <dt className="text-recipe-ingredient">
                      {ci.Ingredient.Name}
                      {ci.Product ? (
                        <p className="text-sm font-light text-gray-500 italic">
                          <Sparkles size="1em" className="inline-block" />{" "}
                          {ci.Product.Name}
                        </p>
                      ) : null}
                    </dt>
                    <dd className="text-measurement text-primary text-right">
                      {ci.Amount} {ci.Units}
                    </dd>
                  </div>
                ))}
              </dl>
            </CardContent>
          </Card>
        </div>
        <div className="col-span-3">
          <h3 className="text-primary font-display mb-3 text-2xl font-bold">
            Instructions
          </h3>
          <Card>
            <CardContent>
              <p>{cocktail.Instructions}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

import { ingredientKeys, ingredientQueries } from "@/data/Ingredient";
import { Ingredient } from "@/types/Models";
import IngredientView from "@/views/IngredientView";
import { useAuth0 } from "@auth0/auth0-react";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  createFileRoute,
  useLoaderData,
  useParams,
} from "@tanstack/react-router";

export const Route = createFileRoute("/ingredients/$ingredientId")({
  component: RouteComponent,
  loader: ({ context, params }) =>
    context.queryClient.ensureQueryData(
      ingredientQueries.ingredient({
        auth: context.auth,
        request: { Id: Number(params.ingredientId) },
      }),
    ),
});

function RouteComponent() {
  const params = useParams({ from: "/ingredients/$ingredientId" });
  const auth = useAuth0();

  return <IngredientView ingredientId={Number(params.ingredientId)} />;
}

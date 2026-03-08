import { ingredientQueries } from "@/data/Ingredient";
import IngredientView from "@/views/IngredientView";
import {
  createFileRoute,
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

  return <IngredientView ingredientId={Number(params.ingredientId)} />;
}

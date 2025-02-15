import PageHeader from "@/components/page/PageHeader";
import { ingredientQueries } from "@/data/Ingredient";
import { useAuth0 } from "@auth0/auth0-react";
import { useSuspenseQuery } from "@tanstack/react-query";

interface IngredientViewProps {
  ingredientId: number;
}
export default function IngredientView({ ingredientId }: IngredientViewProps) {
  const auth = useAuth0();
  const ingredient = useSuspenseQuery(
    ingredientQueries.ingredient({
      auth,
      request: { Id: Number(ingredientId) },
    }),
  );
  return (
    <div>
      <PageHeader title={ingredient.data.Name} />
    </div>
  );
}

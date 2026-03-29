import { useState } from "react";
import PageHeader from "@/components/page/PageHeader";
import { ingredientQueries } from "@/data/Ingredient";
import { useAuth0 } from "@auth0/auth0-react";
import { useSuspenseQuery } from "@tanstack/react-query";
import AddShoppingItemDialog from "@/components/shopping-list/AddShoppingItemDialog";

interface IngredientViewProps {
  ingredientId: number;
}
export default function IngredientView({ ingredientId }: IngredientViewProps) {
  const auth = useAuth0();
  const [shoppingDialogOpen, setShoppingDialogOpen] = useState(false);
  const ingredient = useSuspenseQuery(
    ingredientQueries.ingredient({
      auth,
      request: { Id: Number(ingredientId) },
    }),
  );
  return (
    <div>
      <PageHeader
        title={ingredient.data.Name}
        toolbar={
          <AddShoppingItemDialog
            open={shoppingDialogOpen}
            onOpenChange={setShoppingDialogOpen}
            ingredientId={ingredientId}
          />
        }
      />
    </div>
  );
}

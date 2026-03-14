import { UserIngredient } from "@/types/Models";
import { Card, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useRemoveBarIngredient } from "@/data/Bar";
import { FlaskConical, Trash2 } from "lucide-react";

export default function BarIngredientCard({
  userIngredient,
}: {
  userIngredient: UserIngredient;
}) {
  const removeIngredient = useRemoveBarIngredient();

  const handleRemove = () => {
    removeIngredient.mutate(userIngredient.IngredientId);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-10 w-10">
            <AvatarFallback className="bg-primary/10">
              <FlaskConical size="16" className="text-primary" />
            </AvatarFallback>
          </Avatar>
          <h3 className="font-display text-lg font-bold">
            {userIngredient.Ingredient.Name}
          </h3>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleRemove}
          disabled={removeIngredient.isPending}
          className="h-8 w-8 p-0">
          <Trash2 size={16} />
        </Button>
      </CardHeader>
    </Card>
  );
}

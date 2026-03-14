import { UserIngredient } from "@/types/Models";
import NoItems from "@/components/utility/NoItems";
import { Separator } from "@/components/ui/separator";
import BarIngredientCard from "./BarIngredientCard";

interface BarIngredientListProps {
  userIngredients: UserIngredient[];
}

export default function BarIngredientList({
  userIngredients,
}: BarIngredientListProps) {
  if (!userIngredients || userIngredients.length === 0) {
    return (
      <NoItems
        title="Your Bar is Empty"
        description="Add ingredients to your bar inventory to get started."
      />
    );
  }

  // Group by ingredient type
  const grouped = userIngredients.reduce(
    (acc, userIngredient) => {
      const typeName =
        userIngredient.Ingredient.IngredientType?.Name ?? "Other";
      if (!acc[typeName]) {
        acc[typeName] = [];
      }
      acc[typeName].push(userIngredient);
      return acc;
    },
    {} as Record<string, UserIngredient[]>
  );

  // Sort groups alphabetically
  const sortedGroups = Object.keys(grouped).sort();

  return (
    <div className="space-y-6">
      {sortedGroups.map((typeName) => (
        <div key={typeName}>
          <div className="mb-4 flex items-center gap-4">
            <h2 className="font-sans text-sm uppercase tracking-widest text-foreground/50">
              {typeName}
            </h2>
            <Separator className="flex-1" />
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {grouped[typeName].map((userIngredient) => (
              <BarIngredientCard
                key={userIngredient.Id}
                userIngredient={userIngredient}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

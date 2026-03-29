import { useShoppingItems } from "@/data/ShoppingList";
import ShoppingItemRow from "./ShoppingItemRow";

export default function ShoppingList() {
  const query = useShoppingItems();

  if (query.isLoading) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Loading shopping list...</p>
      </div>
    );
  }

  const items = query.data || [];

  // Separate into ingredients and products
  const ingredientItems = items.filter((item) => item.IngredientId);
  const productItems = items.filter((item) => item.ProductId);

  // Sort each group alphabetically by name
  const sortedIngredients = ingredientItems.sort((a, b) => {
    const nameA = a.Ingredient?.Name || "";
    const nameB = b.Ingredient?.Name || "";
    return nameA.localeCompare(nameB);
  });

  const sortedProducts = productItems.sort((a, b) => {
    const nameA = a.Product?.Name || "";
    const nameB = b.Product?.Name || "";
    return nameA.localeCompare(nameB);
  });

  // Empty state
  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Your shopping list is empty</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Ingredients Section */}
      {sortedIngredients.length > 0 && (
        <div>
          <h2 className="text-sm font-semibold mb-3 text-muted-foreground">
            INGREDIENTS ({sortedIngredients.length})
          </h2>
          <div className="space-y-2">
            {sortedIngredients.map((item) => (
              <ShoppingItemRow key={item.Id} item={item} />
            ))}
          </div>
        </div>
      )}

      {/* Products Section */}
      {sortedProducts.length > 0 && (
        <div>
          <h2 className="text-sm font-semibold mb-3 text-muted-foreground">
            PRODUCTS ({sortedProducts.length})
          </h2>
          <div className="space-y-2">
            {sortedProducts.map((item) => (
              <ShoppingItemRow key={item.Id} item={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

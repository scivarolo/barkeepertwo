import { ShoppingItem } from "@/types/Models";
import { Button } from "@/components/ui/button";
import { useRemoveShoppingItem, usePurchaseShoppingItem } from "@/data/ShoppingList";
import { FlaskConical, Wine, CheckCheck, Trash2 } from "lucide-react";

export default function ShoppingItemRow({ item }: { item: ShoppingItem }) {
  const removeShoppingMutation = useRemoveShoppingItem();
  const purchaseShoppingMutation = usePurchaseShoppingItem();

  const isIngredient = !!item.Ingredient;
  const name = isIngredient ? item.Ingredient?.Name : item.Product?.Name;
  const size = !isIngredient ? item.Product?.Size : undefined;
  const icon = isIngredient ? FlaskConical : Wine;
  const Icon = icon;

  const handleRemove = () => {
    removeShoppingMutation.mutate(item.Id);
  };

  const handlePurchase = () => {
    purchaseShoppingMutation.mutate(item.Id);
  };

  return (
    <div className="flex items-center justify-between gap-2 rounded border px-3 py-3 hover:bg-muted/50">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <Icon size={18} className="text-muted-foreground flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="font-medium text-sm truncate">{name}</div>
          {size && <div className="text-xs text-muted-foreground">{size}</div>}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="bg-muted px-2 py-1 rounded text-xs font-medium min-w-[2.5rem] text-center">
          {item.Quantity}
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handlePurchase}
          disabled={purchaseShoppingMutation.isPending}
          className="h-8 w-8 p-0"
          title="Add to bar and remove from list"
        >
          <CheckCheck size={16} />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleRemove}
          disabled={removeShoppingMutation.isPending}
          className="h-8 w-8 p-0"
          title="Remove from list"
        >
          <Trash2 size={16} />
        </Button>
      </div>
    </div>
  );
}

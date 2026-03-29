import { useState } from "react";
import { UserIngredient, UserProduct } from "@/types/Models";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useRemoveBarIngredient, useRemoveBarProduct } from "@/data/Bar";
import { FlaskConical, Trash2, Plus, Wine, ShoppingCart } from "lucide-react";
import AddProductDialog from "./AddProductDialog";
import AddShoppingItemDialog from "@/components/shopping-list/AddShoppingItemDialog";

export default function BarIngredientCard({
  userIngredient,
  userProducts,
}: {
  userIngredient: UserIngredient;
  userProducts: UserProduct[];
}) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [shoppingDialogOpen, setShoppingDialogOpen] = useState(false);
  const [shoppingTarget, setShoppingTarget] = useState<{
    ingredientId?: number;
    productId?: number;
  } | null>(null);
  const removeIngredient = useRemoveBarIngredient();
  const removeProduct = useRemoveBarProduct();

  const handleRemoveIngredient = () => {
    removeIngredient.mutate(userIngredient.IngredientId);
  };

  const handleRemoveProduct = (productId: number) => {
    removeProduct.mutate(productId);
  };

  // Filter products for this ingredient
  const ingredientProducts = userProducts.filter(
    (up) => up.Product.IngredientId === userIngredient.IngredientId
  );

  return (
    <>
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
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setShoppingTarget({ ingredientId: userIngredient.IngredientId });
                setShoppingDialogOpen(true);
              }}
              className="h-8 w-8 p-0"
            >
              <ShoppingCart size={16} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setDialogOpen(true)}
              className="h-8 w-8 p-0"
            >
              <Plus size={16} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRemoveIngredient}
              disabled={removeIngredient.isPending}
              className="h-8 w-8 p-0"
            >
              <Trash2 size={16} />
            </Button>
          </div>
        </CardHeader>
        {ingredientProducts.length > 0 && (
          <CardContent className="space-y-2">
            {ingredientProducts.map((up) => (
              <div
                key={up.Id}
                className="flex items-center justify-between gap-2 rounded bg-muted/50 px-3 py-2"
              >
                <div className="flex items-center gap-2">
                  <Wine size={14} className="text-muted-foreground" />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{up.Product.Name}</span>
                    {up.Product.Size && (
                      <span className="text-xs text-muted-foreground">
                        {up.Product.Size}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setShoppingTarget({ productId: up.ProductId });
                      setShoppingDialogOpen(true);
                    }}
                    disabled={removeProduct.isPending}
                    className="h-6 w-6 p-0"
                  >
                    <ShoppingCart size={14} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveProduct(up.ProductId)}
                    disabled={removeProduct.isPending}
                    className="h-6 w-6 p-0"
                  >
                    <Trash2 size={14} />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        )}
      </Card>
      <AddProductDialog
        ingredient={userIngredient.Ingredient}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
      {shoppingDialogOpen && (
        <AddShoppingItemDialog
          open={shoppingDialogOpen}
          onOpenChange={setShoppingDialogOpen}
          ingredientId={shoppingTarget?.ingredientId}
          productId={shoppingTarget?.productId}
        />
      )}
    </>
  );
}

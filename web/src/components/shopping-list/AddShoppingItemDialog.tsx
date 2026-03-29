"use client";

import { useState, useEffect } from "react";
import { useIngredients } from "@/data/Ingredient";
import { useAllProducts } from "@/data/Product";
import { useBarIngredients, useBarProducts } from "@/data/Bar";
import { useAddShoppingItem } from "@/data/ShoppingList";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus } from "lucide-react";

export default function AddShoppingItemDialog({
  open,
  onOpenChange,
  ingredientId,
  productId,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  ingredientId?: number;
  productId?: number;
}) {
  const [filter, setFilter] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedIngredientId, setSelectedIngredientId] = useState<number | null>(
    ingredientId || null
  );
  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    productId || null
  );
  const [activeTab, setActiveTab] = useState<"ingredient" | "product">("ingredient");

  const allIngredientsQuery = useIngredients();
  const allProductsQuery = useAllProducts();
  const barIngredientsQuery = useBarIngredients();
  const barProductsQuery = useBarProducts();
  const addShoppingMutation = useAddShoppingItem(() => {
    handleClose();
  });

  // Sync selected IDs when props change
  useEffect(() => {
    setSelectedIngredientId(ingredientId || null);
    setSelectedProductId(productId || null);
  }, [ingredientId, productId]);

  // Compute available ingredients (not yet in bar)
  const barIngredientIds = new Set(
    (barIngredientsQuery.data || []).map((ui) => ui.IngredientId)
  );
  const availableIngredients = (allIngredientsQuery.data || []).filter(
    (ing) => !barIngredientIds.has(ing.Id)
  );

  // Compute available products (not yet in bar)
  const barProductIds = new Set((barProductsQuery.data || []).map((up) => up.ProductId));
  const availableProducts = (allProductsQuery.data || []).filter(
    (prod) => !barProductIds.has(prod.Id)
  );

  // Filter by name
  const filteredIngredients = availableIngredients.filter((ing) =>
    ing.Name.toLowerCase().includes(filter.toLowerCase())
  );

  const filteredProducts = availableProducts.filter((prod) =>
    prod.Name.toLowerCase().includes(filter.toLowerCase())
  );

  const handleClose = () => {
    setFilter("");
    setQuantity(1);
    setSelectedIngredientId(ingredientId || null);
    setSelectedProductId(productId || null);
    onOpenChange(false);
  };

  const handleAdd = () => {
    if (selectedIngredientId) {
      addShoppingMutation.mutate({
        IngredientId: selectedIngredientId,
        Quantity: quantity,
      });
    } else if (selectedProductId) {
      addShoppingMutation.mutate({
        ProductId: selectedProductId,
        Quantity: quantity,
      });
    }
  };

  const isLoading =
    allIngredientsQuery.isLoading ||
    allProductsQuery.isLoading ||
    barIngredientsQuery.isLoading ||
    barProductsQuery.isLoading;

  // Pre-filled mode: show item name and just quantity
  if (ingredientId || productId) {
    const prefilledIngredient =
      ingredientId &&
      (allIngredientsQuery.data || []).find((ing) => ing.Id === ingredientId);
    const prefilledProduct =
      productId && (allProductsQuery.data || []).find((prod) => prod.Id === productId);

    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add to Shopping List</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Item</label>
              <div className="mt-2 text-sm">
                {prefilledIngredient && (
                  <div className="font-medium">{prefilledIngredient.Name}</div>
                )}
                {prefilledProduct && (
                  <div>
                    <div className="font-medium">{prefilledProduct.Name}</div>
                    {prefilledProduct.Size && (
                      <div className="text-xs text-muted-foreground">
                        {prefilledProduct.Size}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Quantity</label>
              <Input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                disabled={addShoppingMutation.isPending}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              onClick={handleAdd}
              disabled={addShoppingMutation.isPending}>
              {addShoppingMutation.isPending ? "Adding..." : "Add"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  // Open mode: show tabs for ingredient/product selection
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger
        render={
          <Button size="sm">
            <Plus className="mr-2" size={16} />
            Add Item
          </Button>
        }
      />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add to Shopping List</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "ingredient" | "product")}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="ingredient">Ingredient</TabsTrigger>
              <TabsTrigger value="product">Product</TabsTrigger>
            </TabsList>

            <TabsContent value="ingredient" className="space-y-4">
              <Input
                placeholder="Search ingredients..."
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                disabled={isLoading}
              />
              <div className="max-h-64 overflow-y-auto space-y-1 border rounded-md p-2">
                {isLoading ? (
                  <div className="text-sm text-foreground/50 py-4 text-center">
                    Loading ingredients...
                  </div>
                ) : filteredIngredients.length === 0 ? (
                  <div className="text-sm text-foreground/50 py-4 text-center">
                    {availableIngredients.length === 0
                      ? "All ingredients are already in your bar"
                      : "No ingredients match your search"}
                  </div>
                ) : (
                  filteredIngredients.map((ingredient) => (
                    <button
                      key={ingredient.Id}
                      onClick={() => {
                        setSelectedIngredientId(ingredient.Id);
                        setSelectedProductId(null);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                        selectedIngredientId === ingredient.Id
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-muted"
                      }`}>
                      <div className="font-medium">{ingredient.Name}</div>
                      <div className="text-xs opacity-75">
                        {ingredient.IngredientType?.Name || "Other"}
                      </div>
                    </button>
                  ))
                )}
              </div>
            </TabsContent>

            <TabsContent value="product" className="space-y-4">
              <Input
                placeholder="Search products..."
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                disabled={isLoading}
              />
              <div className="max-h-64 overflow-y-auto space-y-1 border rounded-md p-2">
                {isLoading ? (
                  <div className="text-sm text-foreground/50 py-4 text-center">
                    Loading products...
                  </div>
                ) : filteredProducts.length === 0 ? (
                  <div className="text-sm text-foreground/50 py-4 text-center">
                    {availableProducts.length === 0
                      ? "All products are already in your bar"
                      : "No products match your search"}
                  </div>
                ) : (
                  filteredProducts.map((product) => (
                    <button
                      key={product.Id}
                      onClick={() => {
                        setSelectedProductId(product.Id);
                        setSelectedIngredientId(null);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                        selectedProductId === product.Id
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-muted"
                      }`}>
                      <div className="font-medium">{product.Name}</div>
                      {product.Size && (
                        <div className="text-xs opacity-75">{product.Size}</div>
                      )}
                    </button>
                  ))
                )}
              </div>
            </TabsContent>
          </Tabs>

          <div>
            <label className="text-sm font-medium">Quantity</label>
            <Input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              disabled={addShoppingMutation.isPending}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            onClick={handleAdd}
            disabled={
              (selectedIngredientId === null && selectedProductId === null) ||
              addShoppingMutation.isPending
            }>
            {addShoppingMutation.isPending ? "Adding..." : "Add"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

import { useState } from "react";
import { Ingredient } from "@/types/Models";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useProductsForIngredient, useSaveProduct } from "@/data/Product";
import { useAddBarProduct, useBarProducts } from "@/data/Bar";
import { Check } from "lucide-react";

type DialogMode = "pick" | "create";

interface AddProductDialogProps {
  ingredient: Ingredient;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AddProductDialog({
  ingredient,
  open,
  onOpenChange,
}: AddProductDialogProps) {
  const [filter, setFilter] = useState("");
  const [mode, setMode] = useState<DialogMode>("pick");
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [newSize, setNewSize] = useState("");

  // Fetch products for this ingredient
  const productsQuery = useProductsForIngredient(ingredient.Id);
  const barProductsQuery = useBarProducts();

  // Mutations
  const saveMutation = useSaveProduct((product) => {
    // After creating product, automatically add it
    addMutation.mutate(product.Id);
  });

  const addMutation = useAddBarProduct(() => {
    // Close dialog and reset state
    onOpenChange(false);
    setFilter("");
    setMode("pick");
    setSelectedProductId(null);
    setNewSize("");
  });

  if (!productsQuery.data || !barProductsQuery.data) {
    return null;
  }

  const products = productsQuery.data;
  const barProducts = barProductsQuery.data;
  const barProductIds = new Set(barProducts.map((up) => up.ProductId));

  // Filter products by name and exclude ones already in bar
  const availableProducts = products.filter(
    (p) => !barProductIds.has(p.Id) && p.Name.toLowerCase().includes(filter.toLowerCase())
  );

  // Check if filter matches "create new" scenario
  const filterLower = filter.toLowerCase();
  const matchesFilter = availableProducts.some(
    (p) => p.Name.toLowerCase() === filterLower
  );
  const canCreateNew = filter.length > 0 && !matchesFilter;

  const handleAddProduct = () => {
    if (selectedProductId) {
      addMutation.mutate(selectedProductId);
    }
  };

  const handleCreateProduct = async () => {
    saveMutation.mutate({
      Id: 0,
      Name: filter,
      IngredientId: ingredient.Id,
      Size: newSize || undefined,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add {ingredient.Name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Input
            placeholder="Search or create product name..."
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value);
              setSelectedProductId(null);
            }}
            className="w-full"
          />

          {mode === "pick" && (
            <>
              {availableProducts.length > 0 && (
                <div>
                  <label className="text-xs font-medium uppercase text-muted-foreground">
                    Available Products
                  </label>
                  <div className="max-h-[200px] overflow-y-auto border rounded mt-2">
                    <div className="p-3 space-y-2">
                      {availableProducts.map((product) => (
                        <div
                          key={product.Id}
                          onClick={() => setSelectedProductId(product.Id)}
                          className={`flex items-center gap-2 rounded p-2 cursor-pointer transition-colors ${
                            selectedProductId === product.Id
                              ? "bg-primary/10"
                              : "hover:bg-muted"
                          }`}
                        >
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium truncate">
                              {product.Name}
                            </div>
                            {product.Size && (
                              <div className="text-xs text-muted-foreground">
                                {product.Size}
                              </div>
                            )}
                          </div>
                          {selectedProductId === product.Id && (
                            <Check size={16} className="text-primary flex-shrink-0" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {canCreateNew && (
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setMode("create");
                    setNewSize("");
                  }}
                >
                  Create new: <span className="font-semibold ml-1">{filter}</span>
                </Button>
              )}

              {!canCreateNew && availableProducts.length === 0 && filter.length > 0 && (
                <div className="text-sm text-muted-foreground text-center py-4">
                  No matching products found
                </div>
              )}
            </>
          )}

          {mode === "create" && (
            <div className="space-y-3">
              <div>
                <label className="text-xs font-medium">Product Name</label>
                <Input value={filter} disabled className="mt-1" />
              </div>
              <div>
                <label className="text-xs font-medium">Size (optional)</label>
                <Input
                  placeholder="e.g., 750ml, 1L, etc."
                  value={newSize}
                  onChange={(e) => setNewSize(e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            variant="outline"
            onClick={() => {
              if (mode === "create") {
                setMode("pick");
                setNewSize("");
              } else {
                onOpenChange(false);
              }
            }}
          >
            {mode === "create" ? "Back" : "Cancel"}
          </Button>
          <Button
            onClick={mode === "pick" ? handleAddProduct : handleCreateProduct}
            disabled={
              (mode === "pick" && !selectedProductId) ||
              (mode === "create" && (!filter || saveMutation.isPending)) ||
              addMutation.isPending
            }
          >
            {mode === "pick" ? "Add Product" : "Create & Add"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

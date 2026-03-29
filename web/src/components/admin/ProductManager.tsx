import { useIngredients } from "@/data/Ingredient";
import { useAllProducts, useSaveProduct } from "@/data/Product";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardHeader,
  CardContent,
} from "@/components/ui/card";
import { Pen, Plus } from "lucide-react";
import LoadingIndicator from "../utility/LoadingIndicator";
import { useForm } from "@tanstack/react-form";
import { Product } from "@/types/Models";
import { useMemo, useState, useEffect } from "react";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { Paginator } from "../table/Paginator";

interface ProductFormProps {
  product?: Product;
  open: boolean;
  onOpenChange: (v: boolean) => void;
}

function ProductForm({ product, open, onOpenChange }: ProductFormProps) {
  const ingredients = useIngredients();
  const saveProduct = useSaveProduct(() => onOpenChange(false));
  const form = useForm({
    defaultValues: {
      Id: product?.Id ?? 0,
      Name: product?.Name ?? "",
      IngredientId: product?.IngredientId ?? 0,
      Size: product?.Size ?? "",
    },
    onSubmit: async ({ value }) => {
      saveProduct.mutate(value);
    },
  });

  useEffect(() => {
    if (open) {
      form.reset();
    }
  }, [open, form]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {product ? "Edit Product" : "New Product"}
          </DialogTitle>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}>
          <form.Field
            name="Name"
            validators={{
              onSubmit: ({ value }) =>
                !value ? "Name is required" : undefined,
            }}>
            {({ state, handleChange, handleBlur }) => (
              <Input
                type="text"
                value={state.value}
                onChange={(e) => handleChange(e.target.value)}
                onBlur={handleBlur}
                placeholder="Enter product name"
                required
              />
            )}
          </form.Field>

          <form.Field
            name="IngredientId"
            validators={{
              onSubmit: ({ value }) =>
                !value ? "Ingredient is required" : undefined,
            }}>
            {({ state, handleChange }) => {
              const selectedIngredient = ingredients.data?.find(
                (i) => i.Id === state.value
              );
              return (
                <div className="mt-4">
                  <Select
                    value={state.value ? String(state.value) : ""}
                    onValueChange={(v) => handleChange(v ? parseInt(v) : 0)}
                    disabled={product !== undefined}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select ingredient">
                        {selectedIngredient?.Name || "Select ingredient"}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {ingredients.data?.map((ing) => (
                        <SelectItem key={ing.Id} value={String(ing.Id)}>
                          {ing.Name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              );
            }}
          </form.Field>

          <form.Field
            name="Size">
            {({ state, handleChange }) => (
              <div className="mt-4">
                <Input
                  type="text"
                  value={state.value}
                  onChange={(e) => handleChange(e.target.value)}
                  placeholder="Size (optional)"
                />
              </div>
            )}
          </form.Field>

          <DialogFooter className="mt-6">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}>
              Close
            </Button>
            <Button
              variant="default"
              type="submit"
              disabled={saveProduct.isPending}>
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default function ProductManager() {
  const products = useAllProducts();
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const columnHelper = useMemo(() => createColumnHelper<Product>(), []);
  const columns = useMemo(
    () =>
      [
        columnHelper.accessor("Name", {
          cell: ({ row }) => (
            <div className="flex items-center justify-between border-b-1 p-3 px-6">
              <div className="flex-1">
                <div className="font-medium">{row.original.Name}</div>
                {row.original.Size && (
                  <div className="text-sm text-muted-foreground">
                    {row.original.Size}
                  </div>
                )}
                {row.original.Ingredient && (
                  <div className="text-sm text-muted-foreground">
                    {row.original.Ingredient.Name}
                  </div>
                )}
              </div>
              <div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setEditingProduct(row.original);
                    setIsOpen(true);
                  }}>
                  <Pen size="16" />
                </Button>
              </div>
            </div>
          ),
        }),
      ] as ColumnDef<Product>[],
    [columnHelper],
  );

  return (
    <Card>
      <CardHeader className="flex content-between">
        <div className="mr-auto">
          <LoadingIndicator isLoading={products.isRefetching} />
          <h1 className="font-display text-xl font-semibold">Products</h1>
        </div>
        <Button
          size="sm"
          variant="default"
          onClick={() => {
            setEditingProduct(null);
            setIsOpen(true);
          }}>
          <Plus size={16} />
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        <hr />
        <LoadingIndicator isLoading={products.isLoading} />
        <Paginator<Product>
          data={products.data}
          columns={columns}
          initialPageSize={10}
          pageSizeOptions={[10, 20, 30, 40, 50]}
        />
      </CardContent>
      <ProductForm
        product={editingProduct ?? undefined}
        open={isOpen}
        onOpenChange={setIsOpen}
      />
    </Card>
  );
}

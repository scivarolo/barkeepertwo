import { useForm } from "@tanstack/react-form";
import { useCreateCocktail } from "@/data/Cocktail";
import { useIngredients } from "@/data/Ingredient";
import { useAllProducts } from "@/data/Product";
import { CreateCocktailRequest, CocktailIngredientRequest } from "@/types/Request";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate } from "@tanstack/react-router";
import { Trash2, ChevronUp, ChevronDown, Plus } from "lucide-react";
import { useMemo } from "react";

const UNITS = ["oz", "ml", "dash", "barspoon", "splash", "tsp", "tbsp"];

export default function CreateCocktailForm() {
  const navigate = useNavigate();
  const ingredients = useIngredients();
  const products = useAllProducts();
  const createCocktail = useCreateCocktail((cocktail) => {
    navigate({ to: "/cocktails/$cocktailId", params: { cocktailId: String(cocktail.Id) } });
  });

  const form = useForm({
    defaultValues: {
      Name: "",
      Instructions: "",
      Notes: "",
      Ingredients: [] as CocktailIngredientRequest[],
    } as CreateCocktailRequest,
    onSubmit: async ({ value }) => {
      console.log("Submitting cocktail:", value);

      // Validate that at least the name is provided
      if (!value.Name?.trim()) {
        console.error("Name is required");
        return;
      }

      // Validate ingredients if any exist
      if (value.Ingredients.length > 0) {
        const invalidIngredients = value.Ingredients.filter(ing => ing.IngredientId === 0);
        if (invalidIngredients.length > 0) {
          console.error("All ingredients must have an ingredient selected");
          return;
        }
      }

      createCocktail.mutate(value);
    },
  });

  // Memoize filtered products per ingredient to avoid recomputing on every render
  const getProductsForIngredient = useMemo(() => {
    return (ingredientId: number) => {
      return (products.data ?? []).filter((p) => p.IngredientId === ingredientId);
    };
  }, [products.data]);

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        console.log("Form submit triggered");
        await form.handleSubmit();
      }}
      className="max-w-2xl space-y-6">
      {/* Name Field */}
      <form.Field
        name="Name"
        validators={{
          onSubmit: ({ value }) => (!value ? "Name is required" : undefined),
        }}>
        {({ state, handleChange, handleBlur }) => (
          <div>
            <label className="block text-sm font-medium mb-2">Name *</label>
            <Input
              type="text"
              value={state.value}
              onChange={(e) => handleChange(e.target.value)}
              onBlur={handleBlur}
              placeholder="Enter cocktail name"
              disabled={createCocktail.isPending}
            />
            {state.meta.errors && (
              <p className="text-red-500 text-sm mt-1">{state.meta.errors[0]}</p>
            )}
          </div>
        )}
      </form.Field>

      {/* Instructions Field */}
      <form.Field name="Instructions">
        {({ state, handleChange, handleBlur }) => (
          <div>
            <label className="block text-sm font-medium mb-2">Instructions</label>
            <textarea
              value={state.value ?? ""}
              onChange={(e) => handleChange(e.target.value)}
              onBlur={handleBlur}
              placeholder="Enter preparation instructions"
              rows={4}
              className="w-full px-3 py-2 border border-input bg-background rounded-md"
              disabled={createCocktail.isPending}
            />
          </div>
        )}
      </form.Field>

      {/* Notes Field */}
      <form.Field name="Notes">
        {({ state, handleChange, handleBlur }) => (
          <div>
            <label className="block text-sm font-medium mb-2">Notes</label>
            <textarea
              value={state.value ?? ""}
              onChange={(e) => handleChange(e.target.value)}
              onBlur={handleBlur}
              placeholder="Any additional notes"
              rows={3}
              className="w-full px-3 py-2 border border-input bg-background rounded-md"
              disabled={createCocktail.isPending}
            />
          </div>
        )}
      </form.Field>

      {/* Ingredients Array Field */}
      <div>
        <label className="block text-sm font-medium mb-2">Ingredients</label>
        <form.Field name="Ingredients" mode="array">
          {(field) => (
            <div className="space-y-3">
              {field.state.value.map((_, index) => (
                <IngredientRow
                  key={index}
                  form={form}
                  index={index}
                  totalIngredients={field.state.value.length}
                  ingredientsList={ingredients.data ?? []}
                  getProductsForIngredient={getProductsForIngredient}
                  isLoading={ingredients.isLoading || products.isLoading || createCocktail.isPending}
                  onRemove={() => field.removeValue(index)}
                  onMoveUp={() => field.swapValues(index, index - 1)}
                  onMoveDown={() => field.swapValues(index, index + 1)}
                />
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() =>
                  field.pushValue({
                    IngredientId: 0,
                    Amount: 0,
                    Units: "oz",
                  })
                }
                disabled={createCocktail.isPending}>
                <Plus size={16} className="mr-1" />
                Add Ingredient
              </Button>
            </div>
          )}
        </form.Field>
      </div>

      {/* Error Display */}
      {createCocktail.isError && (
        <div className="p-3 bg-red-50 border border-red-200 rounded text-red-800 text-sm">
          <p className="font-medium">Error creating cocktail</p>
          <p>{createCocktail.error?.message || "An unknown error occurred"}</p>
        </div>
      )}

      {/* Submit Buttons */}
      <div className="flex gap-2">
        <Button
          type="submit"
          disabled={createCocktail.isPending}
          className="flex-1">
          {createCocktail.isPending ? "Creating..." : "Create Cocktail"}
        </Button>
      </div>
    </form>
  );
}

interface IngredientRowProps {
  form: any;
  index: number;
  totalIngredients: number;
  ingredientsList: any[];
  getProductsForIngredient: (id: number) => any[];
  isLoading: boolean;
  onRemove: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
}

function IngredientRow({
  form,
  index,
  totalIngredients,
  ingredientsList,
  getProductsForIngredient,
  isLoading,
  onRemove,
  onMoveUp,
  onMoveDown,
}: IngredientRowProps) {
  return (
    <form.Field name={`Ingredients[${index}]`}>
      {(fieldItem: any) => {
        const ingredientId = fieldItem.state.value.IngredientId;
        const selectedIngredient = ingredientsList.find((i) => i.Id === ingredientId);
        const productsForThisIngredient = getProductsForIngredient(ingredientId);

        return (
          <div className="flex gap-2 items-end bg-muted p-3 rounded-md">
            {/* Ingredient Select */}
            <div className="flex-1 min-w-0">
              <label className="text-xs font-medium mb-1 block">Ingredient</label>
              <form.Field name={`Ingredients[${index}].IngredientId`}>
                {({ state, handleChange }: any) => (
                  <Select
                    value={state.value ? String(state.value) : ""}
                    onValueChange={(v) => handleChange(v ? parseInt(v) : 0)}>
                    <SelectTrigger disabled={isLoading}>
                      <SelectValue placeholder="Select ingredient">
                        {selectedIngredient?.Name || "Select ingredient"}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {ingredientsList.map((ing) => (
                        <SelectItem key={ing.Id} value={String(ing.Id)}>
                          {ing.Name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </form.Field>
            </div>

            {/* Amount */}
            <div className="w-20">
              <label className="text-xs font-medium mb-1 block">Amount</label>
              <form.Field name={`Ingredients[${index}].Amount`}>
                {({ state, handleChange }: any) => (
                  <Input
                    type="number"
                    step="0.1"
                    value={state.value || ""}
                    onChange={(e) => {
                      const val = parseFloat(e.target.value);
                      handleChange(isNaN(val) ? 0 : val);
                    }}
                    placeholder="0"
                    disabled={isLoading}
                  />
                )}
              </form.Field>
            </div>

            {/* Units */}
            <div className="w-24">
              <label className="text-xs font-medium mb-1 block">Units</label>
              <form.Field name={`Ingredients[${index}].Units`}>
                {({ state, handleChange }: any) => (
                  <Select value={state.value} onValueChange={handleChange}>
                    <SelectTrigger disabled={isLoading}>
                      <SelectValue>{state.value}</SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {UNITS.map((unit) => (
                        <SelectItem key={unit} value={unit}>
                          {unit}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </form.Field>
            </div>

            {/* Product (Optional) */}
            <div className="flex-1 min-w-0">
              <label className="text-xs font-medium mb-1 block">Product (optional)</label>
              <form.Field name={`Ingredients[${index}].ProductId`}>
                {({ state, handleChange }: any) => (
                  <Select
                    value={state.value ? String(state.value) : ""}
                    onValueChange={(v) => handleChange(v ? parseInt(v) : undefined)}>
                    <SelectTrigger disabled={isLoading || !ingredientId}>
                      <SelectValue placeholder="Any">
                        {state.value
                          ? productsForThisIngredient.find((p) => p.Id === state.value)?.Name ||
                            "Any"
                          : "Any"}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Any</SelectItem>
                      {productsForThisIngredient.map((product) => (
                        <SelectItem key={product.Id} value={String(product.Id)}>
                          {product.Name} {product.Size && `(${product.Size})`}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </form.Field>
            </div>

            {/* Reorder Buttons */}
            <div className="flex gap-1">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={onMoveUp}
                disabled={index === 0 || isLoading}
                title="Move up">
                <ChevronUp size={16} />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={onMoveDown}
                disabled={index === totalIngredients - 1 || isLoading}
                title="Move down">
                <ChevronDown size={16} />
              </Button>
            </div>

            {/* Remove Button */}
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={onRemove}
              disabled={isLoading}
              title="Remove">
              <Trash2 size={16} />
            </Button>
          </div>
        );
      }}
    </form.Field>
  );
}

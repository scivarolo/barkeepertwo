"use client";

import { useState } from "react";
import { useIngredients } from "@/data/Ingredient";
import { useBarIngredients, useAddBarIngredient } from "@/data/Bar";
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
import { Plus } from "lucide-react";

export default function AddIngredientDialog() {
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState("");
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const allIngredientsQuery = useIngredients();
  const barIngredientsQuery = useBarIngredients();
  const addIngredientMutation = useAddBarIngredient(() => {
    setOpen(false);
    setFilter("");
    setSelectedId(null);
  });

  // Compute available ingredients (not yet in bar)
  const stockedIds = new Set(
    (barIngredientsQuery.data || []).map((ui) => ui.IngredientId)
  );
  const availableIngredients = (allIngredientsQuery.data || []).filter(
    (ing) => !stockedIds.has(ing.Id)
  );

  // Filter by name
  const filtered = availableIngredients.filter((ing) =>
    ing.Name.toLowerCase().includes(filter.toLowerCase())
  );

  const handleAdd = () => {
    if (selectedId !== null) {
      addIngredientMutation.mutate(selectedId);
    }
  };

  const isLoading =
    allIngredientsQuery.isLoading || barIngredientsQuery.isLoading;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button size="sm">
            <Plus className="mr-2" size={16} />
            Add Ingredient
          </Button>
        }
      />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Ingredient to Bar</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
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
            ) : filtered.length === 0 ? (
              <div className="text-sm text-foreground/50 py-4 text-center">
                {availableIngredients.length === 0
                  ? "All ingredients are already in your bar"
                  : "No ingredients match your search"}
              </div>
            ) : (
              filtered.map((ingredient) => (
                <button
                  key={ingredient.Id}
                  onClick={() => setSelectedId(ingredient.Id)}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                    selectedId === ingredient.Id
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
        </div>
        <DialogFooter>
          <Button
            onClick={handleAdd}
            disabled={selectedId === null || addIngredientMutation.isPending}>
            {addIngredientMutation.isPending ? "Adding..." : "Add"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

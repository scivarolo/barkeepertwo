import { useIngredients, useSaveIngredient } from "@/data/Ingredient";
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
  Card,
  CardHeader,
  CardContent,
} from "@/components/ui/card";
import { Pen, Plus } from "lucide-react";
import LoadingIndicator from "../utility/LoadingIndicator";
import { useForm } from "@tanstack/react-form";
import { Ingredient, IngredientFormValues } from "@/types/Models";
import { Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { Paginator } from "../table/Paginator";

function IngredientForm() {
  const [isOpen, setIsOpen] = useState(false);
  // const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const saveIngredient = useSaveIngredient(() => setIsOpen(false));
  const form = useForm({
    defaultValues: {
      Id: 0,
      Name: "",
      CreatedById: "",
      IngredientTypeId: undefined,
    } as IngredientFormValues,
    onSubmit: async ({ value }) => {
      saveIngredient.mutate(value);
    },
  });

  return (
    <>
      <Button size="sm" variant="default" onClick={() => setIsOpen(true)}>
        <Plus size={16} />
      </Button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New Ingredient</DialogTitle>
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
                  placeholder="Enter ingredient name"
                  required
                />
              )}
            </form.Field>
            <DialogFooter className="mt-6">
              <Button
                variant="outline"
                onClick={() => setIsOpen(false)}>
                Close
              </Button>
              <Button
                variant="default"
                type="submit"
                disabled={saveIngredient.isPending}>
                Save
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default function IngredientManager() {
  const ingredients = useIngredients();
  const columnHelper = useMemo(() => createColumnHelper<Ingredient>(), []);
  const columns = useMemo(
    () =>
      [
        columnHelper.accessor("Name", {
          cell: ({ row }) => (
            <div
              key={row.original.Id}
              className="flex items-center justify-between border-b-1 p-3 px-6">
              <Link
                to="/ingredients/$ingredientId"
                params={{ ingredientId: row.original.Id.toString() }}>
                <div>{row.original.Name}</div>
              </Link>
              <div>
                <Button variant="ghost">
                  <Pen size="16" />
                </Button>
              </div>
            </div>
          ),
        }),
      ] as ColumnDef<Ingredient>[],
    [columnHelper],
  );

  return (
    <Card>
      <CardHeader className="flex content-between">
        <div className="mr-auto">
          <LoadingIndicator isLoading={ingredients.isRefetching} />
          <h1 className="font-display text-xl font-semibold">Ingredients</h1>
        </div>
        <IngredientForm />
      </CardHeader>
      <CardContent className="p-0">
        <hr />
        <LoadingIndicator isLoading={ingredients.isLoading} />
        <Paginator<Ingredient>
          data={ingredients.data}
          columns={columns}
          initialPageSize={10}
          pageSizeOptions={[10, 20, 30, 40, 50]}
        />
      </CardContent>
    </Card>
  );
}

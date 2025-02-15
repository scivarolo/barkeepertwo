import { useIngredients, useSaveIngredient } from "@/data/Ingredient";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Form,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Input,
} from "@heroui/react";
import { Pen, Plus } from "lucide-react";
import LoadingIndicator from "../utility/LoadingIndicator";
import { formOptions, useForm } from "@tanstack/react-form";
import { IngredientFormValues } from "@/types/Models";
import { Link } from "@tanstack/react-router";

function IngredientForm() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const saveIngredient = useSaveIngredient(onClose);
  const formOpts = formOptions<IngredientFormValues>({
    defaultValues: {
      Id: 0,
      Name: "",
      CreatedById: "",
      IngredientTypeId: undefined,
    },
    onSubmit: async ({ value }) => {
      saveIngredient.mutate(value);
    },
  });
  const form = useForm(formOpts);

  return (
    <>
      <Button
        size="sm"
        color="primary"
        variant="flat"
        onPress={onOpen}
        isIconOnly>
        <Plus size={16} />
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                form.handleSubmit();
              }}>
              <ModalHeader className="flex flex-col gap-1">
                New Ingredient{" "}
              </ModalHeader>
              <ModalBody>
                <form.Field
                  name="Name"
                  validators={{
                    onSubmit: ({ value }) =>
                      !value ? "Name is required" : undefined,
                  }}>
                  {({ state, handleChange, handleBlur }) => (
                    <Input
                      isRequired
                      type="text"
                      defaultValue={state.value}
                      onChange={(e) => handleChange(e.target.value)}
                      onBlur={handleBlur}
                      placeholder="Enter ingredient name"
                    />
                  )}
                </form.Field>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  type="submit"
                  isLoading={saveIngredient.isPending}>
                  Save
                </Button>
              </ModalFooter>
            </Form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default function IngredientManager() {
  const ingredients = useIngredients();
  return (
    <Card>
      <CardHeader className="flex justify-between">
        <div>
          <LoadingIndicator isLoading={ingredients.isRefetching} />
          <h1 className="font-semibold">Ingredients</h1>
        </div>
        <IngredientForm />
      </CardHeader>
      <Divider />
      <CardBody className="p-0">
        <LoadingIndicator isLoading={ingredients.isLoading} />
        <ul>
          {ingredients.data?.map((ingredient) => (
            <li
              key={ingredient.Id}
              className="flex items-center justify-between border-b-1 p-3">
              <Link
                to="/ingredients/$ingredientId"
                params={{ ingredientId: ingredient.Id.toString() }}>
                <div>{ingredient.Name}</div>
              </Link>
              <div>
                <Button size="sm" variant="flat" isIconOnly>
                  <Pen size="16" />
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </CardBody>
    </Card>
  );
}

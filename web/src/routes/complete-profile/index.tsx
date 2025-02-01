import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Martini, Loader2 } from "lucide-react";

import { useAuth0 } from "@auth0/auth0-react";
import { useUpdateUser } from "@/data/User";

import { z } from "zod";
import { useForm } from "@tanstack/react-form";
import { User } from "@/types/Models";
import {
  Card,
  CardHeader,
  Input,
  CardFooter,
  Tooltip,
  Button,
  CardBody,
} from "@heroui/react";

export const Route = createFileRoute("/complete-profile/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <CompleteUserProfile />;
}

const formSchema = z
  .object({
    DisplayName: z.string().min(2, "Name must be at least 2 characters"),
    Id: z.string(),
  })
  .required({ DisplayName: true, Id: true });

function CompleteUserProfile() {
  const { logout, user: authUser } = useAuth0();
  const navigate = useNavigate();
  const updateUser = useUpdateUser();

  const form = useForm<Pick<User, "Id" | "DisplayName">>({
    defaultValues: {
      Id: authUser?.sub ?? "",
      DisplayName: "",
    },
    validators: {
      onChange: formSchema,
    },
    onSubmit: async ({ value }) =>
      updateUser.mutate(value, { onSuccess: () => navigate({ to: "/" }) }),
  });

  return (
    <div className="flex items-center justify-center p-10">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}>
        <Card className="w-full max-w-sm shadow-gray-500 dark:shadow-none">
          <CardHeader className="flex items-center text-xl font-semibold">
            <Martini className="mr-2 inline-block" size={32} /> <p>Welcome!</p>
          </CardHeader>
          <CardBody>
            <p className="mb-4">
              Before you jump in to discover your next favorite cocktail, what
              would you like to be called?
            </p>
            <form.Field name="DisplayName">
              {(field) => (
                <>
                  <Input
                    placeholder="Choose a name"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {field.state.meta.isTouched
                    ? field.state.meta.errors?.map((error) => (
                        <p
                          className="text-destructive mt-2 text-sm font-medium"
                          key={error?.toString()}>
                          {error}
                        </p>
                      ))
                    : null}
                  {updateUser.isError && (
                    <p className="text-destructive text-sm font-medium">
                      Username already exists
                    </p>
                  )}
                </>
              )}
            </form.Field>
          </CardBody>
          <form.Subscribe selector={(state) => [state.canSubmit]}>
            {([canSubmit]) => (
              <CardFooter className="flex flex-row-reverse">
                <Tooltip
                  content={
                    !canSubmit ? "A name is required to continue" : undefined
                  }
                  color="danger"
                  isDisabled={canSubmit}>
                  <span>
                    <Button
                      isDisabled={!canSubmit}
                      type="submit"
                      color="primary">
                      {updateUser.isPending ? (
                        <Loader2 className="animate-spin" />
                      ) : null}{" "}
                      Save
                    </Button>
                  </span>
                </Tooltip>
                <Button
                  variant="ghost"
                  color="danger"
                  onPress={() => logout()}
                  className="mr-auto">
                  Log Out
                </Button>
              </CardFooter>
            )}
          </form.Subscribe>
        </Card>
      </form>
    </div>
  );
}

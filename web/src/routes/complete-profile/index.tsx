import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Martini, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth0 } from "@auth0/auth0-react";
import { Input } from "@/components/ui/input";
import { useUpdateUser } from "@/data/User";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { z } from "zod";
import { useForm } from "@tanstack/react-form";
import { User } from "@/types/Models";

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
      Id: authUser?.sub,
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
          <CardHeader>
            <CardTitle className="text-2xl">
              <span className="flex align-baseline">
                <Martini className="mr-2 inline-block" size={32} /> Welcome!
              </span>
            </CardTitle>
            <CardDescription>
              Before you jump in to discover your next favorite cocktail, what
              would you like to be called?
            </CardDescription>
          </CardHeader>
          <CardContent>
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
                          className="mt-2 text-sm font-medium text-destructive"
                          key={error.toString()}>
                          {error}
                        </p>
                      ))
                    : null}
                  {updateUser.isError && (
                    <p className="text-sm font-medium text-destructive">
                      Username already exists
                    </p>
                  )}
                </>
              )}
            </form.Field>
          </CardContent>
          <CardFooter className="flex flex-row-reverse">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild disabled={!form.state.isFieldsValid}>
                  <span>
                    <Button disabled={!form.state.isFieldsValid} type="submit">
                      {updateUser.isPending ? (
                        <Loader2 className="animate-spin" />
                      ) : null}{" "}
                      Save
                    </Button>
                  </span>
                </TooltipTrigger>
                <TooltipContent>
                  {!form.state.isFieldsValid
                    ? "A name is required to continue"
                    : undefined}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <Button
              variant="destructive"
              onClick={() => logout()}
              className="mr-auto">
              Log Out
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}

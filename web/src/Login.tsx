import { useAuth0 } from "@auth0/auth0-react";
import { Button, Card, CardFooter, CardHeader } from "@heroui/react";

import { LoaderCircle, Martini } from "lucide-react";

export default function Login() {
  const { loginWithRedirect, isLoading } = useAuth0();
  return (
    <div className="flex h-screen items-center justify-center bg-linear-to-br from-blue-700 to-blue-800 p-10 dark:from-zinc-800 dark:to-zinc-900">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <Martini className="mr-2 inline-block" size={32} />
          <div className="flex flex-col">
            <p className="text-md">Barkeeper</p>
            <p className="text-small">
              Discover your next favorite cocktail using the ingredients you
              already have.
            </p>
          </div>
        </CardHeader>
        <CardFooter>
          <Button onPress={() => loginWithRedirect()} color="primary">
            {isLoading ? (
              <>
                <LoaderCircle className="mr-2 animate-spin" /> Logging in...
              </>
            ) : (
              "Log In / Register"
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

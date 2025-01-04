import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "./components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import { LoaderCircle, Martini } from "lucide-react";

export default function Login() {
  const { loginWithRedirect, isLoading } = useAuth0();
  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-br from-blue-500 to-blue-800 p-10 dark:from-zinc-900 dark:to-zinc-900">
      <Card className="w-full max-w-sm shadow-gray-500 dark:shadow-none">
        <CardHeader>
          <CardTitle className="text-2xl">
            <span className="flex align-baseline">
              <Martini className="mr-2 inline-block" size={32} /> Barkeeper
            </span>
          </CardTitle>
          <CardDescription>
            Discover your next favorite cocktail using the ingredients you
            already have.
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button onClick={() => loginWithRedirect()}>
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

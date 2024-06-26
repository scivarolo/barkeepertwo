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
    <div className="flex justify-center items-center p-10 h-screen bg-gradient-to-br from-blue-500 to-blue-800 dark:from-slate-900 dark:to-slate-900">
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
                <LoaderCircle className="animate-spin mr-2" /> Logging in...
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

import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { LoaderCircle, Martini } from "lucide-react";

export default function Login() {
  const { loginWithRedirect, isLoading } = useAuth0();
  return (
    // <div className="flex h-screen items-center justify-center bg-linear-to-br from-blue-700 to-blue-800 p-10 dark:from-zinc-800 dark:to-zinc-900">
    <div className="from-primary to-secondary flex h-screen items-center justify-center bg-linear-to-br p-10">
      <Card className="w-full max-w-sm">
        <CardHeader className="flex items-center gap-4">
          <Martini className="text-primary" size={64} />
          {/* <Martini className="mr-2 inline-block" size={32} /> */}
          <div className="flex flex-col">
            <h1 className="font-display from-primary to-secondary bg-gradient-to-r bg-clip-text text-2xl font-bold text-transparent">
              Barkeeper
            </h1>
            <p className="text-small font-sans italic">
              Discover your next favorite cocktail using the ingredients you
              already have.
            </p>
          </div>
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

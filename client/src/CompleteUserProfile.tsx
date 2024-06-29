import { Martini, Loader2 } from "lucide-react";
import { Button } from "./components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import { Input } from "./components/ui/input";
import { useUpdateUser } from "./data/User";
import { useNavigate } from "react-router-dom";

export default function CompleteUserProfile() {
  const { logout, user: authUser } = useAuth0();
  const [displayName, setDisplayName] = useState("");
  const navigate = useNavigate();
  const [updateUser, updatedUser] = useUpdateUser();

  return (
    <div className="flex justify-center items-center p-10 h-screen bg-gradient-to-br from-blue-500 to-blue-800 dark:from-slate-900 dark:to-slate-900">
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
          <Input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </CardContent>
        <CardFooter>
          <Button
            onClick={() =>
              updateUser({
                variables: { user: { displayName, id: authUser?.sub } },
                onCompleted: () => {
                  navigate("/");
                },
              })
            }
          >
            {updatedUser.loading && <Loader2 className="animate-spin" />} Save
          </Button>
          <Button onClick={() => logout()}>"Log Out"</Button>
        </CardFooter>
      </Card>
    </div>
  );
}

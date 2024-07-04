import { useAuth0 } from "@auth0/auth0-react";
import { useUser } from "./data/User";

export default function Dashboard() {
  const { user: authUser } = useAuth0();
  const user = useUser(authUser?.sub);
  return (
    <>
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        Hey {user.data?.getUser?.displayName}
      </div>
    </>
  );
}

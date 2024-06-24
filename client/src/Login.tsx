import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "./components/ui/button";

export default function Login() {
  const { loginWithRedirect, logout } = useAuth0();
  return (
    <div>
      <Button onClick={() => loginWithRedirect()}>Log In</Button>
      <Button
        onClick={() =>
          logout({ logoutParams: { returnTo: window.location.origin } })
        }
      >
        Log Out
      </Button>
    </div>
  );
}

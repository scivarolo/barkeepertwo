import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Outlet } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import ApolloClientProvider from "./data/ApolloClientProvider";

function AuthenticatedRoot() {
  const [count, setCount] = useState(0);
  const { logout } = useAuth0();

  return (
    <ApolloClientProvider>
      <div>
        <Button
          onClick={() =>
            logout({ logoutParams: { returnTo: window.location.origin } })
          }
        >
          Log Out
        </Button>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <Outlet />
    </ApolloClientProvider>
  );
}

export default AuthenticatedRoot;

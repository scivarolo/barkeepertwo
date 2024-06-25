import AuthenticatedRoot from "@/AuthenticatedRoot";
import Dashboard from "@/Dashboard";
import { createBrowserRouter } from "react-router-dom";

const authenticatedRouter = createBrowserRouter([
  {
    path: "/",
    element: <AuthenticatedRoot />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "cocktails", element: <div>Cocktails</div> },
      { path: "bar", element: <div>Bar</div> },
      { path: "shopping-list", element: <div>Shopping List</div> },
    ],
  },
]);

export default authenticatedRouter;

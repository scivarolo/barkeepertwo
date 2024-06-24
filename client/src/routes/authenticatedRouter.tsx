import AuthenticatedRoot from "@/AuthenticatedRoot";
import Landing from "@/Landing";
import { createBrowserRouter } from "react-router-dom";

const authenticatedRouter = createBrowserRouter([
  {
    path: "/",
    element: <AuthenticatedRoot />,
    children: [
      { index: true, element: <Landing /> },
      { path: "test", element: <div>test</div> },
    ],
  },
]);

export default authenticatedRouter;

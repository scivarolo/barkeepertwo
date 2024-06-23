import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Landing from "./Landing.tsx";
import Login from "./Login.tsx";

const authenticatedRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Landing /> },
      { path: "test", element: <div>test</div> },
    ],
  },
]);
const authenticated = true;
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {authenticated ? (
      <RouterProvider router={authenticatedRouter} />
    ) : (
      <Login />
    )}
  </React.StrictMode>
);

import { createBrowserRouter, RouterProvider } from "react-router";

import App from "../App";
import EmptyChat from "../components/EmptyChat";
import Chat from "../components/Chat";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <EmptyChat />,
      },
      {
        path: "/:id",
        element: <Chat />,
      },
    ],
  },
]);

const Routes = () => {
  return <RouterProvider router={router} />;
};

export default Routes;

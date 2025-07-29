import { useMemo } from "react";
import {
  type ActionFunction,
  type LoaderFunction,
  RouterProvider,
  createBrowserRouter
} from "react-router";

import { type QueryClient, useQueryClient } from "@tanstack/react-query";

import { ProtectedRoute } from "./helpers/protected-route";
import Root from "./routes/root";

type RouteModule = {
  clientLoader?: (queryClient: QueryClient) => LoaderFunction;
  clientAction?: (queryClient: QueryClient) => ActionFunction;
  default?: React.ComponentType;
  [key: string]: unknown;
};

// Route module that dynamically import and convert into a React Router route configuration
const convert = (queryClient: QueryClient) => (m: RouteModule) => {
  const { clientLoader, clientAction, default: Component, ...rest } = m;
  return {
    ...rest,
    loader: clientLoader?.(queryClient),
    action: clientAction?.(queryClient),
    Component: Component || (() => <div>Loading!!!...</div>)
  };
};

const createAppRouter = (queryClient: QueryClient) =>
  createBrowserRouter([
    {
      // unprotected route
      path: "/auth",
      children: [
        {
          path: "login",
          lazy: () => import("./routes/auth/login").then(convert(queryClient))
        },
        {
          path: "register",
          lazy: () =>
            import("./routes/auth/register").then(convert(queryClient))
        }
      ]
    },
    {
      // protected route
      path: "/",
      element: (
        <ProtectedRoute>
          <Root />
        </ProtectedRoute>
      )
      // children: []
    }
  ]);

export const AppRouter = () => {
  const queryClient = useQueryClient();
  const router = useMemo(() => createAppRouter(queryClient), [queryClient]);
  return <RouterProvider router={router} />;
};

import { useMemo } from "react";

import { paths } from "@client/config";
import { Guard } from "@client/helpers";

import { QueryClient, useQueryClient } from "@tanstack/react-query";
import { NuqsAdapter } from "nuqs/adapters/react-router/v7";
import {
  type ActionFunction,
  type LoaderFunction,
  RouterProvider,
  createBrowserRouter
} from "react-router";

import {
  default as AppRoot,
  ErrorBoundary as AppRootErrorBoundary
} from "./routes/root";

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
        }
      ]
    },
    {
      // protected route
      path: "/",
      element: (
        <Guard>
          <AppRoot />
        </Guard>
      ),
      ErrorBoundary: AppRootErrorBoundary,
      children: [
        {
          path: paths.root.paths,
          lazy: () => import("./routes/home/root").then(convert(queryClient))
        },
        {
          path: paths.posts.root.paths,
          lazy: () => import("./routes/posts/root").then(convert(queryClient))
        },
        {
          path: paths.posts.post.paths,
          lazy: () => import("./routes/posts/post").then(convert(queryClient))
        },
        {
          path: paths.posts.create.paths,
          lazy: () => import("./routes/posts/create").then(convert(queryClient))
        },
        {
          path: paths.users.root.paths,
          lazy: () => import("./routes/users/root").then(convert(queryClient))
        },
        {
          path: paths.users.user.paths,
          lazy: () => import("./routes/users/user").then(convert(queryClient))
        }
      ]
    }
  ]);

export const AppRouter = () => {
  const queryClient = useQueryClient();

  const router = useMemo(() => createAppRouter(queryClient), [queryClient]);
  return (
    <NuqsAdapter>
      <RouterProvider router={router} />
    </NuqsAdapter>
  );
};

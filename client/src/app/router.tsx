import { useMemo } from "react";
import { RouterProvider, createBrowserRouter } from "react-router";

import { Layout } from "./layout";
import { BooksRoot } from "./routes/books/root";
import { HomeRoot } from "./routes/home/root";

const createAppRouter = () =>
  createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <HomeRoot />
        },
        {
          path: "books",
          element: <BooksRoot />
        }
      ]
    }
  ]);

export const AppRouter = () => {
  const router = useMemo(() => createAppRouter(), []);
  return <RouterProvider router={router} />;
};

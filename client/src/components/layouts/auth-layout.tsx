import * as React from "react";
import { useEffect } from "react";

import { paths } from "@client/config";
import { useUser } from "@client/lib";

import { Link, useNavigate, useSearchParams } from "react-router";

type LayoutProps = {
  children: React.ReactNode;
  title: string;
};

export const AuthLayout = ({ children, title }: LayoutProps) => {
  const user = useUser();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo");

  const navigate = useNavigate();

  useEffect(() => {
    if (user.data) {
      navigate(redirectTo ? redirectTo : paths.root.getHref(), {
        replace: true
      });
    }
  }, [user.data, navigate, redirectTo]);

  return (
    <>
      <div className="flex min-h-screen flex-col justify-center bg-gray-50 py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex justify-center">
            <Link
              className="flex items-center text-white"
              to={paths.root.getHref()}
            >
              Logo
            </Link>
          </div>

          <h2 className="mt-3 text-center text-3xl font-extrabold text-gray-900">
            {title}
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="px-4 py-8 sm:rounded-lg sm:px-10">{children}</div>
        </div>
      </div>
    </>
  );
};

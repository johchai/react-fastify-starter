import { paths } from "@client/config";
import { useUser } from "@client/lib";

import { Navigate, useLocation } from "react-router";

export const Guard = ({ children }: { children: React.ReactNode }) => {
  const user = useUser();
  const location = useLocation();

  if (!user.data) {
    return (
      <Navigate to={paths.auth.login.getHref(location.pathname)} replace />
    );
  }

  return children;
};

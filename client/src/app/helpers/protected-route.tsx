import { useEffect } from "react";
import { Navigate } from "react-router";

import { useAuthStore } from "@repo/hooks";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const user = useAuthStore((s) => s.user);
  const loading = useAuthStore((s) => s.loading);
  const fetchUser = useAuthStore((s) => s.fetchUser);

  useEffect(() => {
    if (loading) fetchUser();
  }, [fetchUser, loading]);

  if (loading) return <div>Loading...</div>;

  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  // If session exists, render children
  return children;
};

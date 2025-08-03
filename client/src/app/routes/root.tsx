import { DashboardLayout } from "@client/components";

import { Outlet } from "react-router";

export const ErrorBoundary = () => {
  return <div>ErrorBoundary - Something went wrong!</div>;
};

const AppRoot = () => {
  return (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  );
};

export default AppRoot;

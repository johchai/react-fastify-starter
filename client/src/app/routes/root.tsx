import { Outlet } from "react-router";

import { AppLayout } from "@repo/components";

const Root = () => {
  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  );
};

export default Root;

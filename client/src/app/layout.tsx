import { Outlet } from "react-router";

import { Footer, Header } from "@repo/components";

export const Layout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

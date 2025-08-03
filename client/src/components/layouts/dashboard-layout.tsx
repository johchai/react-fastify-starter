import { paths } from "@client/config";
import { useLogout } from "@client/lib";

import { useNavigate } from "react-router";

export const DashboardLayout = ({
  children
}: {
  children: React.ReactNode;
}) => {
  const navigate = useNavigate();
  const logout = useLogout({
    onSuccess: () => navigate(paths.auth.login.getHref(location.pathname))
  });
  return (
    <section>
      <nav>
        <div>Header</div>
        <button className="bg-zinc-200 p-1.5" onClick={() => logout.mutate({})}>
          Log Out
        </button>
      </nav>
      <main>{children}</main>
      <footer>Footer</footer>
    </section>
  );
};

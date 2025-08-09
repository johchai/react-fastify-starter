import { Button } from "@client/components";
import { paths } from "@client/config";
import { useLogout } from "@client/lib";

import { Link, useNavigate } from "react-router";

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
      <nav className="flex items-center justify-between bg-zinc-100 p-4">
        <Link to="/">Logo</Link>
        <ul className="flex flex-row items-center space-x-4">
          <li className="underline-offset-4 hover:underline">
            <Link to="/posts">Posts</Link>
          </li>
          <li className="underline-offset-4 hover:underline">
            <Link to="/users">Users</Link>
          </li>
        </ul>
        <Button variant="destructive" onClick={() => logout.mutate({})}>
          Log Out
        </Button>
      </nav>
      <main className="p-4">{children}</main>
      <footer className="bg-zinc-100 p-4">Footer</footer>
    </section>
  );
};

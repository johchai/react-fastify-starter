import { useGetUsers } from "@client/features";

import { Link } from "react-router";

const UsersRoute = () => {
  const usersQuery = useGetUsers();

  if (usersQuery.isLoading || usersQuery.isFetching) {
    return <div>Loading users...</div>;
  }

  return (
    <section className="space-y-4">
      <h1 className="font-medium">Users</h1>
      {usersQuery.isError && (
        <div>Error loading users: {usersQuery.error.message}</div>
      )}
      {usersQuery.data && (
        <ul className="">
          {usersQuery.data.data.users.map((user) => (
            <li key={user.id} className="mb-2 border hover:bg-zinc-200">
              <Link to={`/users/${user.id}`} className="block p-4">
                <p>{user.email}</p>
                <p>{user.role}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default UsersRoute;

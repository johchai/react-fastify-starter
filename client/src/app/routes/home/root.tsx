import { useUser } from "@client/lib";

const HomeRoute = () => {
  const userQuery = useUser();
  const user = userQuery.data;

  if (userQuery.isLoading || userQuery.isFetching) {
    return <div>Loading user...</div>;
  }

  return (
    <section className="space-y-4">
      <h1 className="font-semibold">Welcome to react-fastify-starter</h1>
      <ul>
        <li className="font-medium">
          Hello, <span>{user?.name}</span>
        </li>
        <li className="font-medium">
          Email: <span>{user?.email}</span>
        </li>
        <li className="font-medium">
          Role: <span>{user?.role}</span>
        </li>
      </ul>
    </section>
  );
};

export default HomeRoute;

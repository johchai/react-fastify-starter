import { useUser } from "@client/lib";

const HomeRoute = () => {
  const userQuery = useUser();
  const user = userQuery.data;

  if (userQuery.isLoading || userQuery.isFetching) {
    return <div>Loading user...</div>;
  }

  return (
    <section className="space-y-4">
      <h1 className="text-3xl font-semibold">
        Welcome to the react-fastify-starter template
      </h1>
      <ul>
        <li className="font-medium">
          Hello, <span className="font-normal">{user?.name}</span>
        </li>
        <li className="font-medium">
          Email: <span className="font-normal">{user?.email}</span>
        </li>
        <li className="font-medium">
          Role: <span className="font-normal">{user?.role}</span>
        </li>
      </ul>
    </section>
  );
};

export default HomeRoute;

import { ViewUsers } from "@client/features";

const UsersRoute = () => {
  return (
    <section className="space-y-4">
      <div className="flex flex-row place-content-between">
        <h1 className="text-3xl font-medium">Users</h1>
      </div>
      <ViewUsers />
    </section>
  );
};

export default UsersRoute;

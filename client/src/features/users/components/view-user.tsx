import { UpdateUser, useGetUser } from "@client/features";

export const ViewUser = ({ userID }: { userID: string }) => {
  const userQuery = useGetUser({
    path: { id: userID }
  });

  if (userQuery.isLoading || userQuery.isFetching) {
    return <div>Loading users...</div>;
  }

  if (!userQuery.data?.data.user) return <div>No user found</div>;

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-medium">{userQuery.data.data.user.name}</h1>
      <div className="bg-zinc-200 p-4">
        {userQuery.data && JSON.stringify(userQuery.data.data.user, null, 3)}
      </div>
      <UpdateUser userID={userID} />
    </div>
  );
};

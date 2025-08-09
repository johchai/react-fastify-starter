import { useGetUser } from "@client/features";

import { useParams } from "react-router";

const UserRoute = () => {
  const params = useParams();
  const userID = params.userID as string;

  const userQuery = useGetUser({
    path: { id: userID }
  });

  if (userQuery.isLoading || userQuery.isFetching) {
    return <div>Loading users...</div>;
  }

  if (!userID) {
    return <div>No user ID provided</div>;
  }

  if (!userQuery.data?.data.user) return <div>No user found</div>;

  return (
    <div>
      <h1>Users {userID}</h1>
      {userQuery.isError && (
        <div>Error loading users: {userQuery.error.message}</div>
      )}
      {userQuery.data && JSON.stringify(userQuery.data.data.user)}
    </div>
  );
};

export default UserRoute;

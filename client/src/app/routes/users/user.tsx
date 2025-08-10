import { ViewUser } from "@client/features";

import { useParams } from "react-router";

const UserRoute = () => {
  const params = useParams();
  const userID = params.userID as string;

  return <ViewUser userID={userID} />;
};

export default UserRoute;

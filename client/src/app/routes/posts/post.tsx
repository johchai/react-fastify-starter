import { ViewPost } from "@client/features";

import { useParams } from "react-router";

const PostRoute = () => {
  const params = useParams();
  const postID = params.postID as string;

  return <ViewPost postID={postID} />;
};

export default PostRoute;

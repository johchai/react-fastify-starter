import { useGetPost } from "@client/features";

import { useParams } from "react-router";

const PostRoute = () => {
  const params = useParams();
  const postID = params.postID as string;

  const postQuery = useGetPost({
    path: { id: postID }
  });

  if (postQuery.isLoading || postQuery.isFetching) {
    return <div>Loading posts...</div>;
  }

  if (!postID) {
    return <div>No post ID provided</div>;
  }

  if (!postQuery.data?.data.post) return <div>No post found</div>;

  return (
    <div>
      <h1>Posts {postID}</h1>
      {postQuery.isError && (
        <div>Error loading posts: {postQuery.error.message}</div>
      )}
      {postQuery.data && JSON.stringify(postQuery.data.data.post)}
    </div>
  );
};

export default PostRoute;

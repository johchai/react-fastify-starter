import { useGetPost } from "@client/features";

const PostRoute = () => {
  const postQuery = useGetPost({
    path: { id: "f62fe8b4-636a-44dd-945e-ea527394f10e" } // Replace with the actual post ID you want to fetch
  });

  if (postQuery.isLoading || postQuery.isFetching) {
    return <div>Loading posts...</div>;
  }

  return (
    <div>
      <h1>Posts</h1>
      {postQuery.isError && (
        <div>Error loading posts: {postQuery.error.message}</div>
      )}
      {postQuery.data && JSON.stringify(postQuery.data.data.post)}
    </div>
  );
};

export default PostRoute;

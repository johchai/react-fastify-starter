import { useGetPosts } from "@client/features";

const PostsRoute = () => {
  const postsQuery = useGetPosts();

  if (postsQuery.isLoading || postsQuery.isFetching) {
    return <div>Loading posts...</div>;
  }

  return (
    <div>
      <h1>Posts</h1>
      {postsQuery.isError && (
        <div>Error loading posts: {postsQuery.error.message}</div>
      )}
      {postsQuery.data && (
        <ul>
          {postsQuery.data.data.posts.map((post) => (
            <li key={post.id}>
              <h2>{post.title}</h2>
              <p>{post.content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PostsRoute;

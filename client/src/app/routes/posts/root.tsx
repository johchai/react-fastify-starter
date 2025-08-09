import { useGetPosts } from "@client/features";

import { Link } from "react-router";

const PostsRoute = () => {
  const postsQuery = useGetPosts();

  if (postsQuery.isLoading || postsQuery.isFetching) {
    return <div>Loading posts...</div>;
  }

  return (
    <section className="space-y-4">
      <h1 className="font-medium">Posts</h1>
      {postsQuery.isError && (
        <div>Error loading posts: {postsQuery.error.message}</div>
      )}
      {postsQuery.data && (
        <ul className="">
          {postsQuery.data.data.posts.map((post) => (
            <li key={post.id} className="mb-2 border hover:bg-zinc-200">
              <Link to={`/posts/${post.id}`} className="block p-4">
                <h2>{post.title}</h2>
                <p>{post.content}</p>
                <p>{post.created_at}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default PostsRoute;

import { useGetPosts } from "@client/features";

import { Link } from "react-router";

export const ViewPosts = () => {
  const postsQuery = useGetPosts();

  if (postsQuery.isLoading || postsQuery.isFetching) {
    return <div>Loading posts...</div>;
  }

  return (
    <section className="space-y-4">
      {postsQuery.isError && (
        <div>Error loading posts: {postsQuery.error.message}</div>
      )}
      {postsQuery.data?.data.posts.length ? (
        <ul className="space-y-2">
          {postsQuery.data.data.posts
            .sort(
              (a, b) =>
                new Date(b.created_at).getTime() -
                new Date(a.created_at).getTime()
            )
            .map((post) => (
              <li key={post.id} className="flex border">
                <Link
                  to={`/posts/${post.id}`}
                  className="size-full p-4 hover:bg-zinc-200"
                >
                  <p className="pb-2 text-xs">{post.created_at}</p>
                  <h2 className="font-medium">{post.title}</h2>
                  <p>{post.content}</p>
                </Link>
              </li>
            ))}
        </ul>
      ) : (
        <div>No posts available.</div>
      )}
    </section>
  );
};

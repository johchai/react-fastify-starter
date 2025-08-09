import { UpdatePost, useGetPost } from "@client/features";

export const ViewPost = ({ postID }: { postID: string }) => {
  const postQuery = useGetPost({
    path: { id: postID }
  });

  if (postQuery.isLoading || postQuery.isFetching) {
    return <div>Loading posts...</div>;
  }

  if (!postQuery.data?.data.post) return <div>No post found</div>;

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-medium">{postQuery.data.data.post.title}</h1>
      <div className="bg-zinc-200 p-4">
        {postQuery.data && JSON.stringify(postQuery.data.data.post, null, 3)}
      </div>
      <UpdatePost postID={postID} />
    </div>
  );
};

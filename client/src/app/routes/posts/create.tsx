// import { useGetPosts } from "@client/features";
import { CreatePost } from "@client/features";

const CreateRoute = () => {
  return (
    <section className="space-y-4">
      <div className="flex flex-row items-center">
        <h1 className="text-3xl font-medium">Create post</h1>
      </div>
      <CreatePost />
    </section>
  );
};

export default CreateRoute;

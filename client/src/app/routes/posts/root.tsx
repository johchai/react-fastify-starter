import { Button } from "@client/components";
import { paths } from "@client/config";
import { ViewPosts } from "@client/features";

import { Link } from "react-router";

const PostsRoute = () => {
  return (
    <section className="space-y-4">
      <div className="flex flex-row place-content-between">
        <h1 className="text-3xl font-medium">Posts</h1>
        <Button variant="secondary" asChild>
          <Link to={paths.posts.create.getHref()}>Create Post</Link>
        </Button>
      </div>
      <ViewPosts />
    </section>
  );
};

export default PostsRoute;

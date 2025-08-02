import { FastifyInstance } from "fastify";

import { createPost } from "./create-post";
import { getPost } from "./get-post";
import { listPost } from "./list-post";
import { removePost } from "./remove-post";
import { updatePost } from "./update-post";

export const postsRoute = (app: FastifyInstance) => {
  app.register(createPost);
  app.register(listPost);
  app.register(getPost);
  app.register(updatePost);
  app.register(removePost);
};

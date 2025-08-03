import { FastifyInstance } from "fastify";

import { createPost } from "./create";
import { removePost } from "./delete";
import { getPost } from "./get";
import { updatePost } from "./update";

export const postsRoute = (app: FastifyInstance) => {
  app.register(createPost);
  app.register(getPost);
  app.register(updatePost);
  app.register(removePost);
};

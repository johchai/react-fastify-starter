import { FastifyInstance } from "fastify";

import { createPost } from "./create-post";

export const postsRoute = (app: FastifyInstance) => {
  app.register(createPost);
};

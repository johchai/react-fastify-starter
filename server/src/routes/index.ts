import { FastifyInstance } from "fastify";

import { authRoute } from "./auth";
import { postsRoute } from "./posts";
import { usersRoute } from "./users";

export const routes = async (app: FastifyInstance) => {
  app.register(authRoute, { prefix: "auth" });
  app.register(usersRoute, { prefix: "users" });
  app.register(postsRoute, { prefix: "posts" });
};

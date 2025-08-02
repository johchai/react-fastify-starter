import { FastifyInstance } from "fastify";
import { usersRoute } from "./users";
import { postsRoute } from "./posts";
import { authRoute } from "./auth";

export default async (app: FastifyInstance) => {
  app.register(authRoute, { prefix: "auth" });
  app.register(usersRoute, { prefix: "users" });
  app.register(postsRoute, { prefix: "posts" });
};

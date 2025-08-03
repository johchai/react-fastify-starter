import { FastifyInstance } from "fastify";

import { removeUser } from "./delete";
import { getUser } from "./get";
import { updateUser } from "./update";

export const usersRoute = (app: FastifyInstance) => {
  app.register(getUser);
  app.register(removeUser);
  app.register(updateUser);
};

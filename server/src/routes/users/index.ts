import { FastifyInstance } from "fastify";

import { createUser } from "./create-user";
import { getUser } from "./get-user";
import { listUser } from "./list-user";
import { removeUser } from "./remove-user";
import { updateUser } from "./update-user";

export const usersRoute = (app: FastifyInstance) => {
  app.register(createUser);
  app.register(getUser);
  app.register(listUser);
  app.register(removeUser);
  app.register(updateUser);
};

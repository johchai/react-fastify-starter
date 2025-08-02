import { FastifyInstance } from "fastify";

import { login } from "./login";
import { logout } from "./logout";
import { refresh } from "./refresh";
import { register } from "./register";

export const authRoute = (app: FastifyInstance) => {
  app.register(login);
  app.register(logout);
  app.register(refresh);
  app.register(register);
};

import Fastify from "fastify";

import fCookie from "@fastify/cookie";
import fEnv from "@fastify/env";

import { envSchema } from "@server/lib";
import {
  authPlugin,
  databasePlugin,
  jwtPlugin,
  replyPlugin
} from "@server/plugins";
import { routes } from "@server/routes";

const app = Fastify({ logger: false });

const server = async () => {
  try {
    // register environment variables
    await app.register(fEnv, {
      confKey: "config",
      schema: envSchema,
      dotenv: true
    });

    // register plugins and middleware
    await app.register(replyPlugin);
    await app.register(fCookie);
    await app.register(jwtPlugin);
    await app.register(authPlugin);
    await app.register(databasePlugin);

    // routes entry point
    app.register(routes, { prefix: "/api" });

    // start server
    await app.listen({ port: Number(app.config.PORT) });
    console.log(`Server running at http://localhost:${app.config.PORT}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

server();

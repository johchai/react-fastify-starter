import Fastify from "fastify";

import fCookie from "@fastify/cookie";
import fEnv from "@fastify/env";

import { envSchema } from "@server/lib";
import {
  databasePlugin,
  guardPlugin,
  jwtPlugin,
  replyPlugin,
  swaggerPlugin
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
    await app.register(swaggerPlugin);
    await app.register(replyPlugin);
    await app.register(fCookie);
    await app.register(jwtPlugin);
    await app.register(guardPlugin);
    await app.register(databasePlugin);

    // routes entry point
    app.register(routes, { prefix: "/api" });

    // start server
    await app.listen({ port: Number(app.config.PORT) });
    console.log(
      `Server running at http://${app.config.DOMAIN}:${app.config.PORT}`
    );
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

server();

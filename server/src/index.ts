import Fastify from "fastify";

import fCookie from "@fastify/cookie";
import fCors from "@fastify/cors";
import fEnv from "@fastify/env";

import { envSchema } from "@server/lib";
import {
  databasePlugin,
  guardPlugin,
  jwtPlugin,
  prismaPlugin,
  replyPlugin,
  swaggerPlugin
} from "@server/plugins";
import { routes } from "@server/routes";

const app = Fastify({ logger: true });

const server = async () => {
  try {
    // register environment variables
    await app.register(fEnv, {
      confKey: "config",
      schema: envSchema,
      dotenv: true
    });

    // enable CORS only for development
    if (app.config.NODE_ENV === "development") {
      await app.register(fCors, {
        origin: "http://localhost:5173",
        credentials: true
      });
    }

    // register plugins and middleware
    await app.register(fCookie);
    await app.register(swaggerPlugin);
    await app.register(replyPlugin);
    await app.register(jwtPlugin);
    await app.register(guardPlugin);
    await app.register(databasePlugin);
    await app.register(prismaPlugin);

    // routes entry point
    app.register(routes, { prefix: "/api" });

    // start server
    await app.listen({
      port: Number(app.config.PORT),
      host: "0.0.0.0"
    });
    console.log(
      `Server running at http://${app.config.DOMAIN}:${app.config.PORT}`
    );
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

server();

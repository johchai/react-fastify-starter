import Fastify from "fastify";

import fCookie from "@fastify/cookie";
import fCors from "@fastify/cors";
import fEnv from "@fastify/env";

import { envSchema } from "@server/lib";
import {
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
      dotenv: {
        path: ".env.base"
      }
    });

    // enable CORS only for development
    await app.register(fCors, {
      origin: app.config.NODE_ENV === "development",
      credentials: true,
      methods: ["GET", "POST", "PATCH", "DELETE"]
    });

    // register plugins and middleware
    await app.register(fCookie);
    await app.register(swaggerPlugin);
    await app.register(replyPlugin);
    await app.register(jwtPlugin);
    await app.register(guardPlugin);
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

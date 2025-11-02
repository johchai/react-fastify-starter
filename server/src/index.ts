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
        path: ".env"
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
    await app.register(replyPlugin);
    await app.register(jwtPlugin);
    await app.register(guardPlugin);
    await app.register(prismaPlugin);

    if (app.config.NODE_ENV === "development") {
      await app.register(swaggerPlugin);
      app.log.info("Swagger documentation enabled at /docs");
    } else {
      app.log.info("Swagger documentation is disabled in production");
    }

    // default routes
    app.get("/", async (_req, reply) => {
      const baseMessage = "Welcome to the React Fastify Starter API.";
      const docsMessage =
        process.env.NODE_ENV !== "production"
          ? "Available endpoints in /docs."
          : "Docs are disabled in production.";

      reply.send({ message: `${baseMessage} ${docsMessage}` });
    });

    // routes entry point
    app.register(routes, { prefix: "/api" });

    // start server
    await app.listen({
      port: Number(app.config.SERVER_PORT),
      host: "0.0.0.0"
    });
    console.log(
      `Server running at http://${app.config.SERVER_DOMAIN}:${app.config.SERVER_PORT}`
    );
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

server();

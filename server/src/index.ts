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

// server entry point
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
    await app.register(swaggerPlugin);

    // register swagger docs in development only
    // if (app.config.NODE_ENV === "development") {
    //   await app.register(swaggerPlugin);
    //   app.log.info("Swagger documentation enabled at /docs");
    // } else {
    //   app.log.info("Swagger documentation is disabled in production");
    // }

    // root endpoint
    app.get("/", {
      schema: {
        tags: ["Root"],
        response: {
          200: {
            description: "Server is running",
            type: "object",
            properties: {
              message: { type: "string" }
            }
          }
        }
      },
      handler: async (_req, reply) => {
        const baseMessage = "Welcome to the React Fastify Starter API.";
        const docsMessage =
          process.env.NODE_ENV !== "production"
            ? "Available endpoints in /docs."
            : "Docs are disabled in production.";

        reply.send({ message: `${baseMessage} ${docsMessage}` });
      }
    });

    // routes entry point
    app.register(routes, { prefix: "/api" });

    // start server
    await app.listen({
      port: Number(app.config.SERVER_PORT),
      host: "0.0.0.0"
    });
    console.log(
      `Server running at http://${app.config.DOMAIN}:${app.config.SERVER_PORT}`
    );
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

server();

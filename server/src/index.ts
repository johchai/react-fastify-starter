import Fastify from "fastify";

import fCookie from "@fastify/cookie";
import fEnv from "@fastify/env";

import {
  authPlugin,
  databasePlugin,
  jwtPlugin,
  replyPlugin,
} from "@server/plugins";

import { envSchema } from "@server/lib";
import routes from "@server/routes";

const app = Fastify({ logger: false });

const server = async () => {
  try {
    // Register environment variables plugin
    await app.register(fEnv, {
      confKey: "config",
      schema: envSchema,
      dotenv: true,
    });

    // Register reply and request decorators for JWT
    await app.register(replyPlugin);

    // Register cookie plugin
    await app.register(fCookie);

    // Register JWT plugin
    await app.register(jwtPlugin);
    await app.register(authPlugin);

    // Register your DB
    await app.register(databasePlugin);

    // Register your routes
    app.register(routes, { prefix: "/api" });

    // Start server
    await app.listen({ port: Number(app.config.PORT) });
    console.log(`Server running at http://localhost:${app.config.PORT}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

server();

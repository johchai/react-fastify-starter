import Fastify from "fastify";

import userRoutes from "./routes/users";
import authRoutes from "./routes/auth";

import databasePlugin from "./plugins/database";

import fCookie from "@fastify/cookie";
import fEnv from "@fastify/env";

import { envSchema } from "./lib/env";
import JWTPlugin from "./plugins/jwt";
import replyPlugin from "./plugins/reply";

const app = Fastify({ logger: true });

const start = async () => {
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
    await app.register(JWTPlugin);

    // Register your DB
    await app.register(databasePlugin);

    // Register your routes
    await app.register(userRoutes, { prefix: "/users" });
    await app.register(authRoutes, { prefix: "/auth" });

    // Start server
    await app.listen({ port: Number(app.config.PORT) });
    console.log(`Server running at http://localhost:${app.config.PORT}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();

export default app;

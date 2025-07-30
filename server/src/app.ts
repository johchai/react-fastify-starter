import Fastify from "fastify";

import userRoutes from "./routes/users";
import databasePlugin from "./plugins/database";
import jwtAcessPlugin from "./plugins/jwt-access";
import jwtRefreshPlugin from "./plugins/jwt-refresh";

import fCookie from "@fastify/cookie";
import fEnv from "@fastify/env";

import { envSchema } from "./lib/env";

const app = Fastify({ logger: true });

const start = async () => {
  try {
    // Register .env first
    await app.register(fEnv, {
      confKey: "config",
      schema: envSchema,
      dotenv: true,
    });

    // Register cookie before JWT
    await app.register(fCookie);

    // JWTs (access + refresh)
    await app.register(jwtAcessPlugin);
    await app.register(jwtRefreshPlugin);

    // Register your DB
    await app.register(databasePlugin);

    // Register your routes
    await app.register(userRoutes, { prefix: "/users" });

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

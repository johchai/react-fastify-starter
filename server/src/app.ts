import Fastify from "fastify";
import userRoutes from "./routes/users.js";
import dbPlugin from "./plugins/db.js";
import fastifyJWT from "@fastify/jwt";
import fastifyCookie from "@fastify/cookie";
import fastifyEnv from "@fastify/env";

const envSchema = {
  type: "object",
  required: ["ACCESS_TOKEN_SECRET", "REFRESH_TOKEN_SECRET", "PORT"],
  properties: {
    ACCESS_TOKEN_SECRET: { type: "string" },
    REFRESH_TOKEN_SECRET: { type: "string" },
    PORT: { type: "string" },
  },
};

const app = Fastify({ logger: true });

const start = async () => {
  try {
    // Register .env first
    await app.register(fastifyEnv, {
      confKey: "config",
      schema: envSchema,
      dotenv: true,
    });

    // Register cookie before JWT
    await app.register(fastifyCookie);

    // Register JWT plugin with env secret
    await app.register(fastifyJWT, {
      // secret: app.config.ACCESS_TOKEN_SECRET,
      secret: app.config.ACCESS_TOKEN_SECRET,
    });

    // Register your DB
    await app.register(dbPlugin);

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

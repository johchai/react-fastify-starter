// server/src/plugins/jwt-access.ts

import fp from "fastify-plugin";
import fastifyJwt from "@fastify/jwt";
import "@fastify/jwt";

export default fp(async (fastify) => {
  fastify.register(fastifyJwt, {
    secret: fastify.config.ACCESS_TOKEN_SECRET,
    namespace: "accessJWT",
    sign: {
      expiresIn: "5m", // 5 minutes
    },
  });
});

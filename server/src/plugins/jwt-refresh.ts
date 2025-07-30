import fp from "fastify-plugin";
import fastifyJwt from "@fastify/jwt";

export default fp(async (fastify) => {
  fastify.register(fastifyJwt, {
    secret: fastify.config.REFRESH_TOKEN_SECRET,
    namespace: "refreshJWT",
    sign: {
      expiresIn: "7d", // 7 days
    },
  });
});

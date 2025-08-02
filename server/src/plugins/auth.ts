import { FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";

declare module "fastify" {
  interface FastifyInstance {
    verifyJWT: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
  }
}

export const authPlugin: FastifyPluginAsync = fp(async (server) => {
  server.decorate("verifyJWT", async (request, reply) => {
    try {
      await request.authJwtVerify();
    } catch (err) {
      reply.sendFail(401, "Unauthorized: Invalid or expired token");
    }
  });
});

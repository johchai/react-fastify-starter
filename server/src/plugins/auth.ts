import fp from "fastify-plugin";
import { FastifyPluginAsync } from "fastify";

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
      //   server.log.error(err);
      reply.sendFail(401, "Unauthorized: Invalid or expired token");
    }
  });
});

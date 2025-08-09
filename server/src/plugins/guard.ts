import { FastifyPluginAsync, FastifyReply, FastifyRequest } from "fastify";
import fp from "fastify-plugin";

import { Role } from "@server/types";

declare module "fastify" {
  interface FastifyInstance {
    verifyJWT: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
    requireRole: (
      roles: Role[]
    ) => (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
    requireAuthWithRole: (
      roles: Role[]
    ) => (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
  }
}

// This plugin provides middleware for JWT authentication and role-based access control.
export const guardPlugin: FastifyPluginAsync = fp(async (fastify) => {
  // auth middleware to verify JWT
  fastify.decorate("verifyJWT", async (request, reply) => {
    try {
      await request.accessJwtVerify();
      const decoded = await request.accessJwtDecode();
      await fastify.prisma.user.findUniqueOrThrow({
        where: { id: decoded.id, deleted_at: null },
        select: {
          id: true
        }
      });
    } catch (err) {
      reply.sendFail(401, "Unauthorized: Invalid or expired token");
    }
  });

  // role-based access control middleware
  fastify.decorate("requireRole", (roles: Role[]) => {
    return async function (request: FastifyRequest, reply: FastifyReply) {
      const decoded = await request.accessJwtDecode();

      const userRole = decoded?.role;
      if (!userRole || !roles.includes(userRole)) {
        return reply.sendFail(403, "Forbidden: Insufficient permissions");
      }
    };
  });

  // combine JWT auth + role check
  fastify.decorate("requireAuthWithRole", (roles: Role[]) => {
    return async function (request: FastifyRequest, reply: FastifyReply) {
      await fastify.verifyJWT(request, reply);
      await fastify.requireRole(roles)(request, reply);
    };
  });
});

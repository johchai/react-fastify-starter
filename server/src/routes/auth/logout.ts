import { FastifyInstance } from "fastify";

import { AuthSchemas } from "@server/schemas";

export const logout = async (fastify: FastifyInstance) => {
  fastify.post(
    "/logout",
    {
      schema: {
        tags: ["Auth"],
        response: {
          200: AuthSchemas.Logout.Response
        }
      }
    },
    async (request, reply) => {
      reply.setCookie("accessToken", "", {
        domain: fastify.config.DOMAIN,
        path: "/",
        // secure: request.protocol === "https", // send cookie over HTTPS only
        httpOnly: true,
        sameSite: true
      });

      reply.setCookie("refreshToken", "", {
        domain: fastify.config.DOMAIN,
        path: "/",
        // secure: request.protocol === "https", // send cookie over HTTPS only
        httpOnly: true,
        sameSite: true
      });

      return reply.sendSuccess("Log out successful");
    }
  );
};

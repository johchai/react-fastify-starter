import { FastifyInstance } from "fastify";

import { AuthSchemas } from "@server/schemas";

export const refresh = async (fastify: FastifyInstance) => {
  fastify.post(
    "/refresh",
    {
      schema: {
        tags: ["Auth"],
        response: {
          200: AuthSchemas.Refresh.Response,
          401: AuthSchemas.Refresh.Fail
        }
      }
    },
    async (request, reply) => {
      try {
        await request.refreshJwtVerify();
        const access_token = await reply.authJwtSign({});
        const refreshToken = await reply.refreshJwtSign({});

        if (!access_token || !refreshToken) {
          return reply.sendFail(401, "Unauthorized: Invalid or expired token");
        }

        // Set cookies for access and refresh tokens
        reply.setCookie("refreshToken", refreshToken, {
          domain: fastify.config.DOMAIN,
          path: "/",
          //   secure: request.protocol === "https", // send cookie over HTTPS only
          httpOnly: true,
          sameSite: true
        });
        reply.setCookie("accessToken", access_token, {
          domain: fastify.config.DOMAIN,
          path: "/",
          // secure: request.protocol === "https", // send cookie over HTTPS only
          httpOnly: true,
          sameSite: true
        });

        return reply.sendSuccess("Token refreshed successfully");
      } catch (err) {
        return reply.sendFail(401, "Unauthorized: Invalid or expired token");
      }
    }
  );
};

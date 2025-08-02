import { FastifyInstance } from "fastify";

export const refresh = async (fastify: FastifyInstance) => {
  fastify.post("/refresh", async (request, reply) => {
    try {
      await request.refreshJwtVerify();
      const access_token = await reply.authJwtSign({});
      const refreshToken = await reply.refreshJwtSign({});
      reply.setCookie("refreshToken", refreshToken, {
        //   domain: app.config.DOMAIN,
        // path: "/",
        //   secure: request.protocol === "https", // send cookie over HTTPS only
        httpOnly: true
        //   sameSite: true, // alternative CSRF protection,
      });
      reply.setCookie("accessToken", access_token, {
        // domain: app.config.DOMAIN,
        // path: "/",
        // secure: request.protocol === "https", // send cookie over HTTPS only
        httpOnly: true
        // sameSite: true, // alternative CSRF protection,
      });
      return reply.sendSuccess("Token refreshed successfully");
    } catch (err) {
      fastify.log.error(err);
      return reply.sendFail(401, "Unauthorized: Invalid or expired token");
    }
  });
};

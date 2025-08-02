import { FastifyInstance } from "fastify";

export const logout = async (fastify: FastifyInstance) => {
  fastify.post(
    "/logout",
    {
      schema: {
        tags: ["Auth"]
      }
    },
    async (request, reply) => {
      reply.setCookie("accessToken", "", {
        // domain: app.config.DOMAIN,
        path: "/",
        // secure: request.protocol === "https", // send cookie over HTTPS only
        httpOnly: true
        // sameSite: true, // alternative CSRF protection,
      });

      reply.setCookie("refreshToken", "", {
        // domain: app.config.DOMAIN,
        path: "/",
        // secure: request.protocol === "https", // send cookie over HTTPS only
        httpOnly: true
        // sameSite: true, // alternative CSRF protection,
      });

      return reply.sendSuccess("Log out successful");
    }
  );
};

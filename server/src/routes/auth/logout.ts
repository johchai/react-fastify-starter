import { FastifyInstance } from "fastify";

import { BaseSuccess } from "@server/lib";

import { Type } from "@sinclair/typebox";

const Schema = {
  Response: BaseSuccess(Type.Object({}))
};

export const logout = async (fastify: FastifyInstance) => {
  fastify.post(
    "/logout",
    {
      schema: {
        tags: ["Auth"],
        response: {
          200: Schema.Response
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

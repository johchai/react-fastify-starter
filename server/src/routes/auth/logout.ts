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
        //domain: fastify.config.DOMAIN,
        path: "/",
        sameSite: fastify.config.NODE_ENV === "production" ? "none" : "lax",
        secure: fastify.config.NODE_ENV === "production",
        httpOnly: true
      });

      reply.setCookie("refreshToken", "", {
        //domain: fastify.config.DOMAIN,
        path: "/",
        sameSite: fastify.config.NODE_ENV === "production" ? "none" : "lax",
        secure: fastify.config.NODE_ENV === "production",
        httpOnly: true
      });

      return reply.sendSuccess("Log out successful");
    }
  );
};

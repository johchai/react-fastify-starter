import { FastifyInstance } from "fastify";

import { BaseError, BaseFail, BaseSuccess } from "@server/lib";
import { PublicUser } from "@server/types";

import { Static, Type } from "@sinclair/typebox";

const Schema = {
  Params: Type.Object({
    id: Type.String()
  }),
  Response: BaseSuccess(Type.Object({ user: PublicUser })),
  Fail: BaseFail(false),
  Error: BaseError
};

export const removeUser = async (fastify: FastifyInstance) => {
  fastify.delete(
    "/:id",
    {
      preHandler: fastify.requireAuthWithRole(["admin"]),
      schema: {
        tags: ["Users"],
        params: Schema.Params,
        response: {
          200: Schema.Response,
          404: Schema.Fail,
          500: Schema.Error
        }
      }
    },
    async (request, reply) => {
      const { id } = request.params as Static<typeof Schema.Params>;

      try {
        const result = await fastify.prisma.user.update({
          where: {
            id: id,
            deleted_at: null
          },
          data: {
            deleted_at: new Date()
          }
        });

        return reply.sendSuccess<Static<typeof Schema.Response>["data"]>(
          "User removed successfully",
          {
            user: {
              id: result.id,
              name: result.name,
              email: result.email,
              role: result.role
            }
          }
        );
      } catch (err) {
        return reply.sendError(
          "Failed to remove user. Please try again later.",
          500
        );
      }
    }
  );
};

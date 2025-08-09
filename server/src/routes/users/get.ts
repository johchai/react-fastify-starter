import { FastifyInstance } from "fastify";

import { BaseError, BaseFail, BaseSuccess } from "@server/lib";
import { PublicUser } from "@server/types";

import { Static, Type } from "@sinclair/typebox";

const Schema = {
  GetByID: {
    Params: Type.Object({
      id: Type.String()
    }),
    Response: BaseSuccess(Type.Object({ user: PublicUser })),
    Fail: BaseFail(false),
    Error: BaseError
  },
  GetAll: {
    Response: BaseSuccess(
      Type.Object({
        users: Type.Array(PublicUser)
      })
    ),
    Fail: BaseFail(false),
    Error: BaseError
  }
};

export const getUser = async (fastify: FastifyInstance) => {
  fastify.get(
    "/:id",
    {
      preHandler: fastify.requireAuthWithRole(["admin"]),
      schema: {
        tags: ["Users"],
        params: Schema.GetByID.Params,
        response: {
          201: Schema.GetByID.Response,
          400: Schema.GetByID.Fail,
          404: Schema.GetByID.Fail,
          500: Schema.GetByID.Error
        }
      }
    },
    async (request, reply) => {
      const { id } = request.params as Static<typeof Schema.GetByID.Params>;

      try {
        const user = await fastify.prisma.user.findUniqueOrThrow({
          where: {
            id,
            deleted_at: null
          }
        });

        if (!user) return reply.sendFail(404, "User not found");

        reply.sendSuccess<Static<typeof Schema.GetByID.Response>["data"]>(
          "User retrieved successfully",
          {
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role
            }
          }
        );
      } catch (err) {
        return reply.sendError(
          "Failed to retrieve user. Please try again later.",
          500
        );
      }
    }
  );
  fastify.get(
    "/",
    {
      preHandler: fastify.requireAuthWithRole(["admin"]),
      schema: {
        tags: ["Users"],
        response: {
          200: Schema.GetAll.Response,
          400: Schema.GetByID.Fail,
          404: Schema.GetByID.Error
        }
      }
    },
    async (_request, reply) => {
      try {
        const users = await fastify.prisma.user.findMany({
          where: {
            deleted_at: null
          },
          select: {
            id: true,
            name: true,
            email: true,
            role: true
          }
        });

        return reply.sendSuccess<Static<typeof Schema.GetAll.Response>["data"]>(
          "Users retrieved successfully",
          {
            users: users.map((user) => ({
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role
            }))
          }
        );
      } catch (err) {
        return reply.sendError(
          "Failed to retrieve users. Please try again later.",
          500
        );
      }
    }
  );
};

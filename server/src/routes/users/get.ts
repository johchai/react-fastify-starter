import { FastifyInstance } from "fastify";

import { BaseError, BaseFail, BaseSuccess } from "@server/lib";
import { PublicUser } from "@server/types";

import { Static, Type } from "@sinclair/typebox";

const Schema = {
  GetByID: {
    Params: Type.Object({
      id: Type.Number()
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
        const user = await fastify.db.get(
          "SELECT * FROM users WHERE id = ? AND deleted_at IS NULL",
          [id]
        );

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
        const users = (await fastify.db.all(
          "SELECT id, name, email FROM users WHERE deleted_at IS NULL"
        )) as Static<typeof PublicUser>[];

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

import { FastifyInstance } from "fastify";

import { BaseError, BaseFail, BaseSuccess } from "@server/lib";
import { User } from "@server/types";

import { Static, Type } from "@sinclair/typebox";

const Schema = {
  GetAll: {
    Querystring: Type.Object({
      page: Type.Optional(Type.Integer({ minimum: 1 })),
      pageSize: Type.Optional(Type.Integer({ minimum: 1, maximum: 100 }))
    }),
    Response: BaseSuccess(
      Type.Object({
        users: Type.Array(User),
        meta: Type.Object({
          page: Type.Integer(),
          pageSize: Type.Integer(),
          totalItems: Type.Integer(),
          totalPages: Type.Integer()
        })
      })
    ),
    Fail: BaseFail(false),
    Error: BaseError
  },
  GetByID: {
    Params: Type.Object({
      id: Type.String()
    }),
    Response: BaseSuccess(Type.Object({ user: User })),
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
            id
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
              role: user.role,
              created_at: user.created_at.toISOString(),
              deleted_at: user.deleted_at ? user.deleted_at.toISOString() : null
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
        querystring: Schema.GetAll.Querystring,
        response: {
          200: Schema.GetAll.Response,
          400: Schema.GetByID.Fail,
          404: Schema.GetByID.Error
        }
      }
    },
    async (request, reply) => {
      const { page = 1, pageSize = 10 } = request.query as Static<
        typeof Schema.GetAll.Querystring
      >;

      try {
        const totalItems = await fastify.prisma.user.count();

        const skip = (page - 1) * pageSize;

        const users = await fastify.prisma.user.findMany({
          skip,
          take: pageSize,
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
            created_at: true,
            deleted_at: true
          },
          orderBy: {
            created_at: "desc"
          }
        });

        const totalPages = Math.ceil(totalItems / pageSize);

        return reply.sendSuccess<Static<typeof Schema.GetAll.Response>["data"]>(
          "Users retrieved successfully",
          {
            users: users.map((user) => ({
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role,
              created_at: user.created_at.toISOString(),
              deleted_at: user.deleted_at ? user.deleted_at.toISOString() : null
            })),
            meta: {
              page,
              pageSize,
              totalItems,
              totalPages
            }
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

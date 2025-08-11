import { FastifyInstance } from "fastify";

import { BaseError, BaseFail, BaseSuccess } from "@server/lib";
import { User } from "@server/types";

import { RoleEnum } from "@internal/types";
import { Static, Type } from "@sinclair/typebox";

const Schema = {
  Params: Type.Object({
    id: Type.String()
  }),
  Body: Type.Object({
    name: Type.String({ minLength: 1, maxLength: 100 }),
    email: Type.String({ format: "email" }),
    role: Type.Enum(RoleEnum),
    deleted_at: Type.Union([Type.String({ format: "date-time" }), Type.Null()])
  }),
  Response: BaseSuccess(Type.Object({ user: User })),
  Fail: BaseFail(false),
  Error: BaseError
};

export const updateUser = async (fastify: FastifyInstance) => {
  fastify.patch(
    "/:id",
    {
      preHandler: fastify.requireAuthWithRole(["admin"]),
      schema: {
        tags: ["Users"],
        body: Schema.Body,
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
      const { name, email, role, deleted_at } = request.body as Static<
        typeof Schema.Body
      >;

      try {
        const result = await fastify.prisma.user.update({
          where: {
            id: id
          },
          data: {
            name: name,
            email: email,
            role: role,
            deleted_at: deleted_at
          }
        });

        return reply.sendSuccess<Static<typeof Schema.Response>["data"]>(
          "User updated successfully",
          {
            user: {
              id: result.id,
              name: result.name,
              email: result.email,
              role: result.role,
              created_at: result.created_at.toISOString(),
              deleted_at: result.deleted_at
                ? result.deleted_at.toISOString()
                : null
            }
          }
        );
      } catch (err) {
        fastify.log.error(err);
        return reply.sendError(
          "Failed to update user. Please try again later.",
          500
        );
      }
    }
  );
};

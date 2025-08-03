import { FastifyInstance } from "fastify";

import { BaseError, BaseFail, BaseSuccess } from "@server/lib";
import { PublicUser } from "@server/types";

import { Static, Type } from "@sinclair/typebox";

const Schema = {
  Params: Type.Object({
    id: Type.Number()
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
        const result = await fastify.db.run(
          "UPDATE users SET deleted_at = CURRENT_TIMESTAMP WHERE id = ? AND deleted_at IS NULL",
          [id]
        );

        if (result.changes === 0) {
          reply.code(404).send({ error: "User not found or already deleted" });
          return;
        }

        // Fetch the updated user
        const updatedUser = (await fastify.db.get(
          "SELECT id, name, email, deleted_at FROM users WHERE id = ?",
          [id]
        )) as Static<typeof PublicUser>;

        return reply.sendSuccess<Static<typeof Schema.Response>["data"]>(
          "User removed successfully",
          {
            user: {
              id: updatedUser.id,
              name: updatedUser.name,
              email: updatedUser.email,
              role: updatedUser.role
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

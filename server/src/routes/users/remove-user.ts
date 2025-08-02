import { FastifyInstance } from "fastify";

import { User, UserSchemas } from "@server/schemas";

import { Static } from "@sinclair/typebox";

export const removeUser = async (fastify: FastifyInstance) => {
  fastify.delete(
    "/:id",
    {
      preHandler: fastify.requireAuthWithRole(["admin"]),
      schema: {
        tags: ["Users"],
        params: UserSchemas.RemoveUser.Params,
        response: {
          200: UserSchemas.RemoveUser.Response,
          404: UserSchemas.RemoveUser.Fail,
          500: UserSchemas.RemoveUser.Error
        }
      }
    },
    async (request, reply) => {
      const { id } = request.params as Static<
        typeof UserSchemas.RemoveUser.Params
      >;

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
        )) as Static<typeof User>;

        return reply.sendSuccess("User removed successfully", {
          user: {
            id: updatedUser.id,
            name: updatedUser.name,
            email: updatedUser.email
          }
        });
      } catch (err) {
        return reply.sendError(
          "Failed to remove user. Please try again later.",
          500
        );
      }
    }
  );
};

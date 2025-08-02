import { FastifyInstance } from "fastify";

import { UserSchemas } from "@server/schemas";

import { Static } from "@sinclair/typebox";

export const getUser = async (fastify: FastifyInstance) => {
  fastify.get(
    "/:id",
    {
      preHandler: fastify.requireAuthWithRole(["admin"]),
      schema: {
        tags: ["Users"],
        params: UserSchemas.GetByID.Params,
        response: {
          201: UserSchemas.GetByID.Response,
          400: UserSchemas.GetByID.Fail,
          404: UserSchemas.GetByID.Error
        }
      }
    },
    async (request, reply) => {
      const { id } = request.params as Static<
        typeof UserSchemas.GetByID.Params
      >;

      try {
        const user = await fastify.db.get(
          "SELECT * FROM users WHERE id = ? AND deleted_at IS NULL",
          [id]
        );

        if (!user) return reply.sendFail(404, "User not found");

        reply.sendSuccess("User retrieved successfully", {
          user: {
            id: user.id,
            name: user.name,
            email: user.email
          }
        });
      } catch (err) {
        return reply.sendError(
          "Failed to retrieve user. Please try again later.",
          500
        );
      }
    }
  );
};

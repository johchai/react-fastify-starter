import { FastifyInstance } from "fastify";

import { User, UserSchemas } from "@server/schemas";

import { Static } from "@sinclair/typebox";

export const listUser = async (fastify: FastifyInstance) => {
  fastify.get(
    "/",
    {
      preHandler: fastify.requireAuthWithRole(["admin"]),
      schema: {
        tags: ["Users"],
        response: {
          200: UserSchemas.GetAll.Response,
          400: UserSchemas.GetByID.Fail,
          404: UserSchemas.GetByID.Error
        }
      }
    },
    async (_request, reply) => {
      try {
        const users = (await fastify.db.all(
          "SELECT id, name, email FROM users WHERE deleted_at IS NULL"
        )) as Static<typeof User>[];

        return reply.sendSuccess("Users retrieved successfully", {
          users: users.map((user) => ({
            id: user.id,
            name: user.name,
            email: user.email
          }))
        });
      } catch (err) {
        return reply.sendError(
          "Failed to retrieve users. Please try again later.",
          500
        );
      }
    }
  );
};

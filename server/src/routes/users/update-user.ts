import { FastifyInstance } from "fastify";

import { UserSchemas } from "@server/schemas";

import { Static } from "@sinclair/typebox";
import bcrypt from "bcrypt";

export const updateUser = async (fastify: FastifyInstance) => {
  fastify.addHook("preHandler", async (request, reply) => {
    fastify.verifyJWT(request, reply);
  });

  fastify.patch(
    "/:id",
    {
      schema: {
        tags: ["Users"],
        body: UserSchemas.UpdateUser.Body,
        params: UserSchemas.UpdateUser.Params,
        response: {
          200: UserSchemas.UpdateUser.Response,
          404: UserSchemas.UpdateUser.Fail,
          500: UserSchemas.UpdateUser.Error
        }
      }
    },
    async (request, reply) => {
      const { id } = request.params as Static<
        typeof UserSchemas.UpdateUser.Params
      >;
      const { name, email, password } = request.body as Static<
        typeof UserSchemas.UpdateUser.Body
      >;

      try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await fastify.db.run(
          "UPDATE users SET name = ?, email = ?, hashed_password = ? WHERE id = ? AND deleted_at IS NULL",
          [name, email, hashedPassword, id]
        );

        if (result.changes === 0) {
          return reply.sendFail(404, "User not found or already deleted");
        }

        return reply.sendSuccess("User updated successfully", {
          user: {
            id,
            name,
            email
          }
        });
      } catch (err) {
        return reply.sendError(
          "Failed to update user. Please try again later.",
          500
        );
      }
    }
  );
};

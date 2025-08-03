import { FastifyInstance } from "fastify";

import { BaseError, BaseFail, BaseSuccess } from "@server/lib";
import { User } from "@server/types";

import { Static, Type } from "@sinclair/typebox";
import bcrypt from "bcrypt";

const Schema = {
  Params: Type.Object({
    id: Type.Number()
  }),
  Body: Type.Intersect([
    Type.Pick(User, ["name", "email"]),
    Type.Object({
      password: Type.String({ minLength: 8 })
    })
  ]),
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
      const { name, email, password } = request.body as Static<
        typeof Schema.Body
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

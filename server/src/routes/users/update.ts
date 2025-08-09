import { FastifyInstance } from "fastify";

import { BaseError, BaseFail, BaseSuccess } from "@server/lib";
import { PublicUser } from "@server/types";

import { Static, Type } from "@sinclair/typebox";
import bcrypt from "bcrypt";

const Schema = {
  Params: Type.Object({
    id: Type.String()
  }),
  Body: Type.Intersect([
    Type.Pick(PublicUser, ["name", "email"]),
    Type.Object({
      password: Type.String({ minLength: 8 })
    })
  ]),
  Response: BaseSuccess(Type.Object({ user: PublicUser })),
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

        const result = await fastify.prisma.user.update({
          where: {
            id: id,
            deleted_at: null
          },
          data: {
            name: name,
            email: email,
            hashed_password: hashedPassword
          }
        });

        return reply.sendSuccess<Static<typeof Schema.Response>["data"]>(
          "User updated successfully",
          {
            user: {
              id: result.id,
              name: result.name,
              email: result.email,
              role: result.role
            }
          }
        );
      } catch (err) {
        return reply.sendError(
          "Failed to update user. Please try again later.",
          500
        );
      }
    }
  );
};

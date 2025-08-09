import { FastifyInstance } from "fastify";

import { BaseError, BaseFail, BaseSuccess } from "@server/lib";
import { PublicUser, RoleEnum } from "@server/types";

import { Static, Type } from "@sinclair/typebox";
import bcrypt from "bcrypt";

const Schema = {
  Body: Type.Object({
    name: Type.String({ minLength: 3 }),
    email: Type.String({ format: "email" }),
    password: Type.String({ minLength: 8 }),
    role: Type.Enum(RoleEnum)
  }),
  Response: BaseSuccess(Type.Object({ user: PublicUser })),
  Fail: BaseFail(false),
  Error: BaseError
};

export const register = async (fastify: FastifyInstance) => {
  fastify.post(
    "/register",
    {
      preHandler: fastify.requireAuthWithRole(["admin"]),
      schema: {
        tags: ["Auth"],
        body: Schema.Body,
        response: {
          200: Schema.Response,
          401: Schema.Fail,
          500: Schema.Error
        }
      }
    },
    async (request, reply) => {
      const { name, email, password, role } = request.body as Static<
        typeof Schema.Body
      >;

      try {
        const existingUser = await fastify.prisma.user.findUniqueOrThrow({
          where: { email }
        });

        const hashedPassword = await bcrypt.hash(password, 10);

        if (existingUser) {
          if (existingUser.deleted_at === null) {
            // Already exists and active
            return reply.sendFail(409, "User already exists with this email");
          }

          // Soft-deleted user — reactivate instead of inserting
          await fastify.prisma.user.update({
            where: { id: existingUser.id },
            data: {
              name,
              hashed_password: hashedPassword,
              deleted_at: null,
              role: role
            }
          });

          return reply.sendSuccess("User reactivated successfully", {
            user: {
              id: existingUser.id,
              name,
              role,
              email
            }
          });
        }

        // No existing user — insert new
        const result = await fastify.prisma.user.create({
          data: {
            name: name,
            email: email,
            hashed_password: hashedPassword,
            role: role
          }
        });

        return reply.sendSuccess("User created successfully", {
          user: {
            id: result.id,
            name: result.name,
            email: result.email,
            role: result.role
          }
        });
      } catch (err) {
        fastify.log.error(err);
        return reply.sendError(
          "Failed to create user. Please try again later.",
          500
        );
      }
    }
  );
};

import { FastifyInstance } from "fastify";

import { BaseError, BaseFail, BaseSuccess } from "@server/lib";
import { PublicUser, RawUser, RoleEnum } from "@server/types";

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
        const existingUser = (await fastify.db.get(
          "SELECT * FROM users WHERE email = ?",
          [email]
        )) as Static<typeof RawUser>;

        const hashedPassword = await bcrypt.hash(password, 10);

        if (existingUser) {
          if (existingUser.deleted_at === null) {
            // Already exists and active
            return reply.sendFail(409, "User already exists with this email");
          }

          // Soft-deleted user — reactivate instead of inserting
          await fastify.db.run(
            "UPDATE users SET name = ?, hashed_password = ?, deleted_at = NULL WHERE id = ?",
            [name, hashedPassword, existingUser.id]
          );

          return reply.sendSuccess("User reactivated successfully", {
            user: {
              id: existingUser.id,
              name,
              email
            }
          });
        }

        // No existing user — insert new
        const result = await fastify.db.run(
          "INSERT INTO users (name, email, hashed_password, role, created_at) VALUES (?, ?, ?, ?, ?)",
          [name, email, hashedPassword, role, new Date().toISOString()]
        );

        return reply.sendSuccess("User created successfully", {
          user: {
            id: result.lastID,
            name,
            email,
            role
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

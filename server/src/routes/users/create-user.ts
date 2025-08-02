import { FastifyInstance } from "fastify";

import { RawUser, UserSchemas } from "@server/schemas";

import { Static } from "@sinclair/typebox";
import bcrypt from "bcrypt";

export const createUser = async (fastify: FastifyInstance) => {
  fastify.post(
    "/",
    {
      schema: {
        tags: ["Users"],
        body: UserSchemas.Create.Body,
        response: {
          201: UserSchemas.Create.Response,
          400: UserSchemas.Create.Fail,
          409: UserSchemas.Create.Fail,
          500: UserSchemas.Create.Error
        }
      }
    },
    async (request, reply) => {
      const { name, email, password } = request.body as Static<
        typeof UserSchemas.Create.Body
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
          "INSERT INTO users (name, email, hashed_password) VALUES (?, ?, ?)",
          [name, email, hashedPassword]
        );

        return reply.sendSuccess("User created successfully", {
          user: {
            id: result.lastID,
            name,
            email
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

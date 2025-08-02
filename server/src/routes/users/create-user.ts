import { FastifyInstance } from "fastify";

import { Static, Type } from "@sinclair/typebox";
import bcrypt from "bcrypt";

const CreateUserSchema = Type.Object({
  name: Type.String({ minLength: 2 }),
  email: Type.String({ format: "email" }),
  password: Type.String({ minLength: 6 })
});

export const createUser = async (fastify: FastifyInstance) => {
  fastify.post(
    "/",
    {
      schema: {
        body: CreateUserSchema
      }
    },
    async (request, reply) => {
      const { name, email, password } = request.body as Static<
        typeof CreateUserSchema
      >;

      // Check if the user already exists
      const existingUser = await fastify.db.get(
        "SELECT * FROM users WHERE email = ? AND deleted_at IS NULL",
        [email]
      );

      if (existingUser) {
        reply.code(409).send({ error: "User with this email already exists" });
        return;
      }

      // hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert the new user into the database
      const result = await fastify.db.run(
        "INSERT INTO users (name, email, hashed_password) VALUES (?, ?, ?)",
        [name, email, hashedPassword]
      );

      reply.code(201).send({ id: result.lastID, name, email });
    }
  );
};

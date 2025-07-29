import { FastifyInstance } from "fastify";

export default async function createUser(fastify: FastifyInstance) {
  fastify.post("/", async (request, reply) => {
    const { name, email } = request.body as { name: string; email: string };

    // Validate the input
    if (!name || typeof name !== "string" || name.trim() === "") {
      reply.code(400).send({ error: "Invalid name" });
      return;
    }

    if (!email || typeof email !== "string" || !/\S+@\S+\.\S+/.test(email)) {
      reply.code(400).send({ error: "Invalid email" });
      return;
    }

    // Check if the user already exists
    const existingUser = await fastify.db.get(
      "SELECT * FROM users WHERE email = ? AND deleted_at IS NULL",
      [email]
    );

    if (existingUser) {
      reply.code(409).send({ error: "User with this email already exists" });
      return;
    }

    // Insert the new user into the database
    const result = await fastify.db.run(
      "INSERT INTO users (name, email) VALUES (?, ?)",
      [name, email]
    );

    reply.code(201).send({ id: result.lastID, name, email });
  });
}

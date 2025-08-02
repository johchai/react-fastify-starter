import { FastifyInstance } from "fastify";

export const updateUser = (fastify: FastifyInstance) => {
  fastify.patch("/:id", async (request, reply) => {
    const { id } = request.params as { id: string };
    const { name, email } = request.body as {
      name: string;
      email: string;
    };

    // Validate the ID format
    if (!/^\d+$/.test(id)) {
      reply.code(400).send({ error: "Invalid user ID format" });
      return;
    }

    // Validate the input
    if (!name || typeof name !== "string" || name.trim() === "") {
      reply.code(400).send({ error: "Invalid name" });
      return;
    }

    // Validate the email format
    if (!email || typeof email !== "string" || !/\S+@\S+\.\S+/.test(email)) {
      reply.code(400).send({ error: "Invalid email" });
      return;
    }

    // Insert the new updated user into the database
    const result = await fastify.db.run(
      "UPDATE users SET name = ?, email = ? WHERE id = ? AND deleted_at IS NULL",
      [name, email, id]
    );

    if (result.changes === 0) {
      reply.code(404).send({ error: "User not found or already updated" });
      return;
    }

    reply.send({
      message: "User updated successfully",
      user: {
        id,
        name,
        email,
      },
    });
  });
};

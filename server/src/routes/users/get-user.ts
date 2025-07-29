import { FastifyInstance } from "fastify";

export default async function getUser(fastify: FastifyInstance) {
  fastify.get("/:id", async (request, reply) => {
    const { id } = request.params as { id: string };

    // Validate the ID format
    if (!/^\d+$/.test(id)) {
      reply.code(400).send({ error: "Invalid user ID format" });
      return;
    }

    // Fetch the user from the database
    const user = await fastify.db.get(
      "SELECT * FROM users WHERE id = ? AND deleted_at IS NULL",
      [id]
    );

    if (!user) {
      reply.code(404).send({ error: "User not found" });
      return;
    }

    reply.send(user);
  });
}

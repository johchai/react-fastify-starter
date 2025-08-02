import { FastifyInstance } from "fastify";

export const removeUser = async (fastify: FastifyInstance) => {
  fastify.patch(
    "/:id/delete",
    {
      schema: {
        tags: ["Users"]
      }
    },
    async (request, reply) => {
      const { id } = request.params as { id: string };

      // Validate the ID format
      if (!/^\d+$/.test(id)) {
        reply.code(400).send({ error: "Invalid user ID format" });
        return;
      }

      const result = await fastify.db.run(
        "UPDATE users SET deleted_at = CURRENT_TIMESTAMP WHERE id = ? AND deleted_at IS NULL",
        [id]
      );

      if (result.changes === 0) {
        reply.code(404).send({ error: "User not found or already deleted" });
        return;
      }

      reply.send({ message: "User removed successfully" });
    }
  );
};

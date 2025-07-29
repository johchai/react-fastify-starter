import { FastifyInstance } from "fastify";

export default async function listUser(fastify: FastifyInstance) {
  fastify.get("/", async (request, reply) => {
    const users = await fastify.db.all(
      "SELECT * FROM users WHERE deleted_at IS NULL"
    );
    reply.send(users);
  });
}

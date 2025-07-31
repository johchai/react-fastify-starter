import { Static, Type } from "@sinclair/typebox";
import { FastifyInstance } from "fastify";

export const ListUserSchema = Type.Object({
  id: Type.Number(),
  name: Type.String(),
  email: Type.String({ format: "email" }),
});

export default async function listUser(fastify: FastifyInstance) {
  fastify.get("/", async (request, reply) => {
    const users = (await fastify.db.all(
      "SELECT id, name, email FROM users WHERE deleted_at IS NULL"
    )) as Static<typeof ListUserSchema>[];
    reply.send(users);
  });
}

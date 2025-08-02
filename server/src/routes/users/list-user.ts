import { FastifyInstance } from "fastify";

import { Static, Type } from "@sinclair/typebox";

export const ListUserSchema = Type.Object({
  id: Type.Number(),
  name: Type.String(),
  email: Type.String({ format: "email" })
});

export const listUser = async (fastify: FastifyInstance) => {
  fastify.get(
    "/",
    {
      schema: {
        tags: ["Users"]
      }
    },
    async (request, reply) => {
      const users = (await fastify.db.all(
        "SELECT id, name, email FROM users WHERE deleted_at IS NULL"
      )) as Static<typeof ListUserSchema>[];
      reply.send(users);
    }
  );
};

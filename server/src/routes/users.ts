import { FastifyInstance } from "fastify";

export default async function userRoutes(fastify: FastifyInstance) {
  fastify.get("/", async (request, reply) => {
    return [{ id: 1, name: "Johnny" }];
  });
}

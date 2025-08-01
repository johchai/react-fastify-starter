import { FastifyInstance } from "fastify";
import createPost from "./posts/create-post";

export default async function postRoutes(fastify: FastifyInstance) {
  fastify.register(createPost);
}

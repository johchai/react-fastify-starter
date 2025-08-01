import { FastifyInstance } from "fastify";
import { login } from "./auth/login";

export default async function authRoutes(fastify: FastifyInstance) {
  fastify.register(login);
}

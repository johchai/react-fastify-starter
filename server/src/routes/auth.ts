import { FastifyInstance } from "fastify";
import { login } from "./auth/login";
import { refresh } from "./auth/refresh";

export default async function authRoutes(fastify: FastifyInstance) {
  fastify.register(login);
  fastify.register(refresh);
}

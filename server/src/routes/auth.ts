import { FastifyInstance } from "fastify";
import { login } from "./auth/login";
import { refresh } from "./auth/refresh";
import { logout } from "./auth/logout";

export default async function authRoutes(fastify: FastifyInstance) {
  fastify.register(login);
  fastify.register(refresh);
  fastify.register(logout);
}

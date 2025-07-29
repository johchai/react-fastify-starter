import { FastifyInstance } from "fastify";
import createUser from "./users/create-user";
import getUser from "./users/get-user";
import listUser from "./users/list-user";
import removeUser from "./users/remove-user";
import updateUser from "./users/update-user";

export default async function userRoutes(fastify: FastifyInstance) {
  fastify.register(createUser);
  fastify.register(getUser);
  fastify.register(listUser);
  fastify.register(updateUser);
  fastify.register(removeUser);
}

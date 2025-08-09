import { FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";

import { PrismaClient } from "@prisma/client";

// Use TypeScript module augmentation to declare the type of server.prisma to be PrismaClient
declare module "fastify" {
  interface FastifyInstance {
    prisma: PrismaClient;
  }
}

const prisma = new PrismaClient();

export const prismaPlugin: FastifyPluginAsync = fp(async (fastify) => {
  fastify.addHook("onClose", async () => {
    await prisma.$disconnect();
  });

  fastify.decorate("prisma", prisma);
});

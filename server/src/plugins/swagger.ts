import { FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";

import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";

export const swaggerPlugin: FastifyPluginAsync = fp(async (server) => {
  server.register(fastifySwagger, {
    openapi: {
      info: {
        title: "React Fastify Starter",
        version: "0.1.0"
      }
    }
  });

  server.register(fastifySwaggerUi, {
    routePrefix: "/docs"
  });
});

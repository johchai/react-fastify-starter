import "@fastify/env";

// temp workaround for https://github.com/fastify/fastify-env/issues/176
declare module "fastify" {
  interface FastifyInstance {
    config: {
      ACCESS_TOKEN_SECRET: string;
      REFRESH_TOKEN_SECRET: string;
      PORT: string;
    };
  }
}

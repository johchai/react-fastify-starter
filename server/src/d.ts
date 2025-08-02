import { EnvSchema } from "./lib";
import { FastifyJWTOptions, FastifyJwtVerifyOptions } from "@fastify/jwt";
import { JWTPayload } from "./types";

declare module "fastify" {
  interface FastifyInstance {
    config: EnvSchema;
  }
}

declare module "fastify" {}

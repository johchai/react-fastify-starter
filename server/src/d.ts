import { EnvSchema } from "./lib";
import { FastifyJWTOptions, FastifyJwtVerifyOptions } from "@fastify/jwt";
import { JWTPayload } from "./types";

declare module "fastify" {
  interface FastifyInstance {
    // env config
    config: EnvSchema;
    // JWT plugins - access
    accessSign: (payload: JWTPayload, options?: FastifyJWTOptions) => string;
    // verify: <T = JWTPayload>(token: string, options?: FastifyJWTOptions) => T;
    // decode: <T = JWTPayload>(token: string) => T | null;
    // JWT plugins - refresh
    refreshSign: (payload: JWTPayload, options?: FastifyJWTOptions) => string;
  }
}

declare module "fastify" {}

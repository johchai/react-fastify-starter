import { EnvSchema } from "./lib";
import { FastifyJWTOptions, FastifyJwtVerifyOptions } from "@fastify/jwt";
import { JWTPayload } from "./types";

declare module "fastify" {
  interface FastifyInstance {
    // env config
    config: EnvSchema;
    // JWT plugins - access
    accessJWT: {
      sign: (payload: JWTPayload, options?: FastifyJWTOptions) => string;
      verify: <T = JWTPayload>(token: string, options?: FastifyJWTOptions) => T;
      decode: <T = JWTPayload>(token: string) => T | null;
    };
    // JWT plugins - refresh
    refreshJWT: {
      sign: (payload: JWTPayload, options?: FastifyJWTOptions) => string;
      verify: <T = JWTPayload>(
        token: string,
        options?: FastifyJwtVerifyOptions
      ) => T;
      decode: <T = JWTPayload>(token: string) => T | null;
    };
  }
}

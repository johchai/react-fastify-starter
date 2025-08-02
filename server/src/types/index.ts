import { envSchema } from "@server/lib";
import { FromSchema } from "json-schema-to-ts";

declare module "fastify" {
  interface FastifyInstance {
    config: EnvSchema;
  }
}

export type EnvSchema = FromSchema<typeof envSchema>;

export interface JWTPayload {
  [key: string]: string | number | boolean | object;
}

export interface User {
  id: string;
  name: string;
  email: string;
  hashed_password: string;
  created_at: string;
  deleted_at: string | null;
}

// omitted to avoid exposing sensitive information
export type PublicUser = Omit<
  User,
  "hashed_password" | "created_at" | "deleted_at"
>;

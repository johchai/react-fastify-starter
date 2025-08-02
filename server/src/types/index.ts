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

export const RoleEnum = {
  admin: "admin",
  editor: "editor",
  viewer: "viewer"
} as const;

export type Role =
  | keyof typeof RoleEnum
  | (typeof RoleEnum)[keyof typeof RoleEnum];

export interface AccessTokenPayload {
  id: number;
  email: string;
  name: string;
  role: Role;
  iat: number;
  exp: number;
}

export interface SuccessResponse<T = any> {
  status: "success";
  message: string;
  data: T;
  timestamp: string;
}

export interface FailResponse {
  status: "fail";
  message: string;
  errors?: Record<string, string>;
  timestamp: string;
}

export interface ErrorResponse {
  status: "error";
  message: string;
  timestamp: string;
}

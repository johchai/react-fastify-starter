import { envSchema } from "@server/lib";

import { Type } from "@sinclair/typebox";
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

// TODO: move this to @internal/types
export const RoleEnum = {
  admin: "admin",
  editor: "editor",
  viewer: "viewer"
} as const;

// TODO: move this to @internal/types
export type Role =
  | keyof typeof RoleEnum
  | (typeof RoleEnum)[keyof typeof RoleEnum];

export interface AccessTokenPayload {
  id: string;
  email: string;
  name: string;
  role: Role;
  iat: number;
  exp: number;
}

export interface RefreshTokenPayload {
  id: string;
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

export const User = Type.Object({
  id: Type.String(),
  name: Type.String(),
  email: Type.String({ format: "email" }),
  role: Type.Enum(RoleEnum),
  created_at: Type.String({ format: "date-time" }),
  deleted_at: Type.Union([Type.String({ format: "date-time" }), Type.Null()])
});

export const Post = Type.Object({
  id: Type.String(),
  user_id: Type.String(),
  title: Type.String(),
  content: Type.String(),
  created_at: Type.String({ format: "date-time" }),
  deleted_at: Type.Union([Type.String({ format: "date-time" }), Type.Null()]),
  user: Type.Object({
    id: Type.String(),
    name: Type.String()
  })
});

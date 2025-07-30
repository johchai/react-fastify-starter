import { FromSchema, type JSONSchema } from "json-schema-to-ts";

export const envSchema = {
  type: "object",
  required: ["ACCESS_TOKEN_SECRET", "REFRESH_TOKEN_SECRET", "PORT"],
  properties: {
    ACCESS_TOKEN_SECRET: { type: "string" },
    REFRESH_TOKEN_SECRET: { type: "string" },
    PORT: { type: "string" },
  },
} as const satisfies JSONSchema;

export type EnvSchema = FromSchema<typeof envSchema>;

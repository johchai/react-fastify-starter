import { type JSONSchema } from "json-schema-to-ts";

export const envSchema = {
  type: "object",
  required: ["ACCESS_TOKEN_SECRET", "REFRESH_TOKEN_SECRET", "SERVER_PORT"],
  properties: {
    NODE_ENV: {
      type: "string",
      enum: ["development", "production", "test"],
      default: "development"
    },
    ACCESS_TOKEN_SECRET: { type: "string" },
    REFRESH_TOKEN_SECRET: { type: "string" },
    SERVER_PORT: { type: "string" },
    SERVER_DOMAIN: { type: "string" },
    DATABASE_URL: {
      type: "string"
    }
  }
} as const satisfies JSONSchema;

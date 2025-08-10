import { defineConfig } from "@hey-api/openapi-ts";

export default defineConfig({
  input: "http://localhost:4000/docs/json",
  output: "../packages/types/src/openapi",
  parser: {
    patch: {
      version: "3.1.1" // TEMP FIX: https://github.com/hey-api/openapi-ts/issues/2169
    }
  },
  plugins: [
    {
      name: "@hey-api/client-fetch",
      exportFromIndex: true
    },
    {
      name: "@hey-api/sdk",
      auth: true,
      validator: true,
      exportFromIndex: true
    },
    {
      name: "@tanstack/react-query",
      exportFromIndex: true
    },

    {
      name: "zod",
      requests: true,
      definitions: true,
      compatibilityVersion: 3,
      metadata: true,
      exportFromIndex: true
    }
  ]
});

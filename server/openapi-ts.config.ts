import { defineConfig } from "@hey-api/openapi-ts";

export default defineConfig({
  input: "http://localhost:4005/docs/json",
  output: "../packages/openapi-types/src",
  plugins: [
    {
      name: "@hey-api/sdk",
      auth: true,
      validator: true
    },
    {
      name: "@tanstack/react-query"
    },

    {
      name: "zod",
      requests: true,
      definitions: true,
      compatibilityVersion: 3,
      metadata: true
    }
  ]
});

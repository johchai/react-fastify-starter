import * as esbuild from "esbuild";
import { nodeExternalsPlugin } from "esbuild-node-externals";

esbuild
  .build({
    entryPoints: ["src/index.ts"],
    bundle: true,
    platform: "node",
    target: "node20",
    outfile: "dist/index.js",
    sourcemap: true,
    external: ["@prisma/client", "@internal/types"],
    plugins: [
      nodeExternalsPlugin({
        packagePath: ["./package.json"]
      })
    ],
    alias: {
      "@server": "./src"
    }
  })
  .catch(() => process.exit(1));

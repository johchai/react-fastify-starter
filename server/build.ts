import { spawn } from "child_process";

const isDev = process.env.NODE_ENV === "development";

async function build() {
  try {
    if (isDev) {
      // Start the server in development mode
      const server = spawn("node", ["dist/index.js"], {
        stdio: "inherit",
        env: { ...process.env, NODE_ENV: "development" },
      });

      server.on("error", (error) => {
        console.error("Failed to start server:", error);
        process.exit(1);
      });
    }
  } catch (error) {
    console.error("Build failed:", error);
    process.exit(1);
  }
}

build();

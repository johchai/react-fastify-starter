module.exports = {
  apps: [
    {
      name: "react-fastify-starter",
      args: "run start",
      script: "./dist/index.js",
      instances: "max",
      exec_mode: "cluster",
      autorestart: true,
      watch: false,
      max_memory_restart: "512M",
    },
  ],
};

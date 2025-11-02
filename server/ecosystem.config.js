// server/ecosystem.config.js

module.exports = {
  apps: [
    {
      name: "react-fastify-starter",
      script: "tsx",
      args: "./dist/index.js",
      instances: 1,
      exec_mode: "fork",
      autorestart: true,
      watch: false,
      max_memory_restart: "512M"
    }
  ]
};

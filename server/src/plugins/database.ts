import { FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";

import { open } from "sqlite";
import sqlite3 from "sqlite3";

declare module "fastify" {
  interface FastifyInstance {
    db: Awaited<ReturnType<typeof open>>;
  }
}

export const databasePlugin: FastifyPluginAsync = fp(async (server) => {
  const db = await open({
    filename: "./db/app.db",
    driver: sqlite3.Database
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      hashed_password TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      deleted_at TEXT
    );
  `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL REFERENCES users(id),
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      deleted_at TEXT
    );
  `);

  server.decorate("db", db);
});

import { FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";

import { open } from "sqlite";
import sqlite3 from "sqlite3";

declare module "fastify" {
  interface FastifyInstance {
    db: Awaited<ReturnType<typeof open>>;
  }
}

// This plugin sets up a SQLite database connection and initializes the schema for users and posts.
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
      role TEXT NOT NULL,
      created_at TEXT NOT NULL,
      deleted_at TEXT
    );
  `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL REFERENCES users(id),
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      created_at TEXT NOT NULL,
      deleted_at TEXT
    );
  `);

  // seed a user if the table is empty
  const userCount = await db.get("SELECT COUNT(*) as count FROM users");
  if (userCount.count === 0) {
    await db.run(
      `INSERT INTO users (name, email, hashed_password, role, created_at) VALUES (?, ?, ?, ?, ?)`,
      [
        "John",
        "hey@oodah.my",
        "$2a$10$midBLeaf6vQ1k/vVoEhFaedDwOo67NE1NI8F51xSOqIjNuOvVT9J6", // stringstring
        "admin",
        new Date().toISOString()
      ]
    );
  }

  server.decorate("db", db);
});

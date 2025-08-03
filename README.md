# Fastify + TypeScript + SQLite + Vite React

This is a full-stack monorepo setup using:

- **Fastify** for the backend (TypeScript)
- **React + Vite** for the frontend (Cloudflare Workers)
- **SQLite** for the database (TBD or replace if using something else)
- **npm workspaces** for package management
- Shared types via `@internal/openapi-types`

## 💬 Notes

Project uses npm workspaces — run npm install from the root to install all dependencies

---

## 📁 Project Structure

├── client/ # React + Vite frontend
├── server/ # Fastify backend
├── packages/
│ └── openapi-types/ # Shared OpenAPI TypeScript types
└── package.json # Root with npm workspaces

---

## 🧪 Development

### Start the frontend

```bash
cd client
npm install
npm run dev

Runs the Vite dev server at http://localhost:5173
```

### Start the backend

```bash
cd server
npm install
npm run dev

Starts Fastify server (usually at http://localhost:4005)
```

---

## 🚀 Production

### Build the frontend

```bash
cd client
npm run deploy
```

### Build the backend

TBA: You can add a production start script once deployment target is known (e.g. Docker, Railway, etc.)

---

## 📦 Shared Types

The packages/openapi-types package holds the generated OpenAPI types from Fastify Swagger.

# Fastify + TypeScript + SQLite + Vite React (WIP)

This is a full-stack monorepo CRUD dashboard setup using:

- **Fastify** for the backend (TypeScript)
- **React + Vite** for the frontend (Cloudflare Workers)
- **Swagger** for API documentation and type generation
- **SQLite** for the database (TBD or replace if using something else)
- **npm workspaces** for package management

---

### 🛠️ Backend — Fastify

- **Authentication**
  - JWT-based auth
  - Role-based access control: `"admin"`, `"editor"`, `"viewer"`
- **API validation**
  - TypeBox schemas
  - OpenAPI docs via Swagger
- **Database**
  - SQLite (TBD)
- **API routes**
  - `POST /api/auth/login` — user login
  - `POST /api/auth/register` — user registration
  - `POST /api/auth/refresh` — refresh access token
  - `POST /api/auth/logout` — logout
  - `GET/POST/PUT/DELETE /api/users` — user management
  - `GET/POST/PUT/DELETE /api/posts` — posts CRUD

### 🎨 Frontend — React + Vite (Cloudflare Workers)

- **Routing:** React Router
- **Data fetching:** React Query
- **Styling:** Tailwind CSS
- **Build tool:** Vite

---

## 📁 Project Structure

```bash
├── client/ # React + Vite frontend
├── server/ # Fastify backend
├── packages/
│ └── openapi-types/ # Shared OpenAPI TypeScript types
└── package.json # Root with npm workspaces
```

---

## 🧪 Development

- `run npm install` from the root to install all dependencies

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

- Fastify server at http://localhost:4005
- Swagger UI at http://localhost:4005/documentation

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

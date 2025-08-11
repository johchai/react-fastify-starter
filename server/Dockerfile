# --- Base stage ---
FROM node:23-alpine AS base
WORKDIR /app

# Copy root package manifests (for workspaces)
COPY package.json package-lock.json ./

# --- Builder stage ---
FROM base AS builder
WORKDIR /app

# 1. Copy all workspace package.json files (without full source yet)
COPY server/package.json ./server/
COPY packages/types/package.json ./packages/types/

# 2. Install all dependencies from root (workspace-aware)
RUN npm install

# 3. Now copy the rest of the monorepo source
COPY . .

# 4. Build only the server
WORKDIR /app/server
RUN npx prisma generate
RUN npm run build

# --- Production stage ---
FROM node:23-alpine AS production
WORKDIR /app

# Copy root manifest so npm knows about workspaces
COPY --from=builder /app/package.json ./
COPY --from=builder /app/package-lock.json ./

# Copy only the workspace packages you need
COPY --from=builder /app/packages/types ./packages/types
COPY --from=builder /app/server ./server

WORKDIR /app/server
RUN npm install --omit=dev --workspace=server
RUN npx prisma generate

# Process manager
RUN npm install -g pm2

# Expose the port our server will run on
EXPOSE 4000

# Run our server using PM2
CMD ["pm2-runtime", "ecosystem.config.js"]
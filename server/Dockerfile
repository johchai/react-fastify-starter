# --- Base stage ---
FROM node:24-alpine AS base
WORKDIR /app
# Copy root package manifests (for workspaces)
COPY package.json package-lock.json ./

# --- Builder stage ---
FROM base AS builder
WORKDIR /app

# 1. Copy all workspace package.json files
COPY server/package.json ./server/
COPY packages/types/package.json ./packages/types/
COPY packages/types/tsconfig.json ./packages/types/tsconfig.json

# 2. Install all dependencies from root (workspace-aware)
#    This installs deps for ALL workspaces including types
RUN npm install

# 3. Copy source for types package
COPY packages/types/src ./packages/types/src/

# 4. Copy server source and build it
WORKDIR /app
COPY server ./server

# 6. Build the server
WORKDIR /app/server
RUN npx prisma generate
RUN npm run build

# --- Production stage ---
FROM node:24-alpine AS production
WORKDIR /app

# Copy root manifest so npm knows about workspaces
COPY --from=builder /app/package.json ./
COPY --from=builder /app/package-lock.json ./

# Copy types package source (TypeScript files are used directly)
COPY --from=builder /app/packages/types ./packages/types

# Copy built server
COPY --from=builder /app/server ./server

WORKDIR /app/server
RUN npm install --workspace=server
RUN npx prisma generate

# Install tsx globally so PM2 can find it
RUN npm install -g tsx

# Process manager
RUN npm install -g pm2

# Expose the port our server will run on
EXPOSE 4000

# Run our server using PM2
CMD ["pm2-runtime", "ecosystem.config.js"]
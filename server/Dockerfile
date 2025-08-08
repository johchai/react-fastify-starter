# --- Base stage ---
FROM node:23-alpine AS base
WORKDIR /app

# Copy root workspace files for workspace resolution
COPY package.json package-lock.json ./

# --- Builder stage ---
FROM base AS builder
WORKDIR /app

# Copy the entire workspace structure 
# This ensures proper resolution of all dependencies
COPY . .

# Install all dependencies (not just server workspace)
RUN npm ci

# Generate Prisma client
WORKDIR /app/server
RUN npx prisma generate

# Build server
RUN npm run build

# --- Production stage ---
FROM node:23-alpine AS production
WORKDIR /app

# Copy the server directory and workspace config
COPY --from=builder /app/server ./server
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/package-lock.json ./package-lock.json

# Install production dependencies
RUN npm ci --omit=dev

# Generate Prisma client in production
WORKDIR /app/server
RUN npx prisma generate

# Install PM2 globally
RUN npm install -g pm2

EXPOSE 4000
CMD ["pm2-runtime", "start", "ecosystem.config.js"]
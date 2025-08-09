# --- Base ---
FROM node:23-alpine AS base
WORKDIR /app

COPY package.json package-lock.json ./

# --- Builder ---
FROM base AS builder
WORKDIR /app

COPY . .

RUN npm install
WORKDIR /app/server
RUN npx prisma generate
RUN npm run build

# --- Production ---
FROM node:23-alpine AS production
WORKDIR /app/server

# NEW
COPY --from=builder /app/server/dist ./dist
COPY --from=builder /app/server/prisma ./prisma
COPY --from=builder /app/server/ecosystem.config.js ./ecosystem.config.js
COPY --from=builder /app/server/package.json ./package.json
COPY --from=builder /app/server/package-lock.json ./package-lock.json

RUN npm install --omit=dev
RUN npx prisma generate

RUN npm install -g pm2

EXPOSE 4000
CMD ["pm2-runtime", "ecosystem.config.js"]
import { FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";

import fastifyJWT, { FastifyJwtNamespace } from "@fastify/jwt";

import { AccessTokenPayload, RefreshTokenPayload } from "@server/types";

declare module "fastify" {
  interface FastifyInstance
    extends FastifyJwtNamespace<{ namespace: "access" }> {}
  interface FastifyRequest {
    accessJwtVerify: () => Promise<AccessTokenPayload>;
    accessJwtDecode: () => Promise<AccessTokenPayload>;
  }
  interface FastifyReply {
    accessJwtSign: FastifyReply["jwtSign"];
    accessJwtDecode: () => Promise<AccessTokenPayload>;
  }
}

declare module "fastify" {
  interface FastifyInstance
    extends FastifyJwtNamespace<{ namespace: "refresh" }> {}
  interface FastifyRequest {
    refreshJwtVerify: FastifyRequest["jwtVerify"];
    refreshJwtDecode: () => Promise<RefreshTokenPayload>;
  }
  interface FastifyReply {
    refreshJwtSign: FastifyReply["jwtSign"];
  }
}

// This plugin sets up JWT authentication for access and refresh tokens.
export const jwtPlugin: FastifyPluginAsync = fp(async (server) => {
  server.register(fastifyJWT, {
    secret: server.config.ACCESS_TOKEN_SECRET,
    sign: {
      expiresIn: "15m" // Short-lived access tokens
    },
    cookie: {
      cookieName: "accessToken",
      signed: false
    },
    namespace: "access",
    jwtVerify: "accessJwtVerify",
    jwtSign: "accessJwtSign",
    jwtDecode: "accessJwtDecode"
  });

  server.register(fastifyJWT, {
    secret: server.config.REFRESH_TOKEN_SECRET,
    sign: {
      expiresIn: "1d" // Longer-lived refresh tokens
    },
    cookie: {
      cookieName: "refreshToken",
      signed: false
    },
    namespace: "refresh",
    jwtVerify: "refreshJwtVerify",
    jwtSign: "refreshJwtSign",
    jwtDecode: "refreshJwtDecode"
  });
});

import { FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";

import fastifyJWT, { FastifyJwtNamespace } from "@fastify/jwt";

import { AccessTokenPayload } from "@server/types";

declare module "fastify" {
  interface FastifyInstance
    extends FastifyJwtNamespace<{ namespace: "auth" }> {}
  interface FastifyRequest {
    authJwtVerify: () => Promise<AccessTokenPayload>;
    authJwtDecode: () => Promise<AccessTokenPayload>;
  }
  interface FastifyReply {
    authJwtSign: FastifyReply["jwtSign"];
    authJwtDecode: () => Promise<AccessTokenPayload>;
  }
}

declare module "fastify" {
  interface FastifyInstance
    extends FastifyJwtNamespace<{ namespace: "refresh" }> {}
  interface FastifyRequest {
    refreshJwtVerify: FastifyRequest["jwtVerify"];
    refreshJwtDecode: FastifyRequest["jwtDecode"];
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
    namespace: "auth",
    jwtVerify: "authJwtVerify",
    jwtSign: "authJwtSign",
    jwtDecode: "authJwtDecode"
  });

  server.register(fastifyJWT, {
    secret: server.config.REFRESH_TOKEN_SECRET,
    sign: {
      expiresIn: "7d" // Longer-lived refresh tokens
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

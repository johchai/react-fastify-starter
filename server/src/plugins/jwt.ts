import fp from "fastify-plugin";
import { FastifyPluginAsync } from "fastify";
import fastifyJWT, { FastifyJwtNamespace } from "@fastify/jwt";

declare module "fastify" {
  interface FastifyInstance
    extends FastifyJwtNamespace<{ namespace: "auth" }> {}

  interface FastifyRequest {
    // Custom namespace
    authJwtVerify: FastifyRequest["jwtVerify"];
    authJwtDecode: FastifyRequest["jwtDecode"];
  }

  interface FastifyReply {
    // Custon namespace
    authJwtSign: FastifyReply["jwtSign"];
  }
}

declare module "fastify" {
  interface FastifyInstance
    extends FastifyJwtNamespace<{ namespace: "refresh" }> {}

  interface FastifyRequest {
    // Custom namespace
    refreshJwtVerify: FastifyRequest["jwtVerify"];
    refreshJwtDecode: FastifyRequest["jwtDecode"];
  }

  interface FastifyReply {
    // Custon namespace
    refreshJwtSign: FastifyReply["jwtSign"];
  }
}

const jwtPlugin: FastifyPluginAsync = fp(async (server) => {
  server.register(fastifyJWT, {
    secret: server.config.ACCESS_TOKEN_SECRET,
    sign: {
      expiresIn: "15m", // Short-lived access tokens
    },
    cookie: {
      cookieName: "accessToken",
      signed: false,
    },
    namespace: "auth",
    jwtVerify: "authJwtVerify",
    jwtSign: "authJwtSign",
  });

  server.register(fastifyJWT, {
    secret: server.config.REFRESH_TOKEN_SECRET,
    sign: {
      expiresIn: "7d",
    },
    cookie: {
      cookieName: "refreshToken",
      signed: false,
    },
    namespace: "refresh",
    jwtVerify: "refreshJwtVerify",
    jwtSign: "refreshJwtSign",
  });
});

export default jwtPlugin;

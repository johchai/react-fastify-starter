import { FastifyInstance } from "fastify";

import { BaseError, BaseFail, BaseSuccess } from "@server/lib";
import { User } from "@server/types";

import { Static, Type } from "@sinclair/typebox";
import bcrypt from "bcrypt";

const Schema = {
  Body: Type.Object({
    email: Type.String({ format: "email" }),
    password: Type.String({ minLength: 6 })
  }),
  Response: BaseSuccess(Type.Object({ user: User })),
  Fail: BaseFail(false),
  Error: BaseError
};

export const login = async (fastify: FastifyInstance) => {
  fastify.post(
    "/login",
    {
      schema: {
        tags: ["Auth"],
        body: Schema.Body,
        response: {
          200: Schema.Response,
          401: Schema.Fail,
          500: Schema.Error
        }
      }
    },
    async (request, reply) => {
      const { email, password } = request.body as Static<typeof Schema.Body>;

      try {
        const user = await fastify.prisma.user.findUnique({
          where: { email: email, deleted_at: null }
        });

        // Check if user exists and password matches
        if (!user || !(await bcrypt.compare(password, user.hashed_password))) {
          return reply.sendFail(401, "User not found or invalid credentials");
        }

        // sign JWT token - access
        const access_token = await reply.accessJwtSign({
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role
        });

        // sign JWT token (keep it at minimum) - refresh
        const refresh_token = await reply.refreshJwtSign({
          id: user.id
        });

        if (!access_token || !refresh_token) {
          return reply.sendFail(500, "Failed to generate tokens");
        }

        reply.setCookie("accessToken", access_token, {
          domain: fastify.config.SERVER_DOMAIN,
          path: "/",
          sameSite: "lax", // or "none" if using HTTPS
          secure: false, // set to true in production
          httpOnly: true,
          maxAge: 60 * 15 // 15 minutes in seconds
        });

        reply.setCookie("refreshToken", refresh_token, {
          domain: fastify.config.SERVER_DOMAIN,
          path: "/",
          sameSite: "lax", // or "none" if using HTTPS
          secure: false, // set to true in production
          httpOnly: true,
          maxAge: 60 * 60 * 24 // 1 day in seconds
        });

        return reply.sendSuccess<Static<typeof Schema.Response>["data"]>(
          "Login successful",
          {
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role,
              created_at: user.created_at.toISOString(),
              deleted_at: user.deleted_at ? user.deleted_at.toISOString() : null
            }
          }
        );
      } catch (err) {
        console.error("Login error:", err);
        return reply.sendError("Failed to login. Please try again later.", 500);
      }
    }
  );
};

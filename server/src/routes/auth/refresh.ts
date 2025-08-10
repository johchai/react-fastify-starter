import { FastifyInstance } from "fastify";

import { BaseError, BaseFail, BaseSuccess } from "@server/lib";
import { User } from "@server/types";

import { Static, Type } from "@sinclair/typebox";

const Schema = {
  Response: BaseSuccess(Type.Object({ user: User })),
  Fail: BaseFail(false),
  Error: BaseError
};

export const refresh = async (fastify: FastifyInstance) => {
  fastify.post(
    "/refresh",
    {
      schema: {
        tags: ["Auth"],
        response: {
          200: Schema.Response,
          401: {
            description: "Unauthorized: Invalid or expired token",
            ...Schema.Fail
          },
          500: {
            description: "Error: Internal Server Error",
            ...Schema.Error
          }
        }
      }
    },
    async (request, reply) => {
      try {
        await request.refreshJwtVerify();
        const decodedAccessToken = await request.refreshJwtDecode();

        const user = await fastify.prisma.user.findUniqueOrThrow({
          where: { id: decodedAccessToken.id },
          select: {
            id: true,
            name: true,
            role: true,
            email: true,
            created_at: true,
            deleted_at: true
          }
        });

        const accessToken = await reply.accessJwtSign({
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role
        });

        const refreshToken = await reply.refreshJwtSign({
          id: user.id
        });

        // Set cookies for access and refresh tokens
        reply.setCookie("accessToken", accessToken, {
          domain: fastify.config.DOMAIN,
          path: "/",
          secure: fastify.config.NODE_ENV === "production",
          httpOnly: true,
          sameSite: fastify.config.NODE_ENV === "production" ? "none" : "lax",
          maxAge: 15 * 60 // 15 minutes
        });
        reply.setCookie("refreshToken", refreshToken, {
          domain: fastify.config.DOMAIN,
          path: "/",
          secure: fastify.config.NODE_ENV === "production",
          httpOnly: true,
          sameSite: fastify.config.NODE_ENV === "production" ? "none" : "lax",
          maxAge: 24 * 60 * 60 // 1 day
        });

        return reply.sendSuccess<Static<typeof Schema.Response>["data"]>(
          "Token refreshed successfully",
          {
            user: {
              id: user.id,
              email: user.email,
              name: user.name,
              role: user.role,
              created_at: user.created_at.toISOString(),
              deleted_at: user.deleted_at ? user.deleted_at.toISOString() : null
            }
          }
        );
      } catch (err) {
        return reply.sendFail(401, "Unauthorized: Invalid or expired token");
      }
    }
  );
};

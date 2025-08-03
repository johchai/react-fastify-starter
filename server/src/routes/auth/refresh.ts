import { FastifyInstance } from "fastify";

import { BaseError, BaseFail, BaseSuccess } from "@server/lib";
import { PublicUser } from "@server/types";

import { Static, Type } from "@sinclair/typebox";

const Schema = {
  Response: BaseSuccess(Type.Object({ user: PublicUser })),
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

        // Fetch user from the database
        const user = (await fastify.db.get(
          "SELECT id, name, role, email FROM users WHERE id = ?",
          [decodedAccessToken.id]
        )) as Static<typeof PublicUser>;

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
          secure: request.protocol === "https",
          httpOnly: true,
          sameSite: true,
          maxAge: 15 * 60 // 15 minutes
        });
        reply.setCookie("refreshToken", refreshToken, {
          domain: fastify.config.DOMAIN,
          path: "/",
          secure: request.protocol === "https",
          httpOnly: true,
          sameSite: true,
          maxAge: 24 * 60 * 60 // 1 day
        });

        return reply.sendSuccess<Static<typeof Schema.Response>["data"]>(
          "Token refreshed successfully",
          {
            user: {
              id: user.id,
              email: user.email,
              name: user.name,
              role: user.role
            }
          }
        );
      } catch (err) {
        return reply.sendFail(401, "Unauthorized: Invalid or expired token");
      }
    }
  );
};

import { FastifyInstance } from "fastify";

import { BaseError, BaseFail, BaseSuccess } from "@server/lib";
import { PublicUser } from "@server/types";

import { Static, Type } from "@sinclair/typebox";

const Schema = {
  Response: BaseSuccess(Type.Object({ user: PublicUser })),
  Fail: BaseFail(false),
  Error: BaseError
};

export const me = async (fastify: FastifyInstance) => {
  fastify.get(
    "/me",
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
        const decodedAccessToken = await request.accessJwtDecode();

        const user = await fastify.prisma.user.findUniqueOrThrow({
          where: { id: decodedAccessToken.id, deleted_at: null },
          select: {
            id: true,
            name: true,
            role: true,
            email: true
          }
        });

        return reply.sendSuccess<Static<typeof Schema.Response>["data"]>(
          "Token authenticated successfully",
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

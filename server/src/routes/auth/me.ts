import { FastifyInstance } from "fastify";

import { BaseError, BaseFail, BaseSuccess } from "@server/lib";
import { PublicUser, RawUser } from "@server/types";

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
          401: Schema.Fail,
          500: Schema.Error
        }
      }
    },
    async (request, reply) => {
      try {
        const decodedAccessToken = await request.accessJwtDecode();

        const user = (await fastify.db.get(
          "SELECT * FROM users WHERE id = ? AND deleted_at IS NULL",
          [decodedAccessToken.id]
        )) as Static<typeof RawUser>;

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

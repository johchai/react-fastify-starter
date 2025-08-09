import { FastifyInstance } from "fastify";

import { BaseError, BaseFail, BaseSuccess } from "@server/lib";
import { Post } from "@server/types";

import { Static, Type } from "@sinclair/typebox";

const Schema = {
  Params: Type.Object({
    id: Type.String()
  }),
  Response: BaseSuccess(Type.Object({ post: Post })),
  Fail: BaseFail(false),
  Error: BaseError
};

export const removePost = async (fastify: FastifyInstance) => {
  fastify.delete(
    "/:id",
    {
      preHandler: fastify.requireAuthWithRole(["admin", "editor", "viewer"]),
      schema: {
        tags: ["Posts"],
        params: Schema.Params,
        response: {
          200: Schema.Response,
          404: Schema.Fail,
          500: Schema.Error
        }
      }
    },
    async (request, reply) => {
      const { id } = request.params as Static<typeof Schema.Params>;

      try {
        const result = await fastify.prisma.post.update({
          where: {
            id: id,
            deleted_at: null
          },
          data: {
            deleted_at: new Date()
          }
        });

        return reply.sendSuccess<Static<typeof Schema.Response>["data"]>(
          "Post removed successfully",
          {
            post: {
              id: result.id,
              title: result.title,
              content: result.content,
              user_id: result.user_id,
              created_at: result.created_at.toISOString(),
              deleted_at: result.deleted_at
                ? result.deleted_at.toISOString()
                : null
            }
          }
        );
      } catch (err) {
        return reply.sendError(
          "Failed to remove post. Please try again later.",
          500
        );
      }
    }
  );
};

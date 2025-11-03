import { FastifyInstance } from "fastify";

import { BaseError, BaseFail, BaseSuccess } from "@server/lib";
import { Post } from "@server/types";

import { Static, Type } from "@sinclair/typebox";

const Schema = {
  Body: Type.Object({
    title: Type.Optional(Type.String({ minLength: 1, maxLength: 240 })),
    content: Type.Optional(Type.String({ minLength: 1, maxLength: 1000 }))
  }),
  Params: Type.Object({
    id: Type.String()
  }),
  Response: BaseSuccess(Type.Object({ post: Type.Omit(Post, ["user_id"]) })),
  Fail: BaseFail(false),
  Error: BaseError
};

export const updatePost = async (fastify: FastifyInstance) => {
  fastify.patch(
    "/:id",
    {
      preHandler: fastify.requireAuthWithRole(["admin", "editor", "viewer"]),
      schema: {
        tags: ["Posts"],
        body: Schema.Body,
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
      const { title, content } = request.body as Static<typeof Schema.Body>;

      try {
        const result = await fastify.prisma.post.update({
          where: {
            id: id,
            deleted_at: null
          },
          data: {
            title,
            content
          },
          include: {
            user: {
              select: {
                id: true,
                name: true
              }
            }
          }
        });

        return reply.sendSuccess<Static<typeof Schema.Response>["data"]>(
          "Post updated successfully",
          {
            post: {
              id: result.id,
              title: result.title,
              content: result.content,
              user: {
                id: result.user.id,
                name: result.user.name
              },
              created_at: result.created_at.toISOString(),
              deleted_at: result.deleted_at
                ? result.deleted_at.toISOString()
                : null
            }
          }
        );
      } catch (err) {
        return reply.sendError(
          "Failed to update post. Please try again later.",
          500
        );
      }
    }
  );
};

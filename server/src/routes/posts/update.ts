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
    id: Type.Number()
  }),
  Response: BaseSuccess(Type.Object({ post: Post })),
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
        const result = await fastify.db.run(
          "UPDATE posts SET title = ?, content = ? WHERE id = ? AND deleted_at IS NULL",
          [title, content, id]
        );

        if (result.changes === 0) {
          return reply.sendFail(404, "Post not found or already deleted");
        }

        // Fetch the updated post
        const updatedPost = (await fastify.db.get(
          "SELECT id, title, content, user_id, deleted_at FROM posts WHERE id = ?",
          [id]
        )) as Static<typeof Post>;

        return reply.sendSuccess<Static<typeof Schema.Response>["data"]>(
          "Post updated successfully",
          {
            post: {
              id: updatedPost.id,
              title: updatedPost.title,
              content: updatedPost.content,
              user_id: updatedPost.user_id,
              created_at: updatedPost.created_at
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

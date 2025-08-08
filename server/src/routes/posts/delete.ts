import { FastifyInstance } from "fastify";

import { BaseError, BaseFail, BaseSuccess } from "@server/lib";
import { Post } from "@server/types";

import { Static, Type } from "@sinclair/typebox";

const Schema = {
  Params: Type.Object({
    id: Type.Number()
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
        const result = await fastify.db.run(
          "UPDATE posts SET deleted_at = CURRENT_TIMESTAMP WHERE id = ? AND deleted_at IS NULL",
          [id]
        );

        if (result.changes === 0) {
          reply.code(404).send({ error: "Post not found or already deleted" });
          return;
        }

        // Fetch the updated post
        const updatedPost = (await fastify.db.get(
          "SELECT * FROM posts WHERE id = ?",
          [id]
        )) as Static<typeof Post>;

        return reply.sendSuccess<Static<typeof Schema.Response>["data"]>(
          "Post removed successfully",
          {
            post: {
              id: updatedPost.id,
              title: updatedPost.title,
              content: updatedPost.content,
              user_id: updatedPost.user_id,
              created_at: updatedPost.created_at,
              deleted_at: updatedPost.deleted_at
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

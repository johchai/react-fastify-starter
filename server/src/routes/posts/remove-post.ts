import { FastifyInstance } from "fastify";

import { Post, PostSchemas } from "@server/schemas";

import { Static } from "@sinclair/typebox";

export const removePost = async (fastify: FastifyInstance) => {
  fastify.delete(
    "/:id",
    {
      preHandler: fastify.requireAuthWithRole(["admin", "editor", "viewer"]),
      schema: {
        tags: ["Posts"],
        params: PostSchemas.RemovePost.Params,
        response: {
          200: PostSchemas.RemovePost.Response,
          404: PostSchemas.RemovePost.Fail,
          500: PostSchemas.RemovePost.Error
        }
      }
    },
    async (request, reply) => {
      const { id } = request.params as Static<
        typeof PostSchemas.RemovePost.Params
      >;

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
          "SELECT id, title, content, user_id, deleted_at FROM posts WHERE id = ?",
          [id]
        )) as Static<typeof Post>;

        return reply.sendSuccess("Post removed successfully", {
          post: {
            id: updatedPost.id,
            title: updatedPost.title,
            content: updatedPost.content,
            user_id: updatedPost.user_id,
            created_at: updatedPost.created_at || new Date().toISOString()
          }
        });
      } catch (err) {
        return reply.sendError(
          "Failed to remove post. Please try again later.",
          500
        );
      }
    }
  );
};

import { FastifyInstance } from "fastify";

import { Post, PostSchemas } from "@server/schemas";

import { Static } from "@sinclair/typebox";

export const updatePost = async (fastify: FastifyInstance) => {
  fastify.addHook("preHandler", async (request, reply) => {
    fastify.verifyJWT(request, reply);
  });

  fastify.patch(
    "/:id",
    {
      schema: {
        tags: ["Posts"],
        body: PostSchemas.UpdatePost.Body,
        params: PostSchemas.UpdatePost.Params,
        response: {
          200: PostSchemas.UpdatePost.Response,
          404: PostSchemas.UpdatePost.Fail,
          500: PostSchemas.UpdatePost.Error
        }
      }
    },
    async (request, reply) => {
      const { id } = request.params as Static<
        typeof PostSchemas.UpdatePost.Params
      >;
      const { title, content } = request.body as Static<
        typeof PostSchemas.UpdatePost.Body
      >;

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

        return reply.sendSuccess("Post updated successfully", {
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
          "Failed to update post. Please try again later.",
          500
        );
      }
    }
  );
};

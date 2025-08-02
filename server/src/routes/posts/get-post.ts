import { FastifyInstance } from "fastify";

import { PostSchemas } from "@server/schemas";

import { Static } from "@sinclair/typebox";

export const getPost = async (fastify: FastifyInstance) => {
  fastify.get(
    "/:id",
    {
      preHandler: fastify.requireAuthWithRole(["admin", "editor", "viewer"]),
      schema: {
        tags: ["Posts"],
        params: PostSchemas.GetByID.Params,
        response: {
          201: PostSchemas.GetByID.Response,
          400: PostSchemas.GetByID.Fail,
          404: PostSchemas.GetByID.Error
        }
      }
    },
    async (request, reply) => {
      const { id } = request.params as Static<
        typeof PostSchemas.GetByID.Params
      >;

      try {
        const post = await fastify.db.get(
          "SELECT * FROM posts WHERE id = ? AND deleted_at IS NULL",
          [id]
        );

        if (!post) return reply.sendFail(404, "Post not found");

        reply.sendSuccess("Post retrieved successfully", {
          post: {
            id: post.id,
            title: post.title,
            content: post.content,
            user_id: post.user_id,
            created_at: post.created_at || new Date().toISOString()
          }
        });
      } catch (err) {
        return reply.sendError(
          "Failed to retrieve post. Please try again later.",
          500
        );
      }
    }
  );
};

import { FastifyInstance } from "fastify";

import { Post, PostSchemas } from "@server/schemas";

import { Static } from "@sinclair/typebox";

export const listPost = async (fastify: FastifyInstance) => {
  fastify.get(
    "/",
    {
      schema: {
        tags: ["Posts"],
        response: {
          200: PostSchemas.GetAll.Response,
          400: PostSchemas.GetAll.Fail,
          404: PostSchemas.GetAll.Error
        }
      }
    },
    async (_request, reply) => {
      try {
        const posts = (await fastify.db.all(
          "SELECT id, title, content, user_id, created_at FROM posts WHERE deleted_at IS NULL"
        )) as Static<typeof Post>[];

        return reply.sendSuccess("Posts retrieved successfully", {
          posts: posts.map((post) => ({
            id: post.id,
            title: post.title,
            content: post.content,
            user_id: post.user_id,
            created_at: post.created_at || new Date().toISOString()
          }))
        });
      } catch (err) {
        return reply.sendError(
          "Failed to retrieve posts. Please try again later.",
          500
        );
      }
    }
  );
};

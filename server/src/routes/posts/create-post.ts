import { FastifyInstance } from "fastify";

import { PostSchemas } from "@server/schemas";

import { Static } from "@sinclair/typebox";

export const createPost = async (fastify: FastifyInstance) => {
  fastify.addHook("preHandler", async (request, reply) => {
    fastify.verifyJWT(request, reply);
  });

  fastify.post(
    "/",
    {
      schema: {
        tags: ["Posts"],
        body: PostSchemas.Create.Body,
        response: {
          201: PostSchemas.Create.Response,
          400: PostSchemas.Create.Fail,
          500: PostSchemas.Create.Error
        }
      }
    },
    async (request, reply) => {
      const { title, content } = request.body as Static<
        typeof PostSchemas.Create.Body
      >;

      try {
        // Simulate post creation logic (e.g., saving to a database)
        const postId = Math.floor(Math.random() * 1000); // Mock post ID
        return reply.sendSuccess("Post created successfully", {
          post: {
            id: postId,
            title,
            content
          }
        });
      } catch (err) {
        return reply.sendError(
          "Failed to create post. Please try again later.",
          500
        );
      }
    }
  );
};

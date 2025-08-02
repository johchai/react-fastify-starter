import { FastifyInstance } from "fastify";

import { PostSchemas } from "@server/schemas";

import { Static } from "@sinclair/typebox";

export const createPost = async (fastify: FastifyInstance) => {
  fastify.post(
    "/",
    {
      preHandler: fastify.requireAuthWithRole(["admin", "editor", "viewer"]),
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
        const decodedAccessToken = await request.authJwtDecode();

        if (!decodedAccessToken) {
          return reply.sendError("Unauthorized access", 401);
        }

        const result = await fastify.db.run(
          "INSERT INTO posts (user_id, title, content) VALUES (?, ?, ?)",
          [decodedAccessToken.id, title, content]
        );

        if (result.changes === 0) {
          return reply.sendError("Failed to create post", 400);
        }

        return reply.sendSuccess("Post created successfully", {
          id: result.lastID,
          title,
          content
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

import { FastifyInstance } from "fastify";

import { BaseError, BaseFail, BaseSuccess } from "@server/lib";
import { Post } from "@server/types";

import { Static, Type } from "@sinclair/typebox";

const Schema = {
  Body: Type.Object({
    title: Type.String({ minLength: 1, maxLength: 240 }),
    content: Type.String({ minLength: 1, maxLength: 1000 })
  }),
  Response: BaseSuccess(Type.Object({ post: Post })),
  Fail: BaseFail(false),
  Error: BaseError
};

export const createPost = async (fastify: FastifyInstance) => {
  fastify.post(
    "/",
    {
      preHandler: fastify.requireAuthWithRole(["admin", "editor", "viewer"]),
      schema: {
        tags: ["Posts"],
        body: Schema.Body,
        response: {
          201: Schema.Response,
          400: Schema.Fail,
          500: Schema.Error
        }
      }
    },
    async (request, reply) => {
      const { title, content } = request.body as Static<typeof Schema.Body>;

      try {
        const decodedAccessToken = await request.accessJwtDecode();

        if (!decodedAccessToken) {
          return reply.sendError("Unauthorized access", 401);
        }

        const result = await fastify.db.run(
          "INSERT INTO posts (user_id, title, content, created_at) VALUES (?, ?, ?, ?)",
          [decodedAccessToken.id, title, content, new Date().toISOString()]
        );

        if (result.changes === 0) {
          return reply.sendError("Failed to create post", 400);
        }

        const post = (await fastify.db.get("SELECT * FROM posts WHERE id = ?", [
          result.lastID
        ])) as Static<typeof Post>;

        return reply.sendSuccess<Static<typeof Schema.Response>["data"]>(
          "Post created successfully",
          {
            post: {
              id: post.id,
              user_id: decodedAccessToken.id,
              title: post.title,
              content: post.content,
              created_at: post.created_at,
              deleted_at: post.deleted_at
            }
          }
        );
      } catch (err) {
        return reply.sendError(
          "Failed to create post. Please try again later.",
          500
        );
      }
    }
  );
};

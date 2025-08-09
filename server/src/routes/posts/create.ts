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

        const result = await fastify.prisma.post.create({
          data: {
            user_id: decodedAccessToken.id,
            title,
            content
          }
        });

        if (!result) return reply.sendError("Failed to create post", 400);

        return reply.sendSuccess<Static<typeof Schema.Response>["data"]>(
          "Post created successfully",
          {
            post: {
              id: result.id,
              user_id: decodedAccessToken.id,
              title: result.title,
              content: result.content,
              created_at: result.created_at.toISOString(),
              deleted_at: null
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

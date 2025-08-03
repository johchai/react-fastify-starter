import { FastifyInstance } from "fastify";

import { BaseError, BaseFail, BaseSuccess } from "@server/lib";
import { Post } from "@server/types";

import { Static, Type } from "@sinclair/typebox";

const Schema = {
  GetAll: {
    Response: BaseSuccess(Type.Object({ posts: Type.Array(Post) })),
    Fail: BaseFail(false),
    Error: BaseError
  },
  GetByID: {
    Params: Type.Object({
      id: Type.Number()
    }),
    Response: BaseSuccess(Type.Object({ post: Post })),
    Fail: BaseFail(false),
    Error: BaseError
  }
};

export const getPost = async (fastify: FastifyInstance) => {
  fastify.get(
    "/:id",
    {
      preHandler: fastify.requireAuthWithRole(["admin", "editor", "viewer"]),
      schema: {
        tags: ["Posts"],
        params: Schema.GetByID.Params,
        response: {
          201: Schema.GetByID.Response,
          400: Schema.GetByID.Fail,
          404: Schema.GetByID.Error,
          500: Schema.GetByID.Error
        }
      }
    },
    async (request, reply) => {
      const { id } = request.params as Static<typeof Schema.GetByID.Params>;

      try {
        const post = await fastify.db.get(
          "SELECT * FROM posts WHERE id = ? AND deleted_at IS NULL",
          [id]
        );

        if (!post) return reply.sendFail(404, "Post not found");

        reply.sendSuccess<Static<typeof Schema.GetByID.Response>["data"]>(
          "Post retrieved successfully",
          {
            post: {
              id: post.id,
              title: post.title,
              content: post.content,
              user_id: post.user_id,
              created_at: post.created_at
            }
          }
        );
      } catch (err) {
        return reply.sendError(
          "Failed to retrieve post. Please try again later.",
          500
        );
      }
    }
  );
  fastify.get(
    "/",
    {
      preHandler: fastify.requireAuthWithRole(["admin", "editor", "viewer"]),
      schema: {
        tags: ["Posts"],
        response: {
          200: Schema.GetAll.Response,
          400: Schema.GetAll.Fail,
          404: Schema.GetAll.Error
        }
      }
    },
    async (_request, reply) => {
      try {
        const posts = (await fastify.db.all(
          "SELECT id, title, content, user_id, created_at FROM posts WHERE deleted_at IS NULL"
        )) as Static<typeof Post>[];

        return reply.sendSuccess<Static<typeof Schema.GetAll.Response>["data"]>(
          "Posts retrieved successfully",
          {
            posts: posts.map((post) => ({
              id: post.id,
              title: post.title,
              content: post.content,
              user_id: post.user_id,
              created_at: post.created_at
            }))
          }
        );
      } catch (err) {
        return reply.sendError(
          "Failed to retrieve posts. Please try again later.",
          500
        );
      }
    }
  );
};

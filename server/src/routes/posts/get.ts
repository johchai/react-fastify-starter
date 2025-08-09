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
      id: Type.String()
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
        const post = await fastify.prisma.post.findUniqueOrThrow({
          where: {
            id: id,
            deleted_at: null
          }
        });

        if (!post) return reply.sendFail(404, "Error: post not found");

        reply.sendSuccess<Static<typeof Schema.GetByID.Response>["data"]>(
          "Post retrieved successfully",
          {
            post: {
              id: post.id,
              title: post.title,
              content: post.content,
              user_id: post.user_id,
              created_at: post.created_at.toISOString(),
              deleted_at: post.deleted_at ? post.deleted_at.toISOString() : null
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
        const posts = await fastify.prisma.post.findMany({
          where: {
            deleted_at: null
          }
        });

        return reply.sendSuccess<Static<typeof Schema.GetAll.Response>["data"]>(
          "Posts retrieved successfully",
          {
            posts: posts.map((post) => ({
              id: post.id,
              title: post.title,
              content: post.content,
              user_id: post.user_id,
              created_at: post.created_at.toISOString(),
              deleted_at: post.deleted_at ? post.deleted_at.toISOString() : null
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

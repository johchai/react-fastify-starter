import { FastifyInstance } from "fastify";

import { BaseError, BaseFail, BaseSuccess } from "@server/lib";
import { Post } from "@server/types";

import { Static, Type } from "@sinclair/typebox";

const Schema = {
  GetAll: {
    Querystring: Type.Object({
      page: Type.Optional(Type.Integer({ minimum: 1 })),
      pageSize: Type.Optional(Type.Integer({ minimum: 1, maximum: 100 }))
    }),
    Response: BaseSuccess(
      Type.Object({
        posts: Type.Array(Type.Omit(Post, ["user_id"])),
        meta: Type.Object({
          page: Type.Integer(),
          pageSize: Type.Integer(),
          totalItems: Type.Integer(),
          totalPages: Type.Integer()
        })
      })
    ),
    Fail: BaseFail(false),
    Error: BaseError
  },
  GetByID: {
    Params: Type.Object({
      id: Type.String()
    }),
    Response: BaseSuccess(Type.Object({ post: Type.Omit(Post, ["user_id"]) })),
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
          },
          include: {
            user: {
              select: {
                id: true,
                name: true
              }
            }
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
              user: {
                id: post.user.id,
                name: post.user.name
              },
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
        querystring: Schema.GetAll.Querystring,
        response: {
          200: Schema.GetAll.Response,
          400: Schema.GetAll.Fail,
          404: Schema.GetAll.Error
        }
      }
    },
    async (request, reply) => {
      const { page = 1, pageSize = 10 } = request.query as Static<
        typeof Schema.GetAll.Querystring
      >;

      try {
        const totalItems = await fastify.prisma.post.count({
          where: { deleted_at: null }
        });

        const skip = (page - 1) * pageSize;

        const posts = await fastify.prisma.post.findMany({
          where: { deleted_at: null },
          skip,
          take: pageSize,
          orderBy: { created_at: "desc" },
          include: {
            user: {
              select: {
                id: true,
                name: true
              }
            }
          }
        });

        const totalPages = Math.ceil(totalItems / pageSize);

        return reply.sendSuccess<Static<typeof Schema.GetAll.Response>["data"]>(
          "Posts retrieved successfully",
          {
            posts: posts.map((post) => ({
              id: post.id,
              title: post.title,
              content: post.content,
              user_id: post.user_id,
              user: {
                id: post.user.id,
                name: post.user.name
              },
              created_at: post.created_at.toISOString(),
              deleted_at: post.deleted_at ? post.deleted_at.toISOString() : null
            })),
            meta: {
              page,
              pageSize,
              totalItems,
              totalPages
            }
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

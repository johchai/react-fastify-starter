import { Type, Static } from "@sinclair/typebox";
import { FastifyInstance } from "fastify";

const CreatePostSchema = Type.Object({
  title: Type.String({ minLength: 1, maxLength: 100 }),
  content: Type.String({ minLength: 1, maxLength: 500 }),
});

export const createPost = async (fastify: FastifyInstance) => {
  fastify.addHook("preHandler", async (request, reply) => {
    fastify.verifyJWT(request, reply);
  });

  fastify.post(
    "/",
    {
      schema: {
        body: CreatePostSchema,
      },
    },
    async (request, reply) => {
      const { title, content } = request.body as Static<
        typeof CreatePostSchema
      >;
      try {
        // Simulate post creation logic (e.g., saving to a database)
        const postId = Math.floor(Math.random() * 1000); // Mock post ID
        return reply.sendSuccess("Post created successfully", {
          id: postId,
          title,
          content,
        });
      } catch (err) {
        fastify.log.error(err);
        return reply.sendFail(
          500,
          "Failed to create post. Please try again later.",
          {
            error: err instanceof Error ? err.message : "Unknown error",
          }
        );
      }
    }
  );
};

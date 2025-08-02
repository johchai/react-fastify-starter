import { FastifyInstance } from "fastify";

import { Static, Type } from "@sinclair/typebox";
import bcrypt from "bcrypt";

const LoginSchema = Type.Object({
  email: Type.String({ format: "email" }),
  password: Type.String({ minLength: 6 })
});

const Event = Type.Object({
  status: Type.String(),
  message: Type.String(),
  data: Type.Object({
    user: Type.Object({
      id: Type.Number(),
      name: Type.String(),
      email: Type.String({ format: "email" })
    })
  }),
  timestamp: Type.String({ format: "date-time" })
});

export const login = async (fastify: FastifyInstance) => {
  fastify.post(
    "/login",
    {
      schema: {
        tags: ["Auth"],
        body: LoginSchema,
        response: {
          200: Event
        }
      }
    },
    async (request, reply) => {
      const { email, password } = request.body as Static<typeof LoginSchema>;

      // Fetch user from the database
      const user = await fastify.db.get(
        "SELECT * FROM users WHERE email = ? AND deleted_at IS NULL",
        [email]
      ); // TODO: typecheck this

      // Check if user exists and password matches
      if (!user || !(await bcrypt.compare(password, user.hashed_password))) {
        reply.sendFail(401, "User not found or invalid credentials");
      }

      // sign JWT token - access
      const access_token = await reply.authJwtSign({
        id: user.id,
        email: user.email,
        name: user.name
      });

      // sign JWT token (keep it at minimum) - refresh
      const refresh_token = await reply.refreshJwtSign({
        id: user.id
      });

      reply.setCookie("accessToken", access_token, {
        // domain: app.config.DOMAIN,
        path: "/",
        // secure: request.protocol === "https", // send cookie over HTTPS only
        httpOnly: true
        // sameSite: true, // alternative CSRF protection,
      });

      reply.setCookie("refreshToken", refresh_token, {
        // domain: app.config.DOMAIN,
        path: "/",
        // secure: request.protocol === "https", // send cookie over HTTPS only
        httpOnly: true
        // sameSite: true, // alternative CSRF protection,
      });

      return reply.sendSuccess("Login successful", {
        user: {
          id: user.id,
          name: user.name,
          email: user.email
        }
      });
    }
  );
};

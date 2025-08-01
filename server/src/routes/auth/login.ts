import { FastifyInstance } from "fastify";
import bcrypt from "bcrypt";
import { Static, Type } from "@sinclair/typebox";

const LoginSchema = Type.Object({
  email: Type.String({ format: "email" }),
  password: Type.String({ minLength: 6 }),
});

export const login = async (fastify: FastifyInstance) => {
  fastify.post(
    "/login",
    {
      schema: {
        body: LoginSchema,
      },
    },
    async (request, reply) => {
      const { email, password } = request.body as Static<typeof LoginSchema>;

      // Fetch user from the database
      const user = await fastify.db.get(
        "SELECT * FROM users WHERE email = ? AND deleted_at IS NULL",
        [email]
      ); // TODO: typecheck this

      if (!user || !(await bcrypt.compare(password, user.hashed_password))) {
        reply
          .code(401)
          .send({ error: "User not found or invalid credentials" });
        return;
      }

      const access_token = await reply.authJwtSign({
        id: user.id,
        email: user.email,
        name: user.name,
      });

      const refresh_token = await reply.refreshJwtSign({
        id: user.id,
      });

      console.log("Generated tokens:", {
        access_token,
        refresh_token,
      });

      reply.setCookie("accessToken", access_token, {
        // domain: app.config.DOMAIN,
        path: "/",
        // secure: request.protocol === "https", // send cookie over HTTPS only
        httpOnly: true,
        // sameSite: true, // alternative CSRF protection,
      });

      reply.setCookie("refreshToken", refresh_token, {});

      return reply.send({
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        message: "Login successful",
      });
    }
  );
};

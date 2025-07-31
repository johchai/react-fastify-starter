import { FastifyInstance } from "fastify";
import bcrypt from "bcrypt";
import { Static, Type } from "@sinclair/typebox";

const LoginSchema = Type.Object({
  email: Type.String({ format: "email" }),
  password: Type.String({ minLength: 6 }),
});

export const login = async (fastify: FastifyInstance) => {
  fastify.post(
    "/",
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
      );

      if (!user || !(await bcrypt.compare(password, user.hashed_password))) {
        reply
          .code(401)
          .send({ error: "User not found or invalid credentials" });
        return;
      }

      // Generate JWT token
      const newAccessToken = fastify.accessJWT.sign({
        id: user.id,
        name: user.name,
        email: user.email,
      });

      const newRefreshToken = fastify.refreshJWT.sign({
        id: user.id,
      });

      // Set the JWT token in a secure cookie
      return (
        reply
          .setCookie("access_token", newAccessToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            path: "/",
            maxAge: 60 * 15,
          })
          //   .setCookie("refresh_token", refreshToken, {
          //     httpOnly: true,
          //     secure: true,
          //     sameSite: "strict",
          //     path: "/",
          //     maxAge: 60 * 60 * 24 * 7, // 7 days
          //   })
          .send({
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
            },
            message: "Login successful",
          })
      );
    }
  );
};

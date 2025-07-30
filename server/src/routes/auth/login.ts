import { FastifyInstance } from "fastify";
import bcrypt from "bcrypt";

export const login = async (fastify: FastifyInstance) => {
  fastify.post("/", async (request, reply) => {
    const { email, password } = request.body as {
      email: string;
      password: string;
    };

    // Validate input
    if (!email || typeof email !== "string" || !/\S+@\S+\.\S+/.test(email)) {
      reply.code(400).send({ error: "Invalid email" });
      return;
    }

    if (!password || typeof password !== "string" || password.length < 6) {
      reply.code(400).send({ error: "Invalid password" });
      return;
    }

    // Fetch user from the database
    const user = await fastify.db.get(
      "SELECT * FROM users WHERE email = ? AND deleted_at IS NULL",
      [email]
    );

    if (!user || !(await bcrypt.compare(password, user.hashed_password))) {
      reply.code(401).send({ error: "User not found or invalid credentials" });
      return;
    }

    // use standalone JWT access token
    const test = fastify.accessJWT.sign({
      id: user.id,
      name: user.name,
      email: user.email,
    });

    // Generate JWT token
    const newAccessToken = fastify.jwt.sign({
      id: user.id,
      name: user.name,
      email: user.email,
    });

    const newRefreshToken = fastify.jwt.sign({
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
  });
};

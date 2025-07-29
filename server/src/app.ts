import Fastify from "fastify";
import userRoutes from "./routes/users";

const app = Fastify({ logger: true });

app.register(userRoutes, { prefix: "/users" });

export default app;

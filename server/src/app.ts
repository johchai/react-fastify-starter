import Fastify from "fastify";
import userRoutes from "./routes/users";
import dbPlugin from "./plugins/db";

const app = Fastify({ logger: true });

app.register(userRoutes, { prefix: "/users" });
app.register(dbPlugin);

export default app;

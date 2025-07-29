import app from "./app";

const server = async () => {
  try {
    await app.listen({ port: 3010 });
    console.log("Server running at http://localhost:3010");
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

server();

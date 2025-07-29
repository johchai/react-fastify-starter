import app from "./app";

const server = async () => {
  try {
    await app.listen({ port: 4005 });
    console.log("Server running at http://localhost:4005");
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

server();

import http from "http";
import mongoose from "mongoose";

import app from "./app.js";
import connectDB from "./config/db.js";
import env from "./config/env.js";
import logger from "./config/logger.js";

const server = http.createServer(app);

const startServer = async () => {
  try {
    await connectDB();

    server.listen(env.PORT, () => {
      logger.info(`🚀 Server running on http://localhost:${env.PORT}`);
    });
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }
};

startServer();

process.on("SIGINT", async () => {
  logger.info("Gracefully shutting down...");

  await mongoose.connection.close();

  server.close(() => {
    logger.info("Server stopped.");
    process.exit(0);
  });
});

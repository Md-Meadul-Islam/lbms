import mongoose from "mongoose";

import env from "./env.js";
import logger from "./logger.js";

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", true);

    await mongoose.connect(env.MONGO_URI);

    logger.info("MongoDB connected successfully.");
  } catch (error) {
    logger.error("MongoDB connection failed.");
    logger.error(error);

    process.exit(1);
  }
};

export default connectDB;

import dotenv from "dotenv";

dotenv.config();

const requiredEnv = ["PORT", "NODE_ENV", "MONGO_URI", "JWT_SECRET"];

requiredEnv.forEach((key) => {
  if (!process.env[key]) {
    throw new Error(`Missing environment variable: ${key}`);
  }
});

const env = {
  PORT: process.env.PORT,

  NODE_ENV: process.env.NODE_ENV,

  MONGO_URI: process.env.MONGO_URI,

  JWT_SECRET: process.env.JWT_SECRET,

  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "7d",

  UPLOAD_PATH: process.env.UPLOAD_PATH || "./uploads",

  LOG_LEVEL: process.env.LOG_LEVEL || "info",
};

export default env;

import express from "express";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import morgan from "morgan";

import env from "./config/env.js";
import logger from "./config/logger.js";
import routes from "./routes/index.js";

import notFoundMiddleware from "./middleware/notFound.middleware.js";
import errorMiddleware from "./middleware/error.middleware.js";

const app = express();

app.use(helmet());

app.use(cors());

app.use(compression());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(
  morgan("dev", {
    stream: {
      write: (message) => logger.http(message.trim()),
    },
  }),
);

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "LBMS API is running",
    environment: env.NODE_ENV,
    timestamp: new Date(),
  });
});

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

app.use("/api", routes);

app.use(notFoundMiddleware);

app.use(errorMiddleware);

export default app;

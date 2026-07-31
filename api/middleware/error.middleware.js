import logger from "../config/logger.js";

const errorMiddleware = (err, req, res, next) => {
  logger.error(err.stack || err.message);

  return res.status(err.statusCode || 500).json({
    success: false,
    statusCode: err.statusCode || 500,
    message: err.message || "Internal Server Error",
    errors: err.errors || [],
  });
};

export default errorMiddleware;

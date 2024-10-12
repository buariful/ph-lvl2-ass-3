/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { ErrorRequestHandler } from "express";
import config from "../config";

const globalErrorMiddleware: ErrorRequestHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Something went wrong";
  const errorMessage = "errorMessage";

  res.status(statusCode).json({
    success: false,
    message,
    errorMessage,
    errorDetails: err,
    stack: config.NODE_ENV === "DEVELOPMENT" ? err?.stack : null,
  });
};

export default globalErrorMiddleware;

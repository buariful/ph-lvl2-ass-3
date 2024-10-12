/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { ErrorRequestHandler } from "express";
import config from "../config";
import { ZodError } from "zod";
import { HandleErrors } from "../utils/handleErrors";

const globalErrorMiddleware: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Something went wrong";
  let errorMessage = "";

  let simplifiedError: {
    statusCode?: number;
    message?: string;
    errorMessage?: string;
  } = {};

  // checking which error is thrown
  if (err instanceof ZodError) {
    simplifiedError = HandleErrors.zodError(err);
  }

  // formating the error
  if (Object.keys(simplifiedError).length > 0) {
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorMessage = simplifiedError?.errorMessage as string;
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessage,
    errorDetails: err,
    stack: config.NODE_ENV === "DEVELOPMENT" ? err?.stack : null,
  });
};

export default globalErrorMiddleware;

import { Request, Response } from "express";
import httpStatus from "http-status";

const notFound = (req: Request, res: Response) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "API not found",
    errorMessage: "API not found",
    errorDetails: null,
    stack: null,
  });
};
export default notFound;

import { RequestHandler } from "express";
import { ReviewService } from "./review.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const createReiview: RequestHandler = async (req, res) => {
  const result = await ReviewService.insertRiveiewIntoDB(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Review created successfully",
    data: result,
  });
};

export const ReviewController = {
  createReiview,
};

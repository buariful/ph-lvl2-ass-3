import express from "express";
import catchAsync from "../../utils/catchAsync";
import { ReviewController } from "./review.controller";
import validateRequest from "../../middlewares/validateRequest";
import { ReviewValidation } from "./review.validation";

const router = express.Router();

router.post(
  "/reviews",
  validateRequest(ReviewValidation.createReiviewValidationSchema),
  catchAsync(ReviewController.createReiview)
);

export const ReviewRouter = router;

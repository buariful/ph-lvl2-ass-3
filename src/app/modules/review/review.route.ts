import express from "express";
import catchAsync from "../../utils/catchAsync";
import { ReviewController } from "./review.controller";

const router = express.Router();

router.post("/reviews", catchAsync(ReviewController.createReiview));

export const ReviewRouter = router;

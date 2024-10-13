import express from "express";
import catchAsync from "../../utils/catchAsync";
import { CourseController } from "./course.controller";
import validateRequest from "../../middlewares/validateRequest";
import { CourseValidation } from "./course.validation";
const router = express.Router();

router.post(
  "/course",
  validateRequest(CourseValidation.createCourseValidationSchema),
  catchAsync(CourseController.createCoruse)
);

export const CourseRouter = router;

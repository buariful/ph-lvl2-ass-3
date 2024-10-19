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

router.get("/courses", catchAsync(CourseController.getCourses));

router.put("/courses/:courseId", catchAsync(CourseController.updateCourse));

router.get(
  "/courses/:courseId/reviews",
  catchAsync(CourseController.getSingleCourseWithReview)
);

export const CourseRouter = router;

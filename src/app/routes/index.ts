import express from "express";
import { CategoryRoute } from "../modules/category/category.route";
import { CourseRouter } from "../modules/course/course.route";
import { ReviewRouter } from "../modules/review/review.route";
const router = express.Router();

const moduleRoutes = [CategoryRoute, CourseRouter, ReviewRouter];

moduleRoutes.forEach((route) => {
  router.use("/api", route);
});

export const AppRoute = router;

import express from "express";
import { CategoryRoute } from "../modules/category/category.route";
import { CourseRouter } from "../modules/course/course.route";
const router = express.Router();

const moduleRoutes = [CategoryRoute, CourseRouter];

moduleRoutes.forEach((route) => {
  router.use("/api", route);
});

export const AppRoute = router;

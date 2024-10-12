import express from "express";
import { CategoryRoute } from "../modules/category/category.route";
const router = express.Router();

const moduleRoutes = [CategoryRoute];

moduleRoutes.forEach((route) => {
  router.use("/api", route);
});

export const AppRoute = router;

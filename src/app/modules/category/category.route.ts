import express from "express";
import { CategoryController } from "./category.controller";
import validateRequest from "../../middlewares/validateRequest";
import { CategoryValidation } from "./category.validation";
import catchAsync from "../../utils/catchAsync";
const router = express.Router();

router.post(
  "/categories",
  validateRequest(CategoryValidation.createCategoryValidationSchema),
  catchAsync(CategoryController.createCategory)
);

router.get("/categories", catchAsync(CategoryController.getAllCategories));

export const CategoryRoute = router;

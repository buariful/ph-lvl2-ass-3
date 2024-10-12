import { RequestHandler } from "express";
import { CategoryService } from "./category.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const createCategory: RequestHandler = async (req, res) => {
  const result = await CategoryService.insertCategoryIntoDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Category created successfully",
    data: result,
  });
};
const getAllCategories: RequestHandler = async (req, res) => {
  const result = await CategoryService.getAllCategoriesFromDB();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Categories retrieved successfully",
    data: result,
  });
};

export const CategoryController = {
  createCategory,
  getAllCategories,
};

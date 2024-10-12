import { TCourse } from "../course/course.interface";
import { Category } from "./category.model";

const insertCategoryIntoDB = async (payload: TCourse) => {
  const result = await Category.create(payload);
  return result;
};

const getAllCategoriesFromDB = async () => {
  const result = await Category.find();
  return result;
};

export const CategoryService = {
  insertCategoryIntoDB,
  getAllCategoriesFromDB,
};

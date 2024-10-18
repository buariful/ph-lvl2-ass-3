import AppError from "../../errors/AppError";
import { helper } from "../../utils/helper";
import CourseQueryBuilder from "../../utils/queryBuilder";
import { TCourse } from "./course.interface";
import { Course } from "./course.model";

const insertCourseIntoDB = async (payload: TCourse) => {
  const { startDate, endDate } = payload;
  const duration = helper.getDurationInWeeks(startDate, endDate);

  if (!duration || duration < 0) {
    throw new AppError(400, "Invalid duration");
  }

  const result = await Course.create({ ...payload, durationInWeeks: duration });
  return result;
};

const getCoursesFromDB = async (query: Record<string, unknown>) => {
  const queryBuilder = new CourseQueryBuilder(Course.find(), query)
    .filter()
    .sort()
    .pagination();

  const result = await queryBuilder.modelQuery;
  return result;
};

export const CourseService = {
  insertCourseIntoDB,
  getCoursesFromDB,
};

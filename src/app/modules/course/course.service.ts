import AppError from "../../errors/AppError";
import { helper } from "../../utils/helper";
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

export const CourseService = {
  insertCourseIntoDB,
};

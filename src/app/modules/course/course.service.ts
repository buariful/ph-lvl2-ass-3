import mongoose from "mongoose";
import AppError from "../../errors/AppError";
import { helper } from "../../utils/helper";
import CourseQueryBuilder from "../../utils/queryBuilder";
import { TCourse } from "./course.interface";
import { Course } from "./course.model";
import httpStatus from "http-status";

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

const updatedCourseInDB = async (payload: Partial<TCourse>, id: string) => {
  const { tags, ...rest } = payload;
  const session = await mongoose.startSession();

  session.startTransaction();

  try {
    // primary data update
    const updatedCourse = await Course.findOneAndUpdate({ _id: id }, rest, {
      session,
      new: true,
    });
    if (!updatedCourse) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to update course");
    }

    // tags update
    if (tags?.length) {
      // adding new tags
      const tagsToAdd = tags.filter((tag) => tag.isDeleted === false);
      if (tagsToAdd?.length) {
        await Course.findByIdAndUpdate(
          id,
          {
            $addToSet: {
              tags: {
                $each: tagsToAdd,
              },
            },
          },
          {
            new: true,
            session,
            runValidators: true,
          }
        );
      }

      // removing deleted tags
      const tagsToRemove = tags.filter((tag) => tag.isDeleted === true);
      if (tagsToRemove?.length) {
        await Course.findByIdAndUpdate(
          id,
          {
            $pull: {
              tags: {
                $in: tagsToRemove,
              },
            },
          },
          {
            new: true,
            session,
            runValidators: true,
          }
        );
      }
    }

    await session.commitTransaction();
    await session.endSession();

    const result = await Course.findById(id);
    return result;
  } catch {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, "Failed to update course");
  }
};

export const CourseService = {
  insertCourseIntoDB,
  getCoursesFromDB,
  updatedCourseInDB,
};

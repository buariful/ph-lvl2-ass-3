import { RequestHandler } from "express";
import { CourseService } from "./course.service";
import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";

const createCoruse: RequestHandler = async (req, res) => {
  const result = await CourseService.insertCourseIntoDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Course created successfully",
    data: result,
  });
};

const getCourses: RequestHandler = async (req, res) => {
  const result = await CourseService.getCoursesFromDB(req.query);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Courses retrived successfully",
    data: result,
  });
};

const updateCourse: RequestHandler = async (req, res) => {
  const result = await CourseService.updatedCourseInDB(
    req.body,
    req.params.courseId
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Course updated successfully",
    data: result,
  });
};

export const CourseController = {
  createCoruse,
  getCourses,
  updateCourse,
};

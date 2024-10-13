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

export const CourseController = {
  createCoruse,
};

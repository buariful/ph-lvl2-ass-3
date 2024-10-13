import { z } from "zod";

const tagSchema = z.object({
  name: z.string(),
  isDeleted: z.boolean(),
});

const createCourseValidationSchema = z.object({
  body: z.object({
    title: z.string(),
    instructor: z.string(),
    categoryId: z.string(),
    price: z.number().positive("price must be a positive number"),
    tags: z.array(tagSchema),
    startDate: z.string(),
    endDate: z.string(),
    language: z.string(),
    provider: z.string(),
    details: z.object({
      level: z.string(),
      description: z.string(),
    }),
  }),
});

export const CourseValidation = {
  createCourseValidationSchema,
};

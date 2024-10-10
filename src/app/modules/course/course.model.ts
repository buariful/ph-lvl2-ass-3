import { model, Schema } from "mongoose";
import { TCourse, TDetails, TTags } from "./course.interface";

const tagsSchema = new Schema<TTags>({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: [20, "Tag name can not be more than 20 characters"],
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

const detailsSchema = new Schema<TDetails>({
  level: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const courseSchema = new Schema<TCourse>({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: [100, "Course title can not be more than 100 characters"],
    unique: true,
  },
  instructor: {
    type: String,
    required: true,
    trim: true,
    maxlength: [50, "Instructor name can not be more than 50 characters"],
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  tags: {
    type: [tagsSchema],
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  provider: {
    type: String,
    required: true,
  },
  durationInWeeks: {
    type: Number,
    required: true,
  },
  details: {
    type: detailsSchema,
    required: true,
  },
});

courseSchema.pre("save", async function (next) {
  if (this.startDate && this.endDate) {
    const startDate = new Date(this.startDate);
    const endDate = new Date(this.endDate);
    const durationInWeeks = Math.ceil(
      (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24 * 7)
    );
    this.durationInWeeks = durationInWeeks;
  }
  next();
});

export const Course = model<TCourse>("Course", courseSchema);

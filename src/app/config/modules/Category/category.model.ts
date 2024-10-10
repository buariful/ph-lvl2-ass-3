import { model, Schema } from "mongoose";
import { TCategory } from "./category.interface";

const categorySchema = new Schema<TCategory>(
  {
    name: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      maxlength: [20, "Category can not be more than 20 characters"],
    },
  },
  {
    timestamps: true,
  }
);

export const Category = model<TCategory>("Category", categorySchema);

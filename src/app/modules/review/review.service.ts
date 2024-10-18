import { TReview } from "./review.interface";
import { Review } from "./review.model";

const insertRiveiewIntoDB = async (payload: TReview) => {
  const result = await Review.create({ ...payload });
  return result;
};

export const ReviewService = {
  insertRiveiewIntoDB,
};

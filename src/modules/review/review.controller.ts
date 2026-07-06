import { Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ReviewService } from "./review.service";

const createReview = catchAsync(async (req: any, res: Response) => {
  const result = await ReviewService.createReview(
    req.user.id,
    req.body
  );

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "Review submitted successfully",
    data: result,
  });
});

export const ReviewController = {
  createReview,
};
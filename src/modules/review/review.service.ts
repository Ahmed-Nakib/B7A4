import { prisma } from "../../lib/prisma";
import { TCreateReview } from "./review.interface";

const createReview = async (
  customerId: string,
  payload: TCreateReview
) => {
  const booking = await prisma.booking.findFirst({
    where: {
      id: payload.bookingId,
      customerId,
      status: "COMPLETED",
    },
  });

  if (!booking) {
    throw new Error(
      "Review can only be submitted after completed booking."
    );
  }

  const reviewExist = await prisma.review.findUnique({
    where: {
      bookingId: payload.bookingId,
    },
  });

  if (reviewExist) {
    throw new Error("Review already submitted.");
  }

  const review = await prisma.review.create({
    data: {
      bookingId: booking.id,
      customerId,
      technicianId: booking.technicianId,
      rating: payload.rating,
      comment: payload.comment,
    },
  });

  // Update technician average rating
  const reviews = await prisma.review.findMany({
    where: {
      technicianId: booking.technicianId,
    },
  });

  const averageRating =
    reviews.reduce((sum, item) => sum + item.rating, 0) /
    reviews.length;

  await prisma.technicianProfile.update({
    where: {
      userId: booking.technicianId,
    },
    data: {
      averageRating,
      completedJobs: {
        increment: 1,
      },
    },
  });

  return review;
};

export const ReviewService = {
  createReview,
};
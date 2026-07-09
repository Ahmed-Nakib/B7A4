import httpStatus from "http-status";
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
    const error: any = new Error(
      "Review can only be submitted after a completed booking."
    );
    error.statusCode = httpStatus.BAD_REQUEST;
    throw error;
  }

  const existingReview = await prisma.review.findUnique({
    where: {
      bookingId: payload.bookingId,
    },
  });

  if (existingReview) {
    const error: any = new Error("Review already submitted.");
    error.statusCode = httpStatus.CONFLICT;
    throw error;
  }

  return prisma.$transaction(async (tx) => {
    const review = await tx.review.create({
      data: {
        bookingId: booking.id,
        customerId,
        technicianId: booking.technicianId,
        rating: payload.rating,
        comment: payload.comment,
      },
    });

    const rating = await tx.review.aggregate({
      where: {
        technicianId: booking.technicianId,
      },
      _avg: {
        rating: true,
      },
    });

    await tx.technicianProfile.update({
      where: {
        userId: booking.technicianId,
      },
      data: {
        averageRating: rating._avg.rating ?? 0,
      },
    });

    return review;
  });
};

export const ReviewService = {
  createReview,
};
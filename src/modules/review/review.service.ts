import { prisma } from "../../lib/prisma";
import { TCreateReview } from "./review.interface";

const createReview = async (
  customerId: string,
  payload: TCreateReview
) => {
  // Check completed booking
  const booking = await prisma.booking.findFirst({
    where: {
      id: payload.bookingId,
      customerId,
      status: "COMPLETED",
    },
  });

  if (!booking) {
    throw new Error(
      "Review can only be submitted after a completed booking."
    );
  }

  // Prevent duplicate review
  const existingReview = await prisma.review.findUnique({
    where: {
      bookingId: payload.bookingId,
    },
  });

  if (existingReview) {
    throw new Error("Review already submitted.");
  }

  return prisma.$transaction(async (tx) => {
    // Create review
    const review = await tx.review.create({
      data: {
        bookingId: booking.id,
        customerId,
        technicianId: booking.technicianId,
        rating: payload.rating,
        comment: payload.comment,
      },
    });

    // Calculate average rating
    const rating = await tx.review.aggregate({
      where: {
        technicianId: booking.technicianId,
      },
      _avg: {
        rating: true,
      },
    });

    // Update technician profile
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
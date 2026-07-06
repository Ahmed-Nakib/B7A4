import { prisma } from "../../lib/prisma";
import {
  TUpdateAvailability,
  TUpdateBookingStatus,
  TUpdateTechnicianProfile,
} from "./technician.interface";

const updateProfile = async (
  userId: string,
  payload: TUpdateTechnicianProfile
) => {

  
  const profile = await prisma.technicianProfile.findUnique({
    where: {
      userId,
    },
  });

  if (!profile) {
    throw new Error("Technician profile not found");
  }

  return prisma.technicianProfile.update({
    where: {
      userId,
    },
    data: {
      ...payload,
    },
  });
};

const updateAvailability = async (
  userId: string,
  payload: TUpdateAvailability
) => {
  const technician = await prisma.technicianProfile.findUnique({
    where: {
      userId,
    },
  });

  if (!technician) {
    throw new Error("Technician profile not found");
  }

  // Optional: prevent duplicate availability
  const existingAvailability = await prisma.availability.findFirst({
    where: {
      technicianId: technician.id,
      day: payload.day as any,
      startTime: payload.startTime,
      endTime: payload.endTime,
    },
  });

  if (existingAvailability) {
    return prisma.availability.update({
      where: {
        id: existingAvailability.id,
      },
      data: {
        isAvailable: payload.isAvailable ?? true,
      },
    });
  }

  return prisma.availability.create({
    data: {
      technicianId: technician.id,
      day: payload.day as any,
      startTime: payload.startTime,
      endTime: payload.endTime,
      isAvailable: payload.isAvailable ?? true,
    },
  });
};

const getBookings = async (userId: string) => {
  return prisma.booking.findMany({
    where: {
      technicianId: userId,
    },
    include: {
      customer: {
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
        },
      },
      service: true,
      payment: true,
      review: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

const updateBookingStatus = async (
  userId: string,
  bookingId: string,
  payload: TUpdateBookingStatus
) => {
  const booking = await prisma.booking.findFirst({
    where: {
      id: bookingId,
      technicianId: userId,
    },
  });

  if (!booking) {
    throw new Error("Booking not found");
  }

  return prisma.booking.update({
    where: {
      id: bookingId,
    },
    data: {
      status: payload.status,
    },
    include: {
      customer: true,
      service: true,
    },
  });
};

export const TechnicianService = {
  updateProfile,
  updateAvailability,
  getBookings,
  updateBookingStatus,
};
import { BookingStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";
import {
  TCreateBooking,
} from "./booking.interface";
import { TUpdateBookingStatus } from "./booking.interface";

const createBooking = async (
  customerId: string,
  payload: TCreateBooking
) => {
  // Customer exists
  const customer = await prisma.user.findUnique({
    where: {
      id: customerId,
    },
  });

  if (!customer) {
    throw new Error("Customer not found");
  }

  // Service exists
  const service = await prisma.service.findUnique({
    where: {
      id: payload.serviceId,
    },
    include: {
      technician: true,
    },
  });

  if (!service) {
    throw new Error("Service not found");
  }

  if (!service.isAvailable) {
    throw new Error("Service is not available");
  }

  return prisma.booking.create({
    data: {
      customerId,
      technicianId: service.technician.userId,
      serviceId: service.id,
      bookingDate: new Date(payload.bookingDate),
      startTime: payload.startTime,
      endTime: payload.endTime,
      address: payload.address,
      note: payload.note,
      totalAmount: service.price,
      status: BookingStatus.REQUESTED,
    },
    include: {
      customer: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      technician: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      service: {
        include: {
          category: true,
        },
      },
    },
  });
};

const getMyBookings = async (customerId: string) => {
  return prisma.booking.findMany({
    where: {
      customerId,
    },
    include: {
      service: {
        include: {
          category: true,
        },
      },
      technician: {
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          profileImg: true,
        },
      },
      payment: true,
      review: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};
const getSingleBooking = async (
  bookingId: string,
  userId: string,
  role: string
) => {
  const booking = await prisma.booking.findUnique({
    where: {
      id: bookingId,
    },
    include: {
      customer: {
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          profileImg: true,
        },
      },
      technician: {
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          profileImg: true,
        },
      },
      service: {
        include: {
          category: true,
        },
      },
      payment: true,
      review: true,
    },
  });

  if (!booking) {
    throw new Error("Booking not found");
  }

  // Admin can access every booking
  if (role === "ADMIN") {
    return booking;
  }

  // Customer can access own booking
  if (role === "CUSTOMER" && booking.customerId === userId) {
    return booking;
  }

  // Technician can access assigned booking
  if (role === "TECHNICIAN" && booking.technicianId === userId) {
    return booking;
  }

  throw new Error("Unauthorized access");
};

const cancelBooking = async (
  bookingId: string,
  customerId: string
) => {
  const booking = await prisma.booking.findFirst({
    where: {
      id: bookingId,
      customerId,
    },
  });

  if (!booking) {
    throw new Error("Booking not found");
  }

  // Customer can't cancel after work starts
  if (
    booking.status === BookingStatus.IN_PROGRESS ||
    booking.status === BookingStatus.COMPLETED
  ) {
    throw new Error(
      "Booking cannot be cancelled after work has started"
    );
  }

  return prisma.booking.update({
    where: {
      id: bookingId,
    },
    data: {
      status: BookingStatus.CANCELLED,
    },
  });
};


const updateBookingStatus = async (
  technicianId: string,
  bookingId: string,
  payload: TUpdateBookingStatus
) => {
  const booking = await prisma.booking.findFirst({
    where: {
      id: bookingId,
      technicianId,
    },
  });

  if (!booking) {
    throw new Error("Booking not found");
  }

  // Allowed transitions
  const allowedTransitions: Record<BookingStatus, BookingStatus[]> = {
    REQUESTED: [BookingStatus.ACCEPTED, BookingStatus.DECLINED],
    ACCEPTED: [BookingStatus.PAID],
    PAID: [BookingStatus.IN_PROGRESS],
    IN_PROGRESS: [BookingStatus.COMPLETED],
    COMPLETED: [],
    DECLINED: [],
    CANCELLED: [],
  };

  const nextStatuses = allowedTransitions[booking.status];

  if (!nextStatuses.includes(payload.status)) {
    throw new Error(
      `Cannot change booking status from ${booking.status} to ${payload.status}`
    );
  }

  return prisma.booking.update({
    where: {
      id: bookingId,
    },
    data: {
      status: payload.status,
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
      technician: {
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
  });
};

export const BookingService = {
  createBooking,
  getMyBookings,
  getSingleBooking,
  cancelBooking,
  updateBookingStatus,
};
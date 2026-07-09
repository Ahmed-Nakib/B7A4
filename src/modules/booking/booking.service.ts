import { BookingStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";
import {
  TCreateBooking,
} from "./booking.interface";
import httpStatus from "http-status";

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
  const error: any = new Error("Customer not found");
  error.statusCode = httpStatus.NOT_FOUND;
  throw error;
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
  const error: any = new Error("Service not found");
  error.statusCode = httpStatus.NOT_FOUND;
  throw error;
}

 if (!service.isAvailable) {
  const error: any = new Error("Service is not available");
  error.statusCode = httpStatus.BAD_REQUEST;
  throw error;
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
  const error: any = new Error("Booking not found");
  error.statusCode = httpStatus.NOT_FOUND;
  throw error;
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
    const error: any = new Error("Booking not found");
    error.statusCode = httpStatus.NOT_FOUND;
    throw error;
  }

  // Already cancelled
  if (booking.status === BookingStatus.CANCELLED) {
    const error: any = new Error("Booking is already cancelled.");
    error.statusCode = httpStatus.BAD_REQUEST;
    throw error;
  }

  // Cannot cancel after payment/work started/completed
  if (
    booking.status === BookingStatus.PAID ||
    booking.status === BookingStatus.IN_PROGRESS ||
    booking.status === BookingStatus.COMPLETED ||
    booking.status === BookingStatus.ACCEPTED
  ) {
    const error: any = new Error(
      "Booking cannot be cancelled at this stage."
    );
    error.statusCode = httpStatus.BAD_REQUEST;
    throw error;
  }

  return prisma.booking.update({
    where: {
      id: booking.id,
    },
    data: {
      status: BookingStatus.CANCELLED,
    },
  });
};


export const BookingService = {
  createBooking,
  getMyBookings,
  getSingleBooking,
  cancelBooking,
};
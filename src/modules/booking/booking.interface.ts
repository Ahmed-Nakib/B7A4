import { BookingStatus } from "../../../generated/prisma/enums";

export interface TCreateBooking {
  serviceId: string;
  bookingDate: Date;
  startTime: string;
  endTime: string;
  address: string;
  note?: string;
}

export interface TUpdateBookingStatus {
  status: BookingStatus;
}
import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { BookingService } from "./booking.service";

const createBooking = catchAsync(async (req: any, res: Response) => {
  const result = await BookingService.createBooking(
    req.user.id,
    req.body
  );

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "Booking created successfully",
    data: result,
  });
});

const getMyBookings = catchAsync(async (req: any, res: Response) => {
  const result = await BookingService.getMyBookings(req.user.id);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Bookings retrieved successfully",
    data: result,
  });
});

const getSingleBooking = catchAsync(async (req: any, res: Response) => {
  const result = await BookingService.getSingleBooking(
    req.params.id,
    req.user.id,
    req.user.role
  );

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Booking retrieved successfully",
    data: result,
  });
});

const cancelBooking = catchAsync(async (req: any, res: Response) => {
  const result = await BookingService.cancelBooking(
    req.params.id,
    req.user.id
  );

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Booking cancelled successfully",
    data: result,
  });
});


export const BookingController = {
  createBooking,
  getMyBookings,
  getSingleBooking,
  cancelBooking,
};
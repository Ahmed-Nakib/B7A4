import { Router } from "express";
import auth from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";
import { BookingController } from "./booking.controller";

const router = Router();

// Customer
router.post(
  "/",
  auth(Role.CUSTOMER),
  BookingController.createBooking
);

router.get(
  "/",
  auth(Role.CUSTOMER),
  BookingController.getMyBookings
);

// Customer + Technician + Admin
router.get(
  "/:id",
  auth(Role.CUSTOMER, Role.TECHNICIAN, Role.ADMIN),
  BookingController.getSingleBooking
);

// Customer
router.patch(
  "/:id/cancel",
  auth(Role.CUSTOMER),
  BookingController.cancelBooking
);

// Technician
router.patch(
  "/:id/status",
  auth(Role.TECHNICIAN),
  BookingController.updateBookingStatus
);

export const BookingRoutes = router;
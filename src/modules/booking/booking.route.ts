import { Router } from "express";
import auth from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";
import { BookingController } from "./booking.controller";

const router = Router();

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

router.get(
  "/:id",
  auth(Role.CUSTOMER, Role.TECHNICIAN, Role.ADMIN),
  BookingController.getSingleBooking
);

router.patch(
  "/:id/cancel",
  auth(Role.CUSTOMER),
  BookingController.cancelBooking
);


export const BookingRoutes = router;
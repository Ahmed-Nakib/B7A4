import { Router } from "express";
import auth from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";
import { PaymentController } from "./payment.controller";

const router = Router();

router.post(
  "/create",
  auth(Role.CUSTOMER),
  PaymentController.createPayment
);

router.post(
  "/confirm",
  auth(Role.CUSTOMER),
  PaymentController.confirmPayment
);

router.get(
  "/",
  auth(Role.CUSTOMER),
  PaymentController.getMyPayments
);

router.get(
  "/:id",
  auth(Role.CUSTOMER),
  PaymentController.getSinglePayment
);

export const PaymentRoutes = router;
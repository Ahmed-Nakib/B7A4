import { Router } from "express";
import auth from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";
import { PaymentController } from "./payment.controller";

const router = Router();

// Customer
router.post(
  "/create",
  auth(Role.CUSTOMER),
  PaymentController.createPayment
);
router.post(
  "/confirm",
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

// SSLCommerz Callback
router.post("/success", PaymentController.successPayment);

router.post("/fail", PaymentController.failPayment);


export const PaymentRoutes = router;
import { Router } from "express";
import auth from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";
import { ReviewController } from "./review.controller";

const router = Router();

router.post(
  "/",
  auth(Role.CUSTOMER),
  ReviewController.createReview
);

export const ReviewRoutes = router;